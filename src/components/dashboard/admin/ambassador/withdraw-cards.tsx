'use client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Icons } from '@/components/ui/icons'
import { Ilustrations } from '@/components/ui/ilustrations'
import { Label } from '@/components/ui/label'
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/text-area'
import { updateAdminWithdrawStatus } from '@/lib/services/admin/ambassadors'
import { formatDate } from '@/lib/utils/date'
import { format } from 'date-fns'
import { sl } from 'date-fns/locale'
import { useState } from 'react'
import { toast } from 'sonner'
import { MobileMovementBlock, MobileMovementContent, MobileMovementFooter, MobileMovementItem, MobileMovementTrigger, MobileMovements, MovementIcon, MovementRow, MovementRowItem, MovementRows } from '../../ui/movement-row'
import { UsersInfoBlockItem } from '../users/users-info-card'

interface WithdrawRowsProps {
    data: WithdrawsProps[]
    limit?: number
    className?: string
}

export default function WithdrawCards({ data, className, limit }: WithdrawRowsProps) {
    const limitedData: WithdrawsProps[] = data.slice(0, limit)
    return (
        <div className={className}>
            {data.length > 0
                ? <>
                    <MovementRows className='flex flex-col gap-y-2 w-full mb-12'>
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
                : <Card className='w-full h-fit bg-primary-light-gray/20 border-none px-6 py-6 mb-16'>
                    <p className='text-h5'> Nimate Izplačila </p>
                </Card>
            }
        </div>
    )
}

function MobileRow({ id, createdAt, status, name, userId, quantity, updatedAt, fee, type, swift, address, company, companyAddress, companyTin, number, reason, user }: WithdrawsProps) {
    return (
        <MobileMovementItem value={'item' + id} className='hover:!no-underline bg-primary-light-gray/20'>
            <MobileMovementTrigger>
                <div className='flex items-center gap-x-6'>
                    <MovementIcon icon={<WithdrawIcon status={status} />}
                    />
                    <p className='flex flex-col items-start w-fit text-primary-medium-gray md:min-w-[180px] text-body-medium text-left'>
                        <b className='text-primary-medium-gray'>
                            ID izplačilo: {id}
                        </b>
                        <span className='text-body-small md:text-body-medium'>
                            {format(createdAt, 'PPP', { locale: sl })}
                        </span>
                    </p>
                </div>
            </MobileMovementTrigger>
            <MobileMovementContent>
                <MobileMovementBlock>
                    <div className='flex justify-between w-full'>
                        <p className='flex flex-col w-full capitalize text-primary-dark-gray text-center'>
                            <p className='font-bold text-primary-dark-gray underline'>
                                {user.name} {user.lastName}
                            </p>
                            <span className='underline'>ID {userId}</span>
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
                    {Number(quantity).toLocaleString('sl-SI', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} EUR
                </p>
            </MobileMovementBlock>
            <MobileMovementFooter>
                <WithdrawDetails
                    id={id}
                    userId={userId}
                    name={name}
                    status={status}
                    createdAt={createdAt}
                    updatedAt={updatedAt}
                    quantity={quantity}
                    fee={fee}
                    type={type}
                    swift={swift}
                    number={number}
                    address={address}
                    company={company}
                    companyAddress={companyAddress}
                    companyTin={companyTin}
                    reason={reason}
                    user={user}
                />
            </MobileMovementFooter>
        </MobileMovementItem>
    )
}

function DesktopRow({ id, createdAt, status, name, userId, quantity, updatedAt, fee, type, swift, address, company, companyAddress, companyTin, number, reason, user }: WithdrawsProps) {
    return (
        <MovementRow>
            <MovementRowItem className='justify-start items-center w-[245px] gap-x-6'>
                <MovementIcon icon={<WithdrawIcon status={status} />}
                />
                <div className='w-fit flex flex-col items-start justify-center'>
                    <b>ID Izplačilo: {id}</b>
                    {format(createdAt, 'PPP', { locale: sl })}
                </div>
            </MovementRowItem>
            <MovementRowItem className='justify-start items-center w-[150px] overflow-hidden text-ellipsis line-clamp-1'>
                <p className='flex flex-col w-full capitalize text-primary-dark-gray text-center'>
                    <p className='font-bold text-primary-dark-gray underline'>
                        { user.name} {user.lastName}
                    </p>
                    <span className='underline'>ID {userId}</span>
                </p>
            </MovementRowItem>
            <MovementRowItem className='justify-start items-center w-[80px] overflow-hidden text-ellipsis line-clamp-1'>
                Izplačilo
            </MovementRowItem>
            <MovementRowItem className='justify-start items-center w-[100px] overflow-hidden text-ellipsis line-clamp-1 font-bold'>
                {(status === undefined || status === null) && ' - '}
                {status === 1 && 'V obdelavi'}
                {status === 2 && 'Končano'}
                {status === 3 && 'Zavrnjeno'}
            </MovementRowItem>
            <MovementRowItem className='justify-start items-center w-[120px] overflow-hidden text-ellipsis line-clamp-1'>
                <p className='font-bold'>
                    {quantity
                        ? Number(quantity).toLocaleString('sl-SI', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        }) + ' EUR'
                        : '-'}
                </p>
            </MovementRowItem>
            <MovementRowItem>
                <WithdrawDetails
                    id={id}
                    userId={userId}
                    name={name}
                    status={status}
                    createdAt={createdAt}
                    updatedAt={updatedAt}
                    quantity={quantity}
                    fee={fee}
                    type={type}
                    swift={swift}
                    number={number}
                    address={address}
                    company={company}
                    companyAddress={companyAddress}
                    companyTin={companyTin}
                    reason={reason}
                    user={user}
                />
            </MovementRowItem>
        </MovementRow >
    )
}

