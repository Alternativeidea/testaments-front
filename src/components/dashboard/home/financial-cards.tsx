import { getRatesToday } from '@/lib/services/rates'
import { RefreshOnInterval } from '../ui/refresh-on-interval'
import TestamentCard from '../ui/testament-card'
import { InvestmentExchangeCards } from './investment-exchange-cards'

interface FinancialCardsProps {
    balance: number
}

export default async function FinancialCards({ balance }: FinancialCardsProps) {
    const { priceBuy, priceSell }: RateProps = await getRatesToday()

    return (
        <div className='grid md:grid-cols-3 gap-4'>
            <TestamentCard
                amount={balance}
                label='BILANCA TESTAMENTOV'
            />
            <InvestmentExchangeCards
                balance={balance}
                priceBuy={Number(priceBuy)}
                priceSell={Number(priceSell)}
            />
            <RefreshOnInterval />
        </div>
    )
}
