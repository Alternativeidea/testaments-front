'use client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Icons } from '@/components/ui/icons'
import { Skeleton } from '@/components/ui/skeleton'
import { getAdminAllLaters } from '@/lib/services/admin/laters'
import { getAdminOrders } from '@/lib/services/admin/products'
import { getAdminAllTickets } from '@/lib/services/admin/tickets'
import { getAdminAllTransactions } from '@/lib/services/admin/transactions'
import { format } from 'date-fns'
import { sl } from 'date-fns/locale'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import {
    MobileMovementBlock,
    MobileMovementContent,
    MobileMovementFooter,
    MobileMovementItem,
    MobileMovements,
    MobileMovementTrigger,
    MovementIcon,
    MovementRow,
    MovementRowItem,
    MovementRows
} from '../../ui/movement-row'
import TstTransactionsCards from '../testaments/tst-transaction-cards'
import MembershipCards from './membership/membership-cards'
import { OrderSheet } from './orders/order-sheet'
import TicketCards from './support/ticket-cards'

interface HomeNotificationsV2Props {
    handleTab: (value: string) => void
}

export default function HomeNotifications({ handleTab }: HomeNotificationsV2Props) {
    // const wills = await getAdminWills('?status=3')
    const [loading, setLoading] = useState(false)
    const [cookies] = useCookies(['user'])
    const [laters, setLaters] = useState([])
    const [transactions, setTransactions] = useState([])
    const [orders, setOrders] = useState<OrderProps[]>([])
    const [tickets, setTickets] = useState([])

    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            const result = await getAdminAllLaters('?status=2&orderBy=-createdAt')
            const rT = await getAdminAllTransactions('0', true, '', '')
            const rTi = await getAdminAllTickets('?status=0')
            const orders = await getAdminOrders(
                '?status=0&orderBy=-updatedAt&limit=4'
            )
            setTickets(rTi)
            setTransactions(rT)
            setOrders(orders)
            setLaters(result)
            setLoading(false)
        }
        fetchData()
    }, [])

    return (
        <div className="flex w-full flex-col items-center justify-center gap-y-6 py-6">
            {cookies.user?.roleId !== 4 && (
                <div className="flex w-full flex-col items-start justify-center gap-y-4 py-6">
                    <h3 className="font-baskerville text-h6">Članstvo in verifikacija</h3>
                    {loading
                        ? <Skeleton className='w-full h-[96px] bg-primary-light-gray/40'/>
                        : <MembershipCards data={laters} className='w-full' limit={4} roleId={cookies.user?.roleId} />
                    }
                </div>
            )}
            <div className="flex w-full flex-row items-center justify-center">
                <Button
                    className="mx-auto flex items-center justify-center gap-x-6"
                    onClick={() => {
                        handleTab('membership')
                    }}
                >
                    <>
                        <Icons.Plus />
                        <p className="">Poglej več</p>
                    </>
                </Button>
            </div>
            <div className="flex w-full flex-col items-start justify-center gap-y-4 py-6">
                <h3 className="font-baskerville text-h6">TST (Oddani zahtevki - v obdelavi)</h3>
                {loading
                    ? <Skeleton className='w-full h-[96px] bg-primary-light-gray/40'/>
                    : <TstTransactionsCards data={transactions} className='w-full' limit={4} />
                }
                <div className='flex w-full items-center justify-center'>
                    <Button asChild className='mx-auto flex items-center justify-center gap-x-6'>
                        <Link href={'/namizje/admin/gold/testament'}>
                            <Icons.Plus />
                            <p className="">Poglej več</p>
                        </Link>
                    </Button>
                </div>
            </div>
            <div className="flex w-full flex-col items-start justify-center gap-y-4 py-6">
                <h3 id="all-orders" className="font-baskerville text-h6">Tržnica (Oddani zahtevki - v obdelavi)</h3>

                {loading
                    ? <Skeleton className='w-full h-[96px] bg-primary-light-gray/40'/>
                    : orders.length > 0
                        ? (
                            <>
                                <MovementRows className="flex flex-col gap-y-2">
                                    {orders.map((props) => (
                                        <DesktopRow key={props.id} {...props} />
                                    ))}
                                </MovementRows>
                                <MobileMovements>
                                    {orders.map((props) => (
                                        <MobileRow key={props.id} {...props} />
                                    ))}
                                </MobileMovements>
                            </>
                        )
                        : (
                            <Card className="h-fit w-full border-none bg-primary-light-gray/20 px-6 py-6">
                                <p className="text-h5"> </p>
                            </Card>
                        )}

                <Button
                    className="mx-auto flex items-center justify-center gap-x-6"
                    onClick={() => handleTab('trznica')}
                >
                    <>
                        <Icons.Plus />
                        <p className="">Poglej več</p>
                    </>
                </Button>
            </div>
            <div className="flex w-full flex-col items-start justify-center gap-y-4 py-6">
                <h3 className="font-baskerville text-h6">Podpora (Oddani zahtevki - v obdelavi)</h3>
                {loading
                    ? <Skeleton className='w-full h-[96px] bg-primary-light-gray/40'/>
                    : <TicketCards data={tickets} className='w-full' limit={4} />
                }
                <div className='flex w-full items-center justify-center'>
                    <Button className='mx-auto flex items-center justify-center gap-x-6'
                        onClick={() => handleTab('tickets')}
                    >
                        <>
                            <Icons.Plus />
                            <p className="">Poglej več</p>
                        </>
                    </Button>
                </div>
            </div>
        </div>
    )
}

