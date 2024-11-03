'use client'

import { create } from 'zustand'
import InvestmentCard from '../ui/investment-card'
import ExchangeCard from './exchange-card'

interface InvestmentExchengeStoreProps {
    isBuy: boolean
    setIsBuy: (v: boolean) => void
}

export const useInvestmentExchengeState = create<InvestmentExchengeStoreProps>()((set) => ({
    isBuy: false,
    setIsBuy: (v) => set(() => ({ isBuy: v }))
}))

interface InvestmentExchangeCardsProps {
    balance: number
    priceBuy: number
    priceSell: number
}

export function InvestmentExchangeCards({ balance, priceBuy, priceSell }: InvestmentExchangeCardsProps) {
    const isBuy = useInvestmentExchengeState(s => s.isBuy)

    return (
        <>
            <InvestmentCard
                amount={isBuy ? balance * priceBuy : balance * priceSell}
                amountLabelBlack='TST = 1g zlata'
            />
            <ExchangeCard/>
        </>
    )
}
