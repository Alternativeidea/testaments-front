'use client'
// React
import { useEffect, useState } from 'react'
// Components
import Pagination from '@/components/ui/pagination'
import { Skeleton } from '@/components/ui/skeleton'
// Utils
import { getAdminWithdraws } from '@/lib/services/admin/ambassadors'
import CalendarButton from '../ui/calendar-button'
import OrderByButton from '../ui/order-by-button'
import WithdrawCards from './withdraw-cards'

export default function WithdrawCardsManagerSimple() {
    const [loading, setLoading] = useState<boolean>()
    const [data, setData] = useState([])
    const [startDate, setStartDate] = useState<string>('2023-01-01')
    const date = new Date()
    date.setDate(date.getDate() + 1)
    const [endDate, setEndDate] = useState<string>(date.toISOString().split('T')[0])
    const rowsPerPage = 6
    const [startIndex, setStartIndex] = useState<number>(0)
    const [endIndex, setEndIndex] = useState<number>(rowsPerPage)
    const [orderBy, setOrderBy] = useState<boolean>(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            let data = await getAdminWithdraws(
                `?status=1&startAt=${startDate}&endAt=${endDate}&orderBy=-createdAt`
            )
            if (orderBy) {
                data = await data.reverse()
            }
            setData(data)
            setLoading(false)
        }
        fetchData()
    }, [endDate, startDate, orderBy])

    const pages = Math.ceil(data.length / rowsPerPage)

    return (
        <div className='flex flex-col w-full gap-y-2 pt-6'>
            <div className='flex flex-col-reverse lg:flex-row items-center bg-primary-white justify-between gap-x-2 w-full h-fit px-4'>
                <div className='flex flex-row gap-x-2 items-center py-2'>
                    <p className="hidden lg:block text-h6 font-baskerville pr-4">Izplačila (Oddani zahtevki - v obdelavi)</p>
                </div>
                <div className="flex gap-x-2 justify-between lg:w-fit w-full">
                    <p className="lg:hidden py-2 block text-h6 font-baskerville pr-4">Izplačila (Oddani zahtevki - v obdelavi)</p>
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
            {loading
                ? <Skeleton className='w-full h-[96px] bg-primary-light-gray/40'/>
                : <WithdrawCards data={data.slice(startIndex, endIndex)}/>}
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