export function WithdrawIcon({ status }: { status: number }) {
    return (
        <>
            {status === 1
                ? <Icons.Clock className='text-accent-green' />
                : <Icons.ArrowDownCircle className={`${(status === (3)) ? 'text-accent-red' : ''}`} />
            }
        </>
    )
}

export function WithdrawDetails({ id, createdAt, updatedAt, status, name, userId, quantity, fee, swift, number, type, address, company, companyAddress, companyTin, reason, user }: Partial<WithdrawsProps>) {
    return (
        <>
            <Sheet>
                <SheetTrigger asChild>
                    <Button className='w-full'>
                        Poglej več
                    </Button>
                </SheetTrigger>
                <SheetContent className='w-full lg:!max-w-[420px] h-full p-0 overflow-y-scroll no-scrollbar'>
                    <SheetHeader className='flex items-start w-full shadow-button py-8'>
                        <p className="pl-4 text-h6 font-baskerville">Podrobnosti izplačila</p>
                    </SheetHeader>
                    <div className='flex flex-col justify-between h-[calc(100%-100px)]'>
                        <div className='flex flex-col px-4 w-full py-8 gap-y-1'>
                            <UsersInfoBlockItem label='ID Izplačilo'>
                                <strong>{`${id || '-'}`}</strong>
                            </UsersInfoBlockItem>
                            <UsersInfoBlockItem label='ID UPORABNIKA'>
                                <strong>{`#${userId || '-'}`}</strong>
                            </UsersInfoBlockItem>
                            <UsersInfoBlockItem label='IME IN PRIIMEK'>
                                <strong>{user?.name} {user?.lastName}</strong>
                            </UsersInfoBlockItem>
                            <UsersInfoBlockItem label='STATUS'>
                                <strong>
                                    {status?.toString() === '1' && 'V obdelavi'}
                                    {status?.toString() === '2' && 'Končano'}
                                    {status?.toString() === '3' && 'Zavrnjeno'}
                                </strong>
                            </UsersInfoBlockItem>
                            <UsersInfoBlockItem label='DATUM ODDANEGA ZAHTEVKA'>
                                <strong>{createdAt ? format(createdAt, 'PPP', { locale: sl }) : '-'}</strong>
                            </UsersInfoBlockItem>
                            <UsersInfoBlockItem label='KOLIČINA IZPLAČILA'>
                                <strong>{quantity
                                    ? `${parseFloat(quantity).toLocaleString('sl-SI', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })} EUR`
                                    : '-'}</strong>
                            </UsersInfoBlockItem>
                            <UsersInfoBlockItem label='STROŠKI OBDELAVE'>
                                <strong>{fee
                                    ? `${parseFloat(fee).toLocaleString('sl-SI', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })} EUR`
                                    : '-'}</strong>
                            </UsersInfoBlockItem>
                            <UsersInfoBlockItem label='VSE SKUPAJ IZPLAČILO'>
                                <strong>
                                    {(quantity && fee)
                                        ? `${(parseFloat(quantity) - parseFloat(fee)).toLocaleString('sl-SI', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        })} EUR`
                                        : '-'}
                                </strong>
                            </UsersInfoBlockItem>
                            <UsersInfoBlockItem label='DATUM IZPLAČILA PROVIZIJE NA TRR' separator={false}>
                                <strong>
                                    { status && status.toString() === '2' ? updatedAt ? formatDate(updatedAt) : '/' : '/'}</strong>
                            </UsersInfoBlockItem>
                            {
                                reason &&
                                <div className='flex flex-col py-6 gap-y-2'>
                                    <Label className='font-bold'>Razlog zavrnitve {reason} sdfsd</Label>
                                    <Textarea
                                        readOnly
                                        placeholder={reason}
                                        className='h-[140px] resize-none'
                                    />
                                </div>
                            }
                        </div>
                        <SheetFooter className='py-6 px-4'>
                            {status === 1
                                ? <div className='flex items-center justify-center w-full gap-x-2'>
                                    <WithdrawConfirm
                                        id={id}
                                        userId={userId}
                                        name={name}
                                        number={number}
                                        quantity={quantity}
                                        fee={fee}
                                        type={type}
                                        address={address}
                                        company={company}
                                        companyAddress={companyAddress}
                                        companyTin={companyTin}
                                        swift={swift}
                                        createdAt={createdAt}
                                    />
                                    <WithdrawReject
                                        id={id}
                                    />
                                </div>
                                : <SheetClose asChild>
                                    <Button className={'w-full'}>Zapri</Button>
                                </SheetClose>
                            }
                        </SheetFooter>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    )
}

