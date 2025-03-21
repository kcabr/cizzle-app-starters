import { parseCookies, setCookie } from '@tanstack/react-start/server'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

// Types for our database schema
export type Database = {
  public: {
    Tables: {
      todos: {
        Row: {
          id: number
          title: string
          completed: boolean
          user_id: string
          created_at: string
        }
        Insert: {
          title: string
          completed?: boolean
          user_id: string
        }
        Update: {
          title?: string
          completed?: boolean
          user_id?: string
        }
      }
      notes: {
        Row: {
          id: number
          content: string
          user_id: string
          created_at: string
        }
        Insert: {
          content: string
          user_id: string
        }
        Update: {
          content?: string
          user_id?: string
        }
      }
      posts: {
        Row: {
          id: number
          title: string
          body: string
          user_id: string
          created_at: string
        }
        Insert: {
          title: string
          body: string
          user_id: string
        }
        Update: {
          title?: string
          body?: string
          user_id?: string
        }
      }
    }
  }
}

// For server-side usage with cookies
export function getSupabaseServerClient() {
  return createServerClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        // @ts-ignore Wait till Supabase overload works
        getAll() {
          return Object.entries(parseCookies()).map(([name, value]) => ({
            name,
            value,
          }))
        },
        setAll(cookies) {
          cookies.forEach((cookie) => {
            setCookie(cookie.name, cookie.value)
          })
        },
      },
    },
  )
}

// For client-side usage
export function getSupabaseClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY!
  )
}