import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Icons } from '@/components/ui/icons'
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from '@/components/ui/sheet'
import { formatDate } from '@/lib/utils/date'
import { format } from 'date-fns'
import { sl } from 'date-fns/locale'
import { MobileMovementBlock, MobileMovementContent, MobileMovementFooter, MobileMovementItem, MobileMovementTrigger, MobileMovements, MovementIcon, MovementRow, MovementRowItem, MovementRows } from '../../ui/movement-row'
import { UsersInfoBlockItem } from '../users/users-info-card'

interface AdminBonusRowsProps {
    data: AdminBonusProps[]
    limit?: number
    className?: string
}

export default function BonusCards({ data, className, limit }: AdminBonusRowsProps) {
    const limitedData: AdminBonusProps[] = data.slice(0, limit)
    return (
        <div className={className}>
            {data.length > 0
                ? <>
                    <MovementRows className='flex flex-col gap-y-2 w-full'>
                        {limitedData.map((props) =>
                            <DesktopRow key={props.tId} {...props} />
                        )}
                    </MovementRows>
                    <MobileMovements>
                        {limitedData.map((props) =>
                            <MobileRow key={props.tId} {...props} />
                        )}
                    </MobileMovements>
                </>
                : <Card className='w-full h-fit bg-primary-light-gray/20 border-none px-6 py-6'>
                    <p className='text-h5'> Nimate provizije </p>
                </Card>
            }
        </div>
    )
}

function MobileRow({ tId, createdAt, status, name, uId, commission }: AdminBonusProps) {
    return (
        <MobileMovementItem value={'item' + tId} className='hover:!no-underline bg-primary-light-gray/20'>
            <MobileMovementTrigger>
                <div className='flex items-center gap-x-6'>
                    <MovementIcon icon={<WithdrawIcon status={status} />}
                    />
                    <p className='flex flex-col items-start w-fit text-primary-medium-gray md:min-w-[180px] text-body-medium text-left'>
                        <b className='text-primary-medium-gray'>
                            ID provizije: type !== 3 ? tId : `${uId}${createdAt && format(createdAt, 'yyMM')}`
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
                        <p className='flex flex-col w-full capitalize text-primary-dark-gray text-center'>
                            <p className='font-bold text-primary-dark-gray underline'>
                                {name}
                            </p>
                            <span className='underline'>ID {uId}</span>
                        </p>
                    </div>
                </MobileMovementBlock>
                <MobileMovementBlock>
                    Izplačilo
                </MobileMovementBlock>
                <MobileMovementBlock className='font-bold'>
                    <p className='font-bold'>
                        {(status === undefined || status === null) && ' - '}
                        {status === 1 && 'V obdelavi'}
                        {status === 2 && 'Končano'}
                        {status === 3 && 'Zavrnjeno'}
                    </p>
                </MobileMovementBlock>
            </MobileMovementContent>
            <MobileMovementBlock>
                <p className='font-bold'>
                    {Number(commission).toLocaleString('sl-SI', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })} EUR
                </p>
            </MobileMovementBlock>
            <MobileMovementFooter>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button className='w-full'>
                            Poglej več
                        </Button>
                    </SheetTrigger>
                    <SheetContent className='w-full lg:!max-w-[420px] h-full p-0 overflow-y-scroll no-scrollbar'>
                    </SheetContent>
                </Sheet>
            </MobileMovementFooter>
        </MobileMovementItem>
    )
}

function DesktopRow({ tId, rUserId, createdAt, status, name, uId, updatedAt, commission, relativeLevel, type, total, upline }: AdminBonusProps) {
    return (
        <MovementRow>
            <MovementRowItem className='justify-start items-center w-[220px] gap-x-6'>
                <MovementIcon icon={<WithdrawIcon status={status} />}
                />
                <div className='w-fit flex flex-col items-start justify-center'>
                    <b>
                        ID provizije: {type !== 3 ? tId : `${uId}${createdAt && format(createdAt, 'yyMM')}`}
                    </b>
                    {format(createdAt, 'PPP', { locale: sl })}
                </div>
            </MovementRowItem>
            <MovementRowItem className='justify-start items-center w-[100px] overflow-hidden text-ellipsis line-clamp-1'>
                <p className='flex flex-col w-full capitalize text-primary-dark-gray text-center'>
                    <p className='font-bold text-primary-dark-gray underline'>
                        {name}
                    </p>
                    <span className='underline'>ID {uId}</span>
                </p>
            </MovementRowItem>
            <MovementRowItem className='justify-start items-center w-[70px] overflow-hidden text-ellipsis line-clamp-1'>
                <p className='flex flex-col w-full capitalize text-primary-dark-gray text-center'>
                    <p className='font-bold text-primary-dark-gray underline'>
                    Provizija { relativeLevel <= 1 ? '1' : '2'}. nivoja
                    </p>
                    <span>{ type === 3 ? 'Premium' : 'Dodaj TST'}</span>
                </p>
            </MovementRowItem>
            <MovementRowItem className='justify-start items-center w-[80px] overflow-hidden text-ellipsis line-clamp-1 font-bold'>
                Končano
            </MovementRowItem>
            <MovementRowItem className='justify-start items-center overflow-hidden text-ellipsis line-clamp-1'>
                <p className='font-bold'>
                    { commission
                        ? Number(commission).toLocaleString('sl-SI', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        }) + ' EUR'
                        : '-'}
                </p>
            </MovementRowItem>
            <MovementRowItem>
                <WithdrawDetails
                    tId={tId}
                    uId={uId}
                    name={name}
                    status={status}
                    createdAt={createdAt}
                    updatedAt={updatedAt}
                    commission={commission}
                    total={total}
                    upline={upline}
                    type={type}
                    rUserId={rUserId}
                    relativeLevel={relativeLevel}
                />
            </MovementRowItem>
        </MovementRow >
    )
}

