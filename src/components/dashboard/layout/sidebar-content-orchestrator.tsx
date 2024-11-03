'use client'

import { cn } from '@/lib/utils/style'
import { usePathname } from 'next/navigation'

interface SidebarContentOrchestratorProps {
    children?: React.ReactNode
    className?: string
}

export function SidebarContentOrchestrator({ children, className }: SidebarContentOrchestratorProps) {
    return (
        <div
            className={cn(
                'inline-flex flex-auto flex-col justify-between gap-4 overflow-hidden',
                className
            )}
        >
            {children}
        </div>
    )
}

export function SidebarContentOrchestratorDashboard({ children }: SidebarContentOrchestratorProps) {
    const pathname = usePathname()

    if (pathname?.startsWith('/namizje/verifikacija')) {
        return null
    }

    return (
        <>{children}</>
    )
}

export function SidebarContentOrchestratorVerification({ children }: SidebarContentOrchestratorProps) {
    const pathname = usePathname()

    if (!pathname?.startsWith('/namizje/verifikacija')) {
        return null
    }

    return (
        <>{children}</>
    )
}
