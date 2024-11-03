'use client'
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
import { Icons } from '@/components/ui/icons'
import { deleteFaq, patchFaq } from '@/lib/services/admin/faqs'
import { formatDate } from '@/lib/utils/date'
import { ColumnDef } from '@tanstack/react-table'
import { Star, Trash2, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { MovementIcon } from '../../ui/movement-row'

interface FaqRowProps {
    id: number
    question: string
    response: string
    active: boolean
    isFeatured: boolean
    section: number
    createdAt: string | Date,
}

const sections = ['', 'dashboard', 'storage', 'tst', 'market', 'news']

export const FaqListColumns: ColumnDef<FaqRowProps>[] = [
    {
        accessorKey: 'question',
        header: () => null,
        cell: ({ row }) =>
            <div className='flex gap-x-6 items-center min-w-[400px] max-w-[400px] text-ellipsis overflow-hidden'>
                <MovementIcon
                    icon={<Icons.Docs/>}
                    className='shadow-button bg-primary-light-gray/10'
                />
                <div className='flex flex-col'>
                    <span className='uppercase'>{sections[row.original.section]}</span>
                    <p className='font-baskerville font-medium'>{row.getValue('question')}</p>
                </div>
            </div>
    },
    {
        accessorKey: 'createdAt',
        header: () => null,
        cell: ({ row }) =>
            <div className='flex flex-col w-[200px]'>
                <span className='text-body-extra-small'>Datum objave</span>
                <p className='font-medium'>{formatDate(row.getValue('createdAt'))}</p>
            </div>
    },
    {
        accessorKey: 'active',
        header: () => null,
        cell: ({ row }) =>
            <div className='w-[200px] font-bold'>
                {row.getValue('active') ? 'Aktiven' : 'Neaktiven'}
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
                        isFeatured={row.original.isFeatured}/>
                    <>
                        <Link href={`/namizje/admin/faqs/${row.getValue('id')}`} className='text-accent-yellow'>
                            Uredi
                        </Link>
                        <DeleteFaq id={row.getValue('id')}/>
                    </>
                </div>
            </>
        )
    }
]

function ToggleFeatured({ isFeatured, id }: {id: number, isFeatured: boolean}) {
    const router = useRouter()
    async function handleIsFeatured(featured: boolean) {
        const payload = {
            isFeatured: featured
        }
        await patchFaq(payload, id)
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
            ? <Star onClick={() => handleIsFeatured(false)} fill='black' color='black' className='cursor-pointer'/>
            : <Star onClick={() => handleIsFeatured(true)} className='cursor-pointer'/>
    )
}

function DeleteFaq({ id } : {id: number}) {
    async function handleDelete() {
        await deleteFaq(id)
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
        location.reload()
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Trash2 color='#D84C10' />
            </AlertDialogTrigger>
            <AlertDialogContent className='flex flex-col gap-y-4 py-6 border-none px-8'>
                <AlertDialogHeader className='flex flex-col items-center justify-center text-center'>
                    <AlertDialogTitle className='font-baskerville text-body-big font-normal'>Izbris novice</AlertDialogTitle>
                    <AlertDialogDescription className='flex flex-col items-center justify-center text-center gap-y-4 py-6'>
                        <h3 className='text-h5 font-baskerville text-primary-dark-gray'>Ime Novice</h3>
                        <span className='text-body-small'>
                            Ali ste prepričani da želite izbrisati novico
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
                    <X/>
                </AlertDialogCancel>
            </AlertDialogContent>
        </AlertDialog>
    )
}
