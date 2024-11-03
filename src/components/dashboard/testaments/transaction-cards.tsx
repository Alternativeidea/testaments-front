import { Card } from '@/components/ui/card'
import { formatDate } from '@/lib/utils/date'
import { getPlusLabel, getPoslanoLabel } from '@/lib/utils/format'
import { MobileMovementBlock, MobileMovementContent, MobileMovementFooter, MobileMovementItem, MobileMovementTrigger, MobileMovements, MovementIcon, MovementRow, MovementRowItem, MovementRows } from '../ui/movement-row'
import TransactionDetails from './transaction-details'
import { TransactionIcon } from './transaction-icon'

interface TransactionsAccordionProps {
    data: TransactionProps[]
    limit?: number
    className?: string
}

export default function TransactionCards({ data, className, limit }: TransactionsAccordionProps) {
    const limitedData: TransactionProps[] = data.slice(0, limit)
    return (
        <div className={className}>
            {data.length > 0
                ? <>
                    <MovementRows className='flex flex-col gap-y-2'>
                        {limitedData.map((props) =>
                            <DesktopRow key={props.id} {...props} />
                        )}
                    </MovementRows>
                    <MobileMovements>
                        {limitedData.map((props) =>
                            <MobileRow key={props.id} {...props} />
                        )}
                    </MobileMovements>
                </>
                : <Card className='w-full h-fit bg-primary-light-gray/20 border-none px-6 py-6'>
                    <p className='text-h5'> Nimate transakcij </p>
                </Card>
            }
        </div>
    )
}

function MobileRow({ id, type, user, status, quantity, reference, rate, createdAt, updatedAt, userId, total, toUserId, to, cuId }: TransactionProps) {
    return (
        <MobileMovementItem value={'item' + id} className='hover:!no-underline bg-primary-light-gray/20'>
            <MobileMovementTrigger>
                <div className='flex items-center gap-x-6'>
                    <MovementIcon
                        icon={
                            <TransactionIcon
                                type={type.toString()}
                                status={status.toString()}
                                to={to}
                                cuId={cuId}
                            />}/>
                    <p className='flex flex-col items-start w-fit text-primary-medium-gray md:min-w-[180px] text-body-medium text-left'>
                        <b className='text-primary-medium-gray'>
                            ID transakcije: {id}
                        </b>
                        <span className='text-body-small md:text-body-medium'>
                            {formatDate(createdAt)}
                        </span>
                    </p>
                </div>
            </MobileMovementTrigger>
            <MobileMovementContent>
                <MobileMovementBlock>
                    <div className='flex justify-between w-full'>
                        <p className='w-fit capitalize text-primary-dark-gray'>
                            { getPoslanoLabel(type, toUserId == null, status) }
                        </p>
                        <p className='w-fit font-bold text-primary-dark-gray'>
                            { getPlusLabel(type, toUserId == null, status) }
                            { Number(quantity).toLocaleString('sl-SI', {
                                minimumFractionDigits: 4,
                                maximumFractionDigits: 4
                            })}
                            {' TST'}
                        </p>
                    </div>
                </MobileMovementBlock>
                <MobileMovementBlock>
                    <p className='w-fit font-bold text-primary-dark-gray'>
                        {status === undefined || status === null
                            ? ' - '
                            : status.toString() === '0' || status.toString() === '3'
                                ? 'V obdelavi'
                                : 'Končano'}
                    </p>
                </MobileMovementBlock>
            </MobileMovementContent>
            <MobileMovementFooter>
                <TransactionDetails
                    id={id}
                    to={to}
                    cuId={cuId}
                    user={user}
                    type={type}
                    quantity={quantity}
                    createdAt={createdAt}
                    updatedAt={updatedAt}
                    status={status}
                    rate={rate}
                    reference={reference}
                    total={total}
                    userId={userId}
                    toUserId={toUserId}
                />
            </MobileMovementFooter>
        </MobileMovementItem>
    )
}

function DesktopRow({ id, type, user, status, quantity, reference, rate, createdAt, updatedAt, userId, total, toUserId, to, cuId }: TransactionProps) {
    return (
        <MovementRow>
            <MovementRowItem className='justify-start items-center min-w-[280px] gap-x-6'>
                <MovementIcon icon={
                    <TransactionIcon
                        status={status.toString()}
                        type={type.toString()}
                        to={to}
                        cuId={cuId}
                    />
                }
                />
                <div className='w-fit flex flex-col items-start justify-center'>
                    <b>ID transakcije: {id}</b>
                    {formatDate(createdAt)}
                </div>
            </MovementRowItem>
            <MovementRowItem className='flex items-center font-medium justify-start capitalize w-[80px]'>
                { getPoslanoLabel(type, toUserId === cuId, status) }
            </MovementRowItem>
            <MovementRowItem className='flex items-center justify-start font-bold w-[140px]'>
                { getPlusLabel(type, toUserId === cuId, status) }
                { Number(quantity).toLocaleString('sl-SI', {
                    minimumFractionDigits: 4,
                    maximumFractionDigits: 4
                }) }
                {' TST'}
            </MovementRowItem>
            <MovementRowItem className='font-bold'>
                {status === undefined || status === null
                    ? ' - '
                    : status.toString() === '0' || status.toString() === '3'
                        ? 'V obdelavi'
                        : 'Končano'}
            </MovementRowItem>
            <MovementRowItem>
                <TransactionDetails
                    id={id}
                    to={to}
                    user={user}
                    type={type}
                    quantity={quantity}
                    createdAt={createdAt}
                    updatedAt={updatedAt}
                    status={status}
                    rate={rate}
                    reference={reference}
                    total={total}
                    userId={userId}
                    toUserId={toUserId}
                    cuId={cuId}
                />
            </MovementRowItem>
        </MovementRow >
    )
}