function MobileRow(order: OrderProps) {
    const { id, user, details, status, updatedAt } = order

    return (
        <MobileMovementItem
            value={'item' + id}
            className="w-full bg-primary-light-gray/20 hover:!no-underline"
        >
            <MobileMovementTrigger>
                <div className="flex items-center gap-x-6">
                    <MovementIcon
                        icon={
                            status.toString() === '0'
                                ? (
                                    <Icons.Clock className="text-accent-green" />
                                )
                                : (
                                    <Icons.Store />
                                )
                        }
                    />
                    <p className="flex w-fit flex-col items-start text-left text-body-medium text-primary-medium-gray md:min-w-[180px]">
                        <b className="text-primary-medium-gray">ID Tržnica: {id}</b>
                        <span className="text-body-small md:text-body-medium">
                            {format(updatedAt, 'PP', { locale: sl })}
                        </span>
                    </p>
                </div>
            </MobileMovementTrigger>
            <MobileMovementContent>
                <MobileMovementBlock>
                    <div className="flex w-full justify-between">
                        <p className="flex w-fit flex-col capitalize text-primary-dark-gray">
                            <span>{user.name}</span>
                            <span className="lowercase text-primary-medium-gray/50">
                                {user.email}
                            </span>
                        </p>
                        <p className="my-auto w-fit font-bold text-primary-dark-gray">
                            {details[0].product.category.name}
                        </p>
                    </div>
                </MobileMovementBlock>
                <MobileMovementBlock>
                    {status === undefined || status === null
                        ? ' - '
                        : status.toString() === '0' || status.toString() === '3'
                            ? 'V obdelavi'
                            : 'Končano'}
                </MobileMovementBlock>
            </MobileMovementContent>
            <MobileMovementFooter>
                {status.toString() === '0'
                    ? (
                        <OrderSheet {...order} />
                    )
                    : (
                        <div className="w-full" />
                    )}
            </MobileMovementFooter>
        </MobileMovementItem>
    )
}

function DesktopRow(order: OrderProps) {
    const { id, user, details, status, updatedAt } = order

    return (
        <MovementRow>
            <MovementRowItem className="w-[200px] items-center justify-start gap-x-6">
                <MovementIcon
                    icon={
                        status.toString() === '0'
                            ? (
                                <Icons.Clock className="text-accent-green" />
                            )
                            : (
                                <Icons.Store />
                            )
                    }
                />
                <div className="flex w-fit flex-col items-start justify-center">
                    <b>ID Tržnica: {id}</b>
                    {format(updatedAt, 'PP', { locale: sl })}
                </div>
            </MovementRowItem>
            <MovementRowItem className="line-clamp-1 w-[120px] items-center justify-start overflow-hidden text-ellipsis">
                {user.name}
            </MovementRowItem>
            <MovementRowItem className="line-clamp-1 w-[160px] items-center justify-start !text-ellipsis">
                <span className="text-ellipsis">{user.email}</span>
            </MovementRowItem>
            <MovementRowItem className="line-clamp-1 w-[120px] items-center justify-start overflow-hidden text-ellipsis">
                {details[0].product.category.name || ''}
            </MovementRowItem>
            <MovementRowItem className="line-clamp-1 w-[120px] items-center justify-start overflow-hidden text-ellipsis">
                {details[0].product.name}
            </MovementRowItem>
            <MovementRowItem className="line-clamp-1 w-[120px] items-center justify-start !text-ellipsis whitespace-nowrap font-bold">
                {status === undefined || status === null
                    ? ' - '
                    : status.toString() === '0' || status.toString() === '3'
                        ? 'V obdelavi'
                        : 'Končano'}
            </MovementRowItem>
            <MovementRowItem className="w-[120px] items-center justify-start overflow-hidden">
                {status.toString() === '0'
                    ? (
                        <OrderSheet {...order} />
                    )
                    : (
                        <div className="w-full" />
                    )}
            </MovementRowItem>
        </MovementRow>
    )
}
