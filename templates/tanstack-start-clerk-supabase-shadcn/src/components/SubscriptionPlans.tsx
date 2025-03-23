import { useState, useEffect } from "react";
import { useUser } from "@clerk/tanstack-start";
import { STRIPE_PLANS, stripeUtils } from "~/utils/stripe";
import { useSubscription } from "./StripeProvider";
import { CheckCircle2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Alert, AlertDescription } from "./ui/alert";

export function SubscriptionPlans() {
  const { isSignedIn } = useUser();
  const { isActive, planName, isLoading, refetch } = useSubscription();
  const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Check if the user is on a canceled page redirect
  const isCanceled =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("canceled") === "true"
      : false;

  // Function to handle subscription checkout
  const handleSubscribe = async (priceId: string, planId: string) => {
    if (!isSignedIn) {
      setError("You must be logged in to subscribe");
      return;
    }

    try {
      setLoadingPlanId(planId);
      setError(null);

      await stripeUtils.createCheckout(priceId);
      // Redirect happens in the utility function
    } catch (err) {
      console.error("Error creating checkout session:", err);
      setError("Failed to start checkout process");
    } finally {
      setLoadingPlanId(null);
    }
  };

  // On mount, refetch subscription status
  useEffect(() => {
    refetch();
  }, []);

  const plans = Object.values(STRIPE_PLANS);

  return (
    <div className="container py-10 mx-auto">
      <header className="mb-12 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-4">
          Choose Your Subscription Plan
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Select the subscription that best fits your needs and unlock premium
          features
        </p>

        {!isSignedIn && (
          <Alert
            variant="default"
            className="mt-6 max-w-lg mx-auto bg-secondary/50"
          >
            <AlertDescription>
              Please sign in to purchase a subscription
            </AlertDescription>
          </Alert>
        )}

        {isCanceled && (
          <Alert
            variant="default"
            className="mt-6 max-w-lg mx-auto bg-secondary/50"
          >
            <AlertDescription>
              Your checkout was canceled. You can try again when you're ready.
            </AlertDescription>
          </Alert>
        )}

        {isActive && (
          <Alert
            variant="default"
            className="mt-6 max-w-lg mx-auto bg-primary/20"
          >
            <AlertDescription className="text-primary">
              You already have an active subscription to the {planName} plan.
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive" className="mt-6 max-w-lg mx-auto">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {plans.map((plan) => {
          const isActivePlan = isActive && planName === plan.name;
          const isLoading = loadingPlanId === plan.id;

          return (
            <Card
              key={plan.id}
              className={`relative overflow-visible h-full transition-all ${
                plan.isBestValue ? "border-primary shadow-md" : ""
              } ${isActivePlan ? "border-2 border-green-500" : ""}`}
            >
              {plan.isBestValue && (
                <div className="absolute -top-3 right-6 bg-primary text-primary-foreground text-sm font-medium py-1 px-3 rounded-md">
                  Best Value
                </div>
              )}

              {isActivePlan && (
                <div className="absolute top-4 right-4 text-green-500 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full text-sm font-medium">
                  Current Plan
                </div>
              )}

              <CardHeader>
                <CardTitle className="text-xl md:text-2xl">
                  {plan.name}
                </CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-1">
                    / {plan.period}
                  </span>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle2 className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  className="w-full"
                  disabled={
                    !isSignedIn ||
                    isLoading ||
                    loadingPlanId !== null ||
                    isActivePlan
                  }
                  onClick={() => handleSubscribe(plan.priceId, plan.id)}
                  variant={plan.isBestValue ? "default" : "outline"}
                >
                  {isLoading
                    ? "Processing..."
                    : isActivePlan
                      ? "Current Plan"
                      : "Subscribe"}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
