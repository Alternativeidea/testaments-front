'use client'
// React
import { useEffect, useState } from 'react'
// Components
import Pagination from '@/components/ui/pagination'
import { Skeleton } from '@/components/ui/skeleton'
// Utils
import { Button } from '@/components/ui/button'
import { getBonusesRates } from '@/lib/services/admin/ambassadors'
import CalendarButton from '../ui/calendar-button'
import BonusRatesCards from './bonus-rates-cards'

export default function BonusesRatesManager() {
    const [loading, setLoading] = useState<boolean>()
    const [data, setData] = useState([])
    // const today = new Date()
    // const pastDate = new Date(today.setFullYear(today.getFullYear() - 1))
    const [startDate, setStartDate] = useState<string>('2023-01-01')
    const date = new Date()
    date.setDate(date.getDate() + 1)
    const [endDate, setEndDate] = useState<string>(date.toISOString().split('T')[0])
    const rowsPerPage = 6
    const [startIndex, setStartIndex] = useState<number>(0)
    const [endIndex, setEndIndex] = useState<number>(rowsPerPage)
    const [filterByType, setFilterByType] = useState<'tst' | 'premium' | 'all'>('all')
    // const [status, setStatus] = useState<string>('1,2,3')

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const data = await getBonusesRates(
                `?startAt=${startDate}&endAt=${endDate}&orderBy=-createdAt&type=${filterByType}`)
            setData(data)
            setLoading(false)
        }
        fetchData()
    }, [endDate, startDate, filterByType])

    const pages = Math.ceil(data.length / rowsPerPage)

    return (
        <div className='flex w-full flex-col gap-y-2 pt-6'>
            <div className='flex h-fit w-full flex-col-reverse items-center justify-between gap-x-2 bg-primary-white px-4 lg:flex-row'>
                <div className='flex flex-row items-center gap-x-4 py-2'>
                    <p className="hidden pr-4 font-baskerville text-h6 lg:block">Zgodovina Koeficienta provizije</p>
                    {/* Filter Buttons */}
                    <div className='flex gap-1'>
                        <Button
                            variant={'outline'}
                            onClick={() => setFilterByType('premium')} className={filterByType === 'premium' ? 'bg-primary text-primary-white' : ''}
                        >
                            Premium
                        </Button>
                        <Button
                            variant={'outline'}
                            onClick={() => setFilterByType('tst')} className={filterByType === 'tst' ? 'bg-primary text-primary-white' : ''}
                        >
                            Dodaj TST
                        </Button>
                        <Button
                            variant={'outline'}
                            onClick={() => setFilterByType('all')} className={`min-w-[100px] ${filterByType === 'all' ? 'bg-primary text-primary-white' : ''}`}
                        >
                            /
                        </Button>
                    </div>
                </div>
                <div className="flex w-full justify-between gap-x-2 lg:w-fit">
                    <p className="block py-2 pr-4 font-baskerville text-h6 lg:hidden">Zgodovina Koeficienta provizije</p>
                    {/* Filter Dates */}
                    <CalendarButton
                        changeStartDate={setStartDate}
                        changeEndDate={setEndDate}
                    />
                </div>
            </div>
            {loading
                ? <Skeleton className='h-[96px] w-full bg-primary-light-gray/40'/>
                : <BonusRatesCards data={data.slice(startIndex, endIndex)} limit={rowsPerPage} type={filterByType === 'all' ? undefined : filterByType}/>
            }
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
