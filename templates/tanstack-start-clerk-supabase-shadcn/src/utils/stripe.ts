/**
 * Stripe API client for handling subscription operations
 */

import { getAuth } from "@clerk/tanstack-start/server";
import { getWebRequest } from "@tanstack/react-start/server";
import { createServerFn } from "@tanstack/react-start";
import toast from "react-hot-toast";
import Stripe from "stripe";

// Initialize Stripe client
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
});

/**
 * Stripe publishable key
 */
export const STRIPE_PUBLISHABLE_KEY = import.meta.env
  .VITE_STRIPE_PUBLISHABLE_KEY;

/**
 * Plan configuration with price IDs
 */
export const STRIPE_PLANS = {
  MONTHLY: {
    id: "monthly",
    name: "Monthly Plan",
    description: "Perfect for individuals",
    price: "$9.99",
    period: "month",
    features: [
      "Full access to all features",
      "Priority support",
      "Regular updates",
      "Cancel anytime",
    ],
    priceId: import.meta.env.VITE_STRIPE_PRICE_MONTHLY || "price_monthly", // Replace with your actual Stripe price ID
  },
  ANNUAL: {
    id: "annual",
    name: "Annual Plan",
    description: "Best value for committed users",
    price: "$99.99",
    period: "year",
    features: [
      "Everything in Monthly Plan",
      "2 months free",
      "Premium support",
      "Early access to new features",
    ],
    priceId: import.meta.env.VITE_STRIPE_PRICE_ANNUAL || "price_annual", // Replace with your actual Stripe price ID
    isBestValue: true,
  },
};

/**
 * Server function to create a checkout session
 */
export const createCheckoutSession = createServerFn({
  method: "POST",
})
  .validator((z) => {
    return z.object({
      priceId: z.string(),
      successUrl: z.string().optional(),
      cancelUrl: z.string().optional(),
    });
  })
  .handler(async ({ priceId, successUrl, cancelUrl }) => {
    try {
      const request = getWebRequest();
      if (!request) {
        throw new Error("Web request not available");
      }

      const auth = await getAuth(request);
      const userId = auth?.userId;

      if (!userId) {
        throw new Error("User not authenticated");
      }

      // In a real implementation, you would make an API call to your backend
      // which would create a Stripe checkout session

      // Mock implementation for demonstration purposes
      const baseUrl =
        typeof window !== "undefined"
          ? window.location.origin
          : "http://localhost:3000";

      const defaultSuccessUrl = `${baseUrl}/subscription/success?session_id=mock_session_123`;
      const defaultCancelUrl = `${baseUrl}/subscription?canceled=true`;

      return {
        url: `${successUrl || defaultSuccessUrl}&price_id=${priceId}`,
        sessionId: "mock_session_123",
      };
    } catch (error) {
      console.error("Error creating checkout session:", error);
      throw new Error("Failed to create checkout session");
    }
  });

/**
 * Server function to create a customer portal session
 */
export const createPortalSession = createServerFn({
  method: "POST",
})
  .validator((z) => {
    return z.object({
      returnUrl: z.string().optional(),
    });
  })
  .handler(async ({ returnUrl }) => {
    try {
      const request = getWebRequest();
      if (!request) {
        throw new Error("Web request not available");
      }

      const auth = await getAuth(request);
      const userId = auth?.userId;

      if (!userId) {
        throw new Error("User not authenticated");
      }

      // In a real implementation, you would make an API call to your backend
      // which would create a Stripe customer portal session

      // Mock implementation for demonstration purposes
      const baseUrl =
        typeof window !== "undefined"
          ? window.location.origin
          : "http://localhost:3000";

      const defaultReturnUrl = `${baseUrl}/subscription`;

      return {
        url: returnUrl || defaultReturnUrl,
      };
    } catch (error) {
      console.error("Error creating portal session:", error);
      throw new Error("Failed to create portal session");
    }
  });

/**
 * Server function to get subscription details from a checkout session
 */
export const getSubscriptionDetails = createServerFn({
  method: "GET",
})
  .validator((z) => {
    return z.object({
      sessionId: z.string(),
    });
  })
  .handler(async ({ sessionId }) => {
    try {
      const request = getWebRequest();
      if (!request) {
        throw new Error("Web request not available");
      }

      const auth = await getAuth(request);
      const userId = auth?.userId;

      if (!userId) {
        throw new Error("User not authenticated");
      }

      // In a real implementation, you would make an API call to your backend
      // which would retrieve the subscription details from Stripe

      // Mock implementation for demonstration purposes
      const searchParams = new URLSearchParams(sessionId);
      const priceId = searchParams.get("price_id") || "price_monthly";

      // Get the plan based on the price ID
      const plan =
        Object.values(STRIPE_PLANS).find((p) => p.priceId === priceId) ||
        STRIPE_PLANS.MONTHLY;

      return {
        planName: plan.name,
        nextBillingDate: new Date(
          Date.now() + 30 * 24 * 60 * 60 * 1000
        ).toLocaleDateString(),
        subscriptionId: "sub_mock123",
      };
    } catch (error) {
      console.error("Error fetching subscription details:", error);
      throw new Error("Failed to fetch subscription details");
    }
  });

/**
 * Server function to check a user's subscription status
 */
export const checkSubscriptionStatus = createServerFn({
  method: "GET",
}).handler(async () => {
  try {
    const request = getWebRequest();
    if (!request) {
      throw new Error("Web request not available");
    }

    const auth = await getAuth(request);
    const userId = auth?.userId;

    if (!userId) {
      throw new Error("User not authenticated");
    }

    // In a real implementation, you would make an API call to your backend
    // which would check the subscription status in Stripe

    // Mock implementation for demonstration purposes
    // In a real app, retrieve this from your database or Stripe API
    const hasSubscription = false; // Simulating no active subscription

    return {
      isActive: hasSubscription,
      planId: hasSubscription ? STRIPE_PLANS.MONTHLY.priceId : undefined,
      planName: hasSubscription ? STRIPE_PLANS.MONTHLY.name : undefined,
    };
  } catch (error) {
    console.error("Error checking subscription status:", error);
    throw new Error("Failed to check subscription status");
  }
});

/**
 * Client-side utility to handle subscription actions with error handling
 */
export const stripeUtils = {
  async createCheckout(priceId: string) {
    try {
      const result = await createCheckoutSession({
        priceId,
      });

      // Redirect to Stripe checkout
      window.location.href = result.url;
      return result;
    } catch (error) {
      console.error("Error creating checkout:", error);
      toast.error("Failed to start checkout process");
      throw error;
    }
  },

  async createPortal() {
    try {
      const result = await createPortalSession({
        returnUrl: window.location.origin + "/subscription",
      });

      // Redirect to Stripe customer portal
      window.location.href = result.url;
      return result;
    } catch (error) {
      console.error("Error creating portal session:", error);
      toast.error("Failed to access billing portal");
      throw error;
    }
  },
};
