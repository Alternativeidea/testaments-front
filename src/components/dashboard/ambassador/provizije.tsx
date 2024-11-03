'use client'
// React
import { useEffect, useState } from 'react'
// Components
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DataTableMinimal } from '@/components/ui/data-table-minimal'
import { Icons } from '@/components/ui/icons'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { getMembershipsData } from '@/lib/services/ambassadors'
import { formatDate } from '@/lib/utils/date'
import { format } from 'date-fns'
import { ProvizijeColumns } from './provizije-columns'

export function Provizije() {
    const today = new Date()
    const pastDate = new Date(today.setFullYear(today.getFullYear() - 1))
    const [startDate, setStartDate] = useState<string>(pastDate.toISOString().split('T')[0])
    const [endDate, setEndDate] = useState<string>(new Date().toISOString().split('T')[0])
    const [type, setType] = useState('all')
    const [nivo, setNivo] = useState('all')
    const [calendarStartOpen, setCalendarStartOpen] = useState<boolean>(false)
    const [calendarEndOpen, setCalendarEndOpen] = useState<boolean>(false)
    const [updateData, setUpdateData] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const data = await getMembershipsData(
                `?type=${type}&level=${nivo}&startAt=${startDate}&endAt=${endDate}`)
            setData(data)
            setIsLoading(false)
        }
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateData])

    function clearFilters() {
        setType('all')
        setNivo('all')
        setStartDate(pastDate.toISOString().split('T')[0])
        setEndDate(new Date().toISOString().split('T')[0])
    }

    return (
        <div className="flex flex-col w-full h-full justify-start">
            <div className='flex flex-col gap-y-2 pt-2'>
                <DataTableMinimal
                    data={data}
                    loading={isLoading}
                    columns={ProvizijeColumns}
                    empty='provizije'
                >
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button className='bg-primary-light-gray h-12 w-12' size={'icon'}>
                                <Icons.Filter className='text-primary-dark-gray' />
                            </Button>
                        </SheetTrigger>
                        <SheetContent className='w-full lg:!max-w-[420px] h-full p-0'>
                            <Card className='border-none h-full'>
                                <CardHeader className='flex px-6 shadow-dashboard-header'>
                                    <CardTitle className='text-h6 pt-6 font-baskerville font-normal'>
                                        Filtriraj provizije
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className='flex flex-col gap-y-4 p-6 justify-between h-[calc(100%-80px)]'>
                                    <div className='flex flex-col gap-y-4'>
                                        <div className="flex flex-col gap-y-2">
                                            <Label>Datum od</Label>
                                            <Popover open={calendarStartOpen} onOpenChange={setCalendarStartOpen}>
                                                <PopoverTrigger asChild>
                                                    <Button variant={'light'} className='!text-left justify-start'>
                                                        {formatDate(startDate)}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0 z-[999]" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        onDayClick={(e) => {
                                                            const date = new Date(e)
                                                            const formattedDate = format(date, 'yyyy-MM-dd')
                                                            setStartDate(formattedDate)
                                                            setCalendarStartOpen(false)
                                                        }}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                        <div className="flex flex-col gap-y-2">
                                            <Label>Datum do</Label>
                                            <Popover open={calendarEndOpen} onOpenChange={setCalendarEndOpen}>
                                                <PopoverTrigger asChild>
                                                    <Button variant={'light'} className='!text-left justify-start'>
                                                        {formatDate(endDate)}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0 z-[999]" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        onDayClick={(e) => {
                                                            const date = new Date(e)
                                                            const formattedDate = format(date, 'yyyy-MM-dd')
                                                            setEndDate(formattedDate)
                                                            setCalendarEndOpen(false)
                                                        }}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                        <Label>Izberite Kategorijo</Label>
                                        <div className='flex flex-col lg:flex-row gap-x-2'>
                                            <Button
                                                onClick={() => setType(type === 'memberships' ? 'all' : 'memberships')}
                                                className='w-full'
                                                variant={type === 'memberships' ? 'default' : 'light'}>
                                            Premium
                                            </Button>
                                            <Button
                                                onClick={() => setType(type === 'tst' ? 'all' : 'tst')}
                                                className='w-full'
                                                variant={type === 'tst' ? 'default' : 'light'}>
                                            TST
                                            </Button>
                                        </div>
                                        <Label>Izberite nivo</Label>
                                        <div className='flex flex-col lg:flex-row gap-x-2'>
                                            <Button
                                                onClick={() => setNivo(nivo === 'direct' ? 'all' : 'direct')}
                                                className='w-full'
                                                variant={nivo === 'direct' ? 'default' : 'light'}
                                            >
                                            Nivo 1
                                            </Button>
                                            <Button
                                                onClick={() => setNivo(nivo === 'indirects' ? 'all' : 'indirects')}
                                                className='w-full'
                                                variant={nivo === 'indirects' ? 'default' : 'light'}
                                            >
                                            Nivo 2
                                            </Button>
                                        </div>
                                    </div>
                                    <div className='flex flex-col lg:flex-row gap-x-2'>
                                        <SheetClose asChild>
                                            <Button
                                                onClick={() => setUpdateData(!updateData)}
                                                className='w-full'
                                            >
                                            Shrani
                                            </Button>
                                        </SheetClose>
                                        <Button
                                            onClick={clearFilters}
                                            className='w-full'
                                            variant={'destructive'}
                                        >
                                            Počisti
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </SheetContent>
                    </Sheet>
                </DataTableMinimal>
            </div>
        </div>
    )
}
