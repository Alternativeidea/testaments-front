// import { getWithdraws } from '@/lib/services/ambassadors'
import BonusCardManager from './bonuses-cards-manager'
import PrometGeneralData from './promet-general-data'
// import WithdrawCards from './withdraw-cards'

export default async function Promet() {
    // const withdraws = await getWithdraws('?status=0')
    return (
        <div className="flex flex-col w-full pt-6">
            <div className='w-fit'>
                <h3 className='font-baskerville text-h6'>Pregled prometa</h3>
            </div>
            <PrometGeneralData/>
            {/* <Card className='flex flex-col items-start justify-center border-none bg-primary-light-gray/20 mt-4 w-full gap-y-4 py-8 px-10'>
                <div className='w-fit'>
                    <h3 className='font-baskerville text-h6'>Obdobje mesečnega izplačila</h3>
                </div>
                <div className='flex gap-6 items-start justify-center w-full'>
                    <div className='flex flex-col gap-y-2 items-start justify-center w-full'>
                        <Label>Skupaj EUR / Mesečno izplačilo (danes)</Label>
                        <Input className='w-full' placeholder={`${ambassadorsCount.count}`} readOnly/>
                    </div>
                    <div className='flex flex-col gap-y-2 items-start justify-center w-full'>
                        <Label>Uspešni zahtevki / Količina</Label>
                        <Input className='w-full' placeholder={`${ambassadorsCount.count}`} readOnly/>
                    </div>
                </div>
            </Card> */}
            {/* <div className="flex flex-col gap-y-4 w-full items-start justify-center pt-6">
                <h3 className="font-baskerville text-h6">Oddani zahtevki / Mesečno izplačilo za Julij</h3>
                <WithdrawCards data={withdraws} className='w-full' limit={5}/>
            </div> */}
            <BonusCardManager/>
        </div>
    )
}
