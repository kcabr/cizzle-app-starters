import { ReactNode, useEffect } from 'react'
import { useAppSelector } from '~/store/hooks'

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { mode } = useAppSelector((state) => state.theme)

  useEffect(() => {
    // Apply dark mode class to html element
    const root = document.documentElement
    if (mode === 'dark') {
      root.classList.add('dark')
    } else if (mode === 'light') {
      root.classList.remove('dark')
    } else if (mode === 'system') {
      // Check system preference
      const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (systemDarkMode) {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    }
  }, [mode])

  return <>{children}</>
}