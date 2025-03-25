import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useUser } from "@clerk/tanstack-start";
import { getSubscriptionDetails, stripeUtils } from "~/utils/stripe";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Alert, AlertDescription } from "./ui/alert";
import {
  CheckCircle2,
  BadgeCheck,
  CalendarDays,
  CreditCard,
  ArrowRight,
  Home,
} from "lucide-react";
import { useSubscription } from "./StripeProvider";

export function SubscriptionSuccess() {
  const { isSignedIn } = useUser();
  const { refetch } = useSubscription();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subscriptionDetails, setSubscriptionDetails] = useState<{
    planName: string;
    nextBillingDate: string;
    subscriptionId: string;
  } | null>(null);

  useEffect(() => {
    // Get the session_id from URL parameters
    const query =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search)
        : new URLSearchParams("");

    const sessionId = query.get("session_id");

    if (sessionId && isSignedIn) {
      fetchSubscriptionDetails(sessionId);
    } else if (!isSignedIn) {
      setError("You need to be signed in to view subscription details");
      setLoading(false);
    } else {
      setError("No subscription information found");
      setLoading(false);
    }
  }, [isSignedIn]);

  const fetchSubscriptionDetails = async (sessionId: string) => {
    try {
      const details = await getSubscriptionDetails({
        data: {
          sessionId,
        },
      });
      setSubscriptionDetails(details);

      // Refresh subscription status in context
      refetch();
    } catch (err) {
      console.error("Error fetching subscription details:", err);
      setError("Could not load subscription details");
    } finally {
      setLoading(false);
    }
  };

  const handleManageBilling = async () => {
    if (!isSignedIn) {
      setError("You must be logged in to manage your subscription");
      return;
    }

    try {
      setLoading(true);
      await stripeUtils.createPortal();
      // Redirect happens in the utility function
    } catch (err) {
      console.error("Error creating portal session:", err);
      setError("Could not access billing portal");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-16 mx-auto text-center">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
        <p className="mt-5 text-muted-foreground">
          Loading your subscription details...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-12 mx-auto max-w-md">
        <Alert variant="destructive" className="mb-6">
          <AlertDescription className="text-center py-2">
            {error}
          </AlertDescription>
        </Alert>
        <Button asChild className="w-full">
          <Link to="/">
            <Home className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-16 mx-auto max-w-2xl">
      <Card className="overflow-hidden shadow-lg border-2 border-primary/10">
        <CardHeader className="bg-primary text-primary-foreground text-center py-10">
          <div className="mx-auto rounded-full bg-primary-foreground/20 p-4 w-24 h-24 flex items-center justify-center mb-5">
            <CheckCircle2 className="h-14 w-14" />
          </div>
          <h1 className="text-3xl font-bold">Payment Successful!</h1>
          <p className="text-primary-foreground/80 mt-2">
            Your subscription has been activated
          </p>
        </CardHeader>

        <CardContent className="pt-8 pb-10 px-8">
          {subscriptionDetails ? (
            <>
              <div className="text-center mb-8">
                <div className="inline-flex items-center rounded-full border border-primary/20 px-3 py-1 text-sm bg-primary/5 mb-3">
                  <BadgeCheck className="mr-1 h-4 w-4 text-primary" />
                  <span>Active Subscription</span>
                </div>
                <h2 className="text-2xl font-bold mb-2">
                  Thank you for subscribing!
                </h2>
                <p className="text-muted-foreground">
                  You now have access to all premium features included in the{" "}
                  <span className="font-medium text-primary">
                    {subscriptionDetails.planName}
                  </span>
                </p>
              </div>

              <div className="bg-muted rounded-lg p-5 mb-8 space-y-4">
                <div className="flex items-center">
                  <CalendarDays className="h-5 w-5 text-muted-foreground mr-3" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Next billing date
                    </p>
                    <p className="font-medium">
                      {subscriptionDetails.nextBillingDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 text-muted-foreground mr-3" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Subscription ID
                    </p>
                    <p className="font-mono text-sm">
                      {subscriptionDetails.subscriptionId}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <h3 className="font-medium">What's next?</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      Explore your new premium features in the dashboard
                    </span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      You can manage your subscription details at any time
                    </span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      Need help? Contact our support team for assistance
                    </span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <Button asChild variant="outline" className="sm:flex-1">
                  <Link to="/">
                    <Home className="mr-2 h-4 w-4" />
                    Return to Dashboard
                  </Link>
                </Button>
                <Button
                  onClick={handleManageBilling}
                  disabled={loading}
                  className="sm:flex-1"
                >
                  {loading ? (
                    "Loading..."
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Manage Billing
                    </>
                  )}
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-4">
              <p className="text-muted-foreground">
                Subscription information not available.
              </p>
              <Button asChild className="mt-4">
                <Link to="/">Return to Home</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
