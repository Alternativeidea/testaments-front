'use client'
// React
import { useEffect, useState } from 'react'
// Components
import { Button } from '@/components/ui/button'
import Pagination from '@/components/ui/pagination'
import { Skeleton } from '@/components/ui/skeleton'
import CalendarButton from '../ui/calendar-button'
import TstTransactionsCards from './tst-transaction-cards'
// Utils
import { getAdminAllTransactions } from '@/lib/services/admin/transactions'
import OrderByButton from '../ui/order-by-button'

export default function TstTransactionsManager() {
    const [loading, setLoading] = useState<boolean>()
    const [transactions, setTransactions] = useState([])
    // const [allTst, setAllTst] = useState<boolean>(false)
    const [allTst, setAllTst] = useState<string>('0,3')
    const [orderBy, setOrderBy] = useState<boolean>(false)
    const [startDate, setStartDate] = useState<string>('2023-01-01')
    const date = new Date()
    date.setDate(date.getDate() + 1)
    const [endDate, setEndDate] = useState<string>(date.toISOString().split('T')[0])
    const rowsPerPage = 6
    const [startIndex, setStartIndex] = useState<number>(0)
    const [endIndex, setEndIndex] = useState<number>(rowsPerPage)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const data = await getAdminAllTransactions(allTst, orderBy, startDate, endDate)
            setTransactions(data)
            setStartIndex(0)
            setEndIndex(rowsPerPage)
            setLoading(false)
        }
        fetchData()
    }, [allTst, orderBy, startDate, endDate])

    const pages = Math.ceil(transactions.length / rowsPerPage)

    return (
        <div className='flex flex-col w-full gap-y-2'>
            <div className='flex flex-col-reverse lg:flex-row items-center bg-primary-white justify-between gap-x-2 w-full h-fit px-4'>
                <div className='flex flex-row gap-x-2 items-center py-2'>
                    <p className="hidden lg:block text-h6 font-baskerville pr-4">TST transakcije</p>
                    {/* In treatment */}
                    <Button
                        onClick={() => setAllTst('0,3')}
                        variant={allTst === '0,3' ? 'default' : 'light'}
                    >
                        V obdelavi
                    </Button>
                    <Button
                        onClick={() => setAllTst('2,5')}
                        variant={allTst === '2,5' ? 'default' : 'light'}
                    >
                        Preklicano
                    </Button>
                    {/* All Tst's */}
                    <Button
                        onClick={() => setAllTst('1,2,3,4,5')}
                        variant={allTst === '1,2,3,4,5' ? 'default' : 'light'}
                    >
                        Vse transakcije
                    </Button>
                </div>
                <div className="flex gap-x-2">
                    {/* Search Bar */}
                    {/* <Button variant='light' className='bg-primary-light-gray border-none'>
                        <Search/>
                    </Button> */}
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
                <p className="lg:hidden py-2 block text-h6 font-baskerville pr-4">TST transakcije</p>
            </div>
            {loading
                ? <Skeleton className='w-full h-[96px] bg-primary-light-gray/40'/>
                : <TstTransactionsCards data={transactions.slice(startIndex, endIndex)}/>
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
