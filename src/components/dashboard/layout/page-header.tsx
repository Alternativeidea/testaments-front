import { cn } from '@/lib/utils/style'

interface PageHeaderProps {
    children?: React.ReactNode
    className?: string
}

export function PageHeader({ children, className }: PageHeaderProps) {
    return (
        <div
            className={cn(
                'w-full min-h-fit flex justify-between items-center bg-primary-white',
                'border-b border-primary-light-gray shadow-dashboard-header',
                'px-4 lg:px-6 py-5',
                'sticky top-0 z-40',
                className
            )}
        >
            {children}
        </div>
    )
}

export function PageHeaderName({ children, className }: PageHeaderProps) {
    return (
        <span
            className={cn(
                'text-h6 font-baskerville leading-none translate-y-1',
                className
            )}
        >
            {children}
        </span>
    )
}
