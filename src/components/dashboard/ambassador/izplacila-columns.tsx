'use client'
// Next
// Components
import { MovementIcon, MovementRowItem } from '../ui/movement-row'
// Utils
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Icons } from '@/components/ui/icons'
import { Label } from '@/components/ui/label'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/text-area'
import { formatDate } from '@/lib/utils/date'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { sl } from 'date-fns/locale'
import { UsersInfoBlockItem } from '../admin/users/users-info-card'

export const IzplacilaColumns: ColumnDef<WithdrawsProps>[] = [
    {
        accessorKey: 'id',
        filterFn: (row, columnId, filterValue) => {
            const prefixedId = `${row.getValue(columnId)}`.toLowerCase()
            const lowerCaseFilterValue = filterValue.toLowerCase()
            return prefixedId.includes(lowerCaseFilterValue)
        },
        header: () => null,
        cell: ({ row }) =>
            <MovementRowItem className='justify-start items-center !w-[180px] gap-x-3 overflow-hidden'>
                <MovementIcon icon={<Icons.Docs />} />
                <div className='flex flex-col items-start justify-center'>
                    <b>ID: {row.original.id}</b>
                    <span className='line-clamp-1 text-body-small'>
                        {format(row.original.updatedAt, 'PP', { locale: sl })}
                    </span>
                </div>
            </MovementRowItem>
    },
    {
        accessorKey: 'status',
        filterFn: (row, columnId, value) => {
            const status = row.getValue(columnId)
            return status === value || String(status).includes(String(value))
        },
        header: () => null,
        cell: ({ row }) =>
            <div className='flex flex-col justify-center items-start w-[100px] h-full'>
                <span className='font-semibold line-clamp-1'>
                    {row.getValue('status') === 1 && 'V obdelavi'}
                    {row.getValue('status') === 2 && 'Končano '}
                    {row.getValue('status') === 3 && 'Zavrnjeno'}
                </span>
            </div>
    },
    {
        accessorKey: 'quantity',
        filterFn: 'includesString',
        header: () => null,
        cell: ({ row }) =>
            <div className='flex justify-end items-center w-[90px] h-full font-bold'>
                <p className='line-clamp-1 text-ellipsis'>
                    {row.getValue('quantity')
                        ? <p> - {row.getValue('quantity')} EUR</p>
                        : ''}
                </p>
            </div>
    },
    {
        accessorKey: 'uId',
        filterFn: 'includesString',
        header: () => null,
        cell: ({ row }) =>
            <div className='justify-start items-center ml-2 w-fit overflow-hidden'>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button>
                            Poglej več
                        </Button>
                    </SheetTrigger>
                    <SheetContent className='w-full lg:!max-w-[420px] h-full p-0'>
                        <IzplacilaDetails
                            userId={row.original.userId}
                            id={row.original.id}
                            type={row.original.type}
                            createdAt={row.original.createdAt}
                            updatedAt={row.original.updatedAt}
                            name={row.original.name}
                            company={row.original.company}
                            quantity={row.original.quantity}
                            fee={row.original.fee}
                            reason={row.original.reason}
                            status={row.original.status}
                            user={row.original.user}
                        />
                    </SheetContent>
                </Sheet>
            </div>
    }
]

function IzplacilaDetails({ userId, id, createdAt, status, quantity, fee, updatedAt, reason, user }: Partial<WithdrawsProps>) {
    return (
        <Card className='border-none h-full'>
            <CardHeader className='flex px-6 shadow-dashboard-header'>
                <CardTitle className='text-h6 pt-6 font-baskerville font-normal'>
                    Podrobnosti izplačila
                </CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-y-4 p-6 justify-between h-[calc(100%-80px)]'>
                <div className='flex flex-col'>
                    <UsersInfoBlockItem loading={false} label='ID IZPLAČILA' className='!font-bold'>
                        <p className='font-bold'>
                            {id}
                        </p>
                    </UsersInfoBlockItem>
                    <UsersInfoBlockItem loading={false} label='ID UPORABNIKA' className='!font-bold'>
                        <p className='font-bold'>
                            #{userId}
                        </p>
                    </UsersInfoBlockItem>
                    <UsersInfoBlockItem loading={false} label='IME IN PRIIMEK'>
                        <p className='font-bold'>
                            {user?.name} {user?.lastName}
                        </p>
                    </UsersInfoBlockItem>
                    <UsersInfoBlockItem loading={false} label='STATUS'>
                        <p className='font-bold'>
                            {status === 1 && 'V obdelavi'}
                            {status === 3 && 'Zavrnjeno'}
                            {status === 2 && 'Končano'}
                        </p>
                    </UsersInfoBlockItem>
                    <UsersInfoBlockItem loading={false} label='DATUM ODDANEGA ZAHTEVKA'>
                        <p className='font-bold'>
                            {createdAt && formatDate(createdAt)}
                        </p>
                    </UsersInfoBlockItem>
                    <UsersInfoBlockItem loading={false} label='KOLIČINA IZPLAČILA'>
                        <p className='font-bold'>
                            {quantity
                                ? Number(quantity).toLocaleString('sl-SI', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                }) + ' EUR'
                                : '-'}
                        </p>
                    </UsersInfoBlockItem>
                    <UsersInfoBlockItem loading={false} label='STROŠKI OBDELAVE'>
                        <p className='font-bold'>
                            {fee
                                ? Number(fee).toLocaleString('sl-SI', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                }) + ' EUR'
                                : '-'}
                        </p>
                    </UsersInfoBlockItem>
                    <UsersInfoBlockItem loading={false} label='VSE SKUPAJ IZPLAČILO'>
                        <p className='font-bold'>
                            {(quantity && fee)
                                ? (Number(quantity) - Number(fee)).toLocaleString('sl-SI', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                }) + ' EUR'
                                : '-'}
                        </p>
                    </UsersInfoBlockItem>
                    <UsersInfoBlockItem loading={false} label='DATUM IZPLAČILA PROVIZIJE NA TRR'>
                        <p className='font-bold'>
                            { status === 2 ? updatedAt ? formatDate(updatedAt) : '/' : '/' }
                        </p>
                    </UsersInfoBlockItem>
                    {reason &&
                        <div className='flex flex-col py-6 gap-y-2'>
                            <Label className='font-bold'>Razlog zavrnitve</Label>
                            <Textarea
                                readOnly
                                placeholder={reason}
                                className='h-[140px] resize-none'
                            />
                        </div>
                    }
                </div>
                <SheetClose asChild>
                    <Button>
                        Zapri
                    </Button>
                </SheetClose>
            </CardContent>
        </Card>
    )
}
