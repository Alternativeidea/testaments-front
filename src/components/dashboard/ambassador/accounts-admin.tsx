'use client'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { getBalanceByUser } from '@/lib/services/bonuses'
import { useEffect, useState } from 'react'

interface BalanceProps {
    balance: number
}

export function AccountsAdmin({ userId }: { userId: number}) {
    const [balance, setBalance] = useState<BalanceProps>()
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            const data = await getBalanceByUser(userId)
            setBalance(data)
            setLoading(false)
        }
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Card className='border-0 bg-primary-light-gray/30'>
            <CardHeader className='flex-row justify-between items-center'>
                <CardTitle className='font-baskerville text-h6 font-normal'>Moja Balance</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4 mt-2'>
                {loading
                    ? <CardTitle className='flex items-end gap-4 text-h3'><Skeleton className='w-36 h-[48px]'/><span className="font-baskerville text-h5"> EUR</span></CardTitle>
                    : <CardTitle className='font-baskerville text-h3 font-normal'>{balance?.balance.toLocaleString('sl-SI', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}<span className="text-h5"> EUR</span></CardTitle>
                }
                <Separator className='bg-primary-light-gray' />
            </CardContent>
            <CardFooter className='flex-col items-start space-y-4'>
            </CardFooter>
        </Card>
    )
}
