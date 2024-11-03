'use client'
// React
import { useEffect, useState } from 'react'
// Components
import Pagination from '@/components/ui/pagination'
import { Skeleton } from '@/components/ui/skeleton'
// Utils
import { Button } from '@/components/ui/button'
import { getAdminMembershipsData } from '@/lib/services/admin/ambassadors'
import CalendarButton from '../ui/calendar-button'
import OrderByButton from '../ui/order-by-button'
import BonusCards from './bonus-cards'

export default function BonusCardManager() {
    const [loading, setLoading] = useState<boolean>()
    const [data, setData] = useState([])
    const today = new Date()
    const pastDate = new Date(today.setFullYear(today.getFullYear() - 1))
    const [startDate, setStartDate] = useState<string>('2023-01-01')
    const date = new Date()
    date.setDate(date.getDate() + 1)
    const [endDate, setEndDate] = useState<string>(date.toISOString().split('T')[0])
    const rowsPerPage = 6
    const [startIndex, setStartIndex] = useState<number>(0)
    const [endIndex, setEndIndex] = useState<number>(rowsPerPage)
    // const [status, setStatus] = useState<string>('1,2,3')
    const [type, setType] = useState('all')
    const [nivo, setNivo] = useState('all')
    const [orderBy, setOrderBy] = useState<boolean>(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            let data = await getAdminMembershipsData(
                `?type=${type}&level=${nivo}&startAt=${startDate}&endAt=${endDate}`)
            data = data.sort((a: { createdAt: string | number | Date }, b: { createdAt: string | number | Date }) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            if (orderBy) {
                data = await data.reverse()
            }
            setData(data)
            setLoading(false)
        }
        fetchData()
    }, [endDate, nivo, startDate, type, orderBy])

    // useEffect(() => {
    //     setData(data => data.reverse())
    // }, [orderBy])

    function clearFilters() {
        setType('all')
        setNivo('all')
        setStartDate(pastDate.toISOString().split('T')[0])
        setEndDate(new Date().toISOString().split('T')[0])
    }

    const pages = Math.ceil(data.length / rowsPerPage)

    return (
        <div className='flex flex-col w-full gap-y-2 pt-6'>
            <div className='flex flex-col-reverse lg:flex-row items-center bg-primary-white justify-between gap-x-2 w-full h-fit px-4'>
                <div className='flex flex-row gap-x-2 items-center py-2'>
                    <p className="hidden lg:block text-h6 font-baskerville pr-4">Vse Provizije</p>
                </div>
                <div className="flex w-full lg:w-fit justify-between gap-x-2">
                    <p className="lg:hidden py-2 block text-h6 font-baskerville pr-4">Vse Provizije</p>
                    {/* Filter Dates */}
                    <OrderByButton
                        orderBy={orderBy}
                        changeOrder={setOrderBy}/>
                    <CalendarButton
                        changeStartDate={setStartDate}
                        changeEndDate={setEndDate}
                    />
                </div>
            </div>
            <div className='flex gap-x-2 py-2 overflow-scroll lg:overflow-hidden gap-2 snap-x snap-mandatory pl-0'>
                <Button
                    onClick={() => setNivo(nivo === 'directs' ? 'indirects' : 'directs')}
                    variant={nivo === 'directs' ? 'default' : 'light'}
                    className='px-8'>
                    Nivo 1
                </Button>
                <Button
                    onClick={() => setNivo(nivo === 'indirects' ? 'all' : 'indirects')}
                    variant={nivo === 'indirects' ? 'default' : 'light'}
                    className='px-8'>
                    Nivo 2
                </Button>
                <Button
                    onClick={() => setType(type === 'memberships' ? 'all' : 'memberships')}
                    variant={type === 'memberships' ? 'default' : 'light'}
                    className='px-8'>
                    Premium
                </Button>
                <Button
                    onClick={() => setType(type === 'tst' ? 'all' : 'tst')}
                    variant={type === 'tst' ? 'default' : 'light'}
                    className='px-8'>
                    TST
                </Button>
                <Button
                    onClick={() => clearFilters()}
                    variant={(type === 'all' && nivo === 'all') ? 'default' : 'light'}
                    className='px-12 font-bold'
                >
                    /
                </Button>
            </div>
            {loading
                ? <Skeleton className='w-full h-[96px] bg-primary-light-gray/40'/>
                : <BonusCards data={data.slice(startIndex, endIndex)}/>}
            {!loading &&
            <Pagination
                startIndex={startIndex}
                endIndex={endIndex}
                updateStartIndex={setStartIndex}
                updateEndIndex={setEndIndex}
                pages={pages}
                rowsPerPage={rowsPerPage}
            />}
        </div>
    )
}
