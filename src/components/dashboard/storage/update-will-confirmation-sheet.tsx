'use client'

import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { Ilustrations } from '@/components/ui/ilustrations'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader } from '@/components/ui/sheet'
import { updateDeleteWill } from '@/lib/services/wills'
import { cn } from '@/lib/utils/style'
import dynamic from 'next/dynamic'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

function UpdateWillConfirmationSheet() {
    const [isOpen, setIsOpen] = useState<boolean>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const searchParams = useSearchParams()
    const isConfirmed = searchParams?.get('isConfirmed')
    const code = searchParams?.get('code')
    const action = searchParams?.get('action')
    const id = searchParams?.get('willId')
    const router = useRouter()

    useEffect(() => {
        const fetchData = async () => {
            const payload = {
                action,
                code
            }
            try {
                setIsOpen(true)
                if (id) {
                    await updateDeleteWill(parseInt(id), payload)
                }
            } catch (error) {
                if (error instanceof Error) {
                    setIsOpen(false)
                    const err = JSON.parse(error.message)
                    toast.error('Nekaj je šlo narobe.', {
                        description: err.message
                    })
                }
            }
            setIsLoading(false)
        }
        if (code) {
            fetchData()
        }
    }, [])

    function reloadPage() {
        router.push('/namizje/storage')
        router.refresh()
    }

    return (
        <Sheet defaultOpen={isConfirmed === 'true'} open={isOpen} onOpenChange={setIsOpen}>
            <SheetContent className='w-full lg:!max-w-[420px] h-full bg-[#F1F1F1] p-0'>
                {isLoading
                    ? <div className='flex items-center justify-center h-full bg-primary-white relative z-[200] p-6'>
                        <Icons.Spinner className="mr-2 h-12 w-12 animate-spin" />
                    </div>
                    : <ScrollArea
                        className={cn(
                            'w-full h-full',
                            '[&>div>div]:min-h-full [&>div>div]:!flex [&>div>div]:flex-col'
                        )}
                    >
                        <div className={cn('flex flex-auto flex-col')}>
                            <SheetHeader className='flex flex-auto justify-center items-center w-full px-7 pt-10 pb-8 space-y-0 relative z-[100]'>
                                <Ilustrations.Email className='w-full max-w-44 lg:max-w-72' />
                                <span className="text-h5 font-baskerville text-center !mb-8">Vaš zahtevek je oddan!</span>
                                <p className="text-body-big-2 text-center !mb-6">Zahtevek je bil uspešno poslan naši ekipi. Naša ekipa vas bo kmalu kontaktirala. Skupaj bomo določili termin za sestanek glede želene spremembe ali izbrisa oporoke.</p>
                                <p className="text-body-big-2 font-medium text-center">Najlepša hvala za Vaše zaupanje.</p>
                            </SheetHeader>
                            <SheetFooter className='flex items-center justify-center w-full bg-primary-white px-6 py-4 mt-auto'>
                                <SheetClose asChild>
                                    <Button
                                        onClick={reloadPage}
                                        className='w-full'
                                    >
                                    Končaj
                                    </Button>
                                </SheetClose>
                            </SheetFooter>
                        </div>
                    </ScrollArea>
                }
            </SheetContent>
        </Sheet>
    )
}

export default dynamic(
    async () => UpdateWillConfirmationSheet,
    { ssr: false }
)
