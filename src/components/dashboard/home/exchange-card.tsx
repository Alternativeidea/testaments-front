'use client'
import { Icons } from '@/components/ui/icons'
import { getRatesToday } from '@/lib/services/rates'
import { useEffect, useState } from 'react'
import InvestmentCard from '../ui/investment-card'
import { ChartProps } from '../ui/real-chart'
import { useInvestmentExchengeState } from './investment-exchange-cards'

export default function ExchangeCard() {
    const [goldValue, setGoldValue] = useState<number>(0)
    const [chartData, setChartData] = useState<ChartProps[]>()
    const isBuy = useInvestmentExchengeState(s => s.isBuy)
    const setIsBuy = useInvestmentExchengeState(s => s.setIsBuy)

    useEffect(() => {
        const loadingChart = [
            {
                time: '',
                cena: 0
            },
            {
                time: '',
                cena: 0
            },
            {
                time: '',
                cena: 0
            },
            {
                time: '',
                cena: 0
            }
        ]
        setChartData(loadingChart)
        const fetchData = async () => {
            const { priceBuy, priceSell }: RateProps = await getRatesToday()
            setChartData([
                { time: '', cena: 4.738461214847142 },
                { time: '', cena: 8.888374455217464 },
                { time: '', cena: 12.02965036455855 },
                { time: '', cena: 10.132628606680884 },
                { time: '', cena: 8.714958556229425 },
                { time: '', cena: 9.203537465996202 },
                { time: '', cena: 12.020806881185203 }
            ])
            setGoldValue(isBuy ? Number(priceBuy) : Number(priceSell))
        }

        fetchData()
    }, [isBuy])

    return (
        <InvestmentCard
            amount={goldValue}
            amountLabelBlack={`${isBuy ? 'ODKUPNI TEČAJ' : 'NAKUPNI TEČAJ'} TST / EUR`}
            amountLabelNormal='(DANES)'
            data={chartData}
            icon={
                <div
                    onClick={() => setIsBuy(!isBuy)}
                    className='w-full h-full cursor-pointer z-10'>
                    <Icons.Exchange
                        className='cursor-pointer w-6 h-6 ml-auto mr-4 mb-auto mt-4'
                    />
                </div>
            }
        />
    )
}
