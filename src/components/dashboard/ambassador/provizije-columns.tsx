'use client'
// Next
// Components
import { MovementIcon, MovementRowItem } from '../ui/movement-row'
// Utils
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Icons } from '@/components/ui/icons'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { formatDate } from '@/lib/utils/date'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { sl } from 'date-fns/locale'
import { UsersInfoBlockItem } from '../admin/users/users-info-card'

export const ProvizijeColumns: ColumnDef<ProvizijeProps>[] = [
    {
        accessorKey: 'tId',
        filterFn: 'includesString',
        header: () => null,
        cell: ({ row }) =>
            <MovementRowItem className='justify-start items-center !w-[180px] gap-x-3 overflow-hidden'>
                <MovementIcon icon={<Icons.Docs />} />
                <div className='flex flex-col items-start justify-center'>
                    <b>
                        ID: {
                            row.original.type !== 3
                                ? `${row.getValue('tId')}`
                                : `${row.getValue('uId')}${row.original.createdAt && format(row.original.createdAt, 'yyMM')}`
                        }
                    </b>
                    <span className='line-clamp-1 text-body-small'>
                        {formatDate(row.original.createdAt)}
                    </span>
                </div>
            </MovementRowItem>
    },
    {
        accessorKey: 'relativeLevel',
        filterFn: 'includesString',
        header: () => null,
        cell: ({ row }) =>
            <div className='flex flex-col justify-center items-start w-[160px] h-full'>
                <span className='font-semibold line-clamp-1'>
                    { row.getValue('relativeLevel') === 1 ? 'Provizija 1. nivoja' : 'Provizija 2. nivoja' }
                </span>
                <span className='text-body-small'>
                    { row.original.type !== 3 ? 'TST Dodajanje' : 'Premium'}
                </span>
            </div>
    },
    {
        accessorKey: 'commission',
        filterFn: 'includesString',
        header: () => null,
        cell: ({ row }) =>
            <div className='flex justify-end items-center w-[90px] h-full font-bold'>
                <p className='line-clamp-1 text-ellipsis'>
                    {row.getValue('commission')
                        ? <p>+ {Number(row.getValue('commission')).toLocaleString('sl-SI', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })} EUR</p>
                        : '' }
                </p>
            </div>
    },
    {
        accessorKey: 'uId',
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
                        <ProvizijeDetails
                            uId={row.original.uId}
                            tId={row.original.tId}
                            rUserId={row.original.rUserId}
                            total={row.original.total}
                            commission={row.original.commission}
                            createdAt={row.original.createdAt}
                            relativeLevel={row.original.relativeLevel}
                            type={row.original.type}
                        />
                    </SheetContent>
                </Sheet>
            </div>
    }
]

// This one shows on the TST svetovalec on user dashboard
function ProvizijeDetails({ uId, tId, rUserId, createdAt, total, commission, relativeLevel, type }: Partial<ProvizijeProps>) {
    return (
        <Card className='border-none h-full'>
            <CardHeader className='flex px-6 shadow-dashboard-header'>
                <CardTitle className='text-h6 pt-6 font-baskerville font-normal'>
                    Podrobnosti provizije
                </CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-y-4 p-6 justify-between h-[calc(100%-80px)]'>
                <div className='flex flex-col'>
                    <UsersInfoBlockItem loading={false} label='STATUS'>
                        Končano
                    </UsersInfoBlockItem>
                    <UsersInfoBlockItem loading={false} label='TIP NAROČILA'>
                        { type !== 3 ? 'TST Dodajanje' : 'Premium' }
                    </UsersInfoBlockItem>
                    <UsersInfoBlockItem loading={false} label='ID PROVIZIJE'>
                        {
                            type !== 3 ? tId : `${uId}${createdAt && format(createdAt, 'yyMM')}`
                        }
                    </UsersInfoBlockItem>
                    <UsersInfoBlockItem loading={false} label='DATUM NAROČILA'>
                        {createdAt && format(createdAt, 'PPP', { locale: sl })}
                    </UsersInfoBlockItem>
                    <UsersInfoBlockItem loading={false} label='ZNESEK NAROČILA'>
                        {total
                            ? Number(total).toLocaleString('sl-SI', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            }) + ' EUR'
                            : '/'}
                    </UsersInfoBlockItem>
                    <UsersInfoBlockItem loading={false} label='ID KUPCA'>
                        ID{uId}
                    </UsersInfoBlockItem>
                    <UsersInfoBlockItem loading={false} label='ID SPONZORJA'>
                        ID{rUserId}
                    </UsersInfoBlockItem>
                    <UsersInfoBlockItem loading={false} label='TIP PROVIZIJE'>
                        {`Provizija ${relativeLevel}. nivoja`}
                    </UsersInfoBlockItem>
                    <UsersInfoBlockItem loading={false} label='PROVIZIJA' separator={false}>
                        {commission
                            ? Number(commission).toLocaleString('sl-SI', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            }) + ' EUR'
                            : '-'}
                    </UsersInfoBlockItem>
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
