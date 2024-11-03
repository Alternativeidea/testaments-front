'use client'

import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { Ilustrations } from '@/components/ui/ilustrations'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from '@/components/ui/sheet'
import { updateAdminOrder } from '@/lib/services/admin/products'
import { cn } from '@/lib/utils/style'
import { formatDate } from 'date-fns'
import { sl } from 'date-fns/locale'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { create } from 'zustand'

/* ---------------------------------------------------------------------------------------------
 * State
 * ------------------------------------------------------------------------------------------- */
interface OrderStoreProps {
    currentStep: number
    setCurrentStep: (v: number) => void
}

const useOrderState = create<OrderStoreProps>()((set) => ({
    currentStep: 0,
    setCurrentStep: (v) => set(() => ({ currentStep: v }))
}))

/* ---------------------------------------------------------------------------------------------
 * Main
 * ------------------------------------------------------------------------------------------- */
export function OrderSheet(order: OrderProps) {
    const currentStep = useOrderState(s => s.currentStep)

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className='w-full'>
                    Poglej več
                </Button>
            </SheetTrigger>
            <SheetContent className='w-full lg:!max-w-[420px] h-full p-0'>
                <ScrollArea
                    className={cn(
                        'w-full h-full',
                        '[&>div>div]:min-h-full [&>div>div]:!flex [&>div>div]:flex-col'
                    )}
                >
                    <OrderResumeStep order={order} className={cn(currentStep === 0 && 'flex')} />
                    <OrderSuccessStep className={cn(currentStep === 1 && 'flex')} />
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
interface OrderResumeStepProps extends StepComponentProps {
    order: OrderProps
}

function OrderResumeStep({ order: { id, user, details, createdAt, total }, className }: OrderResumeStepProps) {
    const setCurrentStep = useOrderState(s => s.setCurrentStep)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    async function handleClick() {
        try {
            setIsLoading(true)
            await updateAdminOrder(id, {
                status: 1
            })
            setCurrentStep(1)
            router.refresh()
            location.reload()
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
                <p className="text-h6 font-baskerville">Tržnica / Oddan zahtevek</p>
                <span className="text-body-medium font-medium">{ user.name } { user.lastName}</span>
            </SheetHeader>
            <div className={cn('flex flex-col flex-auto')}>
                <SheetHeader className='flex items-start w-full bg-primary-white shadow-sheet-section px-7 pt-10 pb-8 space-y-0 relative z-[99]'>
                    <p className="text-body-small">Če ste že sprožili pogovor s stranko po e-pošti, prosimo potrdite to spodaj in vaš zahtevek bo zaključen. Nadaljujte komunikacijo s stranko preko e-pošte.</p>
                </SheetHeader>
                <SheetHeader className='flex items-start w-full bg-primary-white shadow-sheet-section px-7 pt-10 pb-8 space-y-4 relative z-[98]'>
                    <span className="text-body-medium font-medium">ID Tržnica: {id}</span>
                    <div className='w-full flex justify-between items-center'>
                        <span className='text-body-small'>Ime in priimek</span>
                        <span className='text-body-big-2 font-medium'>{ user.name } { user.lastName }</span>
                    </div>
                    <Separator className='bg-primary-light-gray' />
                    <div className='w-full flex justify-between items-center'>
                        <span className='text-body-small'>ID predmeta</span>
                        <span className='text-body-big-2 font-medium'>ID{details[0].product.id}</span>
                    </div>
                    <Separator className='bg-primary-light-gray' />
                    <div className='w-full flex justify-between items-center'>
                        <span className='text-body-small'>Ime predmeta</span>
                        <span className='text-body-big-2 font-medium'>{details[0].product.name}</span>
                    </div>
                    <Separator className='bg-primary-light-gray' />
                    <div className='w-full flex justify-between items-center'>
                        <span className='text-body-small'>Kategorija</span>
                        <span className='text-body-big-2 font-medium'>{details[0].product.category.name}</span>
                    </div>
                    <Separator className='bg-primary-light-gray' />
                    {
                        details[0].product.characteristics.map(({ name, text }, i) => (
                            <>
                                <div key={`i-${name}-${i}`} className='w-full flex justify-between items-center'>
                                    <span className='text-body-small'>{name}</span>
                                    <span className='text-body-big-2 font-medium'>{text}</span>
                                </div>
                                <Separator key={`i-${i}`} className='bg-primary-light-gray last:hidden' />
                            </>
                        ))
                    }
                    <div className='w-full flex justify-between items-center'>
                        <span className='text-body-small'>Datum zahtevka</span>
                        <span className='text-body-big-2 font-medium'>{formatDate(createdAt, 'PP', { locale: sl })}</span>
                    </div>
                    <Separator className='bg-primary-light-gray' />
                    <div className='w-full flex justify-between items-center'>
                        <span className='text-body-small'>Cena predmeta</span>
                        <span className='text-body-big-2 font-medium'>{
                            total === -1
                                ? 'PO DOGOVORU'
                                : `${total.toLocaleString('sl-SI', { maximumFractionDigits: 2, minimumFractionDigits: 2 })} EUR`}</span>
                    </div>
                </SheetHeader>
            </div>
            <SheetFooter className='flex flex-row items-center justify-center w-full bg-primary-white px-6 py-4 mt-auto'>
                <Button
                    disabled={isLoading}
                    className='w-full'
                    onClick={handleClick}
                >
                    <span className='flex items-center gap-[10px]'>
                        {isLoading && (
                            <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        <span className='leading-none '>Zaključi zahtevek</span>
                    </span>
                </Button>
            </SheetFooter>
        </div>
    )
}

/* ---------------------------------------------------------------------------------------------
 * Step 1
 * ------------------------------------------------------------------------------------------- */
function OrderSuccessStep({ className }: StepComponentProps) {
    const { refresh } = useRouter()
    return (
        <div className={cn('hidden flex-auto flex-col', className)}>
            <SheetHeader className='flex flex-auto justify-center items-center w-full px-7 pt-10 pb-8 space-y-0 relative z-[100]'>
                <Ilustrations.List className='w-full max-w-44 lg:max-w-72' />
                <span className="text-h5 font-baskerville text-center !mb-8">Urejeno!</span>
                <p className="text-body-big-2 text-center !mb-6">Vaš proces je bil uspešno obdelan in opravljen.</p>
            </SheetHeader>
            <SheetFooter className='flex flex-row items-center justify-center w-full bg-primary-white px-6 py-4 mt-auto'>
                <SheetClose asChild>
                    <Button className='w-full' onClick={() => refresh()}>
                        Končaj
                    </Button>
                </SheetClose>
            </SheetFooter>
        </div>
    )
}
