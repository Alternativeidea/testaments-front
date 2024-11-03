import { Card } from '@/components/ui/card'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { SECTION_STORAGE } from '@/lib/constants/sections'
import { getAdminMessages } from '@/lib/services/admin/banners'
import EditSheet from './edit-sheet'
import SwitchButton from './switch-button'

export default async function StorageConfig() {
    const data = await getAdminMessages(`?section=${SECTION_STORAGE}`)
    const message = data[0]

    return (
        <section className="flex flex-col gap-y-4 py-6 w-full">
            <div className="flex flex-col gap-2 md:flex-row w-full justify-center md:justify-between items-center">
                <h3 className="text-h6 font-baskerville">Naslovno sporočilo</h3>
                <SwitchButton active={message.active} id={message.id}/>
            </div>
            <Card className='flex flex-col items-center gap-x-3 bg-primary-light-gray/20 p-6 border-none'>
                <div className="flex flex-col gap-2 lg:flex-row w-full justify-center lg:justify-between items-start py-2">
                    <p className='font-baskerville text-h6'>
                        {message.title}
                    </p>
                    <Sheet>
                        <SheetTrigger>
                            <p className='text-gradient-gold text-h6 font-baskerville'>Uredi</p>
                        </SheetTrigger>
                        <SheetContent className='w-full lg:!max-w-[420px] h-full p-0'>
                            <EditSheet id={message.id} title={message.title} content={message.content}/>
                        </SheetContent>
                    </Sheet>
                </div>
                <div className='flex items-start justify-start w-full'>
                    {message.content}
                </div>
            </Card>
        </section>
    )
}
