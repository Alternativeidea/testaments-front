'use client'
// React
import { useEffect, useState } from 'react'
// Components
import Pagination from '@/components/ui/pagination'
import { Skeleton } from '@/components/ui/skeleton'
// Utils
import { OrderRows } from './order-rows'
import { getAdminOrders } from '@/lib/services/admin/products'

export default function OrdersRowManager({ url }: { url: string }) {
    const [loading, setLoading] = useState<boolean>()
    const [data, setData] = useState([])
    const rowsPerPage = 6
    const [startIndex, setStartIndex] = useState<number>(0)
    const [endIndex, setEndIndex] = useState<number>(rowsPerPage)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const data = await getAdminOrders(
                `${url}`)
            setData(data)
            setLoading(false)
        }
        fetchData()
    }, [url])

    const pages = Math.ceil(data.length / rowsPerPage)

    return (
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
    )
}
