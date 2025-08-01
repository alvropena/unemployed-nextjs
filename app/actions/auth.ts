'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import { createClient } from '@/lib/supabase/server'

// Validation schemas
const loginSchema = z.object({
    email: z.email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
})

const signupSchema = z.object({
    email: z.email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
})

export async function login(formData: FormData) {
    const supabase = await createClient()

    // Validate form data
    const rawData = {
        email: formData.get('email'),
        password: formData.get('password'),
    }

    const validation = loginSchema.safeParse(rawData)

    if (!validation.success) {
        // Handle validation errors
        const errors = validation.error.issues.map(issue => issue.message).join(', ')
        redirect(`/login?error=${encodeURIComponent(errors)}`)
    }

    const { error } = await supabase.auth.signInWithPassword(validation.data)

    if (error) {
        redirect(`/login?error=${encodeURIComponent(error.message)}`)
    }

    revalidatePath('/', 'layout')
    redirect('/home')
}

export async function signup(formData: FormData) {
    const supabase = await createClient()

    // Validate form data
    const rawData = {
        email: formData.get('email'),
        password: formData.get('password'),
    }

    const validation = signupSchema.safeParse(rawData)

    if (!validation.success) {
        // Handle validation errors
        const errors = validation.error.issues.map(issue => issue.message).join(', ')
        redirect(`/register?error=${encodeURIComponent(errors)}`)
    }

    const { data, error } = await supabase.auth.signUp(validation.data)

    if (error) {
        redirect(`/register?error=${encodeURIComponent(error.message)}`)
    }

    // Check if email confirmation is required
    if (data.user && !data.session) {
        // User created but needs email confirmation
        redirect('/register?message=Please check your email to confirm your account')
    }

    // If we have a session, user is already signed in (email confirmation not required)
    if (data.session) {
        revalidatePath('/', 'layout')
        redirect('/onboarding')
    }

    // Fallback
    redirect('/register?error=Something went wrong during signup')
}

export async function logout() {
    const supabase = await createClient()

    const { error } = await supabase.auth.signOut()

    if (error) {
        redirect(`/home?error=${encodeURIComponent(error.message)}`)
    }

    revalidatePath('/', 'layout')
    redirect('/')
}