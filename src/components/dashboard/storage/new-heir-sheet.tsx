'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Icons } from '@/components/ui/icons'
import { Ilustrations } from '@/components/ui/ilustrations'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from '@/components/ui/sheet'
import { invalidateCacheByPath } from '@/lib/actions/cache'
import { WillHeirFormSchema } from '@/lib/schemas/will'
import { createHeir, deleteHeir, updateHeir } from '@/lib/services/heirs'
import { allowOnlyLetters, allowOnlyNumbers } from '@/lib/utils/form'
import { cn } from '@/lib/utils/style'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { create } from 'zustand'
import { PhoneAreaCodesCombobox } from '../ui/phone-area-codes-combobox'

// State
type ActionSuccess = 'dodan' | 'spremenjen' | 'izbrisan'

interface NewHeirStoreProps {
    isOpen: boolean
    setIsOpen: (v: boolean) => void
    currentStep: number
    setCurrentStep: (v: number) => void
    currentHeir: HeirProps
    setCurrentHeir: (v: HeirProps) => void
    currentActionSuccess: ActionSuccess
    setCurrentActionSuccess: (v: ActionSuccess) => void
}

const INITIAL_HEIR_STATE = {
    name: '',
    address: '',
    postcode: '',
    city: '',
    residenceCountry: '',
    areaCode: '386',
    phone: '',
    email: '',
    relationship: ''
}

export const useNewHeirState = create<NewHeirStoreProps>()((set) => ({
    isOpen: false,
    setIsOpen: (v) => set(() => ({ isOpen: v })),
    currentStep: 0,
    setCurrentStep: (v) => set(() => ({ currentStep: v })),
    currentHeir: INITIAL_HEIR_STATE,
    setCurrentHeir: (v) => set(() => ({ currentHeir: v })),
    currentActionSuccess: 'dodan',
    setCurrentActionSuccess: (v) => set(() => ({ currentActionSuccess: v }))
}))

// Main
interface NewHeirSheetProps{
    heirs: HeirProps[]
}

