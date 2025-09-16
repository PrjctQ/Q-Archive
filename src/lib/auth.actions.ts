'use server'

import { SupabaseClient } from '@/lib/supabase/server'
import { User } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// log in

export async function login(formData: FormData) {
  const supabase = await SupabaseClient.getClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error, data: authData } = await supabase.auth.signInWithPassword(data)

  // revalidate home page cache
  revalidatePath('/', 'layout')

  if (error) {
    return { success: false, message: error.message }
  }

  return { success: true, user: authData.user }
}

// sign in
export async function signup(formData: FormData) {
  const supabase = await SupabaseClient.getClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function logout() {
  const supabase = await SupabaseClient.getClient()
  const { error } = await supabase.auth.signOut();

  // revalidate cache
  revalidatePath('/', 'layout');

  if (error) return { success: false, message: error.message };

  return { success: true };
}

// user profile
export async function getUser(): Promise<User | null> {
  const supabase = await SupabaseClient.getClient()

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error || !user) {
      return null
    }

    return user
  } catch (error) {
    console.error("Error getting user:", error)
    return null
  }
}

// auth required middleware
export async function requireAuth() {
  const user = await getUser()
  if (!user) {
    redirect("/")
  }
  return user
}

// middleware for toggling login / logout
export async function isAuthenticated() {
  const user = await getUser()
  return !!user
}
