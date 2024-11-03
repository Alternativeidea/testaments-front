'use client'

import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { Ilustrations } from '@/components/ui/ilustrations'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from '@/components/ui/sheet'
import { Skeleton } from '@/components/ui/skeleton'
import { Switch } from '@/components/ui/switch'
import { useFetch } from '@/lib/hooks/use-fetch'
import { getUser } from '@/lib/services/admin/users'
import { convertToPremiumId } from '@/lib/services/ambassadors'
import { cn } from '@/lib/utils/style'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface PremiumSheetProps {
    userId: number
}

export function PremiumSheet({ userId }: PremiumSheetProps) {
    const [isUpdated, setIsUpdated] = useState(false)
    // const [isAmbassador, setIsAmbassador] = useState(false)
    const [isLoadingConvert, setIsLoadingConvert] = useState(false)
    const { data, isLoading } = useFetch<Partial<ProfileProps>>(() => getUser(userId))

    useEffect(() => {
        if (data && data.isAmbassador !== undefined) {
            // setIsAmbassador(data.isAmbassador)
        }
    }, [data])

    async function handleIsPremium() {
        try {
            setIsLoadingConvert(true)
            await convertToPremiumId(userId)
            // setIsAmbassador(a => !a)
            setIsUpdated(true)
            toast.success('Urejeno!', {
                position: 'bottom-center'
            })
            location.reload()
        } catch (error) {
            // setIsAmbassador(isAmbassador)
            toast.error('Nekaj je šlo narobe.', {
                description: ''
            })
        } finally {
            setIsLoadingConvert(false)
        }
    }

    function handleOpenChange(isOpen: boolean) {
        if (!isOpen) {
            setIsUpdated(false)
        }
    }

    return (
        <Sheet onOpenChange={handleOpenChange}>
            <SheetTrigger asChild>
                {isLoading
                    ? <Skeleton className='my-auto w-[160px] h-6'/>
                    : <Switch className={cn('bg-primary-light-gray')}/>
                }
            </SheetTrigger>
            <SheetContent className='w-full lg:!max-w-[420px] h-full bg-[#F1F1F1] p-0'>
                <ScrollArea
                    className={cn(
                        'w-full h-full',
                        '[&>div>div]:min-h-full [&>div>div]:!flex [&>div>div]:flex-col'
                    )}
                >
                    {!isUpdated && <div className={cn('flex flex-auto flex-col')}>
                        <SheetHeader className='flex flex-auto justify-center items-center w-full px-7 pt-10 pb-8 space-y-0 relative z-[100]'>
                            <Ilustrations.List className='w-full max-w-44 lg:max-w-72' />
                            <span className="text-h5 font-baskerville text-center !mb-8">Ste prepričani da želite da postane uporabnik Premium?</span>
                        </SheetHeader>
                        <SheetFooter className='flex items-center justify-center w-full bg-primary-white px-6 py-4 mt-auto'>
                            <Button
                                disabled={isLoadingConvert}
                                onClick={handleIsPremium}
                                className='w-full'
                            >
                                <span className='flex items-center gap-[10px]'>
                                    {isLoadingConvert && (
                                        <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    <span className='leading-none '>DA</span>
                                </span>
                            </Button>
                            <SheetClose asChild>
                                <Button
                                    variant='destructive'
                                    className='w-full'
                                >
                                    NE
                                </Button>
                            </SheetClose>
                        </SheetFooter>
                    </div>}
                    {isUpdated && (
                        <div className={cn('flex flex-auto flex-col')}>
                            <SheetHeader className='flex flex-auto justify-center items-center w-full px-7 pt-10 pb-8 space-y-0 relative z-[100]'>
                                <Ilustrations.List className='w-full max-w-44 lg:max-w-72' />
                                <span className="text-h5 font-baskerville text-center !mb-8">Čestitamo!
                                Akcija je bila uspešno opravljena.</span>
                            </SheetHeader>
                            <SheetFooter className='flex items-center justify-center w-full bg-primary-white px-6 py-4 mt-auto'>
                                <SheetClose asChild>
                                    <Button
                                        className='w-full'
                                    >
                                    Končaj
                                    </Button>
                                </SheetClose>
                            </SheetFooter>
                        </div>
                    )}
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}
