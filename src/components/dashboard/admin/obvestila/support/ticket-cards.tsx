import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { formatDate } from '@/lib/utils/date'
import { MobileMovementBlock, MobileMovementContent, MobileMovementFooter, MobileMovementItem, MobileMovementTrigger, MobileMovements, MovementIcon, MovementRow, MovementRowItem, MovementRows } from '../../../ui/movement-row'
import { TicketIcon } from './ticket-icon'
import UpdateTicketForm from './update-ticket-form'

interface TicketsRowsProps {
    data: TicketsProps[]
    limit?: number
    className?: string
}

export default function TicketCards({ data, className, limit }: TicketsRowsProps) {
    const limitedData: TicketsProps[] = data.slice(0, limit)
    return (
        <div className={className}>
            {data.length > 0
                ? <>
                    <MovementRows className='flex flex-col gap-y-2 w-full'>
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
                    <p className='text-h5'>Nimate nobenega zahtevka</p>
                </Card>
            }
        </div>
    )
}

function MobileRow({ id, user, subject, status, updatedAt, message }: TicketsProps) {
    return (
        <MobileMovementItem value={'item' + id} className='hover:!no-underline bg-primary-light-gray/20'>
            <MobileMovementTrigger>
                <div className='flex items-center gap-x-6'>
                    <MovementIcon icon={
                        <TicketIcon
                            status={status.toString()}
                        />
                    }
                    />
                    <p className='flex flex-col items-start w-fit text-primary-medium-gray md:min-w-[180px] text-body-medium text-left'>
                        <b className='text-primary-medium-gray'>
                            ID Ticket: {id}
                        </b>
                        <span className='text-body-small md:text-body-medium'>
                            {formatDate(updatedAt)}
                        </span>
                    </p>
                </div>
            </MobileMovementTrigger>
            <MobileMovementContent>
                <MobileMovementBlock>
                    <div className='flex justify-between w-full'>
                        <p className='flex flex-col w-full capitalize text-primary-dark-gray'>
                            <span>{user.name}</span>
                            <span className='lowercase text-primary-medium-gray/50'>{user.email}</span>
                            <p className='font-bold text-primary-dark-gray'>
                                {subject}
                            </p>
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
                <Sheet>
                    <SheetTrigger asChild>
                        <Button className='w-full'>
                            Poglej več
                        </Button>
                    </SheetTrigger>
                    <SheetContent className='w-full lg:!max-w-[420px] h-full p-0 overflow-y-scroll no-scrollbar'>
                        <UpdateTicketForm
                            updatedAt={updatedAt}
                            status={status}
                            id={id}
                            name={user.name}
                            subject={subject}
                            message={message}
                            email={user.email}
                        />
                    </SheetContent>
                </Sheet>
            </MobileMovementFooter>
        </MobileMovementItem>
    )
}

function DesktopRow({ id, user, subject, status, updatedAt, message }: TicketsProps) {
    return (
        <MovementRow>
            <MovementRowItem className='justify-start items-center w-[200px] gap-x-6'>
                <MovementIcon icon={
                    <TicketIcon
                        status={status.toString()}
                    />
                }
                />
                <div className='w-fit flex flex-col items-start justify-center'>
                    <b>ID Ticket: {id}</b>
                    {formatDate(updatedAt)}
                </div>
            </MovementRowItem>
            <MovementRowItem className='justify-start items-center w-[140px] overflow-hidden text-ellipsis line-clamp-1'>
                {user.name}
            </MovementRowItem>
            <MovementRowItem className='justify-start items-center w-[200px] overflow-hidden text-ellipsis line-clamp-1'>
                {user.email}
            </MovementRowItem>
            <MovementRowItem className='justify-start items-center w-[120px] overflow-hidden text-ellipsis line-clamp-1'>
                {subject}
            </MovementRowItem>
            <MovementRowItem className='justify-start items-center w-[80px] overflow-hidden text-ellipsis line-clamp-1'>
                {user.membershipId === 1 && 'Free' }
                {user.membershipId === 2 && 'Premium' }
            </MovementRowItem>
            <MovementRowItem className='justify-start items-center font-bold w-[100px] overflow-hidden text-ellipsis line-clamp-1'>
                {status === undefined || status === null
                    ? ' - '
                    : status.toString() === '0' || status.toString() === '3'
                        ? 'V obdelavi'
                        : 'Končano'}
            </MovementRowItem>
            <MovementRowItem>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button>
                            Poglej več
                        </Button>
                    </SheetTrigger>
                    <SheetContent className='w-full lg:!max-w-[420px] h-full p-0 overflow-y-scroll no-scrollbar'>
                        <UpdateTicketForm
                            updatedAt={updatedAt}
                            id={id}
                            status={status}
                            name={user.name}
                            subject={subject}
                            message={message}
                            email={user.email}
                        />
                    </SheetContent>
                </Sheet>
            </MovementRowItem>
        </MovementRow >
    )
}