function WithdrawConfirm({ id, name, number, quantity, fee, type, address, company, companyAddress, companyTin, swift, createdAt }: Partial<WithdrawsProps>) {
    const [agree, setAgree] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)

    async function handleSubmit() {
        const payload = {
            status: 2
        }
        if (id) {
            await updateAdminWithdrawStatus(id, payload)
            setSuccess(true)
        }
        try {
            toast.success('Urejeno!', {
                position: 'bottom-center'
            })
        } catch (error) {
            if (error instanceof Error) {
                const err = JSON.parse(error.message)
                toast.error('Nekaj je šlo narobe.', {
                    description: err.message
                })
            }
        }
    }
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className='w-2/3'>
                    Izplačaj
                </Button>
            </SheetTrigger>
            <SheetContent className='w-full lg:!max-w-[420px] h-full p-0 overflow-y-scroll no-scrollbar'>
                {success
                    ? <SuccessScreen />
                    : <>
                        <SheetHeader className='flex items-start w-full shadow-dashboard-header py-8'>
                            <p className="pl-4 text-h6 font-baskerville">Izplačilo</p>
                        </SheetHeader>
                        <div className='flex flex-col justify-between min-h-[calc(100%-160px)]'>
                            {type === 1 &&
                                <PersonalAccountDetails
                                    name={name}
                                    address={address}
                                    number={number}
                                    quantity={quantity}
                                    fee={fee}
                                    createdAt={createdAt}
                                />}
                            {type === 2 &&
                                <BussinessAccountDetails
                                    name={name}
                                    number={number}
                                    company={company}
                                    companyAddress={companyAddress}
                                    companyTin={companyTin}
                                    swift={swift}
                                    createdAt={createdAt}
                                />}
                            <div className='flex items-center py-8 px-6'>
                                <Checkbox defaultChecked={agree} onCheckedChange={() => setAgree(!agree)} />
                                <Label>Potrjujem da sem nakazal stranki izplačilo</Label>
                            </div>
                        </div>
                        <SheetFooter>
                            <div className='flex items-center justify-center w-full py-2 px-4 gap-x-2'>
                                <SheetClose asChild>
                                    <Button variant={'light'}>
                                        <Icons.ArrowLeft />
                                    </Button>
                                </SheetClose>
                                <Button disabled={!agree} onClick={handleSubmit} className='w-full'>
                                    Izplačaj uporabnika
                                </Button>
                            </div>
                        </SheetFooter>
                    </>
                }
            </SheetContent>
        </Sheet>
    )
}

