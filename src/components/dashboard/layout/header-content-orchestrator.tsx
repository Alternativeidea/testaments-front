'use client'

import { usePathname } from 'next/navigation'

interface HeaderContentOrchestratorProps {
    children?: React.ReactNode
    className?: string
}

export function HeaderContentOrchestrator({ children }: HeaderContentOrchestratorProps) {
    return (
        <>
            {children}
        </>
    )
}

export function HeaderContentOrchestratorDashboard({ children }: HeaderContentOrchestratorProps) {
    const pathname = usePathname()

    if (pathname?.startsWith('/namizje/verifikacija')) {
        return null
    }

    return (
        <>{children}</>
    )
}

export function HeaderContentOrchestratorVerification({ children }: HeaderContentOrchestratorProps) {
    const pathname = usePathname()

    if (!pathname?.startsWith('/namizje/verifikacija')) {
        return null
    }

    return (
        <>{children}</>
    )
}
