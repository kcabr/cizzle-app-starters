import { createFileRoute } from '@tanstack/react-router'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { increment, decrement, incrementByAmount, reset } from '~/store/slices/counterSlice'
import { useState } from 'react'
import toast from 'react-hot-toast'

export const Route = createFileRoute('/_authed/counter')({
  component: CounterDemo,
})

function CounterDemo() {
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()
  const [incrementAmount, setIncrementAmount] = useState(2)

  const handleIncrement = () => {
    dispatch(increment())
    toast.success('Counter incremented!')
  }

  const handleDecrement = () => {
    dispatch(decrement())
    toast.success('Counter decremented!')
  }

  const handleIncrementByAmount = () => {
    dispatch(incrementByAmount(incrementAmount))
    toast.success(`Counter incremented by ${incrementAmount}!`)
  }

  const handleReset = () => {
    dispatch(reset())
    toast.success('Counter reset!')
  }

  return (
    <div className="py-10">
      <header>
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
            Redux Counter Demo
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            This page demonstrates Redux Toolkit integration with global state management.
          </p>
        </div>
      </header>
      <main className="mt-10">
        <div className="mx-auto max-w-7xl">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="flex items-center justify-center w-32 h-32 rounded-full bg-indigo-100 dark:bg-indigo-900">
                <span className="text-5xl font-bold text-indigo-800 dark:text-indigo-200">{count}</span>
              </div>
              
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={handleIncrement}
                  className="px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Increment
                </button>
                <button
                  onClick={handleDecrement}
                  className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Decrement
                </button>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-gray-600 text-white font-medium rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Reset
                </button>
              </div>
              
              <div className="flex items-center space-x-3">
                <input
                  className="block w-24 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  type="number"
                  value={incrementAmount}
                  onChange={(e) => setIncrementAmount(Number(e.target.value) || 0)}
                />
                <button
                  onClick={handleIncrementByAmount}
                  className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add Amount
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}