'use client'
// React
import { useEffect, useState } from 'react'
// Components
import Pagination from '@/components/ui/pagination'
import { Skeleton } from '@/components/ui/skeleton'
// Utils
import TransactionCards from '@/components/dashboard/testaments/transaction-cards'
import { getAdminUserTransactions } from '@/lib/services/admin/transactions'
import { getTransactions } from '@/lib/services/transactions'
import CalendarButton from '../../ui/calendar-button'
import OrderByButton from '../../ui/order-by-button'
import UsersTransactionsCards from './users-transactions-cards'

export default function UserTransactionsManager({ userId, roleId } : {userId : number, roleId: number}) {
    const [loading, setLoading] = useState<boolean>()
    const [transactions, setTransactions] = useState([])
    const [orderBy, setOrderBy] = useState<boolean>(true)
    const [startDate, setStartDate] = useState<string>('2024-01-01')
    const [endDate, setEndDate] = useState<string>(new Date().toISOString().split('T')[0])
    const rowsPerPage = 6
    const [startIndex, setStartIndex] = useState<number>(0)
    const [endIndex, setEndIndex] = useState<number>(rowsPerPage)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            if (roleId === 1) {
                // const allTransactions = await getTransactions(`?startAt=${startDate}&endAt=${endDate}&orderBy=${orderBy ? '-' : ''}updatedAt`)
                const allTransactions = await getTransactions(orderBy, startDate, endDate)
                setTransactions(allTransactions)
            } else {
                const allTransactions = await getAdminUserTransactions(userId, '1,2,3,4', orderBy, startDate, endDate)
                setTransactions(allTransactions)
            }
            setLoading(false)
        }
        fetchData()
    }, [orderBy, startDate, endDate, userId])

    const pages = Math.ceil(transactions.length / rowsPerPage)

    return (
        <div className='flex flex-col w-full gap-y-2 py-8'>
            <div className='flex items-center bg-primary-white justify-between gap-x-2 w-full h-fit  py-2'>
                <div className='flex gap-x-2 items-center py-2'>
                    <p className="text-h6 font-baskerville pr-4">TST transakcije</p>
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
            </div>
            {loading
                ? <div className='flex flex-col gap-y-2'>
                    {[...Array(rowsPerPage)].map((_, index) => (
                        <Skeleton key={index} className='w-full h-[96px] bg-primary-light-gray/40'/>
                    ))}
                </div>
                : roleId === 1
                    ? <TransactionCards data={transactions.slice(startIndex, endIndex)}/>
                    : <UsersTransactionsCards data={transactions.slice(startIndex, endIndex)}/>
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
