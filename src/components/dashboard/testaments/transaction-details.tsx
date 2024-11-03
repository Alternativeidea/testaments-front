import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from '@/components/ui/sheet'
import { formatDate } from '@/lib/utils/date'
import { getPoslanoLabel } from '@/lib/utils/format'

export default function TransactionDetails({ id, to, reference, type, status, quantity, createdAt, updatedAt, toUserId, cuId, user }: TransactionProps) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className='w-full '>
                    Poglej več
                </Button>
            </SheetTrigger>
            <SheetContent className='w-full lg:!max-w-[420px] h-full p-0'>
                <SheetHeader className='flex items-start w-full shadow-button py-8'>
                    <p className="pl-4 text-h6 font-baskerville">Podrobnosti transakcije</p>
                </SheetHeader>
                <div className='flex flex-col gap-y-4 px-8 py-8'>
                    <div className='flex justify-between'>
                        <p>ID TRANSAKCIJE</p>
                        <p className='capitalize font-bold'>{id}</p>
                    </div>
                    <Separator className='mb-5 bg-primary-light-gray w-full h-[1px]' />
                    <div className='flex justify-between'>
                        <p>REFERENCA</p>
                        <p className='capitalize font-bold'>{reference || '-'}</p>
                    </div>
                    <Separator className='mb-5 bg-primary-light-gray w-full h-[1px]' />
                    <div className='flex justify-between'>
                        <p>TIP TRANSAKCIJE</p>
                        <p className='capitalize font-bold'>
                            { getPoslanoLabel(type ?? '0', toUserId === cuId, status) }
                        </p>
                    </div>
                    <Separator className='mb-5 bg-primary-light-gray w-full h-[1px]' />
                    <div className='flex justify-between'>
                        <p>STATUS</p>
                        <p className='capitalize font-bold'>
                            {status === undefined || status === null
                                ? ' - '
                                : status.toString() === '0' || status.toString() === '3'
                                    ? 'V obdelavi'
                                    : 'Končano'}
                        </p>
                    </div>
                    <Separator className='mb-5 bg-primary-light-gray w-full h-[1px]' />
                    <div className='flex justify-between'>
                        <p>DATUM ZAHTEVKA</p>
                        <p className='capitalize font-bold'>{createdAt ? formatDate(createdAt) : '-'}</p>
                    </div>
                    <Separator className='mb-5 bg-primary-light-gray w-full h-[1px]' />
                    <div className='flex justify-between'>
                        <p>DATUM OBDELAVE</p>
                        <p className='capitalize font-bold'>{(status.toString() === '1' || status.toString() === '2' || status.toString() === '4' || status.toString() === '5') ? formatDate(updatedAt) : '-'}</p>
                    </div>
                    <Separator className='mb-5 bg-primary-light-gray w-full h-[1px]' />
                    <div className='flex justify-between'>
                        <p>
                            {
                                parseInt(type) === 2
                                    ? (toUserId === cuId)
                                        ? 'POŠILJATELJ'
                                        : 'PREJEMNIK'
                                    : 'PREJEMNIK'
                            }
                        </p>
                        <p className='lowercase font-bold'>
                            { parseInt(type) === 1 ? 'testament d.o.o.' : parseInt(type) === 2 && (toUserId !== cuId) ? to.email : user.email}
                        </p>
                    </div>
                    <Separator className='mb-5 bg-primary-light-gray w-full h-[1px]' />
                    <div className='flex justify-between'>
                        <p>VSOTA</p>
                        <p className='capitalize font-bold'>{Number(quantity).toLocaleString('sl-SI', {
                            maximumFractionDigits: 4,
                            minimumFractionDigits: 4
                        })} TST</p>
                    </div>
                </div>
                <SheetFooter className='flex items-center justify-center w-full absolute bottom-0'>
                    <SheetClose className='w-full py-4 px-8'>
                        <Button className='w-full'>
                            Zapri
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
