'use client'
// React
import { useEffect, useState } from 'react'
// Components
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { getAdminWithdrawsData } from '@/lib/services/admin/ambassadors'
import CalendarButton from '../ui/calendar-button'

interface WithdrawDataProps {
    count: number
    quantity: number
    fees: number
}

export default function IzplacilaGeneralData() {
    const [data, setData] = useState<WithdrawDataProps>()
    const [loading, setLoading] = useState<boolean>(false)
    const [startDate, setStartDate] = useState<string>('2023-01-01')
    const date = new Date()
    date.setDate(date.getDate() + 1)
    const [endDate, setEndDate] = useState<string>(date.toISOString().split('T')[0])

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const data = await getAdminWithdrawsData(
                `?status=2&startAt=${startDate}&endAt=${endDate}`
            )
            setData(data)
            setLoading(false)
        }
        fetchData()
    }, [endDate, startDate])

    return (
        <>
            <Card className='flex flex-col items-start justify-center border-none bg-primary-light-gray/20 mt-4 w-full gap-y-4 py-8 px-10'>
                <div className='flex flex-col-reverse lg:flex-row items-center justify-between gap-x-2 w-full h-fit'>
                    <div className='flex flex-row gap-x-2 items-center py-2'>
                        <p className="hidden lg:block text-h6 font-baskerville pr-4">Izplačila (vse skupaj)</p>
                    </div>
                    <div className="flex  w-full justify-between lg:w-fit gap-x-2">
                        <p className="lg:hidden py-2 block text-h6 font-baskerville pr-4">Izplačila (vse skupaj)</p>
                        {/* Filter Dates */}
                        <CalendarButton
                            changeStartDate={setStartDate}
                            changeEndDate={setEndDate}
                        />
                    </div>
                </div>
                <div className='flex flex-col lg:flex-row gap-6 items-start justify-center w-full'>
                    <div className='flex flex-col gap-y-2 items-start justify-center w-full'>
                        <Label>Skupaj EUR / Določeno obdobje</Label>
                        {loading
                            ? <Skeleton className='w-full h-[45px]'/>
                            : <Input className='w-full' placeholder={`${data?.quantity
                                ? Number(data.quantity).toLocaleString('sl-SI', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })
                                : '0'}`} readOnly/>}
                    </div>
                    <div className='flex flex-col gap-y-2 items-start justify-center w-full'>
                        <Label>Uspešni zahtevki / Količina</Label>
                        {loading
                            ? <Skeleton className='w-full h-[45px]'/>
                            : <Input className='w-full' placeholder={`${data?.count !== null ? data?.count : '0'}`} readOnly/>}
                    </div>
                </div>
                <div className='flex flex-col gap-y-2 items-start justify-center w-full lg:w-1/2 lg:pr-3'>
                    <Label>Skupaj stroški obdelave</Label>
                    {loading
                        ? <Skeleton className='w-full h-[45px]'/>
                        : <Input className='w-full' placeholder={`${data?.fees
                            ? data?.fees.toLocaleString('sl-SI', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })
                            : '0'}`} readOnly/>}
                </div>
            </Card>
        </>
    )
}
