'use client'

import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { Ilustrations } from '@/components/ui/ilustrations'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader } from '@/components/ui/sheet'
import { deleteWill } from '@/lib/services/admin/users/wills'
import { cn } from '@/lib/utils/style'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { create } from 'zustand'

/* ---------------------------------------------------------------------------------------------
 * State
 * ------------------------------------------------------------------------------------------- */
interface AdminDeleteWillStoreProps {
    isOpen: boolean
    setIsOpen: (v: boolean) => void
    currentStep: number
    setCurrentStep: (v: number) => void
    currentWillId: number
    setCurrentWillId: (v: number) => void
}

export const useAdminDeleteWillState = create<AdminDeleteWillStoreProps>()((set) => ({
    isOpen: false,
    setIsOpen: (v) => set(() => ({ isOpen: v })),
    currentStep: 0,
    setCurrentStep: (v) => set(() => ({ currentStep: v })),
    currentWillId: 0,
    setCurrentWillId: (v) => set(() => ({ currentWillId: v }))
}))

/* ---------------------------------------------------------------------------------------------
 * Main
 * ------------------------------------------------------------------------------------------- */
export function AdminDeleteWillSheet() {
    const isOpen = useAdminDeleteWillState(s => s.isOpen)
    const setIsOpen = useAdminDeleteWillState(s => s.setIsOpen)
    const currentStep = useAdminDeleteWillState(s => s.currentStep)
    const setCurrentStep = useAdminDeleteWillState(s => s.setCurrentStep)
    const setCurrentWillId = useAdminDeleteWillState(s => s.setCurrentWillId)

    function handleOpenChange(isOpen: boolean) {
        if (isOpen === false) {
            setCurrentWillId(0)
            setIsOpen(false)
            setCurrentStep(0)
        }
    }

    return (
        <Sheet open={isOpen} onOpenChange={handleOpenChange}>
            <SheetContent className='w-full lg:!max-w-[420px] h-full bg-[#F1F1F1] p-0'>
                <ScrollArea
                    className={cn(
                        'w-full h-full',
                        '[&>div>div]:min-h-full [&>div>div]:!flex [&>div>div]:flex-col'
                    )}
                >
                    <WillDeleteConfirmationStep className={cn(currentStep === 0 && 'flex')} />
                    <WillSuccessFormStep className={cn(currentStep === 1 && 'flex')} />
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}

/* ---------------------------------------------------------------------------------------------
 * Steps
 * ------------------------------------------------------------------------------------------- */
interface StepComponentProps {
    className?: string
}

/* ---------------------------------------------------------------------------------------------
 * Step 0
 * ------------------------------------------------------------------------------------------- */
function WillDeleteConfirmationStep({ className }: StepComponentProps) {
    const [isLoading, setIsLoading] = useState(false)
    const currentWillId = useAdminDeleteWillState(s => s.currentWillId)
    const setCurrentStep = useAdminDeleteWillState(s => s.setCurrentStep)

    async function handleConfirm() {
        try {
            setIsLoading(true)
            await deleteWill(currentWillId)
            setCurrentStep(1)
        } catch (error) {
            if (error instanceof Error) {
                toast.error('Nekaj je šlo narobe.', {
                    description: JSON.parse(error.message).message
                })
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={cn('hidden flex-auto flex-col', className)}>
            <SheetHeader className='flex items-start w-full bg-primary-white shadow-sheet-section px-7 pt-10 pb-8 space-y-0 relative z-[100]'>
                <p className="text-h6 font-baskerville">Izbriši Oporoko</p>
                <span className="text-body-medium font-medium">ID oporoka: {currentWillId}</span>
            </SheetHeader>
            <SheetHeader className='flex flex-auto justify-center items-center w-full px-7 pt-10 pb-8 space-y-0 relative z-[100]'>
                <Ilustrations.Time className='w-full max-w-44 lg:max-w-72' />
                <span className="text-h5 font-baskerville text-center !mb-8">Oporoko boste zbrisali.</span>
                <p className="text-body-big-2 text-center !mb-6">Če se stirnjate prosim kliknite spodaj</p>
                <p className="text-body-big-2 font-bold text-center !mb-6">Dokončno Izbriši</p>
            </SheetHeader>
            <SheetFooter className='flex items-center justify-center w-full bg-primary-white px-6 py-4 mt-auto'>
                <Button
                    variant='destructive'
                    disabled={isLoading}
                    className='w-full'
                    onClick={handleConfirm}
                >
                    <span className='flex items-center gap-[10px]'>
                        {isLoading && (
                            <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        <span className='leading-none '>Dokončno Izbriši</span>
                    </span>
                </Button>
            </SheetFooter>
        </div>
    )
}

/* ---------------------------------------------------------------------------------------------
 * Step 1
 * ------------------------------------------------------------------------------------------- */
function WillSuccessFormStep({ className }: StepComponentProps) {
    const { refresh } = useRouter()
    return (
        <div className={cn('hidden flex-auto flex-col', className)}>
            <SheetHeader className='flex flex-auto justify-center items-center w-full px-7 pt-10 pb-8 space-y-0 relative z-[100]'>
                <Ilustrations.List className='w-full max-w-44 lg:max-w-72' />
                <span className="text-h5 font-baskerville text-center !mb-8">Urejeno!</span>
                <p className="text-body-big-2 text-center !mb-6">Vaš proces je bil uspešno obdelan in opravljen.</p>
            </SheetHeader>
            <SheetFooter className='flex items-center justify-center w-full bg-primary-white px-6 py-4 mt-auto'>
                <SheetClose asChild>
                    <Button className='w-full' onClick={() => refresh()}>
                        Končaj
                    </Button>
                </SheetClose>
            </SheetFooter>
        </div>
    )
}
