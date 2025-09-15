import { config } from '@/config/env'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { SupabaseClient as Client } from '@supabase/supabase-js'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    config.NEXT_PUBLIC_SUPABASE_URL,
    config.NEXT_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}

// INFO:
// Singleton pattern to initalize supabase client
// This reduces redundant API calls to supabase and
// doesn't resues the same client rather than creating a new one
export class SupabaseClient {
  private static client: Client | null;

  public static async getClient() {
    if (!this.client) {
      this.client = await createClient();
    }

    return this.client
  }
}

// export async function supabaseClient(): Promise<SupabaseClient> {
//   let client: SupabaseClient | null = null
//
//   if (!client) {
//     client = await supabaseClient()
//   }
//
//   return client;
// }
