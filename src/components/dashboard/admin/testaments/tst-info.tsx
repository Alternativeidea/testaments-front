// Components
import InvestmentCard from '../../ui/investment-card'
import TestamentCard from '../../ui/testament-card'
import TstSummary from './tst-summary'
import TstTransactionsManager from './tst-transactions-manager'
// Utils
import { getAllTstSummary } from '@/lib/services/admin/transactions'
import { getRatesToday } from '@/lib/services/rates'

export default async function TstInfo() {
    const { totalBuy } = await getAllTstSummary()
    const { priceBuy }: RateProps = await getRatesToday()

    return (
        <div className='flex flex-col w-full gap-6'>
            <div className='flex flex-col w-full items-center gap-4'>
                <h3 className="w-full font-baskerville text-primary-dark-gray text-h6 ">Vsi testamenti v obtoku</h3>
                <div className='grid md:grid-cols-2 gap-4 w-full'>
                    <TestamentCard
                        amount={totalBuy || 0}
                        label='TESTAMENTI V OBTOKU'
                    />
                    <InvestmentCard
                        amount={Number(totalBuy) * Number(priceBuy)}
                        amountLabelBlack='TST = 1g zlata'
                    />
                </div>
            </div>
            {/* Summary Tabs */}
            <TstSummary/>
            {/* Transactions */}
            <TstTransactionsManager/>
        </div>
    )
}
