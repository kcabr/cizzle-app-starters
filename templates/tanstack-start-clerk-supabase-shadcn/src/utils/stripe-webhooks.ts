/**
 * Stripe webhook utility functions
 */
import { prisma } from './prisma'
import { stripe } from './stripe'
import Stripe from 'stripe'

/**
 * Update user's subscription status in the database
 */
export async function manageSubscriptionStatusChange(
  subscriptionId: string,
  customerId: string,
  productId: string
) {
  try {
    // Get the customer with the given Stripe customer ID
    const user = await prisma.user.findFirst({
      where: {
        stripeCustomerId: customerId
      }
    })

    if (!user) {
      console.error(`No user found with Stripe customer ID: ${customerId}`)
      return
    }

    // Update user's subscription status in the database
    await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        stripeSubscriptionId: subscriptionId,
        stripePriceId: productId, // This might be product ID, adjust as needed
        // Add additional fields as needed, such as:
        // subscriptionStatus: 'active',
        // subscriptionPeriodEnd: periodEnd
      }
    })

    console.log(`Updated subscription for user: ${user.id}`)
  } catch (error) {
    console.error('Error updating subscription status:', error)
    throw error
  }
}

/**
 * Update user's Stripe customer information in the database
 */
export async function updateStripeCustomer(
  userId: string,
  subscriptionId: string,
  customerId: string
) {
  try {
    // Update user with Stripe customer ID and subscription ID
    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        stripeCustomerId: customerId,
        stripeSubscriptionId: subscriptionId
      }
    })

    console.log(`Updated Stripe customer info for user: ${userId}`)
  } catch (error) {
    console.error('Error updating Stripe customer info:', error)
    throw error
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
    return stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (error) {
    console.error('Error verifying Stripe webhook:', error)
    throw error
  }
}