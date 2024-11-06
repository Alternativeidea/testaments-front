import OrdersRowManager from './orders-row-manager'

export default function OrderNotifications() {
    return (
        <div className="w-full flex flex-col gap-y-6 items-center justify-center py-12">
            <div className="flex flex-col gap-y-2 w-full items-start justify-center">
                <h3 className="font-chapaza text-h6">Tržnica (Oddani zahtevki - v obdelavi)</h3>
                <div className='w-full'>
                    <OrdersRowManager url='?status=0'/>
                </div>
            </div>
            <div className="flex flex-col gap-y-4 w-full items-start justify-center">
                <h3 className="font-chapaza text-h6">Tržnica (V celoti)</h3>
                <div className='w-full'>
                    <OrdersRowManager url='?status=1'/>
                </div>
            </div>
        </div>
    )
}
