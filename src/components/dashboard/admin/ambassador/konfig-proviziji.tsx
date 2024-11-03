import { Card } from '@/components/ui/card'
import { getCurrentBonusesRates } from '@/lib/services/admin/ambassadors'
import BonusRatesForm from './bonus-rates-form'
import BonusesRatesManager from './bonuses-rates-manager'

export default async function KonfigProvizij() {
    const bonuses: BonusRatesProps[] = await getCurrentBonusesRates()
    const premium: BonusRatesProps | undefined = bonuses.find(bonus => bonus.type === 'premium')
    const tst: BonusRatesProps | undefined = bonuses.find(bonus => bonus.type === 'tst')

    return (
        <div className="flex w-full flex-col overflow-hidden pt-6">
            <div className='w-fit'>
                <h3 className='font-baskerville text-h6'>Konfigurator provizij</h3>
            </div>
            <p className='pb-2 pt-6 font-baskerville text-body-big'>Koeficient danes</p>
            <div className='grid w-full gap-4 md:grid-cols-2'>
                <Card className='border-none bg-primary-light-gray/20 p-4'>
                    <div className='flex w-full flex-col items-center justify-between gap-y-4 py-8 lg:flex-row'>
                        <p>Provizija: <b>Premium</b></p>
                        <div className='flex flex-col justify-end'>
                            <p className='flex gap-x-2'>Koeficient provizije <span className='font-semibold text-primary-medium-gray/60'>1. Nivoja</span><b>+{(premium?.direct ?? 0) * 100}%</b></p>
                            <p className='flex gap-x-2'>Koeficient provizije <span className='font-semibold text-primary-medium-gray/60'>2. Nivoja</span><b>+{(premium?.indirect ?? 0) * 100}%</b></p>
                        </div>
                    </div>
                    <BonusRatesForm formType='premium'/>
                </Card>
                <Card className='border-none bg-primary-light-gray/20 p-4'>
                    <div className='flex w-full flex-col items-center justify-between gap-y-4 py-8 lg:flex-row'>
                        <p>Provizija: <b>Dodaj TST</b></p>
                        <div className='flex flex-col justify-end'>
                            <p className='flex gap-x-2'>Koeficient provizije <span className='font-semibold text-primary-medium-gray/60'>1. Nivoja</span><b>+{(tst?.direct ?? 0) * 100}%</b></p>
                            <p className='flex gap-x-2'>Koeficient provizije <span className='font-semibold text-primary-medium-gray/60'>2. Nivoja</span><b>+{(tst?.indirect ?? 0) * 100}%</b></p>
                        </div>
                    </div>
                    <BonusRatesForm formType='tst' />
                </Card>
            </div>
            <BonusesRatesManager/>
        </div>
    )
}
