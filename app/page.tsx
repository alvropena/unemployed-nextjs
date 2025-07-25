'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-row gap-4">
        <Button
          onClick={() => router.push('/login')}
          size="lg"
        >
          Log In
        </Button>
        <Button
          variant="outline"
          onClick={() => router.push('/register')}
          size="lg"
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
}