function WithdrawReject({ id }: Partial<WithdrawsProps>) {
    const [reason, setReason] = useState<string>('')
    const [success, setSuccess] = useState<boolean>(false)

    async function handleSubmit() {
        const payload = {
            status: 3,
            reason
        }
        if (id) {
            await updateAdminWithdrawStatus(id, payload)
            setSuccess(true)
        }
        try {
            toast.success('Urejeno!', {
                position: 'bottom-center'
            })
        } catch (error) {
            if (error instanceof Error) {
                const err = JSON.parse(error.message)
                toast.error('Nekaj je šlo narobe.', {
                    description: err.message
                })
            }
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReason(event.target.value) // Actualizamos el estado con el valor del input
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className='w-1/3' variant={'light'}>
                    Zavrni
                </Button>
            </SheetTrigger>
            <SheetContent className='w-full lg:!max-w-[420px] h-full p-0 overflow-y-scroll no-scrollbar'>
                {success
                    ? <SuccessScreen />
                    : <>
                        <SheetHeader className='flex items-start w-full shadow-dashboard-header py-8'>
                            <p className="pl-4 text-body-big font-baskerville">Sporoči uporabniku razlog zavrnitve</p>
                        </SheetHeader>
                        <div className='flex flex-col justify-between min-h-[calc(100%-160px)] px-6'>
                            <div className='flex flex-col py-6 gap-y-2'>
                                <Label className='font-bold'>Razlog zavrnitve</Label>
                                <Textarea
                                    onChange={handleChange}
                                    placeholder={reason}
                                    className='h-[140px] resize-none'
                                />
                            </div>
                        </div>
                        <SheetFooter>
                            <div className='flex items-center justify-center w-full py-2 px-4 gap-x-2'>
                                <Button disabled={reason.length < 3} onClick={handleSubmit} className='w-2/3'>
                                    Pošlji
                                </Button>
                                <SheetClose asChild>
                                    <Button variant={'light'} className='w-1/3'>
                                        Zapri
                                    </Button>
                                </SheetClose>
                            </div>
                        </SheetFooter>
                    </>
                }
            </SheetContent>
        </Sheet>
    )
}

function PersonalAccountDetails({ name, address, number, quantity, fee, createdAt }: Partial<WithdrawsProps>) {
    return (
        <div className='flex flex-col w-full'>
            <div className='flex flex-col items-start w-full bg-primary-white shadow-box px-7 space-y-0 py-6'>
                <p className='font-dm-sans uppercase'>NASLOVNIK</p>
                <p className='font-bold'>{name}</p>
            </div>
            <div className='flex flex-col items-start w-full bg-primary-white shadow-box px-7 space-y-0 py-6'>
                <p className='font-dm-sans uppercase'>Naslov</p>
                <p className='font-bold'>{address}</p>
            </div>
            <div className='flex flex-col items-start w-full bg-primary-white shadow-box px-7 space-y-0 py-6'>
                <p className='font-dm-sans uppercase'>IBAN - TRR</p>
                <p className='font-bold'>{number}</p>
            </div>
            {/* <div className='flex flex-col items-start w-full bg-primary-white shadow-box px-7 space-y-0 py-6'>
                <p className='font-dm-sans uppercase'>REFERENCA</p>
                <p className='font-bold'>{name}</p>
            </div> */}
            <div className='flex flex-col items-start w-full bg-primary-white shadow-box px-7 space-y-0 py-6'>
                <p className='font-dm-sans uppercase'>NAMEN</p>
                <p className='font-bold'>Plačilo provizije {createdAt ? format(createdAt, 'MMMM', { locale: sl }) : ''}</p>
            </div>
            <div className="flex w-full justify-between py-8 px-6 bg-primary-white shadow-box">
                <p className='font-dm-sans uppercase'>VSE SKUPAJ</p>
                <b>{(Number(quantity) - Number(fee)).toLocaleString('sl-SL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} EUR</b>
            </div>
        </div>
    )
}

function BussinessAccountDetails({ name, number, company, companyAddress, companyTin, swift, createdAt }: Partial<WithdrawsProps>) {
    return (
        <div className='flex flex-col w-full'>
            <div className='flex flex-col items-start w-full bg-primary-white shadow-box px-7 space-y-0 py-6'>
                <p className='font-dm-sans uppercase'>Ime podjetja in pravna oblika</p>
                <p className='font-bold'>{company}</p>
            </div>
            <div className='flex flex-col items-start w-full bg-primary-white shadow-box px-7 space-y-0 py-6'>
                <p className='font-dm-sans uppercase'>Naslov podjetja</p>
                <p className='font-bold'>{companyAddress}</p>
            </div>
            <div className='flex flex-col items-start w-full bg-primary-white shadow-box px-7 space-y-0 py-6'>
                <p className='font-dm-sans uppercase'>Davčna številka podjetja</p>
                <p className='font-bold'>{companyTin}</p>
            </div>
            <div className='flex flex-col items-start w-full bg-primary-white shadow-box px-7 space-y-0 py-6'>
                <p className='font-dm-sans uppercase'>Ime in priimek lastnika računa</p>
                <p className='font-bold'>{name}</p>
            </div>
            <div className='flex flex-col items-start w-full bg-primary-white shadow-box px-7 space-y-0 py-6'>
                <p className='font-dm-sans uppercase'>TRR številka</p>
                <p className='font-bold'>{number}</p>
            </div>
            <div className='flex flex-col items-start w-full bg-primary-white shadow-box px-7 space-y-0 py-6'>
                <p className='font-dm-sans uppercase'>BIC/SWIFT koda banke</p>
                <p className='font-bold'>{swift}</p>
            </div>
            {/* <div className='flex flex-col items-start w-full bg-primary-white shadow-box px-7 space-y-0 py-6'>
                <p className='font-dm-sans uppercase'>referenca</p>
                <p>{referenca}</p>
            </div> */}
            <div className='flex flex-col items-start w-full bg-primary-white shadow-box px-7 space-y-0 py-6'>
                <p className='font-dm-sans uppercase'>Namen</p>
                <p className='font-bold'>Plačilo provizije {createdAt ? format(createdAt, 'MMMM', { locale: sl }) : ''}</p>
            </div>
        </div>
    )
}

function SuccessScreen() {
    return (
        <div className='flex flex-col items-center justify-between py-12 gap-y-12 absolute w-full top-0 left-0 h-screen bg-primary-white overflow-hidden'>
            <div className='flex flex-col items-center w-full gap-y-6 pt-[180px]'>
                <Ilustrations.List />
                <div className='flex flex-col items-center justify-center text-center px-2'>
                    <h3 className='text-h5 font-baskerville'>Čestitamo!</h3>
                    <p className='text-h5 font-baskerville'>
                        Akcija je bila uspešno opravljena.
                    </p>
                </div>
            </div>
            <Button onClick={() => location.reload()} className='w-3/5'>
                Končaj
            </Button>
        </div>
    )
}
