// import { getAdminAllTickets } from '@/lib/services/admin/tickets'
// import TicketCards from './ticket-cards'
import TicketsCardsManager from './tickets-cards-manager'

export default async function TicketNotifications() {
    // const tickets = await getAdminAllTickets('?status=0&orderBy=updatedAt')
    return (
        <div className="w-full flex flex-col gap-y-6 items-center justify-center py-12">
            <div className="flex flex-col gap-y-4 w-full items-start justify-center">
                <h3 className="font-baskerville text-h6">Podpora (Oddani zahtevki - v obdelavi)</h3>
                {/* <TicketCards data={tickets} className='w-full' limit={5}/> */}
                <TicketsCardsManager status={'0'} filters={true}/>
            </div>
            <div className="flex flex-col gap-y-4 w-full items-start justify-center">
                <h3 className="font-baskerville text-h6">Podpora (V celoti)</h3>
                <TicketsCardsManager status={undefined}filters={true}/>
            </div>
        </div>
    )
}
