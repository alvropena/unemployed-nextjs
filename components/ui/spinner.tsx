import * as React from "react"
import { cn } from "@/lib/utils"

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: "sm" | "md" | "lg"
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
    ({ className, size = "md", ...props }, ref) => {
        const sizeClasses = {
            sm: "w-4 h-4",
            md: "w-5 h-5",
            lg: "w-6 h-6"
        }

        return (
            <div
                ref={ref}
                className={cn(
                    "animate-spin rounded-full border-2 border-current border-t-transparent",
                    sizeClasses[size],
                    className
                )}
                {...props}
            />
        )
    }
)
Spinner.displayName = "Spinner"

export { Spinner } 