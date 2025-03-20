import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense, useState } from 'react'

// Query options with artificially delayed data fetch
const deferredQueryOptions = () =>
  queryOptions({
    queryKey: ['deferred'],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 3000))
      return {
        message: `Hello deferred from the server!`,
        status: 'success',
        time: new Date(),
      }
    },
  })

export const Route = createFileRoute('/_authed/deferred')({
  loader: ({ context }) => {
    // Kick off loading as early as possible!
    context.queryClient.prefetchQuery(deferredQueryOptions())
  },
  component: DeferredComponent,
})

function DeferredComponent() {
  const [count, setCount] = useState(0)

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Deferred Content (React Suspense Demo)</h1>
      
      <div className="mb-8">
        <p className="mb-4">
          This page demonstrates React Suspense with streaming SSR. The first component below 
          will load after a 3-second delay, but the rest of the page remains interactive during this time.
        </p>
        
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <h2 className="text-lg font-semibold mb-2">Interactive Counter</h2>
          <p className="mb-2">This component remains interactive while data is loading.</p>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCount(prev => prev - 1)}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              -
            </button>
            <span className="font-mono text-xl">{count}</span>
            <button 
              onClick={() => setCount(prev => prev + 1)}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              +
            </button>
          </div>
        </div>
      </div>
      
      <div className="border p-6 rounded-lg bg-gray-50">
        <h2 className="text-lg font-bold mb-4">Deferred Content (3-second delay)</h2>
        <Suspense fallback={
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        }>
          <DeferredQuery />
        </Suspense>
      </div>
    </div>
  )
}

function DeferredQuery() {
  const deferredQuery = useSuspenseQuery(deferredQueryOptions())

  return (
    <div className="space-y-2">
      <p className="text-lg font-semibold">Status: <span className="text-green-600">{deferredQuery.data.status}</span></p>
      <p>Message: {deferredQuery.data.message}</p>
      <p>Time: {deferredQuery.data.time.toLocaleTimeString()}</p>
    </div>
  )
}