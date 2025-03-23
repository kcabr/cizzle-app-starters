import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useUser } from "@clerk/tanstack-start";
import { checkSubscriptionStatus, STRIPE_PLANS } from "~/utils/stripe";
import toast from "react-hot-toast";

interface SubscriptionContextType {
  isActive: boolean;
  planId: string | undefined;
  planName: string | undefined;
  isLoading: boolean;
  refetch: () => Promise<void>;
}

const defaultContext: SubscriptionContextType = {
  isActive: false,
  planId: undefined,
  planName: undefined,
  isLoading: true,
  refetch: async () => {},
};

const SubscriptionContext = createContext<SubscriptionContextType>(defaultContext);

export const useSubscription = () => useContext(SubscriptionContext);

interface StripeProviderProps {
  children: ReactNode;
}

export function StripeProvider({ children }: StripeProviderProps) {
  const { isSignedIn, user } = useUser();
  const [isActive, setIsActive] = useState(false);
  const [planId, setPlanId] = useState<string | undefined>(undefined);
  const [planName, setPlanName] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSubscriptionStatus = async () => {
    if (!isSignedIn) {
      setIsActive(false);
      setPlanId(undefined);
      setPlanName(undefined);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      
      const status = await checkSubscriptionStatus();

      setIsActive(status.isActive);
      setPlanId(status.planId);
      setPlanName(status.planName);
    } catch (err) {
      console.error("Error fetching subscription status:", err);
      toast.error("Failed to check subscription status");
      setIsActive(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptionStatus();
  }, [isSignedIn]);

  const value: SubscriptionContextType = {
    isActive,
    planId,
    planName,
    isLoading,
    refetch: fetchSubscriptionStatus,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}