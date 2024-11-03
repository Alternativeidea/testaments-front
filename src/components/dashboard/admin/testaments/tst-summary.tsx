'use client'
// React
import { useEffect, useState } from 'react'
// Components
import TstSummaryCard from './tst-summary-card'
// Utils
import { getTstSummary } from '@/lib/services/admin/transactions'
import { addDays } from 'date-fns'
import CalendarButton from '../ui/calendar-button'
import TabComponent from '../ui/tab-component'

interface TradeData {
    averageBuy: number
    averageSell: number
    averageShared: number
    id: number
    total: number
    totalBuy: number
    totalBuyAccepted: number
    totalCountBuy: number
    totalCountSell: number
    totalCountShared: number
    totalSell: number
    totalSellAccepted: number
    totalShared: number
    totalSharedAccepted: number
    feeCosts: number
}

export default function TstSummary() {
    const [loading, setLoading] = useState<boolean>(false)
    const [startDate, setStartDate] = useState<string>('2024-01-01')
    const [endDate, setEndDate] = useState<string>(addDays(new Date(), 1).toISOString().split('T')[0])
    const [summaryData, setSummaryData] = useState<TradeData>({
        averageBuy: 0,
        averageSell: 0,
        averageShared: 0,
        id: 0,
        total: 0,
        totalBuy: 0,
        totalBuyAccepted: 0,
        totalCountBuy: 0,
        totalCountSell: 0,
        totalCountShared: 0,
        totalSell: 0,
        totalSellAccepted: 0,
        totalShared: 0,
        totalSharedAccepted: 0,
        feeCosts: 0
    })

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const data = await getTstSummary(startDate, endDate)
            setSummaryData(data)
            setLoading(false)
        }

        fetchData()
    }, [startDate, endDate])

    const { totalBuy, totalSell, totalShared, averageBuy, averageSell, averageShared, totalBuyAccepted, totalSellAccepted, totalSharedAccepted, feeCosts } = summaryData

    const tabs = [
        {
            value: 'add',
            title: 'Dodajanje',
            content: <TstSummaryCard
                loading={loading}
                average={averageBuy}
                total={totalBuy}
                quantity={totalBuyAccepted}
            />
        },
        {
            value: 'refund',
            title: 'Vračilo',
            content: <TstSummaryCard
                loading={loading}
                average={averageSell}
                total={totalSell}
                quantity={totalSellAccepted}
            />
        },
        {
            value: 'ship',
            title: 'Pošiljanje',
            content: <TstSummaryCard
                loading={loading}
                average={averageShared}
                total={totalShared}
                quantity={totalSharedAccepted}
                feeCost={feeCosts}
            />
        }
    ]

    return (
        <div>
            <TabComponent title='Promet testamentov' defaultValue='add' tabs={tabs}>
                <CalendarButton changeStartDate={setStartDate} changeEndDate={setEndDate}/>
            </TabComponent>
        </div>
    )
}
