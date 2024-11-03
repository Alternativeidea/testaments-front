'use client'

import { Card } from '@/components/ui/card'
import { formatDate } from '@/lib/utils/date'
import { MobileMovementBlock, MobileMovementContent, MobileMovementItem, MobileMovementTrigger, MobileMovements, MovementIcon, MovementRow, MovementRowItem, MovementRows } from '../../../ui/movement-row'
import AcceptLaterForm from './accept-later-form'
import { MembershipIcon } from './membership-icon'
interface LaterProps {
    id: string
    name: string
    lastName: string
    email: string
    membershipId: number
    payLater: Date
    memPurchasedAt: Date,
    nextRenewal: Date
}
interface MembershipRowsProps {
    data: LaterProps[]
    limit?: number
    className?: string
    roleId?: number
}

export default function MembershipCards({ data, className, limit }: MembershipRowsProps) {
    const limitedData: LaterProps[] = data.slice(0, limit)

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
                    <p className='text-h5'>Nimate nobenega zahtevka</p>
                </Card>
            }
        </div>
    )
}

function MobileRow({ id, name, lastName, membershipId, payLater, memPurchasedAt, nextRenewal }: LaterProps) {
    return (
        <MobileMovementItem value={'item' + id} className='hover:!no-underline bg-primary-light-gray/20'>
            <MobileMovementTrigger>
                <div className='flex items-center gap-x-6'>
                    <MovementIcon icon={
                        <MembershipIcon membershipId={membershipId.toString()}/>
                    }/>
                    <p className='flex flex-col items-start w-fit text-primary-medium-gray md:min-w-[180px] text-body-medium text-left'>
                        <b className='text-primary-medium-gray'>
                            ID uporabnika: {id}
                        </b>
                        <span className='text-body-small md:text-body-medium'>
                            { payLater
                                ? formatDate(payLater)
                                : memPurchasedAt ? formatDate(memPurchasedAt) : '-' }
                        </span>
                    </p>
                </div>
            </MobileMovementTrigger>
            <MobileMovementContent>
                <MobileMovementBlock>
                    <div className='flex justify-between w-full'>
                        <p className='w-fit capitalize text-primary-dark-gray'>
                            {name + ' ' + lastName}
                        </p>
                    </div>
                </MobileMovementBlock>
                <MobileMovementBlock>
                    {
                        payLater
                            ? membershipId === 1 ? 'V obdelavi' : 'Admin'
                            : membershipId === 2 ? 'Stripe' : membershipId
                    }
                </MobileMovementBlock>
                <MobileMovementBlock>
                    {
                        nextRenewal ? formatDate(nextRenewal) : '-'
                    }
                </MobileMovementBlock>
            </MobileMovementContent>
            {membershipId !== 2 &&
                <AcceptLaterForm
                    id={id}
                    name={name}
                    lastName={lastName}
                />
            }
        </MobileMovementItem>
    )
}

function DesktopRow({ id, name, lastName, membershipId, payLater, memPurchasedAt, nextRenewal }: LaterProps) {
    return (
        <MovementRow>
            <MovementRowItem className='justify-start items-center w-[240px] gap-x-6'>
                <MovementIcon icon={
                    <MembershipIcon
                        membershipId={membershipId.toString()}
                    />
                }
                />
                <div className='w-fit flex flex-col items-start justify-center'>
                    <b>ID uporabnika: {id}</b>
                    { payLater
                        ? formatDate(payLater)
                        : memPurchasedAt
                            ? formatDate(memPurchasedAt)
                            : '-' }
                </div>
            </MovementRowItem>
            <MovementRowItem className='justify-start items-center w-[200px] overflow-hidden text-ellipsis line-clamp-1'>
                {name + ' ' + lastName}
            </MovementRowItem>
            <MovementRowItem className='justify-start items-center w-[120px] overflow-hidden text-ellipsis line-clamp-1'>
                {membershipId === 1 && 'Verifikacija'}
                {membershipId === 2 && 'Premium'}
            </MovementRowItem>
            <MovementRowItem className='justify-start items-center w-[120px] overflow-hidden text-ellipsis line-clamp-1 font-bold'>
                { payLater
                    ? membershipId === 1 ? 'V obdelavi' : 'Admin'
                    : membershipId === 2 ? 'Stripe' : membershipId
                }
            </MovementRowItem>
            <MovementRowItem className='justify-start items-center w-[120px] overflow-hidden text-ellipsis line-clamp-1 font-bold'>
                75,00 EUR
            </MovementRowItem>
            <MovementRowItem>
                {
                    membershipId !== 2 && payLater
                        ? <AcceptLaterForm
                            id={id}
                            name={name}
                            lastName={lastName}/>
                        : <span/>
                }
            </MovementRowItem>
            <MovementRowItem className='w-[120px]'>
                {
                    nextRenewal ? formatDate(nextRenewal) : '-'
                }
            </MovementRowItem>
        </MovementRow >
    )
}