export function WithdrawIcon({ status }: { status: number }) {
    return (
        <>
            {status === 0
                ? <Icons.Clock className='text-accent-green' />
                : <Icons.ArrowDownCircle className={`${(status === (3)) ? 'text-accent-red' : ''}`} />
            }
        </>
    )
}

// This one shows on the TST svetovalec on admin dashboard generals tabs
export function WithdrawDetails({ tId, rUserId, createdAt, updatedAt, type, name, uId, commission, total, upline, relativeLevel }: Partial<AdminBonusProps>) {
    return (
        <>
            <Sheet>
                <SheetTrigger asChild>
                    <Button>
                        Poglej več
                    </Button>
                </SheetTrigger>
                <SheetContent className='w-full lg:!max-w-[420px] h-full p-0 overflow-y-scroll no-scrollbar'>
                    <SheetHeader className='flex items-start w-full shadow-button py-8'>
                        <p className="pl-4 text-h6 font-baskerville">Podrobnosti provizije</p>
                    </SheetHeader>
                    <div className='flex flex-col justify-between h-[calc(100%-100px)]'>
                        <div className='flex flex-col px-4 w-full py-8 gap-y-1'>
                            <UsersInfoBlockItem label='STATUS'>
                                Končano
                            </UsersInfoBlockItem>
                            <UsersInfoBlockItem label='TIP NAROČILA'>
                                {`${type === 3 ? 'Premiun' : 'Dodaj TST'}`}
                            </UsersInfoBlockItem>
                            <UsersInfoBlockItem label='ID PROVIZIJE'>
                                {
                                    type !== 3 ? tId : `${uId}${createdAt && format(createdAt, 'yyMM')}`
                                }
                            </UsersInfoBlockItem>
                            <UsersInfoBlockItem label='DATUM NAROČILA'>
                                {createdAt ? formatDate(createdAt) : '-'}
                            </UsersInfoBlockItem>
                            <UsersInfoBlockItem label='ZNESEK NAROČILA'>
                                {total ? Number(total).toLocaleString('sl-SI', { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : '0,00' } EUR
                            </UsersInfoBlockItem>
                            <UsersInfoBlockItem label='ID KUPCA'>
                                {name || '-'}
                                <br></br>
                                #{ uId }
                            </UsersInfoBlockItem>
                            <UsersInfoBlockItem label='ID SPONZORJA'>
                                { upline }
                                <br></br>
                                #{ rUserId }
                            </UsersInfoBlockItem>
                            <UsersInfoBlockItem label='TIP PROVIZIJE'>
                                Provizija { relativeLevel ? relativeLevel <= 1 ? '1' : '2' : '-'}. nivoja
                            </UsersInfoBlockItem>
                            <UsersInfoBlockItem label='PROVIZIJA'>
                                { commission
                                    ? `${(parseFloat(commission)).toLocaleString('sl-SI', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} EUR`
                                    : '-'}
                            </UsersInfoBlockItem>
                            <UsersInfoBlockItem label='IZPLAČILO PROVIZIJE' separator={false}>
                                {updatedAt ? formatDate(updatedAt) : '-'}
                            </UsersInfoBlockItem>
                        </div>
                        <SheetFooter>
                            <div className='flex items-center justify-center w-full py-6 px-4'>
                                <SheetClose asChild>
                                    <Button className='w-full'>Zapri</Button>
                                </SheetClose>
                            </div>
                        </SheetFooter>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    )
}
