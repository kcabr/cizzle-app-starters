import { createFileRoute } from '@tanstack/react-router'
import { SubscriptionPlans } from '~/components/SubscriptionPlans'

export const Route = createFileRoute('/_authed/subscription')({
  component: SubscriptionPage,
})

function SubscriptionPage() {
  return (
    <SubscriptionPlans />
  )
}