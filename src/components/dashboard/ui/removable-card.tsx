'use client'

import { Card, CardHeader } from '@/components/ui/card'
import { Icons } from '@/components/ui/icons'
import { cn } from '@/lib/utils/style'
import { useState } from 'react'

interface RemovableCardProps {
    children: React.ReactNode
    onClose?: () => void
    className?: string,
    strict?: boolean
}

export default function RemovableCard({ children, onClose, className, strict = true }: RemovableCardProps) {
    const [isAvailable, setIsAvailable] = useState(true)

    function handleClick() {
        setIsAvailable(false)
        if (onClose) {
            onClose()
        }
    }

    if (!isAvailable) {
        return null
    }

    return (
        <Card className={cn('bg-primary-light-gray/20', className)}>
            <CardHeader className='space-y-0 p-4 md:p-3 relative'>
                {
                    strict && <Icons.Close
                        className='close w-6 h-6 absolute top-2 right-2 cursor-pointer'
                        onClick={handleClick}
                    />
                }
                {children}
            </CardHeader>
        </Card>
    )
}
