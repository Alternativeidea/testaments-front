'use client'
// React
import { useRouter } from 'next/navigation'
// Components
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
// Utils
import { acceptAdminLater } from '@/lib/services/admin/laters'
import { toast } from 'sonner'

export default function AcceptLaterForm({ name, lastName, id } : {name: string, lastName: string, id: string}) {
    const router = useRouter()

    async function handleSubmit() {
        await acceptAdminLater(id)
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
        router.refresh()
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className='w-full'>
                    Potrdi
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className='flex flex-col items-center justify-center gap-4 p-6'>
                <AlertDialogHeader>
                    <AlertDialogTitle className='text-body-big font-normal font-baskerville'>
                        Plačilo članarine
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <h3 className='text-h6 font-baskerville font-normal'>
                    {name + ' ' + lastName}
                </h3>
                <p>Potrdite ali je stranka plačala premium v gotovini?</p>
                <AlertDialogFooter className='w-full pt-4'>
                    <AlertDialogAction onClick={handleSubmit} className='w-full'>Da</AlertDialogAction>
                    <AlertDialogCancel className='w-full'>Ne</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
