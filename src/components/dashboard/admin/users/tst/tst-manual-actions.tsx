import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet'
import UserManualForm from './user-manual-form'

export default function TstManualActions({ id } : {id: number}) {
    return (
        <div className="flex w-full lg:items-center lg:justify-center gap-4 overflow-x-scroll no-scrollbar">
            <Sheet>
                <SheetTrigger asChild>
                    <Button className="flex gap-x-4 items-center min-w-[260px]">
                        <Icons.Plus />
                        <p className="">
                        Dodaj testamente
                        </p>
                    </Button>
                </SheetTrigger>
                <SheetContent className='flex flex-col w-full lg:!max-w-[420px] min-h-full p-0 overflow-y-scroll no-scrollbar'>
                    <SheetHeader className='flex items-start w-full shadow-button py-8'>
                        <p className="pl-4 text-h6 font-baskerville max-w-[90%]">Oddani zahtevki - v obdelavi</p>
                    </SheetHeader>
                    <div className='px-6'>
                        <UserManualForm buy={true} id={id}/>
                    </div>
                </SheetContent>
            </Sheet>
            <Sheet>
                <SheetTrigger asChild>
                    <Button className="flex gap-x-4 items-center min-w-[260px]">
                        <Icons.ArrowDownCircle />
                        <p className="">
                            Vračilo testamentov
                        </p>
                    </Button>
                </SheetTrigger>
                <SheetContent className='flex flex-col w-full lg:!max-w-[420px] min-h-full p-0 overflow-y-scroll no-scrollbar'>
                    <SheetHeader className='flex items-start w-full shadow-button py-8'>
                        <p className="pl-4 text-h6 font-baskerville">Oddani zahtevki - v obdelavi</p>
                    </SheetHeader>
                    <div className='px-6'>
                        <UserManualForm buy={false} id={id}/>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}
