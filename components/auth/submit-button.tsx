'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { X } from 'lucide-react';

interface SubmitButtonProps {
    onSubmit: () => Promise<void>;
    children: React.ReactNode;
    className?: string;
}

export function SubmitButton({ onSubmit, children, className }: SubmitButtonProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        setError(false);

        try {
            await onSubmit();
        } catch {
            setError(true);
            // Reset error state after a delay
            setTimeout(() => setError(false), 3000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            type="submit"
            disabled={loading}
            onClick={handleClick}
            className={`w-full font-medium py-3 px-4 rounded-lg transition duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${error
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white'
                } ${className || ''}`}
        >
            {loading ? (
                <div className="flex items-center justify-center">
                    <Spinner size="sm" className="text-white" />
                </div>
            ) : error ? (
                <div className="flex items-center justify-center">
                    <X className="w-5 h-5 text-white" />
                </div>
            ) : (
                children
            )}
        </Button>
    );
} 