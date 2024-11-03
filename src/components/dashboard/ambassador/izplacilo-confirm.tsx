'use client'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { Ilustrations } from '@/components/ui/ilustrations'
import { Sheet, SheetClose, SheetContent } from '@/components/ui/sheet'
import { withdrawConfirm } from '@/lib/services/ambassadors'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function IzplaciloConfirm({ code, id }: { code: string, id: string }) {
    const [isOpen, setIsOpen] = useState<boolean>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    // const router = useRouter()

    useEffect(() => {
        const fetchData = async () => {
            const payload = {
                code
            }
            try {
                await withdrawConfirm(id, payload)
                setIsOpen(true)
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
            // router.push('/namizje/tst-svetovalec?tab=izplacila')
        }
        if (code) {
            fetchData()
            setIsLoading(true)
        }
    }, [code, id])

    function closeSheet() {
        setIsOpen(false)
        location.replace('/namizje/tst-svetovalec?tab=izplacila')
    }

    return (
        <Sheet open={isOpen} onOpenChange={closeSheet}>
            <SheetContent className='w-full lg:!max-w-[420px] h-full p-0 overflow-y-scroll no-scrollbar'>
                {isLoading
                    ? <div className='flex items-center justify-center h-full bg-primary-white relative z-[200] p-6'>
                        <Icons.Spinner className="mr-2 h-12 w-12 animate-spin" />
                    </div>
                    : <div className='flex flex-col items-center justify-between py-12 gap-y-12 absolute w-full top-0 left-0 h-screen bg-primary-white overflow-hidden'>
                        <div className='flex flex-col items-center w-full gap-y-6 pt-[180px]'>
                            <Ilustrations.Wallet />
                            <div className='flex flex-col gap-y-4 items-center justify-center text-center px-2'>
                                <h3 className='text-h5 font-baskerville'>Vaš zahtevek je oddan!</h3>
                                <p className='text-center text-body-medium px-6'>Vaš zahtevek za izplačilo je bil uspešno oddan. Zahvaljujemo se vam za vaše delo in prizadevanja. Postopek obdelave vaše zahteve je v teku in vas bomo obvestili takoj, ko bo izplačilo odobreno in izvedeno.</p>
                            </div>
                        </div>
                        <SheetClose asChild>
                            <Button onClick={() => setIsOpen(false)} className='w-3/5'>
                                Končaj
                            </Button>
                        </SheetClose>
                    </div>
                }
            </SheetContent>
        </Sheet>

    )
}
