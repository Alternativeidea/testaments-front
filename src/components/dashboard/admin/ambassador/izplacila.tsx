// import { getAdminWithdraws } from '@/lib/services/admin/ambassadors'
import IzplacilaGeneralData from './izplacila-general-data'
import WithdrawCardsManager from './withdraw-cards-manager'
import WithdrawCardsManagerSimple from './withdraw-cards-simple'

export default async function Izplacila() {
    // const withdraws = await getAdminWithdraws('?status=1&orderBy=-updatedAt')

    return (
        <div className="flex flex-col w-full pt-6">
            <div className='w-fit'>
                <h3 className='font-baskerville text-h6'>Pregled izplačil</h3>
            </div>
            <IzplacilaGeneralData/>
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
            <div className="flex flex-col gap-y-4 w-full items-start justify-center pt-6">
                {/* <h3 className="font-baskerville text-h6">Oddani zahtevki / Mesečno izplačilo za { format(Date(), 'MMMM', { locale: sl }) }</h3> */}
                {/* <h3 className="font-baskerville text-h6">Izplačila (Oddani zahtevki - v obdelavi)</h3> */}
                {/* <WithdrawCards data={withdraws} className='w-full' limit={10}/> */}
                <WithdrawCardsManagerSimple/>
            </div>
            <WithdrawCardsManager/>
        </div>
    )
}
