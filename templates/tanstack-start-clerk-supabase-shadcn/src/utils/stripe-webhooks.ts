/**
 * Stripe webhook utility functions
 */
import { prisma } from "./prisma";
import { stripe } from "./stripe";
import Stripe from "stripe";

/**
 * Membership tiers based on Stripe subscription status
 */
type SubscriptionStatus =
  | "active"
  | "trialing"
  | "canceled"
  | "incomplete"
  | "incomplete_expired"
  | "past_due"
  | "paused"
  | "unpaid";

type MembershipTier = "free" | "pro";

/**
 * Map Stripe subscription status to membership tier
 */
const getMembershipStatus = (
  status: SubscriptionStatus,
  membership: MembershipTier
): MembershipTier => {
  switch (status) {
    case "active":
    case "trialing":
      return membership;
    case "canceled":
    case "incomplete":
    case "incomplete_expired":
    case "past_due":
    case "paused":
    case "unpaid":
      return "free";
    default:
      return "free";
  }
};

/**
 * Retrieve subscription details from Stripe
 */
const getSubscription = async (subscriptionId: string) => {
  return stripe.subscriptions.retrieve(subscriptionId, {
    expand: ["default_payment_method"],
  });
};

/**
 * Update user's Stripe customer information in the database
 */
export async function updateStripeCustomer(
  userId: string,
  subscriptionId: string,
  customerId: string
) {
  try {
    if (!userId || !subscriptionId || !customerId) {
      throw new Error("Missing required parameters for updateStripeCustomer");
    }

    const subscription = await getSubscription(subscriptionId);

    // Update user profile with Stripe information
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        stripeCustomerId: customerId,
        stripeSubscriptionId: subscription.id,
      },
    });

    console.log(`Updated Stripe customer info for user: ${userId}`);
    return updatedUser;
  } catch (error) {
    console.error("Error in updateStripeCustomer:", error);
    throw error instanceof Error
      ? error
      : new Error("Failed to update Stripe customer");
  }
}

/**
 * Update user's subscription status in the database
 */
export async function manageSubscriptionStatusChange(
  subscriptionId: string,
  customerId: string,
  productId: string
) {
  try {
    if (!subscriptionId || !customerId || !productId) {
      throw new Error(
        "Missing required parameters for manageSubscriptionStatusChange"
      );
    }

    // Get the customer with the given Stripe customer ID
    const user = await prisma.user.findFirst({
      where: {
        stripeCustomerId: customerId,
      },
    });

    if (!user) {
      console.error(`No user found with Stripe customer ID: ${customerId}`);
      return;
    }

    const subscription = await getSubscription(subscriptionId);
    const product = await stripe.products.retrieve(productId);

    // Get membership tier from product metadata
    const membership =
      (product.metadata.membership as MembershipTier) || "free";

    if (!["free", "pro"].includes(membership)) {
      console.warn(
        `Invalid membership type in product metadata: ${membership}, defaulting to free`
      );
    }

    // Determine the user's subscription status based on Stripe status
    const subscriptionStatus = getMembershipStatus(
      subscription.status as SubscriptionStatus,
      membership as MembershipTier
    );

    // Calculate subscription period end
    const subscriptionPeriodEnd = subscription.current_period_end
      ? new Date(subscription.current_period_end * 1000)
      : null;

    // Update user profile with subscription information
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        stripeSubscriptionId: subscription.id,
        subscriptionStatus: subscriptionStatus,
        subscriptionPeriodEnd: subscriptionPeriodEnd,
        stripePriceId: productId,
      },
    });

    console.log(`Updated subscription for user: ${user.id}`);
    return subscriptionStatus;
  } catch (error) {
    console.error("Error in manageSubscriptionStatusChange:", error);
    throw error instanceof Error
      ? error
      : new Error("Failed to update subscription status");
  }
}

/**
 * Verify Stripe webhook signature
 */
export function verifyStripeWebhook(
  body: string,
  signature: string,
  webhookSecret: string
): Stripe.Event {
  try {
    return stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.error("Error verifying Stripe webhook:", error);
    throw error;
  }
}
