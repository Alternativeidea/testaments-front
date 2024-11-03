'use client'
// React
import Pagination from '@/components/ui/pagination'
import { Skeleton } from '@/components/ui/skeleton'
import { getAdminAllLaters } from '@/lib/services/admin/laters'
import { useEffect, useState } from 'react'
import CalendarButton from '../../ui/calendar-button'
import OrderByButton from '../../ui/order-by-button'
import MembershipCards from './membership-cards'

export default function MembershipCardsManager() {
    const [loading, setLoading] = useState<boolean>()
    const [orderBy, setOrderBy] = useState<boolean>(true)
    const [startDate, setStartDate] = useState<string>('2024-01-01')
    const [endDate, setEndDate] = useState<string>(new Date().toISOString().split('T')[0])
    const [data, setData] = useState([])
    const rowsPerPage = 6
    const [startIndex, setStartIndex] = useState<number>(0)
    const [endIndex, setEndIndex] = useState<number>(rowsPerPage)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const data = await getAdminAllLaters(
                `?orderBy=${orderBy ? '-createdAt' : 'createdAt'}&startAt=${startDate}&endAt=${endDate}&status=2`)
            setData(data)
            setLoading(false)
        }
        fetchData()
    }, [orderBy, startDate, endDate])

    const pages = Math.ceil(data.length / rowsPerPage)

    return (
        <div className='flex flex-col w-full gap-y-2'>
            <div className='flex flex-col-reverse lg:flex-row items-center bg-primary-white justify-between gap-x-2 w-full h-fit px-4'>
                <div className='flex flex-row gap-x-2 items-center py-2'>
                    <p className="hidden lg:block text-h6 font-baskerville pr-4">
                        Članstvo / Verifikacija (V celoti)
                    </p>
                </div>
                <div className="flex gap-x-2">
                    {/* Filter Dates */}
                    <CalendarButton
                        changeStartDate={setStartDate}
                        changeEndDate={setEndDate}
                    />
                    {/* Sort Asc/Desc */}
                    <OrderByButton
                        orderBy={orderBy}
                        changeOrder={setOrderBy}
                    />
                </div>
                <p className="lg:hidden py-2 block text-h6 font-baskerville pr-4">Članstvo / Verifikacija (V celoti)</p>
            </div>
            {loading
                ? <Skeleton className='w-full h-[96px] bg-primary-light-gray/40'/>
                : <MembershipCards data={data.slice(startIndex, endIndex)}/>
            }
            {!loading &&
            <Pagination
                startIndex={startIndex}
                endIndex={endIndex}
                updateStartIndex={setStartIndex}
                updateEndIndex={setEndIndex}
                pages={pages}
                rowsPerPage={rowsPerPage}
            />
            }
        </div>
    )
}
