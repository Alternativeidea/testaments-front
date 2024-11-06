'use client'
// React
import { useEffect, useState } from 'react'
// Components
import Pagination from '@/components/ui/pagination'
import { Skeleton } from '@/components/ui/skeleton'
// Utils
import { getAdminOrders } from '@/lib/services/admin/products'
import CalendarButton from '../../ui/calendar-button'
import OrderByButton from '../../ui/order-by-button'
import { OrderRows } from './order-rows'

export default function OrdersRowManager({ url }: { url: string }) {
    const [loading, setLoading] = useState<boolean>()
    const [data, setData] = useState([])
    const [startDate, setStartDate] = useState<string>('2023-01-01')
    const date = new Date()
    date.setDate(date.getDate() + 1)
    const [endDate, setEndDate] = useState<string>(date.toISOString().split('T')[0])
    const [orderBy, setOrderBy] = useState<boolean>(false)

    const rowsPerPage = 6
    const [startIndex, setStartIndex] = useState<number>(0)
    const [endIndex, setEndIndex] = useState<number>(rowsPerPage)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const data = await getAdminOrders(
                `${url}` + `&startAt=${startDate}&endAt=${endDate}` + `&orderBy=${orderBy ? 'updatedAt' : '-updatedAt'}`)
            setData(data)
            setLoading(false)
        }
        fetchData()
    }, [url, startDate, endDate, orderBy])

    const pages = Math.ceil(data.length / rowsPerPage)

    return (
        <div>
            <div className="flex gap-x-2 right items-end justify-end w-full">
                <p className="lg:hidden py-2 block text-h6 font-baskerville pr-4">Vsa izplačila</p>
                {/* Filter Dates */}
                <OrderByButton
                    orderBy={orderBy}
                    changeOrder={setOrderBy}/>
                <CalendarButton
                    changeStartDate={setStartDate}
                    changeEndDate={setEndDate}
                />
            </div>
            <div className='flex flex-col w-full gap-y-2 lg:min-h-[700px] overflow-hidden relative'>
                {loading
                    ? <div className='flex flex-col gap-y-2'>
                        {Array(6).fill(
                            <Skeleton className='w-full h-[96px] bg-primary-light-gray/40'/>
                        )}
                    </div>
                    : <OrderRows data={data.slice(startIndex, endIndex)}/>
                }
                {!loading &&
                <div className='lg:absolute bottom-0 w-full mx-auto'>
                    <Pagination
                        startIndex={startIndex}
                        endIndex={endIndex}
                        updateStartIndex={setStartIndex}
                        updateEndIndex={setEndIndex}
                        pages={pages}
                        rowsPerPage={rowsPerPage}
                    />
                </div>
                }
            </div>
        </div>
    )
}
