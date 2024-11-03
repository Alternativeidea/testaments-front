import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet'
import { useCookies } from '@/lib/hooks/use-cookies'
import { formatDate } from '@/lib/utils/date'
import { getDodajanjeLabel } from '@/lib/utils/format'
import TstConfirmForm from '../../testaments/tst-transaction-details'

interface UserTransactionDetailsProps {
    id: string
    user: {
        email: string
    }
    to: {
        id: number
        email: string
    }
    type: string
    status: string
    quantity: string
    rate: string
    createdAt: Date
    updatedAt: Date
    reference: string | null
    toUserId: number
    cuId: number
}

export default function UserTransactionDetails({ id, to, type, status, quantity, rate, createdAt, updatedAt, reference, toUserId, cuId, user }: UserTransactionDetailsProps) {
    const cookies = useCookies()
    const userCookie = cookies.get('user')
    const { roleId } = JSON.parse(userCookie || '{}')
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className='w-full '>
                    Poglej več
                </Button>
            </SheetTrigger>
            <SheetContent className={'flex flex-col w-full lg:!max-w-[420px] p-0 min-h-full overflow-y-scroll no-scrollbar\'}'}>
                <SheetHeader className='flex items-start w-full shadow-button py-8'>
                    <p className="pl-4 text-h6 font-baskerville">Oddani zahtevki - {status.toString() === '0' || status.toString() === '3'
                        ? 'V obdelavi'
                        : 'Končano'}</p>
                </SheetHeader>
                <div className='flex flex-col px-4 gap-y-4 w-full py-8'>
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
                            { getDodajanjeLabel(type, toUserId === cuId, status)}
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
                                    : status.toString() === '5' || status.toString() === '2'
                                        ? 'Preklicano'
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
                        <p className='capitalize font-bold'>{status.toString() === '1' || status.toString() === '2' || status.toString() === '4' || status.toString() === '5' ? formatDate(updatedAt) : '-'}</p>
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
                            minimumFractionDigits: 4,
                            maximumFractionDigits: 4
                        })} TST</p>
                    </div>
                    { roleId === 1 &&
                        <div className='w-full px-4 pt-[200px]'>
                            <SheetClose asChild className='w-full'>
                                <Button>Zapri</Button>
                            </SheetClose>
                        </div>
                    }
                    {status.toString() === '0' && roleId !== 1 &&
                        <div className='py-4 flex flex-col gap-y-4'>
                            <h3 className='text-body-big font-baskerville'>
                                {type.toString() === '0' || type.toString() === '3'
                                    ? 'Dodaj testamente'
                                    : 'Vračilo testamentov'}
                            </h3>
                            <TstConfirmForm
                                id={Number(id)}
                                quantity={Number(quantity)}
                                rate={Number(rate)}
                            />
                        </div>
                    }
                </div>
                {status.toString() !== '0' &&
                    <div className='w-full px-4 pt-[200px]'>
                        <SheetClose asChild className='w-full'>
                            <Button>Zapri</Button>
                        </SheetClose>
                    </div>
                }
            </SheetContent>
        </Sheet>
    )
}
