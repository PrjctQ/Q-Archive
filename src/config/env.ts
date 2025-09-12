/**
 * Centralizes access to environment variables
 */
export const config: Config = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    NEXT_SUPABASE_PUBLISHABLE_KEY: process.env.NEXT_SUPABASE_PUBLISHABLE_KEY!,
}

export interface Config {
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_SUPABASE_PUBLISHABLE_KEY: string;
}
