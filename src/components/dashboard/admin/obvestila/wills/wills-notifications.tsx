// import { getAdminWills } from '@/lib/services/admin/wills'
import WillsCardsManager from './wills-cards-manager'
// import WillsRows from './wills-rows'

export default async function WillsNotifications() {
    // const wills = await getAdminWills('?status=3')
    return (
        <div className="w-full flex flex-col gap-y-6 items-center justify-center py-12">
            <div className="flex flex-col gap-y-4 w-full items-start justify-center">
                <h3 className="font-baskerville text-h6">Oporoke (Sestanek - Kreacija ali urjejanje oporoke)</h3>
                {/* <WillsRows className='w-full' data={wills} limit={10}/> */}
                <WillsCardsManager status='3' filters={false}/>
            </div>
            <div className="flex flex-col gap-y-4 w-full items-start justify-center mt-4">
                <h3 className="font-baskerville text-h6">Oporoke (Oddani zahtevki - v obdelavi)</h3>
                <WillsCardsManager status='0,1,2' filters={true}/>
            </div>
        </div>
    )
}
