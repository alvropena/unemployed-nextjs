import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { logout } from '@/app/actions/auth'

export default async function HomePage() {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/login')
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center space-y-4">
                <p className="text-xl">Hello {data.user.email}</p>
                <form action={logout}>
                    <Button type="submit" variant="outline">
                        Log Out
                    </Button>
                </form>
            </div>
        </div>
    )
}