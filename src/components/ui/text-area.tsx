import { cn } from '@/lib/utils/style'
import * as React from 'react'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                className={cn(
                    'flex min-h-[60px] w-full border border-primary-dark-gray bg-transparent px-3 py-2 text-body-big-2 placeholder:text-primary-medium-gray/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-dark-gray disabled:cursor-not-allowed disabled:opacity-50',
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Textarea.displayName = 'Textarea'

export { Textarea }
