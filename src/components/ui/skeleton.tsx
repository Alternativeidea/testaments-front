import { cn } from '@/lib/utils/style'

function Skeleton({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn('animate-pulse bg-primary-light-gray', className)}
            {...props}
        />
    )
}

export { Skeleton }
