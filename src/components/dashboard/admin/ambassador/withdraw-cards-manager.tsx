'use client'
// React
import { useEffect, useState } from 'react'
// Components
import Pagination from '@/components/ui/pagination'
import { Skeleton } from '@/components/ui/skeleton'
// Utils
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { getAdminWithdraws } from '@/lib/services/admin/ambassadors'
import CalendarButton from '../ui/calendar-button'
import OrderByButton from '../ui/order-by-button'
import WithdrawCards from './withdraw-cards'

export default function WithdrawCardsManager() {
    const [loading, setLoading] = useState<boolean>()
    const [data, setData] = useState([])
    const [startDate, setStartDate] = useState<string>('2023-01-01')
    const date = new Date()
    date.setDate(date.getDate() + 1)
    const [endDate, setEndDate] = useState<string>(date.toISOString().split('T')[0])
    const rowsPerPage = 6
    const [startIndex, setStartIndex] = useState<number>(0)
    const [endIndex, setEndIndex] = useState<number>(rowsPerPage)
    const [status, setStatus] = useState<string>('1,2,3')
    const [orderBy, setOrderBy] = useState<boolean>(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            let data = await getAdminWithdraws(
                `?status=${status}&startAt=${startDate}&endAt=${endDate}&orderBy=-createdAt`
            )
            if (orderBy) {
                data = await data.reverse()
            }
            setData(data)
            setLoading(false)
        }
        fetchData()
    }, [endDate, startDate, status, orderBy])

    const pages = Math.ceil(data.length / rowsPerPage)
    const [disable, setDisable] = useState<boolean>(false)

    const handleClick = async () => {
        try {
            setDisable(true)
            const data = await getAdminWithdraws(`?status=${status}&startAt=${startDate}&endAt=${endDate}&csv=true`)
            console.log(data.url)
            window.open(data.url, '_blank', 'noopener,noreferrer')
            setDisable(false)
        } catch (err) {
            console.log(err)
            setDisable(false)
        }
    }

    return (
        <div className='flex flex-col w-full gap-y-2 pt-6'>
            <div className='flex flex-col-reverse lg:flex-row items-center bg-primary-white justify-between gap-x-2 w-full h-fit px-4'>
                <div className='flex flex-row gap-x-2 items-center py-2'>
                    <p className="hidden lg:block text-h6 font-baskerville pr-4">Vsa izplačila</p>
                </div>
                <div className="flex gap-x-2 justify-between lg:w-fit w-full">
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
            </div>
            <div className='flex gap-x-2 py-2 overflow-scroll lg:overflow-hidden gap-2 snap-x snap-mandatory pl-0 justify-between'>
                <div>
                    <Button
                        onClick={() => setStatus('2')}
                        className='px-12'
                        variant={status === '2' ? 'default' : 'light'}
                    >
                    Končano
                    </Button>
                    <Button
                        onClick={() => setStatus('1')}
                        className='px-12'
                        variant={status === '1' ? 'default' : 'light'}
                    >
                    V obdelavi
                    </Button>
                    <Button
                        onClick={() => setStatus('3')}
                        className='px-12'
                        variant={status === '3' ? 'default' : 'light'}
                    >
                    Zavrnjeno
                    </Button>
                    <Button
                        onClick={() => setStatus('1,2,3')}
                        variant={status === '1,2,3' ? 'default' : 'light'}
                        className='px-12 font-bold'
                    >
                    /
                    </Button>
                </div>
                <div className='flex gap-x-2 h-full'>
                    <Button
                        className='flex justify-between items-center gap-x-2'
                        onClick={handleClick}
                        disabled={disable}
                    >
                        <Icons.ArrowUpCircle/>
                        <p className=''>Izvozi CSV</p>
                    </Button>
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
