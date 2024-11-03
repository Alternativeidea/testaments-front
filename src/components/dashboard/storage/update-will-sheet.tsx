'use client'

import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { Ilustrations } from '@/components/ui/ilustrations'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from '@/components/ui/sheet'
import { WILL_EDIT_OR_DELETE_GUIDE_STEPS } from '@/lib/constants/wills'
import { updateDeleteWill } from '@/lib/services/wills'
import { cn } from '@/lib/utils/style'
import { useState } from 'react'
import { toast } from 'sonner'
import { create } from 'zustand'

/* ---------------------------------------------------------------------------------------------
 * State
 * ------------------------------------------------------------------------------------------- */
interface UpdateWillStoreProps {
    currentStep: number
    setCurrentStep: (v: number) => void
}

const useUpdateWillState = create<UpdateWillStoreProps>()((set) => ({
    currentStep: 0,
    setCurrentStep: (v) => set(() => ({ currentStep: v }))
}))

/* ---------------------------------------------------------------------------------------------
 * Main
 * ------------------------------------------------------------------------------------------- */
interface UpdateWillSheetProps {
    will: WillProps
    triggerText: 'Uredi' | 'Poglej več'
    categories: CategoryProps[]
}

export function UpdateWillSheet({ will, triggerText, categories }: UpdateWillSheetProps) {
    const currentStep = useUpdateWillState(s => s.currentStep)
    const setCurrentStep = useUpdateWillState(s => s.setCurrentStep)

    function handleOpenChange(isOpen: boolean) {
        if (isOpen === false) {
            setCurrentStep(0)
        }
    }

    function handleEnter() {
        if (triggerText === 'Poglej več') {
            setCurrentStep(1)
        }
    }

    return (
        <Sheet onOpenChange={handleOpenChange}>
            <SheetTrigger asChild onMouseEnter={handleEnter}>
                <Button className='w-full'>{triggerText}</Button>
            </SheetTrigger>
            <SheetContent className='w-full lg:!max-w-[420px] h-full bg-[#F1F1F1] p-0'>
                <ScrollArea
                    className={cn(
                        'w-full h-full',
                        '[&>div>div]:min-h-full [&>div>div]:!flex [&>div>div]:flex-col'
                    )}
                >
                    <UpdateWillGuideStep className={cn(currentStep === 0 && 'flex')} />
                    <UpdateWillResumeFormStep will={will} categories={categories} triggerText={triggerText} className={cn(currentStep === 1 && 'flex')} />
                    <UpdateWillConfirmationStep className={cn(currentStep === 2 && 'flex')} />
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
function UpdateWillGuideStep({ className }: StepComponentProps) {
    const setCurrentStep = useUpdateWillState(s => s.setCurrentStep)

    return (
        <div className={cn('hidden flex-auto flex-col', className)}>
            <SheetHeader className='flex items-start w-full px-7 pt-20 pb-10'>
                <p className="text-h6 font-baskerville">Kako Urediti - Izbrisati Oporoko</p>
            </SheetHeader>
            <SheetHeader className='flex items-start w-full bg-primary-white shadow-sheet-section px-7 py-[52px]'>
                <div className='flex flex-col gap-8'>
                    {WILL_EDIT_OR_DELETE_GUIDE_STEPS.map(({ name, description }, i) => (
                        <div key={`i-${name}-${i}`} className='flex items-start gap-6'>
                            <span
                                className='text-gradient-gold text-h6 font-baskerville'
                            >{i + 1}.{' '}</span>
                            <div className='grid'>
                                <span className='font-baskerville text-body-big-2'>{name}</span>
                                <span className='text-body-small'>{description}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </SheetHeader>
            <SheetFooter className='flex items-center justify-center w-full bg-primary-white px-6 py-4 mt-auto'>
                <Button
                    onClick={() => setCurrentStep(1)}
                    className='w-full'
                >
                    Nadaljuj
                </Button>
            </SheetFooter>
        </div>
    )
}

/* ---------------------------------------------------------------------------------------------
 * Step 1
 * ------------------------------------------------------------------------------------------- */
interface UpdateWillResumeStepProps extends StepComponentProps {
    triggerText: 'Uredi' | 'Poglej več'
    will: WillProps
    categories: CategoryProps[]
}

function UpdateWillResumeFormStep({ triggerText, will, categories, className }: UpdateWillResumeStepProps) {
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const [isLoadingDelete, setIsLoadingDelete] = useState(false)
    const setCurrentStep = useUpdateWillState(s => s.setCurrentStep)

    async function handleUpdate() {
        const payload = {
            action: 'edit',
            code: null
        }
        try {
            setIsLoadingUpdate(true)
            await updateDeleteWill(will.id, payload)
            setCurrentStep(2)
        } catch (error) {
            if (error instanceof Error) {
                toast.error('Nekaj je šlo narobe.', {
                    description: JSON.parse(error.message).message
                })
            }
        } finally {
            setIsLoadingUpdate(false)
        }
    }

    async function handleDelete() {
        const payload = {
            action: 'delete',
            code: null
        }
        try {
            setIsLoadingDelete(true)
            await updateDeleteWill(will.id, payload)
            setCurrentStep(2)
        } catch (error) {
            if (error instanceof Error) {
                toast.error('Nekaj je šlo narobe.', {
                    description: JSON.parse(error.message).message
                })
            }
        } finally {
            setIsLoadingDelete(false)
        }
    }

    return (
        <div className={cn('hidden flex-auto flex-col', className)}>
            <SheetHeader className='flex items-start w-full bg-primary-white shadow-sheet-section px-7 pt-10 pb-8 space-y-0 relative z-[100]'>
                <p className="text-h6 font-baskerville">Uredi ali Izbriši oporoko</p>
                <span className="text-body-medium font-medium">Urejanje ali izbris oporoke</span>
            </SheetHeader>
            <div className={cn('flex flex-col flex-auto')}>
                <SheetHeader
                    className='flex flex-row justify-between items-start w-full bg-primary-white shadow-sheet-section px-7 py-9 relative z-[99]'
                >
                    <div className='flex flex-col'>
                        <p className="text-body-small">KATEGORIJA</p>
                        <span className="text-body-big-2 font-medium">{categories.find(({ id }) => id === will.categoryId)?.name}</span>
                    </div>
                </SheetHeader>
                <SheetHeader
                    className='flex flex-row justify-between items-start w-full bg-primary-white shadow-sheet-section px-7 py-9 relative z-[98]'
                >
                    <div className='flex flex-col'>
                        <p className="text-body-small">IME PREDMETA</p>
                        <span className="text-body-big-2 font-medium">{will.description}</span>
                    </div>
                </SheetHeader>
                <SheetHeader
                    className='flex justify-between items-start w-full bg-primary-white shadow-sheet-section px-7 py-9 relative z-[97]'
                >
                    <div className='w-full flex justify-between items-center mb-2'>
                        <p className="text-body-small">DEDIČI</p>
                    </div>
                    {
                        will.heirs.map(({ name, relationship, address }, i) => (
                            <>
                                <SheetHeader
                                    key={`i-${name}-${i}`}
                                    className='flex w-full'
                                >
                                    <div className='flex flex-col'>
                                        <p className="text-body-small">{relationship}</p>
                                        <span className="text-body-big-2 font-medium">{name}</span>
                                        <p className="text-body-small">{address}</p>
                                    </div>
                                </SheetHeader>
                                <Separator key={`i-${i}`} className='bg-primary-light-gray !my-6 last:hidden' />
                            </>
                        ))
                    }
                </SheetHeader>
                <SheetHeader
                    className='flex flex-row justify-between items-start w-full bg-primary-white shadow-sheet-section px-7 py-9 relative z-[96]'
                >
                    <div className='flex flex-col'>
                        <p className="text-body-small">DODATNE ŽELJE</p>
                        <span className="text-body-big-2 font-medium">{will.constrains}</span>
                    </div>
                </SheetHeader>
            </div>
            {triggerText === 'Uredi' && (
                <SheetFooter className='flex items-center justify-center w-full bg-primary-white px-6 py-4 mt-auto'>
                    <Button
                        disabled={isLoadingUpdate || isLoadingDelete}
                        className='w-full'
                        onClick={handleUpdate}
                    >
                        <span className='flex items-center gap-[10px]'>
                            {isLoadingUpdate && (
                                <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            <span className='leading-none '>Uredi</span>
                        </span>
                    </Button>
                    <Button
                        disabled={isLoadingUpdate || isLoadingDelete}
                        variant='destructive'
                        className='w-full'
                        onClick={handleDelete}
                    >
                        <span className='flex items-center gap-[10px]'>
                            {isLoadingDelete && (
                                <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            <span className='leading-none '>Izbriši</span>
                        </span>
                    </Button>
                </SheetFooter>
            )}
        </div>
    )
}

/* ---------------------------------------------------------------------------------------------
 * Step 2
 * ------------------------------------------------------------------------------------------- */
function UpdateWillConfirmationStep({ className }: StepComponentProps) {
    // async function handleClick() {
    //     await invalidateCacheByPath('/namizje/storage')
    // }

    return (
        <div className={cn('hidden flex-auto flex-col', className)}>
            <SheetHeader className='flex flex-auto justify-center items-center w-full px-7 pt-10 pb-8 space-y-0 relative z-[100]'>
                <Ilustrations.Email className='w-full max-w-44 lg:max-w-72' />
                <span className="text-h5 font-baskerville text-center !mb-8">Potrdite vaš zahtevek</span>
                <p className="text-body-small text-center">Obveščamo vas, da smo vam poslali e-pošto za verifikacijo, ki je potrebna za potrditev spremembe oporoke.</p>
                <p className="text-body-small text-center">Takoj ko potrdite transakcijo preko e-pošte, bo zahtevek uspešno poslan naši ekipi.</p>
            </SheetHeader>
            <SheetFooter className='flex items-center justify-center w-full bg-primary-white px-6 py-4 mt-auto'>
                <SheetClose asChild>
                    <Button
                        // onClick={handleClick}
                        className='w-full'
                    >
                        Končaj
                    </Button>
                </SheetClose>
            </SheetFooter>
        </div>
    )
}
