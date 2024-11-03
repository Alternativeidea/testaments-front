'use client'

import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils/date'
import { formatData } from '@/lib/utils/format'
import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'

interface UserProps {
    id: string,
    date: string | Date,
    name: string,
    email: string,
    status: string
    isAmbassador: boolean
}

export const AmbassadorListColumns: ColumnDef<UserProps>[] = [
    {
        accessorKey: 'id',
        header: () => <div className='w-[60px]'>ID</div>,
        cell: ({ row }) => <div className='w-[60px] font-bold'>{formatData(row.getValue('id'))}</div>
    },
    {
        accessorKey: 'createdAt',
        header: () => <div className='text-ellipsis line-clamp-1 w-[100px]'>Datum vpisa</div>,
        cell: ({ row }) => <div className='text-[15px] w-[100px] font-bold'>{formatDate(row.getValue('createdAt'))}</div>
    },
    {
        accessorKey: 'name',
        header: () => <div className='text-ellipsis line-clamp-1'>Ime in priimek in email</div>,
        cell: ({ row }) =>
            <div className='flex flex-col'>
                <div className='line-clamp-1 font-bold'>{row.getValue('name')}</div>
                <div className='line-clamp-1 text-body-extra-small'>{row.original.email}</div>
            </div>
    },
    {
        accessorKey: 'directs',
        header: () => <div className='text-ellipsis line-clamp-1'>1. Nivo</div>,
        cell: ({ row }) => <div className='text-[15px] font-bold'>{row.getValue('directs')}</div>
    },
    {
        accessorKey: 'indirects',
        header: () => <div className='text-ellipsis line-clamp-1'>2. Nivo</div>,
        cell: ({ row }) => <div className='text-[15px] font-bold w-[100px]'>{row.getValue('indirects')}</div>
    },
    {
        accessorKey: 'generated',
        header: () => <div className='text-ellipsis line-clamp-1'>Skupaj promet</div>,
        cell: ({ row }) => <div className='text-[15px] font-bold'>{Number(row.getValue('generated')).toLocaleString('sl-SI', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })} EUR</div>
    },
    {
        accessorKey: 'commissions',
        header: () => <div className='text-ellipsis line-clamp-1'>Skupaj provizija</div>,
        cell: ({ row }) => <div className='text-[15px] font-bold'>{Number(row.getValue('commissions')).toLocaleString('sl-SI', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })} EUR</div>
    },
    {
        accessorKey: 'id',
        header: () => <></>,
        cell: ({ row }) => (
            <Link href={`/namizje/admin/gold/users/${row.getValue('id')}?tab=svetovalec`}>
                <Button>
                    <p className=''>Poglej več</p>
                </Button>
            </Link>
        )
    }
]
