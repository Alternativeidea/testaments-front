'use client' // Error components must be Client Components

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useEffect } from 'react'

export function InfoError({
    error,
    resetErrorBoundary
}: {
    error: Error & { digest?: string }
    resetErrorBoundary: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <Card className='border-accent-red bg-accent-red/20'>
            <CardHeader>
                <CardTitle className='text-body-big'>Nekaj je šlo narobe!</CardTitle>
            </CardHeader>
            <CardContent className='p-5'>
                <Button
                    variant='destructive'
                    className='w-fit'
                    onClick={
                        // Attempt to recover by trying to re-render the segment
                        () => resetErrorBoundary()
                    }
                >
                    Poskusi ponovno
                </Button>
            </CardContent>
        </Card>
    )
}