export function NewHeirSheet({ heirs }: NewHeirSheetProps) {
    const isOpen = useNewHeirState(s => s.isOpen)
    const setIsOpen = useNewHeirState(s => s.setIsOpen)
    const currentStep = useNewHeirState(s => s.currentStep)
    const setCurrentStep = useNewHeirState(s => s.setCurrentStep)
    const setCurrentHeir = useNewHeirState(s => s.setCurrentHeir)
    const setCurrentActionSuccess = useNewHeirState(s => s.setCurrentActionSuccess)

    function handleOpenChange(isOpen: boolean) {
        if (isOpen === false) {
            setCurrentHeir(INITIAL_HEIR_STATE)
            setCurrentActionSuccess('dodan')
            setIsOpen(false)
            setCurrentStep(0)
        }
    }

    return (
        <Sheet open={isOpen} onOpenChange={handleOpenChange}>
            <SheetTrigger asChild onClick={() => setIsOpen(true)}>
                <Button>
                    <span className='flex items-center gap-4'>
                        <Icons.Plus />
                        <span className='leading-none '>Dodaj novega dediča</span>
                    </span>
                </Button>
            </SheetTrigger>
            <SheetContent className='w-full lg:!max-w-[420px] h-full bg-[#F1F1F1] p-0'>
                <ScrollArea
                    className={cn(
                        'w-full h-full',
                        '[&>div>div]:min-h-full [&>div>div]:!flex [&>div>div]:flex-col'
                    )}
                >
                    <HeirListStep heirs={heirs} className={cn(currentStep === 0 && 'flex')} />
                    <HeirFormStep className={cn(currentStep === 1 && 'flex')} />
                    <HeirResumeStep className={cn(currentStep === 2 && 'flex')} />
                    <HeirEditFormStep className={cn(currentStep === 3 && 'flex')} />
                    <HeirEditResumeStep className={cn(currentStep === 4 && 'flex')} />
                    <HeirDeleteConfirmationStep className={cn(currentStep === 5 && 'flex')} />
                    <HeirSuccessStep className={cn(currentStep === 6 && 'flex')} />
                    <HeirInfoResumeStep className={cn(currentStep === 7 && 'flex')} />
                    <HeirDeleteErrorStep className={cn(currentStep === 8 && 'flex')} />
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}

// Steps
interface StepComponentProps {
    className?: string
}

// Step 0
interface HeirListStepProps extends StepComponentProps {
    heirs: HeirProps[]
}

function HeirListStep({ heirs, className }: HeirListStepProps) {
    const setCurrentStep = useNewHeirState(s => s.setCurrentStep)
    const setCurrentHeir = useNewHeirState(s => s.setCurrentHeir)

    function handleEdit(heir: HeirProps) {
        setCurrentHeir(heir)
        setCurrentStep(3)
    }

    function handleRemove(heir: HeirProps) {
        setCurrentHeir(heir)
        if (heir.wills?.length === 0) {
            setCurrentStep(5)
            return
        }
        setCurrentStep(8)
    }

    function handleCreate() {
        setCurrentStep(1)
    }

    function handleShowInfo(heir: HeirProps) {
        setCurrentHeir(heir)
        setCurrentStep(7)
    }

    return (
        <div className={cn('hidden flex-auto flex-col', className)}>
            <SheetHeader className='flex items-start w-full bg-primary-white shadow-sheet-section px-7 pt-10 pb-8 space-y-0 relative z-[100]'>
                <p className="text-h6 font-baskerville">Moji Dediči</p>
                <span className="text-body-medium font-medium">Urejaj, dodaj ali izbriši dediče</span>
            </SheetHeader>
            <div className={cn('flex flex-col flex-auto')}>
                {
                    heirs.map((heir, i) => (
                        <SheetHeader
                            key={`i-${heir.name}-${i}`}
                            style={{ zIndex: 99 - i }}
                            className='flex flex-row justify-between items-start w-full bg-primary-white shadow-sheet-section px-7 py-9 relative'
                        >
                            <div className='flex flex-col'>
                                <p className="text-body-small">{heir.relationship}</p>
                                <span
                                    onClick={() => handleShowInfo(heir)}
                                    className="text-body-big-2 font-medium cursor-pointer"
                                >
                                    {heir.name}
                                </span>
                                <p className="text-body-small">{heir.address}</p>
                            </div>
                            <div className='flex gap-2 !m-0'>
                                <button
                                    className='text-body-medium font-medium'
                                    onClick={() => handleEdit(heir)}
                                >Uredi</button>
                                <button
                                    className='text-body-medium font-medium text-accent-red'
                                    onClick={() => handleRemove(heir)}
                                >Izbriši</button>
                            </div>
                        </SheetHeader>
                    ))
                }

                <SheetFooter className='flex items-center justify-center w-full bg-primary-white px-6 py-4 mt-auto'>
                    <Button onClick={handleCreate} className='w-full max-w-[279px] mx-auto'>
                        <span className='flex items-center gap-4'>
                            <Icons.Plus />
                            <span className='leading-none '>Dodaj novega dediča</span>
                        </span>
                    </Button>
                </SheetFooter>
            </div>
        </div>
    )
}

// Step 1
function HeirFormStep({ className }: StepComponentProps) {
    const currentStep = useNewHeirState(s => s.currentStep)
    const setCurrentStep = useNewHeirState(s => s.setCurrentStep)
    const setCurrentHeir = useNewHeirState(s => s.setCurrentHeir)

    const form = useForm<z.infer<typeof WillHeirFormSchema>>({
        resolver: zodResolver(WillHeirFormSchema),
        defaultValues: INITIAL_HEIR_STATE
    })

    function handleBack() {
        setCurrentStep(0)
    }

    async function handleSubmit(data: z.infer<typeof WillHeirFormSchema>) {
        try {
            setCurrentHeir(data)
            form.reset()
            setCurrentStep(2)
        } catch (error) {
            if (error instanceof Error) {
                toast.error('Nekaj je šlo narobe.', {
                    description: JSON.parse(error.message).message
                })
            }
        }
    }

    useEffect(() => {
        if (currentStep !== 1) {
            form.reset()
        }
    }, [currentStep, form])

    return (
        <div className={cn('hidden flex-auto flex-col', className)}>
            <SheetHeader className='flex items-start w-full bg-primary-white shadow-sheet-section px-7 pt-10 pb-8 space-y-0 relative z-[100]'>
                <p className="text-h6 font-baskerville">Moji Dediči</p>
                <span className="text-body-medium font-medium">Dodaj novega dediča</span>
            </SheetHeader>
            <div className={cn('flex flex-col flex-auto')}>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col'>
                        <SheetHeader className='flex items-start w-full p-7'>
                            <div className="w-full grid gap-2">
                                <div className="grid gap-1">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Ime in priimek dediča</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Vpišite ime in priimek dediča"
                                                        autoComplete="name"
                                                        autoCorrect="off"
                                                        autoCapitalize='off'
                                                        autoFocus
                                                        onKeyDown={allowOnlyLetters}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-1">
                                    <FormField
                                        control={form.control}
                                        name="address"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Ulica in hišna štvilka</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Ulica in hišna številka dediča"
                                                        autoComplete="street"
                                                        autoCorrect="off"
                                                        autoCapitalize='off'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-1">
                                    <FormField
                                        control={form.control}
                                        name="postcode"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Poštna številka</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Poštna številka dediča"
                                                        autoComplete="postcode"
                                                        autoCorrect="off"
                                                        autoCapitalize='off'
                                                        onKeyDown={allowOnlyNumbers}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-1">
                                    <FormField
                                        control={form.control}
                                        name="city"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Mesto bivališča</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Mesto bivališča dediča"
                                                        autoComplete="city"
                                                        autoCorrect="off"
                                                        autoCapitalize='off'
                                                        onKeyDown={allowOnlyLetters}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-1">
                                    <FormField
                                        control={form.control}
                                        name="residenceCountry"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Država prebivališča dediča</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Država prebivališča dediča"
                                                        autoComplete="residenceCountry"
                                                        autoCorrect="off"
                                                        autoCapitalize='off'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-1">
                                    <div className='space-y-2'>
                                        <FormLabel>Telefonska številka dediča</FormLabel>
                                        <div className='w-full relative'>
                                            <FormField
                                                control={form.control}
                                                name="areaCode"
                                                render={({ field }) => (
                                                    <FormItem className='absolute top-px left-px'>
                                                        <FormControl>
                                                            <PhoneAreaCodesCombobox
                                                                modal
                                                                value={field.value}
                                                                onChange={field.onChange}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <Separator orientation='vertical' className='h-[32px] absolute top-[6.5px] left-[99px]' />
                                            <FormField
                                                control={form.control}
                                                name="phone"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="Vpišite telefonsko številko"
                                                                autoComplete="tel"
                                                                autoCorrect="off"
                                                                autoCapitalize='off'
                                                                className='!pl-28 pr-3 py-2'
                                                                onKeyDown={allowOnlyNumbers}
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid gap-1">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>E-naslov dediča</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enaslov dediča"
                                                        autoComplete="email"
                                                        autoCorrect="off"
                                                        autoCapitalize='off'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-1">
                                    <FormField
                                        control={form.control}
                                        name="relationship"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Odnos do dediča</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Vaš odnos do dediča"
                                                        autoComplete="residenceCountry"
                                                        autoCorrect="off"
                                                        autoCapitalize='off'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </SheetHeader>
                        <SheetFooter className='flex flex-row items-center justify-center w-full bg-primary-white px-6 py-4 space-x-2 mt-auto'>
                            <Button
                                type='button'
                                variant='light'
                                size='icon'
                                className='min-w-10'
                                onClick={handleBack}
                            >
                                <Icons.ArrowLeft className='w-5 h-5' />
                            </Button>
                            <Button className='w-full'>
                                Nadaljuj
                            </Button>
                        </SheetFooter>
                    </form>
                </Form>
            </div>
        </div>
    )
}

// Step 2
function HeirResumeStep({ className }: StepComponentProps) {
    const [isLoading, setIsLoading] = useState(false)
    const setCurrentStep = useNewHeirState(s => s.setCurrentStep)
    const currentHeir = useNewHeirState(s => s.currentHeir)
    const setCurrentActionSuccess = useNewHeirState(s => s.setCurrentActionSuccess)

    async function handleConfirm() {
        try {
            setIsLoading(true)
            await createHeir(currentHeir)
            setCurrentActionSuccess('dodan')
            setCurrentStep(6)
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
                <p className="text-h6 font-baskerville">Moji Dediči</p>
                <span className="text-body-medium font-medium">Potrdi podatke novega dediča</span>
            </SheetHeader>
            <div className={cn('flex flex-col flex-auto')}>
                <SheetHeader
                    className='flex flex-row justify-between items-start w-full bg-primary-white shadow-sheet-section px-7 py-6 relative z-[99]'
                >
                    <div className='flex flex-col'>
                        <p className="text-body-small uppercase">IME IN PRIIMEK</p>
                        <span className="text-body-big-2 font-medium">{currentHeir.name}</span>
                    </div>
                </SheetHeader>
                <SheetHeader
                    className='flex flex-row justify-between items-start w-full bg-primary-white shadow-sheet-section px-7 py-6 relative z-[98]'
                >
                    <div className='flex flex-col'>
                        <p className="text-body-small uppercase">Ulica in . hišna številka</p>
                        <span className="text-body-big-2 font-medium">{currentHeir.address}</span>
                    </div>
                </SheetHeader>
                <SheetHeader
                    className='flex flex-row justify-between items-start w-full bg-primary-white shadow-sheet-section px-7 py-6 relative z-[97]'
                >
                    <div className='flex flex-col'>
                        <p className="text-body-small uppercase">Poštna številka</p>
                        <span className="text-body-big-2 font-medium">{currentHeir.postcode}</span>
                    </div>
                </SheetHeader>
                <SheetHeader
                    className='flex flex-row justify-between items-start w-full bg-primary-white shadow-sheet-section px-7 py-6 relative z-[96]'
                >
                    <div className='flex flex-col'>
                        <p className="text-body-small uppercase">MESTO BIVALIŠČA</p>
                        <span className="text-body-big-2 font-medium">{currentHeir.city}</span>
                    </div>
                </SheetHeader>
                <SheetHeader
                    className='flex flex-row justify-between items-start w-full bg-primary-white shadow-sheet-section px-7 py-6 relative z-[95]'
                >
                    <div className='flex flex-col'>
                        <p className="text-body-small uppercase">DRŽAVA PREBIVALIŠČA</p>
                        <span className="text-body-big-2 font-medium">{currentHeir.residenceCountry}</span>
                    </div>
                </SheetHeader>
                <SheetHeader
                    className='flex flex-row justify-between items-start w-full bg-primary-white shadow-sheet-section px-7 py-6 relative z-[94]'
                >
                    <div className='flex flex-col'>
                        <p className="text-body-small uppercase">TELEFONSKA ŠTEVILKA</p>
                        <span className="text-body-big-2 font-medium">{currentHeir.areaCode}{currentHeir.phone}</span>
                    </div>
                </SheetHeader>
                <SheetHeader
                    className='flex flex-row justify-between items-start w-full bg-primary-white shadow-sheet-section px-7 py-6 relative z-[93]'
                >
                    <div className='flex flex-col'>
                        <p className="text-body-small uppercase">E-NASLOV</p>
                        <span className="text-body-big-2 font-medium">{currentHeir.email}</span>
                    </div>
                </SheetHeader>
                <SheetHeader
                    className='flex flex-row justify-between items-start w-full bg-primary-white shadow-sheet-section px-7 py-6 relative z-[92]'
                >
                    <div className='flex flex-col'>
                        <p className="text-body-small uppercase">ODNOS DO DEDIČA</p>
                        <span className="text-body-big-2 font-medium">{currentHeir.relationship}</span>
                    </div>
                </SheetHeader>
            </div>
            <SheetFooter className='flex items-center justify-center w-full bg-primary-white px-6 py-4 mt-auto'>
                <Button
                    className='w-full'
                    onClick={handleConfirm}
                >
                    <span className='flex items-center gap-[10px]'>
                        {isLoading && (
                            <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        <span className='leading-none '>Potrdi podatke</span>
                    </span>
                </Button>
            </SheetFooter>
        </div>
    )
}

// Step 3
function HeirEditFormStep({ className }: StepComponentProps) {
    const currentStep = useNewHeirState(s => s.currentStep)
    const setCurrentStep = useNewHeirState(s => s.setCurrentStep)
    const currentHeir = useNewHeirState(s => s.currentHeir)
    const setCurrentHeir = useNewHeirState(s => s.setCurrentHeir)

    const form = useForm<z.infer<typeof WillHeirFormSchema>>({
        resolver: zodResolver(WillHeirFormSchema),
        defaultValues: INITIAL_HEIR_STATE
    })

    function handleBack() {
        setCurrentStep(0)
    }

    async function handleSubmit(data: z.infer<typeof WillHeirFormSchema>) {
        try {
            setCurrentHeir({
                id: currentHeir.id,
                ...data
            })
            form.reset()
            setCurrentStep(4)
        } catch (error) {
            if (error instanceof Error) {
                toast.error('Nekaj je šlo narobe.', {
                    description: JSON.parse(error.message).message
                })
            }
        }
    }

    useEffect(() => {
        if (currentStep !== 1) {
            form.reset()
        }
    }, [currentStep, form])

    useEffect(() => {
        form.reset(currentHeir)
    }, [currentHeir, form])

    return (
        <div className={cn('hidden flex-auto flex-col', className)}>
            <SheetHeader className='flex items-start w-full bg-primary-white shadow-sheet-section px-7 pt-10 pb-8 space-y-0 relative z-[100]'>
                <p className="text-h6 font-baskerville">Moji Dediči</p>
                <span className="text-body-medium font-medium">Urejaj dediča</span>
            </SheetHeader>
            <div className={cn('flex flex-col flex-auto')}>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col'>
                        <SheetHeader className='flex items-start w-full p-7'>
                            <div className="w-full grid gap-2">
                                <div className="grid gap-1">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Ime in priimek dediča</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Vpišite ime in priimek dediča"
                                                        autoComplete="name"
                                                        autoCorrect="off"
                                                        autoCapitalize='off'
                                                        autoFocus
                                                        onKeyDown={allowOnlyLetters}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-1">
                                    <FormField
                                        control={form.control}
                                        name="address"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Ulica in hišna štvilka</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Ulica in hišna številka dediča"
                                                        autoComplete="street"
                                                        autoCorrect="off"
                                                        autoCapitalize='off'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-1">
                                    <FormField
                                        control={form.control}
                                        name="postcode"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Poštna številka</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Poštna številka dediča"
                                                        autoComplete="postcode"
                                                        autoCorrect="off"
                                                        autoCapitalize='off'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-1">
                                    <FormField
                                        control={form.control}
                                        name="city"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Mesto bivališča</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Mesto bivališča dediča"
                                                        autoComplete="city"
                                                        autoCorrect="off"
                                                        autoCapitalize='off'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-1">
                                    <FormField
                                        control={form.control}
                                        name="residenceCountry"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Država prebivališča dediča</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Država prebivališča dediča"
                                                        autoComplete="residenceCountry"
                                                        autoCorrect="off"
                                                        autoCapitalize='off'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-1">
                                    <div className='space-y-2'>
                                        <FormLabel>Telefonska številka dediča</FormLabel>
                                        <div className='w-full relative'>
                                            <FormField
                                                control={form.control}
                                                name="areaCode"
                                                render={({ field }) => (
                                                    <FormItem className='absolute top-px left-px'>
                                                        <FormControl>
                                                            <PhoneAreaCodesCombobox
                                                                modal
                                                                value={field.value}
                                                                onChange={field.onChange}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <Separator orientation='vertical' className='h-[32px] absolute top-[6.5px] left-[99px]' />
                                            <FormField
                                                control={form.control}
                                                name="phone"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="Vpišite telefonsko številko"
                                                                autoComplete="tel"
                                                                autoCorrect="off"
                                                                autoCapitalize='off'
                                                                className='!pl-28 pr-3 py-2'
                                                                onKeyDown={allowOnlyNumbers}
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid gap-1">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>E-naslov dediča</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enaslov dediča"
                                                        autoComplete="email"
                                                        autoCorrect="off"
                                                        autoCapitalize='off'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-1">
                                    <FormField
                                        control={form.control}
                                        name="relationship"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Odnos do dediča</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Vaš odnos do dediča"
                                                        autoComplete="residenceCountry"
                                                        autoCorrect="off"
                                                        autoCapitalize='off'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </SheetHeader>
                        <SheetFooter className='flex items-center justify-center w-full bg-primary-white px-6 py-4 mt-auto'>
                            <Button
                                type='button'
                                variant='light'
                                size='icon'
                                className='min-w-10'
                                onClick={handleBack}
                            >
                                <Icons.ArrowLeft className='w-5 h-5' />
                            </Button>
                            <Button className='w-full'>
                                Nadaljuj
                            </Button>
                        </SheetFooter>
                    </form>
                </Form>
            </div>
        </div>
    )
}

// Step 4
function HeirEditResumeStep({ className }: StepComponentProps) {
    const [isLoading, setIsLoading] = useState(false)
    const setCurrentStep = useNewHeirState(s => s.setCurrentStep)
    const currentHeir = useNewHeirState(s => s.currentHeir)
    const setCurrentActionSuccess = useNewHeirState(s => s.setCurrentActionSuccess)

    async function handleConfirm() {
        try {
            setIsLoading(true)
            await updateHeir(currentHeir.id ?? 0, currentHeir)
            setCurrentActionSuccess('spremenjen')
            setCurrentStep(6)
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
                <p className="text-h6 font-baskerville">Moji Dediči</p>
                <span className="text-body-medium font-medium">Potrdi spremenjene podatke dediča</span>
            </SheetHeader>
            <div className={cn('flex flex-col flex-auto')}>
                <SheetHeader
                    className='flex flex-row justify-between items-start w-full bg-primary-white shadow-sheet-section px-7 py-6 relative z-[99]'
                >
                    <div className='flex flex-col'>
                        <p className="text-body-small uppercase">IME IN PRIIMEK</p>
                        <span className="text-body-big-2 font-medium">{currentHeir.name}</span>
                    </div>
                </SheetHeader>
                <SheetHeader
                    className='flex flex-row justify-between items-start w-full bg-primary-white shadow-sheet-section px-7 py-6 relative z-[98]'
                >
                    <div className='flex flex-col'>
                        <p className="text-body-small uppercase">Ulica in . hišna številka</p>
                        <span className="text-body-big-2 font-medium">{currentHeir.address}</span>
                    </div>
                </SheetHeader>
                <SheetHeader
                    className='flex flex-row justify-between items-start w-full bg-primary-white shadow-sheet-section px-7 py-6 relative z-[97]'
                >
                    <div className='flex flex-col'>
                        <p className="text-body-small uppercase">Poštna številka</p>
                        <span className="text-body-big-2 font-medium">{currentHeir.postcode}</span>
                    </div>
                </SheetHeader>
                <SheetHeader
                    className='flex flex-row justify-between items-start w-full bg-primary-white shadow-sheet-section px-7 py-6 relative z-[96]'
                >
                    <div className='flex flex-col'>
                        <p className="text-body-small uppercase">MESTO BIVALIŠČA</p>
                        <span className="text-body-big-2 font-medium">{currentHeir.city}</span>
                    </div>
                </SheetHeader>
                <SheetHeader
                    className='flex flex-row justify-between items-start w-full bg-primary-white shadow-sheet-section px-7 py-6 relative z-[95]'
                >
                    <div className='flex flex-col'>
                        <p className="text-body-small uppercase">DRŽAVA PREBIVALIŠČA</p>
                        <span className="text-body-big-2 font-medium">{currentHeir.residenceCountry}</span>
                    </div>
                </SheetHeader>
                <SheetHeader
                    className='flex flex-row justify-between items-start w-full bg-primary-white shadow-sheet-section px-7 py-6 relative z-[94]'
                >
                    <div className='flex flex-col'>
                        <p className="text-body-small uppercase">TELEFONSKA ŠTEVILKA</p>
                        <span className="text-body-big-2 font-medium">{currentHeir.areaCode}{currentHeir.phone}</span>
                    </div>
                </SheetHeader>
                <SheetHeader
                    className='flex flex-row justify-between items-start w-full bg-primary-white shadow-sheet-section px-7 py-6 relative z-[93]'
                >
                    <div className='flex flex-col'>
                        <p className="text-body-small uppercase">E-NASLOV</p>
                        <span className="text-body-big-2 font-medium">{currentHeir.email}</span>
                    </div>
                </SheetHeader>
                <SheetHeader
                    className='flex flex-row justify-between items-start w-full bg-primary-white shadow-sheet-section px-7 py-6 relative z-[92]'
                >
                    <div className='flex flex-col'>
                        <p className="text-body-small uppercase">ODNOS DO DEDIČA</p>
                        <span className="text-body-big-2 font-medium">{currentHeir.relationship}</span>
                    </div>
                </SheetHeader>
            </div>
            <SheetFooter className='flex items-center justify-center w-full bg-primary-white px-6 py-4 mt-auto'>
                <Button
                    className='w-full'
                    onClick={handleConfirm}
                >
                    <span className='flex items-center gap-[10px]'>
                        {isLoading && (
                            <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        <span className='leading-none '>Potrdi podatke</span>
                    </span>
                </Button>
            </SheetFooter>
        </div>
    )
}

// Step 5
function HeirDeleteConfirmationStep({ className }: StepComponentProps) {
    const [isLoading, setIsLoading] = useState(false)
    const setCurrentStep = useNewHeirState(s => s.setCurrentStep)
    const setCurrentActionSuccess = useNewHeirState(s => s.setCurrentActionSuccess)
    const currentHeir = useNewHeirState(s => s.currentHeir)

    async function handleConfirm() {
        try {
            setIsLoading(true)
            await deleteHeir(currentHeir.id ?? 0)
            setCurrentActionSuccess('izbrisan')
            setCurrentStep(6)
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

    function handleBack() {
        setCurrentStep(0)
    }

    return (
        <div className={cn('hidden flex-auto flex-col', className)}>
            <SheetHeader className='flex items-start w-full bg-primary-white shadow-sheet-section px-7 pt-10 pb-8 space-y-0 relative z-[100]'>
                <p className="text-h6 font-baskerville">Moji Dediči</p>
                <span className="text-body-medium font-medium">Si prepričan da želiš izbrisati dediča?</span>
            </SheetHeader>
            <div className={cn('flex flex-col flex-auto')}>
                <SheetHeader
                    className='flex flex-row justify-between items-start w-full bg-primary-white shadow-sheet-section px-7 py-6 relative z-[99]'
                >
                    <div className='flex flex-col'>
                        <p className="text-body-small uppercase">IME IN PRIIMEK</p>
                        <span className="text-body-big-2 font-medium">{currentHeir.name}</span>
                    </div>
                </SheetHeader>
                <SheetHeader
                    className='flex flex-row justify-between items-start w-full bg-primary-white shadow-sheet-section px-7 py-6 relative z-[98]'
                >
                    <div className='flex flex-col'>
                        <p className="text-body-small uppercase">Ulica in . hišna številka</p>
                        <span className="text-body-big-2 font-medium">{currentHeir.address}</span>
                    </div>
                </SheetHeader>
                <SheetHeader
                    className='flex flex-row justify-between items-start w-full bg-primary-white shadow-sheet-section px-7 py-6 relative z-[97]'
                >
                    <div className='flex flex-col'>
                        <p className="text-body-small uppercase">Poštna številka</p>
                        <span className="text-body-big-2 font-medium">{currentHeir.postcode}</span>
                    </div>
                </SheetHeader>
                <SheetHeader
                    className='flex flex-row justify-between items-start w-full bg-primary-white shadow-sheet-section px-7 py-6 relative z-[96]'
                >
                    <div className='flex flex-col'>
                        <p className="text-body-small uppercase">MESTO BIVALIŠČA</p>
                        <span className="text-body-big-2 font-medium">{currentHeir.city}</span>
                    </div>
                </SheetHeader>
                <SheetHeader
                    className='flex flex-row justify-between items-start w-full bg-primary-white shadow-sheet-section px-7 py-6 relative z-[95]'
                >
                    <div className='flex flex-col'>
                        <p className="text-body-small uppercase">DRŽAVA PREBIVALIŠČA</p>
                        <span className="text-body-big-2 font-medium">{currentHeir.residenceCountry}</span>
                    </div>
                </SheetHeader>
                <SheetHeader
                    className='flex flex-row justify-between items-start w-full bg-primary-white shadow-sheet-section px-7 py-6 relative z-[94]'
                >
                    <div className='flex flex-col'>
                        <p className="text-body-small uppercase">TELEFONSKA ŠTEVILKA</p>
                        <span className="text-body-big-2 font-medium">{currentHeir.areaCode}{currentHeir.phone}</span>
                    </div>
                </SheetHeader>
                <SheetHeader
                    className='flex flex-row justify-between items-start w-full bg-primary-white shadow-sheet-section px-7 py-6 relative z-[93]'
                >
                    <div className='flex flex-col'>
                        <p className="text-body-small uppercase">E-NASLOV</p>
                        <span className="text-body-big-2 font-medium">{currentHeir.email}</span>
                    </div>
                </SheetHeader>
                <SheetHeader
                    className='flex flex-row justify-between items-start w-full bg-primary-white shadow-sheet-section px-7 py-6 relative z-[92]'
                >
                    <div className='flex flex-col'>
                        <p className="text-body-small uppercase">ODNOS DO DEDIČA</p>
                        <span className="text-body-big-2 font-medium">{currentHeir.relationship}</span>
                    </div>
                </SheetHeader>
            </div>
            <SheetFooter className='flex items-center justify-center w-full bg-primary-white px-6 py-4 mt-auto'>
                <Button
                    onClick={handleBack}
                    className='w-full'
                >
                        NE
                </Button>
                <Button
                    variant='destructive'
                    className='w-full'
                    onClick={handleConfirm}
                >
                    <span className='flex items-center gap-[10px]'>
                        {isLoading && (
                            <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        <span className='leading-none '>DA, IZBRIŠI</span>
                    </span>
                </Button>
            </SheetFooter>
        </div>
    )
}

// Step 6
function HeirSuccessStep({ className }: StepComponentProps) {
    const currentActionSuccess = useNewHeirState(s => s.currentActionSuccess)
    async function handleClick() {
        await invalidateCacheByPath('/namizje/storage')
    }

    return (
        <div className={cn('hidden flex-auto flex-col', className)}>
            <SheetHeader className='flex flex-auto justify-center items-center w-full px-7 pt-10 pb-8 space-y-0 relative z-[100]'>
                <Ilustrations.List className='w-full max-w-44 lg:max-w-72' />
                <span className="text-h5 font-baskerville text-center !mb-8">Dedič uspešno {currentActionSuccess}!</span>
                <p className="text-body-big-2 font-medium text-center">Najlepša hvala za Vaše zaupanje.</p>
            </SheetHeader>
            <SheetFooter className='flex items-center justify-center w-full bg-primary-white px-6 py-4 mt-auto'>
                <SheetClose asChild>
                    <Button
                        onClick={handleClick}
                        className='w-full'
                    >
                        Končaj
                    </Button>
                </SheetClose>
            </SheetFooter>
        </div>
    )
}

// Step 7
function HeirInfoResumeStep({ className }: StepComponentProps) {
    const setCurrentStep = useNewHeirState(s => s.setCurrentStep)
    const currentHeir = useNewHeirState(s => s.currentHeir)
    const setCurrentHeir = useNewHeirState(s => s.setCurrentHeir)

    async function handleBack() {
        setCurrentHeir(INITIAL_HEIR_STATE)
        setCurrentStep(0)
    }

    return (
        <div className={cn('hidden flex-auto flex-col', className)}>
            <SheetHeader className='flex items-start w-full bg-primary-white shadow-sheet-section px-7 pt-10 pb-8 space-y-0 relative z-[100]'>
                <p className="text-h6 font-baskerville">Moji Dediči</p>
                <span className="text-body-medium font-medium">Informacije o izbranem dediču</span>
            </SheetHeader>
            <div className={cn('flex flex-col flex-auto')}>
                <SheetHeader
                    className='flex flex-row justify-between items-start w-full bg-primary-white shadow-sheet-section px-7 py-6 relative z-[99]'
                >
                    <div className='flex flex-col'>
                        <p className="text-body-small uppercase">IME IN PRIIMEK</p>
                        <span className="text-body-big-2 font-medium">{currentHeir.name}</span>
                    </div>
                </SheetHeader>
                <SheetHeader
                    className='flex flex-row justify-between items-start w-full bg-primary-white shadow-sheet-section px-7 py-6 relative z-[98]'
                >
                    <div className='flex flex-col'>
                        <p className="text-body-small uppercase">Ulica in . hišna številka</p>
                        <span className="text-body-big-2 font-medium">{currentHeir.address}</span>
                    </div>
                </SheetHeader>
                <SheetHeader
                    className='flex flex-row justify-between items-start w-full bg-primary-white shadow-sheet-section px-7 py-6 relative z-[97]'
                >
                    <div className='flex flex-col'>
                        <p className="text-body-small uppercase">Poštna številka</p>
                        <span className="text-body-big-2 font-medium">{currentHeir.postcode}</span>
                    </div>
                </SheetHeader>
                <SheetHeader
                    className='flex flex-row justify-between items-start w-full bg-primary-white shadow-sheet-section px-7 py-6 relative z-[96]'
                >
                    <div className='flex flex-col'>
                        <p className="text-body-small uppercase">MESTO BIVALIŠČA</p>
                        <span className="text-body-big-2 font-medium">{currentHeir.city}</span>
                    </div>
                </SheetHeader>
                <SheetHeader
                    className='flex flex-row justify-between items-start w-full bg-primary-white shadow-sheet-section px-7 py-6 relative z-[95]'
                >
                    <div className='flex flex-col'>
                        <p className="text-body-small uppercase">DRŽAVA PREBIVALIŠČA</p>
                        <span className="text-body-big-2 font-medium">{currentHeir.residenceCountry}</span>
                    </div>
                </SheetHeader>
                <SheetHeader
                    className='flex flex-row justify-between items-start w-full bg-primary-white shadow-sheet-section px-7 py-6 relative z-[94]'
                >
                    <div className='flex flex-col'>
                        <p className="text-body-small uppercase">TELEFONSKA ŠTEVILKA</p>
                        <span className="text-body-big-2 font-medium">{currentHeir.areaCode}{currentHeir.phone}</span>
                    </div>
                </SheetHeader>
                <SheetHeader
                    className='flex flex-row justify-between items-start w-full bg-primary-white shadow-sheet-section px-7 py-6 relative z-[93]'
                >
                    <div className='flex flex-col'>
                        <p className="text-body-small uppercase">E-NASLOV</p>
                        <span className="text-body-big-2 font-medium">{currentHeir.email}</span>
                    </div>
                </SheetHeader>
                <SheetHeader
                    className='flex flex-row justify-between items-start w-full bg-primary-white shadow-sheet-section px-7 py-6 relative z-[92]'
                >
                    <div className='flex flex-col'>
                        <p className="text-body-small uppercase">ODNOS DO DEDIČA</p>
                        <span className="text-body-big-2 font-medium">{currentHeir.relationship}</span>
                    </div>
                </SheetHeader>
            </div>
            <SheetFooter className='flex items-center justify-center w-full bg-primary-white px-6 py-4 mt-auto'>
                <Button
                    className='w-full max-w-[279px] mx-auto'
                    onClick={handleBack}
                >
                    Nazaj
                </Button>
            </SheetFooter>
        </div>
    )
}

// Step 8
function HeirDeleteErrorStep({ className }: StepComponentProps) {
    const currentHeir = useNewHeirState(s => s.currentHeir)
    const setCurrentStep = useNewHeirState(s => s.setCurrentStep)

    function handleClick() {
        setCurrentStep(0)
    }

    return (
        <div className={cn('hidden flex-auto flex-col', className)}>
            <SheetHeader className='flex flex-auto justify-center items-center w-full px-7 pt-10 pb-8 space-y-4 relative z-[100]'>
                <span className="text-h5 font-baskerville text-center !mb-8">Izbris dediča je nemogoč.</span>
                <p className="text-body-big-2 text-center">Izbris dediča je nemogoč, ker je vezan na oporoke:</p>
                {currentHeir.wills?.map(({ id }) => (
                    <p key={`i-${id}`} className="text-body-big-2 font-medium text-center underline">ID Oporoke: {id}</p>
                ))}
                <p className="text-body-big-2 text-center">V kolikor želite izbrisati dediča, boste morali najprej urediti ali izbrisati oporoke v katerih je zgoraj omenjen dedič.</p>
            </SheetHeader>
            <SheetFooter className='flex items-center justify-center w-full bg-primary-white px-6 py-4 mt-auto'>
                <Button
                    onClick={handleClick}
                    className='w-full'
                >
                        Nazaj
                </Button>
            </SheetFooter>
        </div>
    )
}
