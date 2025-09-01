import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_SUPABASE_URL!,
    process.env.NEXT_SUPABASE_PUBLISHABLE_KEY!
  )
}