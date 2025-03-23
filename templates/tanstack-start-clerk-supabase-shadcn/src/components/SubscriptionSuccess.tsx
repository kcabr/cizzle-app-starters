import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useUser } from "@clerk/tanstack-start";
import { getSubscriptionDetails, stripeUtils } from "~/utils/stripe";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Alert, AlertDescription } from "./ui/alert";
import { CheckCircle2 } from "lucide-react";
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
    const query = typeof window !== 'undefined' 
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams('');
    
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
      const details = await getSubscriptionDetails({ sessionId });
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
      <div className="container py-10 mx-auto text-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
        <p className="mt-4 text-muted-foreground">Loading subscription details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-10 mx-auto">
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button asChild>
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-10 mx-auto max-w-2xl">
      <Card className="overflow-hidden">
        <CardHeader className="bg-primary text-primary-foreground text-center py-8">
          <CheckCircle2 className="mx-auto h-16 w-16 mb-4" />
          <h1 className="text-2xl font-bold">Subscription Successful!</h1>
        </CardHeader>

        <CardContent className="pt-6 pb-8 px-6">
          {subscriptionDetails ? (
            <>
              <h2 className="text-xl font-medium mb-4">
                Thank you for subscribing to our {subscriptionDetails.planName} plan!
              </h2>
              
              <p className="mb-6 text-muted-foreground">
                Your subscription is now active. You have access to all the premium features included in your plan.
              </p>
              
              <div className="bg-muted p-4 rounded-md mb-6">
                <div className="mb-2">
                  <span className="font-medium">Next billing date:</span>{" "}
                  <span>{subscriptionDetails.nextBillingDate}</span>
                </div>
                <div>
                  <span className="font-medium">Subscription ID:</span>{" "}
                  <span className="font-mono text-sm">{subscriptionDetails.subscriptionId}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <Button asChild variant="outline">
                  <Link to="/">Return to Home</Link>
                </Button>
                <Button onClick={handleManageBilling} disabled={loading}>
                  {loading ? "Loading..." : "Manage Billing"}
                </Button>
              </div>
            </>
          ) : (
            <p>Subscription information not available.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}