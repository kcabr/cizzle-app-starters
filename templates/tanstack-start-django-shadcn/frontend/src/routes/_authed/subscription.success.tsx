import { createFileRoute } from '@tanstack/react-router'
import { SubscriptionSuccess } from '~/components/SubscriptionSuccess'

export const Route = createFileRoute('/_authed/subscription/success')({
  component: SubscriptionSuccessPage,
})

function SubscriptionSuccessPage() {
  return (
    <SubscriptionSuccess />
  )
}