'use client'
// React
import { useEffect, useState } from 'react'
// Components
import TestamentCard from '@/components/dashboard/ui/testament-card'
import { Skeleton } from '@/components/ui/skeleton'
import InvestmentCard from '../../../ui/investment-card'
import TstManualActions from './tst-manual-actions'
import UserTransactionsManager from './user-transactions-manager'
import UsersTransactionsCards from './users-transactions-cards'
// Utils
import { getAdminUserTransactions } from '@/lib/services/admin/transactions'
import { getUser } from '@/lib/services/admin/users'
import { getRatesToday } from '@/lib/services/rates'

export default function UsersTst({ userId }: { userId: number }) {
    const [loading, setLoading] = useState<boolean>(true)
    const [userData, setUserData] = useState<Partial<ProfileProps>>({})
    const [userTransactions, setUserTransactions] = useState([])
    const [goldPrice, setGoldPrice] = useState<number>(0)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const date = new Date()
            date.setDate(date.getDate() + 1)
            const transactions = await getAdminUserTransactions(userId, '0', true, '2023-01-01', date.toISOString().split('T')[0])
            const data = await getUser(userId)
            const { priceBuy }: RateProps = await getRatesToday()
            setGoldPrice(parseInt(priceBuy))
            setUserData(data)
            setUserTransactions(transactions)
            setLoading(false)
        }

        fetchData()
    }, [userId])

    const { balance } = userData

    return (
        <div className='flex flex-col gap-y-2 w-full'>
            <div className='grid md:grid-cols-2 gap-4'>
                <TestamentCard
                    amount={balance ? Number(balance) : 0}
                    label='BILANCA TESTAMENTOV'
                />
                <InvestmentCard
                    amount={(balance ? Number(balance) : 0) * goldPrice}
                    amountLabelBlack='TST = 1g zlata'
                />
            </div>
            {/* Buttons to send/buy tst manually  */}
            <TstManualActions id={Number(userId)}/>
            {/* Transactions */}
            <div className='flex flex-col items-center lg:items-start w-full gap-y-2'>
                {loading
                    ? <div className='flex flex-col gap-y-2 w-full py-4'>
                        <Skeleton className='w-full h-[28px] bg-primary-light-gray/40'/>
                        <Skeleton className='w-full h-[96px] bg-primary-light-gray/40'/>
                    </div>
                    : <div className='flex flex-col gap-y-2 w-full'>
                        <p className="text-h6 font-baskerville pt-6">Oddani zahtevki - v obdelavi</p>
                        <UsersTransactionsCards className='w-full' data={userTransactions} />
                    </div>
                }
            </div>
            <div className='flex flex-col items-center lg:items-start w-full gap-y-2'>
                {loading
                    ? <div className='flex flex-col gap-y-2 w-full py-4'>
                        <Skeleton className='w-full h-[28px] bg-primary-light-gray/40'/>
                        <Skeleton className='w-full h-[96px] bg-primary-light-gray/40'/>
                    </div>
                    : <UserTransactionsManager userId={userId} roleId={2}/>}
            </div>
        </div>
    )
}
