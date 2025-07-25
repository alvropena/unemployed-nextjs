'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import { createClient } from '@/utils/supabase/server'

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

    const { error } = await supabase.auth.signUp(validation.data)

    if (error) {
        redirect(`/register?error=${encodeURIComponent(error.message)}`)
    }

    revalidatePath('/', 'layout')
    redirect('/home')
}