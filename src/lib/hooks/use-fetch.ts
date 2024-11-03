'use client'

import { useCallback, useEffect, useState } from 'react'

export function useFetch<T, U = unknown>(fetcher: () => Promise<T>, revalidators?: U[]) {
    const [data, setData] = useState<T>()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)

    const fetchApi = useCallback(async () => {
        try {
            setIsLoading(true)
            const response = await fetcher()
            setData(response)
        } catch (error) {
            setError(true)
        } finally {
            setIsLoading(false)
        }
    }, [fetcher])

    useEffect(() => {
        fetchApi()
        // return () => {}
    }, [JSON.stringify(revalidators)])

    return {
        data,
        isLoading,
        error
    }
}
