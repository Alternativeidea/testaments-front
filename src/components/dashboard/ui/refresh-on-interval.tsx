'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface RefreshOnIntervalProps {
    interval?: number
}

export function RefreshOnInterval({ interval = 10000 }: RefreshOnIntervalProps) {
    const { refresh } = useRouter()

    useEffect(() => {
        const intervalId = setInterval(() => {
            refresh()
        }, interval)

        return () => {
            clearInterval(intervalId)
        }
    }, [interval, refresh])

    return null
}
