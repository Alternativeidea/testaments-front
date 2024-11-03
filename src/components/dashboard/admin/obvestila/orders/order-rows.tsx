import { MobileMovementBlock, MobileMovementContent, MobileMovementFooter, MobileMovementItem, MobileMovementTrigger, MobileMovements, MovementIcon, MovementRow, MovementRowItem, MovementRows } from '@/components/dashboard/ui/movement-row'
import { Card } from '@/components/ui/card'
import { Icons } from '@/components/ui/icons'
import { formatDate } from '@/lib/utils/date'
import { OrderSheet } from './order-sheet'

export function OrderRows({ data } : {data : OrderProps[]}) {
    return (
        <div className="flex w-full flex-col items-center justify-center gap-y-6 pt-2">
            <div className="flex w-full flex-col items-start justify-center gap-y-4">
                <div className='w-full'>
                    {data.length > 0
                        ? <>
                            <MovementRows className='flex flex-col gap-y-2'>
                                {data.map((props) =>
                                    <DesktopRow key={props.id} {...props} />
                                )}
                            </MovementRows>
                            <MobileMovements>
                                {data.map((props) =>
                                    <MobileRow key={props.id} {...props} />
                                )}
                            </MobileMovements>
                        </>
                        : <Card className='h-fit w-full border-none bg-primary-light-gray/20 px-6 py-6'>
                            <p className='text-h5'>Nobenega rezultata.</p>
                        </Card>
                    }
                </div>
            </div>
        </div>
    )
}

function MobileRow(order: OrderProps) {
    const { id, user, details, status, updatedAt } = order

    return (
        <MobileMovementItem value={'item' + id} className='w-full bg-primary-light-gray/20 hover:!no-underline'>
            <MobileMovementTrigger>
                <div className='flex items-center gap-x-6'>
                    <MovementIcon icon={
                        status.toString() === '0'
                            ? <Icons.Clock className='text-accent-green'/>
                            : <Icons.Store/>
                    }
                    />
                    <p className='flex w-fit flex-col items-start text-left text-body-medium text-primary-medium-gray md:min-w-[180px]'>
                        <b className='text-primary-medium-gray'>
                            ID Tržnica: {id}
                        </b>
                        <span className='text-body-small md:text-body-medium'>
                            {formatDate(updatedAt)}
                        </span>
                    </p>
                </div>
            </MobileMovementTrigger>
            <MobileMovementContent>
                <MobileMovementBlock>
                    <div className='flex w-full justify-between'>
                        <p className='flex w-fit flex-col capitalize text-primary-dark-gray'>
                            <span>{user.name}</span>
                            <span className='lowercase text-primary-medium-gray/50'>{user.email}</span>
                        </p>
                        <p className='my-auto w-fit font-bold text-primary-dark-gray'>
                            {details[0].product.category.name || ''}
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
                    ? <OrderSheet {...order} />
                    : <div className='w-full' />
                }
            </MobileMovementFooter>
        </MobileMovementItem>
    )
}

function DesktopRow(order: OrderProps) {
    const { id, user, details, status, updatedAt } = order

    return (
        <MovementRow>
            <MovementRowItem className='w-[200px] items-center justify-start gap-x-6'>
                <MovementIcon icon={
                    status.toString() === '0'
                        ? <Icons.Clock className='text-accent-green'/>
                        : <Icons.Store/>
                }
                />
                <div className='flex w-fit flex-col items-start justify-center'>
                    <b>ID Tržnica: {id}</b>
                    {formatDate(updatedAt)}
                </div>
            </MovementRowItem>
            <MovementRowItem className='line-clamp-1 w-[120px] items-center justify-start overflow-hidden text-ellipsis'>
                {user.name}
            </MovementRowItem>
            <MovementRowItem className='line-clamp-1 w-[160px] items-center justify-start !text-ellipsis'>
                <span className='text-ellipsis'>
                    {user.email}
                </span>
            </MovementRowItem>
            <MovementRowItem className='line-clamp-1 w-[120px] items-center justify-start overflow-hidden text-ellipsis'>
                {details[0].product.category.name || ''}
            </MovementRowItem>
            <MovementRowItem className='line-clamp-1 w-[120px] items-center justify-start overflow-hidden text-ellipsis'>
                {details[0].product.name}
            </MovementRowItem>
            <MovementRowItem className='line-clamp-1 w-[120px] items-center justify-start !text-ellipsis whitespace-nowrap font-bold'>
                {status === undefined || status === null
                    ? ' - '
                    : status.toString() === '0' || status.toString() === '3'
                        ? 'V obdelavi'
                        : 'Končano'}
            </MovementRowItem>
            <MovementRowItem className='w-[120px] items-center justify-start overflow-hidden'>
                {status.toString() === '0'
                    ? <OrderSheet {...order} />
                    : <div className='w-full' />
                }
            </MovementRowItem>
        </MovementRow >
    )
}
