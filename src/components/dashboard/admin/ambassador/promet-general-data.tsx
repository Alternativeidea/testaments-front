'use client'
// React
import { useEffect, useState } from 'react'
// Components
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { getAdminBonusesGeneralData } from '@/lib/services/admin/ambassadors'
import CalendarButton from '../ui/calendar-button'

interface BonusesDataProps {
    directM: number
    indirectM: number
    directTST: number
    indirectTST: number
    directCountM: number
    indirectCountM: number
    directCountTST: number
    indirectCountTST: number
    total: number
    totalTST: number
    totalM: number
}

export default function PrometGeneralData() {
    const [data, setData] = useState<BonusesDataProps>()
    const [loading, setLoading] = useState<boolean>(false)
    const [startDate, setStartDate] = useState<string>('2023-01-01')
    const date = new Date()
    date.setDate(date.getDate() + 1)
    const [endDate, setEndDate] = useState<string>(date.toISOString().split('T')[0])
    const options = { minimumFractionDigits: 2, maximumFractionDigits: 2 }
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const data = await getAdminBonusesGeneralData(
                `?startAt=${startDate}&endAt=${endDate}`
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
                        <p className="hidden lg:block text-h6 font-baskerville pr-4">Promet in provizije po kategorijah</p>
                    </div>
                    <div className="flex w-full justify-between gap-x-2 lg:w-fit">
                        <p className="lg:hidden py-2 block text-h6 font-baskerville pr-4">Promet in provizije po kategorijah</p>
                        {/* Filter Dates */}
                        <CalendarButton
                            changeStartDate={setStartDate}
                            changeEndDate={setEndDate}
                        />
                    </div>
                </div>
                <div className='flex flex-col lg:flex-row gap-6 items-start justify-center w-full'>
                    <div className='flex flex-col gap-y-2 items-start justify-center w-full lg:w-1/2 pr-3'>
                        <Label>Vse Skupaj / Določeno obdobje</Label>
                        {loading
                            ? <Skeleton className='w-full h-[45px]'/>
                            : <Input className='w-full' placeholder={`${(data?.total || 0).toLocaleString('sl-SI', options)}`} readOnly/>}
                    </div>
                    <div className='flex flex-col gap-y-2 items-start justify-center w-full lg:w-1/2 pr-3'>
                        <Label>Vse Skupaj provizije / Določeno obdobje</Label>
                        {loading
                            ? <Skeleton className='w-full h-[45px]'/>
                            : <Input className='w-full' placeholder={`${((data?.directM || 0) + (data?.indirectM || 0) + (data?.directTST || 0) + (data?.indirectTST || 0)).toLocaleString('sl-SI', options)}`} readOnly/>}
                    </div>
                    <div className='flex flex-col gap-y-2 items-start justify-center w-full lg:w-1/2 pr-3'>
                        <Label>Uspešni zahtevki / Količina</Label>
                        {loading
                            ? <Skeleton className='w-full h-[45px]'/>
                            : <Input className='w-full' placeholder={`${((data?.directCountM || 0) + (data?.indirectCountM || 0) + (data?.directCountTST || 0) + (data?.indirectCountTST || 0)).toLocaleString('sl-SI', options)}`} readOnly/>}
                    </div>
                </div>
                <div className='flex flex-col lg:flex-row  gap-6 items-start justify-center w-full'>
                    <div className='flex flex-col gap-y-2 items-start justify-center w-full lg:w-1/2 pr-3'>
                        <Label>Promet Premium / Določeno obdobje</Label>
                        {loading
                            ? <Skeleton className='w-full h-[45px]'/>
                            : <Input className='w-full' placeholder={`${(data?.totalM || 0).toLocaleString('sl-SI', options)}`} readOnly/>}
                    </div>
                    <div className='flex flex-col gap-y-2 items-start justify-center w-full lg:w-1/2 pr-3'>
                        <Label>Provizije Premium / Določeno obdobje</Label>
                        {loading
                            ? <Skeleton className='w-full h-[45px]'/>
                            : <Input className='w-full' placeholder={`${((data?.directM || 0) + (data?.indirectM || 0)).toLocaleString('sl-SI', options)}`} readOnly/>}
                    </div>
                    <div className='flex flex-col gap-y-2 items-start justify-center w-full lg:w-1/2 pr-3'>
                        <Label>Uspešni zahtevki / Količina</Label>
                        {loading
                            ? <Skeleton className='w-full h-[45px]'/>
                            : <Input className='w-full' placeholder={`${((data?.directCountM ? Number(data.directCountM) : 0) + (data?.indirectCountM ? Number(data.indirectCountM) : 0)).toLocaleString('sl-SI', options)}`} readOnly/>}
                    </div>
                </div>
                <div className='flex flex-col lg:flex-row  gap-6 items-start justify-center w-full'>
                    <div className='flex flex-col gap-y-2 items-start justify-center w-full lg:w-1/2 pr-3'>
                        <Label>Promet TST / Določeno obdobje</Label>
                        {loading
                            ? <Skeleton className='w-full h-[45px]'/>
                            : <Input className='w-full' placeholder={`${(data?.totalTST || '0').toLocaleString('sl-SI', options)}`} readOnly/>}
                    </div>
                    <div className='flex flex-col gap-y-2 items-start justify-center w-full lg:w-1/2 pr-3'>
                        <Label>Provizije TST / Določeno obdobje</Label>
                        {loading
                            ? <Skeleton className='w-full h-[45px]'/>
                            : <Input className='w-full' placeholder={`${((data?.directTST || 0) + (data?.indirectTST || 0)).toLocaleString('sl-SI', options)}`} readOnly/>}
                    </div>
                    <div className='flex flex-col gap-y-2 items-start justify-center w-full lg:w-1/2 pr-3'>
                        <Label>Uspešni zahtevki / Količina</Label>
                        {loading
                            ? <Skeleton className='w-full h-[45px]'/>
                            : <Input className='w-full' placeholder={`${((data?.directCountTST || 0) + (data?.indirectCountTST || 0)).toLocaleString('sl-SI', options)}`} readOnly/>}
                    </div>
                </div>
            </Card>
        </>
    )
}
