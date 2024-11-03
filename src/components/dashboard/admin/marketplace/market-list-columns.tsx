'use client'
// Next
import Image from 'next/image'
import Link from 'next/link'
// Components
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Star, Trash2, X } from 'lucide-react'
import { MovementIcon } from '../../ui/movement-row'
// Utils
import { deleteProduct, patchProduct } from '@/lib/services/admin/products'
import { ColumnDef } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export const MarketListColumns: ColumnDef<ProductProps>[] = [
    {
        accessorKey: 'name',
        filterFn: 'includesString',
        header: () => null,
        cell: ({ row }) =>
            <Link href={`/namizje/admin/trznica/${row.original.id}`}>
                <div className='flex gap-x-6 items-center w-[400px] text-ellipsis overflow-hidden'>
                    <MovementIcon
                        icon={
                            row.original.category.image
                                ? <Image
                                    src={row.original.category.image}
                                    alt='category'
                                    width={24}
                                    height={24}
                                />
                                : '-'}
                        className='shadow-button bg-primary-light-gray/10 relative p-4'
                    />
                    <div className='flex flex-col'>
                        <span className='uppercase'>{row.original.categoryName}</span>
                        <p className='font-medium line-clamp-2 text-ellipsis'>
                            {row.getValue('name')}
                        </p>
                    </div>
                </div>
            </Link>
    },
    {
        accessorKey: 'createdAt',
        filterFn: 'includesString',
        header: () => null,
        cell: ({ row }) =>
            <div className='flex flex-col w-[120px]'>
                <span className='text-body-extra-small'>Datum objave</span>
                <p className='font-medium'>
                    {row.getValue('createdAt')}
                </p>
            </div>
    },
    {
        accessorKey: 'categoryName',
        header: () => null,
        cell: () => null
    },
    {
        accessorKey: 'status',
        header: () => null,
        cell: ({ row }) =>
            <div className='w-[100px] font-bold'>
                {row.getValue('status') === 0 && 'Neaktiven'}
                {row.getValue('status') === 1 && 'Aktiven'}
            </div>
    },
    {
        accessorKey: 'id',
        header: () => null,
        cell: ({ row }) => (
            <>
                <div className='flex gap-x-2 items-center justify-end px-4'>
                    <ToggleFeatured
                        id={row.getValue('id')}
                        isFeatured={row.original.isFeatured} />
                    <>
                        <Link href={`/namizje/admin/trznica/${row.original.id}`} className='text-accent-yellow'>
                            Uredi
                        </Link>
                        <DeletePost id={row.getValue('id')} />
                    </>
                </div>
            </>
        )
    }
]

function ToggleFeatured({ isFeatured, id }: { id: number, isFeatured: boolean }) {
    const router = useRouter()
    async function handleIsFeatured(featured: boolean) {
        const payload = {
            isFeatured: featured
        }
        await patchProduct(payload, id)
        router.refresh()
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
        isFeatured
            ? <Star onClick={() => handleIsFeatured(false)} fill='black' color='black' className='cursor-pointer' />
            : <Star onClick={() => handleIsFeatured(true)} className='cursor-pointer' />
    )
}

function DeletePost({ id }: { id: number }) {
    const router = useRouter()

    async function handleDelete() {
        await deleteProduct(id)
        router.refresh()
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
        <AlertDialog>
            <AlertDialogTrigger>
                <Trash2 color='#D84C10' />
            </AlertDialogTrigger>
            <AlertDialogContent className='flex flex-col gap-y-4 py-6 border-none px-8'>
                <AlertDialogHeader className='flex flex-col items-center justify-center text-center'>
                    <AlertDialogTitle className='font-baskerville text-body-big font-normal'>Izbris predmeta</AlertDialogTitle>
                    <AlertDialogDescription className='flex flex-col items-center justify-center text-center gap-y-4 py-6'>
                        <h3 className='text-h5 font-baskerville text-primary-dark-gray'>Ime predmeta</h3>
                        <span className='text-body-small'>
                            Ali ste prepričani da želite izbrisati predmet
                        </span>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className='w-full'>
                    <AlertDialogAction onClick={handleDelete} className='w-full'>
                        <p className=''>Da</p>
                    </AlertDialogAction>
                    <AlertDialogCancel className='w-full'>
                        <p className=''>Ne</p>
                    </AlertDialogCancel>
                </AlertDialogFooter>
                <AlertDialogCancel className='absolute top-2 right-2 w-fit border-none bg-transparent hover:bg-transparent hover:text-primary-dark-gray cursor-pointer'>
                    <X />
                </AlertDialogCancel>
            </AlertDialogContent>
        </AlertDialog>
    )
}
