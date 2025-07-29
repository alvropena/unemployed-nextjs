import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { signup } from '@/app/actions/auth';

export default function RegisterPage() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md border border-gray-300 p-8">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold">Sign Up</h1>
                </div>

                <form action={signup} className="w-full">
                    <div className="w-full mb-4">
                        <Label htmlFor="email" className="w-full">Email</Label>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full"
                        />
                    </div>

                    <div className="w-full mb-6">
                        <Label htmlFor="password" className="w-full">Password</Label>
                        <Input
                            type="password"
                            id="password"
                            name="password"
                            required
                            minLength={6}
                            className="w-full"
                        />
                    </div>

                    <div className="w-full mb-4">
                        <Button type="submit" className="w-full">Sign Up</Button>
                    </div>
                </form>

                <div className="text-center">
                    <p>
                        Already have an account? <Link href="/login" className="text-blue-600 hover:text-blue-800">Log In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
} 