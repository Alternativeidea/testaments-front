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

export const UserListColumns: ColumnDef<UserProps>[] = [
    {
        accessorKey: 'id',
        header: () => <div className='w-[60px]'>ID</div>,
        cell: ({ row }) => <div className='w-[60px]'>{formatData(row.getValue('id'))}</div>
    },
    {
        accessorKey: 'createdAt',
        header: () => <div className='text-ellipsis line-clamp-1'>Datum vpisa</div>,
        cell: ({ row }) => <div className='text-[15px]'>{formatDate(row.getValue('createdAt'))}</div>
    },
    {
        accessorKey: 'name',
        header: () => <div className='text-ellipsis line-clamp-1'>Ime in priimek</div>,
        cell: ({ row }) => <div className='line-clamp-1'>{row.getValue('status') === 5 ? '/' : row.getValue('name')}</div>
    },
    {
        accessorKey: 'email',
        header: () => <div>E-naslov</div>,
        cell: ({ row }) => <div className='text-body-small'>{row.getValue('status') === 5 ? '/' : row.getValue('email')}</div>
    },
    {
        accessorKey: 'status',
        header: () => <div>Status</div>,
        filterFn: 'equalsString',
        cell: ({ row }) => <div>
            {row.getValue('status') === -1 && 'Suspendirani' }
            {row.getValue('status') === 0 && 'Neaktive' }
            {row.getValue('status') === 1 && 'Aktiven' }
            {row.getValue('status') === 4 && 'Pokojni' }
            {row.getValue('status') === 5 && 'Izbrisani' }
        </div>
    },
    {
        accessorKey: 'membershipId',
        header: () => <div>Membership</div>,
        filterFn: 'equalsString',
        cell: ({ row }) => <div>
            {row.getValue('membershipId') === 1 && 'Free' }
            {row.getValue('membershipId') === 2 && 'Premium' }
        </div>
    },
    {
        accessorKey: 'isAmbassador',
        header: () => <div>Svetovalec</div>,
        filterFn: 'equalsString',
        cell: ({ row }) => <div className='line-clamp-1 w-[40px]'>
            {row.getValue('isAmbassador') === true && 'Da' }
            {row.getValue('isAmbassador') === false && 'Ne' }
        </div>
    },
    {
        accessorKey: 'id',
        header: () => <></>,
        cell: ({ row }) => (
            <Link href={`/namizje/admin/gold/users/${row.getValue('id')}`}>
                <Button>
                    <p className=''>Poglej več</p>
                </Button>
            </Link>
        )
    }
]
