'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Icons } from '@/components/ui/icons'
import { Ilustrations } from '@/components/ui/ilustrations'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from '@/components/ui/sheet'
import { Slider } from '@/components/ui/slider'
import { Textarea } from '@/components/ui/text-area'
import { WILL_GUIDE_STEPS, WILL_SPECIAL_CONSTRAINS } from '@/lib/constants/wills'
import { WillAssetFormSchema, WillConstrainsFormSchema, WillHeirsFormSchema, WillSharesFormSchema } from '@/lib/schemas/will'
import { createWill } from '@/lib/services/wills'
import { cn } from '@/lib/utils/style'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { create } from 'zustand'
import { useNewHeirState } from './new-heir-sheet'

/* ---------------------------------------------------------------------------------------------
 * State
 * ------------------------------------------------------------------------------------------- */
interface NewHeirProps {
    id?: number
    name: string
    address: string
    postcode: string
    city: string
    residenceCountry: string
    phone: string
    email: string
    relationship: string
    share?: number
    constrains?: string
}

interface NewWillProps {
    description: string
    categoryId: number
    constrains: string
    heirs: NewHeirProps[]
}

interface NewWillStoreProps {
    isOpen: boolean
    setIsOpen: (v: boolean) => void
    currentStep: number
    setCurrentStep: (v: number) => void
    currentWill: NewWillProps
    setCurrentWill: (v: NewWillProps) => void
}

const useNewWillState = create<NewWillStoreProps>()((set) => ({
    isOpen: false,
    setIsOpen: (v) => set(() => ({ isOpen: v })),
    currentStep: 0,
    setCurrentStep: (v) => set(() => ({ currentStep: v })),
    currentWill: {
        description: '',
        categoryId: 0,
        constrains: '',
        heirs: []
    },
    setCurrentWill: (v) => set(() => ({ currentWill: v }))
}))

/* ---------------------------------------------------------------------------------------------
 * Main
 * ------------------------------------------------------------------------------------------- */
interface NewWillSheetProps{
    heirs: HeirProps[]
    categories: CategoryProps[]
}

export function NewWillSheet({ heirs, categories }: NewWillSheetProps) {
    const isOpen = useNewWillState(s => s.isOpen)
    const setIsOpen = useNewWillState(s => s.setIsOpen)
    const currentStep = useNewWillState(s => s.currentStep)
    const setCurrentStep = useNewWillState(s => s.setCurrentStep)
    const setCurrentWill = useNewWillState(s => s.setCurrentWill)

    function handleOpenChange(isOpen: boolean) {
        if (isOpen === false) {
            setCurrentWill({
                description: '',
                categoryId: 0,
                constrains: '',
                heirs: []
            })
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
                        <span className='leading-none '>Dodaj oporoko</span>
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
                    <WillGuideStep className={cn(currentStep === 0 && 'flex')} />
                    <WillAssetFormStep categories={categories} className={cn(currentStep === 1 && 'flex')} />
                    <WillHeirChooseStep heirs={heirs} className={cn(currentStep === 2 && 'flex')} />
                    <WillSharesFormStep categories={categories} className={cn(currentStep === 3 && 'flex')} />
                    <WillConstrainsFormStep className={cn(currentStep === 4 && 'flex')} />
                    <WillResumeFormStep categories={categories} className={cn(currentStep === 5 && 'flex')} />
                    <WillSuccessFormStep className={cn(currentStep === 6 && 'flex')} />
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
function WillGuideStep({ className }: StepComponentProps) {
    const setCurrentStep = useNewWillState(s => s.setCurrentStep)

    return (
        <div className={cn('hidden flex-auto flex-col', className)}>
            <SheetHeader className='flex items-start w-full px-7 pt-20 pb-10'>
                <p className="text-h6 font-baskerville">Kako Dodati Oporoko - Enostaven Korak-za-Korak Vodnik</p>
            </SheetHeader>
            <SheetHeader className='flex items-start w-full bg-primary-white shadow-sheet-section px-7 py-[52px]'>
                <div className='flex flex-col gap-8'>
                    {WILL_GUIDE_STEPS.map(({ name, description }, i) => (
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
interface WillAssetFormStepProps extends StepComponentProps {
    categories: CategoryProps[]
}

function WillAssetFormStep({ categories, className }: WillAssetFormStepProps) {
    const setCurrentStep = useNewWillState(s => s.setCurrentStep)
    const setCurrentWill = useNewWillState(s => s.setCurrentWill)

    const form = useForm<z.infer<typeof WillAssetFormSchema>>({
        resolver: zodResolver(WillAssetFormSchema),
        defaultValues: {
            description: ''
        }
    })

    async function handleSubmit(data: z.infer<typeof WillAssetFormSchema>) {
        try {
            setCurrentWill({
                ...data,
                constrains: '',
                heirs: []
            })
            setCurrentStep(2)
        } catch (error) {
            if (error instanceof Error) {
                toast.error('Nekaj je šlo narobe.', {
                    description: JSON.stringify(error)
                })
            }
        }
    }

    return (
        <div className={cn('hidden flex-auto flex-col', className)}>
            <SheetHeader className='flex items-start w-full bg-primary-white shadow-sheet-section px-7 pt-10 pb-8 space-y-0'>
                <p className="text-h6 font-baskerville">Dodaj novo oporoko</p>
                <span className="text-body-medium font-medium">Izberite kategorijo</span>
            </SheetHeader>
            <div className={cn('flex flex-auto')}>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(handleSubmit)} className='w-full flex flex-col'>
                        <SheetHeader className='flex items-start w-full p-7'>
                            <div className="w-full grid gap-2">
                                <div className="grid gap-1">
                                    <FormField
                                        control={form.control}
                                        name="categoryId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div className='grid grid-cols-2 gap-2'>
                                                        {categories.map(({ id, name }) => (
                                                            <Button
                                                                key={`i-${id}`}
                                                                type='button'
                                                                variant='light'
                                                                onClick={() => field.onChange(id)}
                                                                className={cn(
                                                                    'w-full bg-transparent !text-body-medium',
                                                                    field.value === id && 'bg-primary-dark-gray text-primary-white'
                                                                )}
                                                            >{name}</Button>
                                                        ))}
                                                    </div>
                                                </FormControl>
                                                <div className='w-full flex justify-center'>
                                                    <FormMessage />
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-1">
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Dodatna obrazložitev</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Vpišite sporočilo"
                                                        autoComplete="off"
                                                        autoCorrect="off"
                                                        autoCapitalize='on'
                                                        className='min-h-[193px]'
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

/* ---------------------------------------------------------------------------------------------
 * Step 2
 * ------------------------------------------------------------------------------------------- */
interface WillHeirChooseStepProps extends StepComponentProps {
    heirs: HeirProps[]
}

function WillHeirChooseStep({ heirs, className }: WillHeirChooseStepProps) {
    const currentWill = useNewWillState(s => s.currentWill)
    const setCurrentStep = useNewWillState(s => s.setCurrentStep)
    const setCurrentWill = useNewWillState(s => s.setCurrentWill)
    const setIsOpen = useNewWillState(s => s.setIsOpen)
    const setIsOpenHeirSheet = useNewHeirState(s => s.setIsOpen)

    const form = useForm<z.infer<typeof WillHeirsFormSchema>>({
        resolver: zodResolver(WillHeirsFormSchema),
        defaultValues: {
            heirs: []
        }
    })

    const { fields, append } = useFieldArray({
        name: 'heirs',
        control: form.control
    })

    function handleNewHeir() {
        setIsOpenHeirSheet(true)
        setIsOpen(false)
    }

    // function handleEdit(i: number) {
    //     const updatedHeirs = currentWill?.heirs.filter((heir, index) => {
    //         if (index !== i) {
    //             return {
    //                 ...heir,
    //                 share: 0
    //             }
    //         }
    //         return null
    //     })
    //     setCurrentWill({
    //         ...currentWill,
    //         heirs: updatedHeirs
    //     })
    // }

    async function handleSubmit(data: z.infer<typeof WillHeirsFormSchema>) {
        const newHeirs = data.heirs.map(({ id }) => {
            const heirFound = heirs.find(heir => heir.id === Number(id))
            if (heirFound) {
                return {
                    ...heirFound,
                    id: Number(heirFound.id)
                }
            }
            return null
        }).filter(heir => heir !== null)

        try {
            setCurrentWill({
                ...currentWill,
                heirs: [
                    ...currentWill.heirs,
                    ...newHeirs as NewHeirProps[]
                ]
            })
            setCurrentStep(3)
        } catch (error) {
            if (error instanceof Error) {
                toast.error('Nekaj je šlo narobe.', {
                    description: JSON.stringify(error)
                })
            }
        }
    }

    useEffect(() => {
        // if (currentStep === 3 && currentWill.heirs.length > 0) {
        // console.log('Current heirs -> ', heirs)
        //     remove()
        heirs.map(() => (append({
            id: ''
        })))
        // }
    }, [heirs, append])

    return (
        <div className={cn('hidden flex-auto flex-col', className)}>
            <SheetHeader className='flex items-start w-full bg-primary-white shadow-sheet-section px-7 pt-10 pb-8 space-y-0 relative z-[100]'>
                <p className="text-h6 font-baskerville">Dodaj novo oporoko</p>
                <span className="text-body-medium font-medium">Določanje dedičev</span>
            </SheetHeader>
            <div className={cn('flex flex-col flex-auto')}>
                {heirs.length > 0
                    ? (
                        <Form {...form} >
                            <form id='heirChooseForm' onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col flex-auto'>
                                {fields.map((_, i) => (
                                    <SheetHeader
                                        key={`i-${i}`}
                                        style={{ zIndex: 99 - i }}
                                        className='flex flex-row justify-between items-center w-full bg-primary-white shadow-sheet-section px-7 py-9 relative'
                                    >
                                        <FormField
                                            control={form.control}
                                            name={`heirs.${i}.id`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <div className='flex items-center gap-5'>
                                                            <Checkbox
                                                                className='bg-primary-dark-gray'
                                                                checked={field.value !== ''}
                                                                onCheckedChange={v => field.onChange(v ? heirs[i].id?.toString() : '')}
                                                            />
                                                            <div className='flex flex-col'>
                                                                <p className="text-body-small">{heirs[i].relationship}</p>
                                                                <span className="text-body-big-2 font-medium">{heirs[i].name}</span>
                                                                <p className="text-body-small">{heirs[i].address}</p>
                                                            </div>
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <div className='flex gap-2 !m-0'>
                                            {/* <button
                                                className='text-body-medium font-medium'
                                                onClick={() => handleEdit(i)}
                                            >Uredi</button> */}
                                        </div>
                                    </SheetHeader>
                                ))}
                            </form>
                        </Form>
                    )
                    : (
                        <SheetHeader className='flex justify-center items-center w-full px-7 pt-10 pb-0 mt-auto space-y-0 relative z-[100]'>
                            <Ilustrations.List className='w-full max-w-44 lg:max-w-72' />
                            <span className="text-h5 font-baskerville text-center !mb-8">Dodaj dediča</span>
                            <p className="text-body-big-2 text-center">V knjižnici dedičev smo opazili da nimate dediča. V kolikor želite naprej z kreacijo oporoke boste potrebovali <span className='font-bold'>“dodati novega dediča”</span></p>
                        </SheetHeader>
                    )
                }
                {/* <Button onClick={handleNewHeir} className='w-fit mx-auto my-6'>
                    <span className='flex items-center gap-4'>
                        <Icons.Plus />
                        <span className='leading-none '>Dodaj novega dediča</span>
                    </span>
                </Button> */}
                <SheetFooter className='flex items-center justify-center w-full bg-primary-white px-6 py-4 mt-auto'>
                    <Button
                        variant='light'
                        size='icon'
                        className='min-w-10'
                        onClick={() => setCurrentStep(1)}
                    >
                        <Icons.ArrowLeft className='w-5 h-5' />
                    </Button>
                    <Button variant='light' onClick={handleNewHeir} className='w-fit'>
                        <span className='flex items-center gap-4'>
                            <Icons.Plus />
                            <span className='leading-none '>Dodaj Dediča</span>
                        </span>
                    </Button>
                    <Button
                        form='heirChooseForm'
                        className='w-full'
                    >
                            Nadaljuj
                    </Button>
                </SheetFooter>
            </div>
        </div>
    )
}

/* ---------------------------------------------------------------------------------------------
 * Step 3
 * ------------------------------------------------------------------------------------------- */
interface WillSharesFormStepProps extends StepComponentProps {
    categories: CategoryProps[]
}

function WillSharesFormStep({ categories, className }: WillSharesFormStepProps) {
    // const [isFirstTypo, setIsFirstTypo] = useState(true)
    const setCurrentStep = useNewWillState(s => s.setCurrentStep)
    const setCurrentWill = useNewWillState(s => s.setCurrentWill)
    const currentWill = useNewWillState(s => s.currentWill)
    const currentStep = useNewWillState(s => s.currentStep)

    const form = useForm<z.infer<typeof WillSharesFormSchema>>({
        resolver: zodResolver(WillSharesFormSchema),
        defaultValues: {
            shares: []
        }
    })
    const { fields, append, remove } = useFieldArray({
        name: 'shares',
        control: form.control
    })

    function handleBack() {
        setCurrentWill({
            ...currentWill,
            heirs: []
        })
        setCurrentStep(2)
        remove()
    }

    // function handleBlur(e: React.FocusEvent<HTMLInputElement, Element>, i: number) {
    //     if (Number(e.target.value) > 0 && isFirstTypo) {
    //         const share = (100 - Number(e.target.value)) / (fields.length - 1)
    //         fields.forEach((_, index) => {
    //             if (index !== i) {
    //                 form.setValue(`shares.${index}.share`, share.toString())
    //                 setIsFirstTypo(false)
    //             }
    //         })
    //     }
    // }

    async function handleSubmit(data: z.infer<typeof WillSharesFormSchema>) {
        try {
            const updatedHeirs = currentWill.heirs.map((heir: NewHeirProps, i: number) => ({
                ...heir,
                share: Number(data.shares[i].share),
                constrains: data.shares[i].constrains
            }))

            setCurrentWill({
                ...currentWill,
                heirs: updatedHeirs
            })
            setCurrentStep(4)
        } catch (error) {
            if (error instanceof Error) {
                toast.error('Nekaj je šlo narobe.', {
                    description: JSON.stringify(error)
                })
            }
        }
    }

    useEffect(() => {
        // if (currentStep === 3 && currentWill.heirs.length > 0) {
        remove()
        currentWill.heirs.forEach((heir, i) => {
            append({
                share: '',
                constrains: ''
            })
            if (currentWill.heirs.length > 0) {
                // const isFound = currentWill.heirs.some(({ id }) => heir.id === id)
                // if (isFound) {
                form.setValue(`shares.${i}.share`, heir.share?.toString() || '')
                // }
            }
        })
        // }
    }, [currentWill, currentStep, append, remove])

    // useEffect(() => {
    //     if (currentStep < 3) {
    //         setIsFirstTypo(true)
    //     }
    // }, [currentStep])

    return (
        <div className={cn('hidden flex-auto flex-col', className)}>
            <SheetHeader className='flex items-start w-full bg-primary-white shadow-sheet-section px-7 pt-10 pb-8 space-y-0 relative z-[100]'>
                <p className="text-h6 font-baskerville">Dodaj novo oporoko</p>
                <span className="text-body-medium font-medium">Določanje deležev</span>
            </SheetHeader>
            <div className={cn('flex flex-col flex-auto')}>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col flex-auto'>
                        {fields.map(({ id }, i) => (
                            <SheetHeader
                                key={`i-sf-${id}-${i}`}
                                style={{ zIndex: 99 - i }}
                                className='flex items-start w-full bg-primary-white shadow-sheet-section p-7'
                            >
                                <div className="w-full grid gap-2">
                                    <div className="grid gap-1">
                                        <span className='text-body-big font-medium'>
                                            {currentWill.heirs.length > 0 && currentWill.heirs[i].name}
                                        </span>
                                    </div>
                                    <div className="grid gap-1">
                                        <FormField
                                            control={form.control}
                                            name={`shares.${i}.share`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Odstotek{' '}
                                                        <span className={cn(
                                                            'text-body-big-2 font-semibold ml-1 opacity-0',
                                                            field.value.length > 0 && 'transition-opacity duration-200 opacity-100'
                                                        )}>
                                                            {field.value}%
                                                        </span>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Slider
                                                            defaultValue={[1]}
                                                            min={1}
                                                            max={100}
                                                            step={1}
                                                            value={[Number(field.value)]}
                                                            onValueChange={v => field.onChange(v[0].toString())}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid gap-1">
                                        <FormLabel>Predmeti</FormLabel>
                                        <div className='grid border border-primary-light-gray px-4 py-2'>
                                            <span className='text-body-big-2 font-medium'>
                                                {categories.find(({ id }) => id === currentWill.categoryId)?.name}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="grid gap-1">
                                        <FormField
                                            control={form.control}
                                            name={`shares.${i}.constrains`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Vpiši posebne pogoje</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Vpišite posebni pogoj dedovanja..."
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

                                </div>
                            </SheetHeader>
                        ))}
                        <SheetHeader className='flex items-start w-full shadow-button p-7'>
                            <p className="text-body-small text-center">Ste radovedni o tem, kako lahko oblikujete svoje dedovanje?<br /> Kliknite spodaj in odkrijte več podrobnosti o pogojih dedovanja.</p>
                            <Sheet>
                                <SheetTrigger>
                                    <div className="flex items-center gap-2 mx-auto">
                                        <span className='text-body-small font-bold'>Želim izvedeti več o Posebnih pogojih dedovanja</span>
                                        <Icons.ChevronDown className='w-5 h-5 -rotate-90' />
                                    </div>
                                </SheetTrigger>
                                <SheetContent className='w-full lg:!max-w-[420px] h-full bg-[#F1F1F1] p-0'>
                                    <ScrollArea
                                        className={cn(
                                            'w-full h-full',
                                            '[&>div>div]:min-h-full [&>div>div]:!flex [&>div>div]:flex-col'
                                        )}
                                    >
                                        <SheetHeader className='flex items-start w-full px-7 pt-10 pb-8'>
                                            <p className="text-h6 font-baskerville">Posebni pogoji dedovanja</p>
                                        </SheetHeader>
                                        <SheetHeader className='flex items-start w-full bg-primary-white shadow-sheet-section px-7 py-[52px]'>
                                            <div className='flex flex-col gap-8'>
                                                {WILL_SPECIAL_CONSTRAINS.map(({ name, description }, i) => (
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
                                    </ScrollArea>
                                </SheetContent>
                            </Sheet>
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

/* ---------------------------------------------------------------------------------------------
 * Step 4
 * ------------------------------------------------------------------------------------------- */
function WillConstrainsFormStep({ className }: StepComponentProps) {
    const setCurrentStep = useNewWillState(s => s.setCurrentStep)
    const setCurrentWill = useNewWillState(s => s.setCurrentWill)
    const currentWill = useNewWillState(s => s.currentWill)

    const form = useForm<z.infer<typeof WillConstrainsFormSchema>>({
        resolver: zodResolver(WillConstrainsFormSchema),
        defaultValues: {
            constrains: ''
        }
    })

    function handleBack() {
        setCurrentStep(3)
    }

    async function handleSubmit(data: z.infer<typeof WillConstrainsFormSchema>) {
        try {
            setCurrentWill({
                ...currentWill,
                ...data
            })
            setCurrentStep(5)
        } catch (error) {
            if (error instanceof Error) {
                toast.error('Nekaj je šlo narobe.', {
                    description: JSON.stringify(error)
                })
            }
        }
    }

    return (
        <div className={cn('hidden flex-auto flex-col', className)}>
            <SheetHeader className='flex items-start w-full bg-primary-white shadow-sheet-section px-7 pt-10 pb-8 space-y-0'>
                <p className="text-h6 font-baskerville">Dodaj novo oporoko</p>
                <span className="text-body-medium font-medium">Dodatne informacije</span>
            </SheetHeader>
            <SheetHeader className='flex items-start w-full p-7'>
                <p className='text-body-small'>Tu lahko vnesete posebne želje ali navodila ki jih želite vključiti v oproko.</p>
            </SheetHeader>
            <div className={cn('flex flex-auto')}>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(handleSubmit)} className='w-full flex flex-col'>
                        <SheetHeader className='flex items-start w-full p-7 pt-0'>
                            <div className="w-full grid gap-2">
                                <div className="grid gap-1">
                                    <FormField
                                        control={form.control}
                                        name="constrains"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Dodatne želje/navodila</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Vpišite sporočilo"
                                                        autoComplete="off"
                                                        autoCorrect="off"
                                                        autoCapitalize='on'
                                                        className='min-h-[150px]'
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

/* ---------------------------------------------------------------------------------------------
 * Step 5
 * ------------------------------------------------------------------------------------------- */
interface WillResumeStepProps extends StepComponentProps {
    categories: CategoryProps[]
}

function WillResumeFormStep({ categories, className }: WillResumeStepProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [isConfirmed, setIsConfirmed] = useState(false)
    const setCurrentStep = useNewWillState(s => s.setCurrentStep)
    // const setCurrentWill = useNewWillState(s => s.setCurrentWill)
    const currentWill = useNewWillState(s => s.currentWill)

    async function handleConfirm() {
        try {
            if (isConfirmed) {
                setIsLoading(true)
                await createWill({
                    ...currentWill,
                    heirs: currentWill.heirs.map(({ id, share, constrains }) => ({ id, share, constrains }))
                })
                setCurrentStep(6)
                return
            }
            setIsConfirmed(true)
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
                <p className="text-h6 font-baskerville">Dodaj novo oporoko</p>
                <span className="text-body-medium font-medium">Potrditev zahtevka</span>
            </SheetHeader>
            <div className={cn('flex flex-col flex-auto')}>
                <SheetHeader
                    className='flex flex-row justify-between items-start w-full bg-primary-white shadow-sheet-section px-7 py-9 relative z-[99]'
                >
                    <div className='flex flex-col'>
                        <p className="text-body-small">KATEGORIJA</p>
                        <span className="text-body-big-2 font-medium">{categories.find(({ id }) => id === currentWill.categoryId)?.name}</span>
                    </div>
                    <div className={cn('flex gap-2 !m-0', isConfirmed && 'invisible')}>
                        <button
                            className='text-body-medium font-medium'
                            onClick={() => setCurrentStep(1)}
                        >Uredi</button>
                    </div>
                </SheetHeader>
                <SheetHeader
                    className='flex flex-row justify-between items-start w-full bg-primary-white shadow-sheet-section px-7 py-9 relative z-[98]'
                >
                    <div className='flex flex-col'>
                        <p className="text-body-small">IME PREDMETA</p>
                        <span className="text-body-big-2 font-medium">{currentWill.description}</span>
                    </div>
                    <div className={cn('flex gap-2 !m-0', isConfirmed && 'invisible')}>
                        <button
                            className='text-body-medium font-medium'
                            onClick={() => setCurrentStep(1)}
                        >Uredi</button>
                    </div>
                </SheetHeader>
                <SheetHeader
                    className='flex justify-between items-start w-full bg-primary-white shadow-sheet-section px-7 py-9 relative z-[97]'
                >
                    <div className='w-full flex justify-between items-center mb-2'>
                        <p className="text-body-small">DEDIČI</p>
                        <div className={cn('flex gap-2 !m-0', isConfirmed && 'invisible')}>
                            <button
                                className='text-body-medium font-medium'
                                onClick={() => setCurrentStep(3)}
                            >Uredi</button>
                        </div>
                    </div>
                    {
                        currentWill.heirs.map(({ name, relationship, address, share }, i) => (
                            <div key={`i-${name}-${i}`} className='w-full flex flex-col [&>.separator]:last:hidden'>
                                <SheetHeader
                                    className='flex w-full'
                                >
                                    <div className='flex flex-row justify-between'>
                                        <div>
                                            <p className="text-body-small">{relationship}</p>
                                            <span className="text-body-big-2 font-medium">{name}</span>
                                            <p className="text-body-small">{address}</p>
                                        </div>
                                        <div>
                                            <span className="text-body-big-2 font-medium">{share}%</span>
                                        </div>
                                    </div>
                                </SheetHeader>
                                <Separator className='separator bg-primary-light-gray !my-6' />
                            </div>
                        ))
                    }
                </SheetHeader>
                <SheetHeader
                    className='flex flex-row justify-between items-start w-full bg-primary-white shadow-sheet-section px-7 py-9 relative z-[96]'
                >
                    <div className='flex flex-col'>
                        <p className="text-body-small">DODATNE ŽELJE</p>
                        <span className="text-body-big-2 font-medium">{currentWill.constrains}</span>
                    </div>
                    <div className={cn('flex gap-2 !m-0', isConfirmed && 'invisible')}>
                        <button
                            className='text-body-medium font-medium'
                            onClick={() => setCurrentStep(4)}
                        >Uredi</button>
                    </div>
                </SheetHeader>
            </div>
            <SheetFooter className='flex items-center justify-center w-full bg-primary-white px-6 py-4 mt-auto'>
                <Button
                    disabled={isLoading}
                    className='w-full'
                    onClick={handleConfirm}
                >
                    <span className='flex items-center gap-[10px]'>
                        {isLoading && (
                            <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        <span className='leading-none '>{isConfirmed ? 'Oddaj zahtevek' : 'Potrdi podatke'}</span>
                    </span>
                </Button>
            </SheetFooter>
        </div>
    )
}

/* ---------------------------------------------------------------------------------------------
 * Step 6
 * ------------------------------------------------------------------------------------------- */
function WillSuccessFormStep({ className }: StepComponentProps) {
    const { refresh } = useRouter()
    return (
        <div className={cn('hidden flex-auto flex-col', className)}>
            <SheetHeader className='flex flex-auto justify-center items-center w-full px-7 pt-10 pb-8 space-y-0 relative z-[100]'>
                <Ilustrations.List className='w-full max-w-44 lg:max-w-72' />
                <span className="text-h5 font-baskerville text-center !mb-8">Vaš zahtevek je oddan!</span>
                <p className="text-body-big-2 text-center !mb-6">Ko naš tim preveri vaš zahtevek, vas bomo obvestili in organizirali sastanek. Na sastanku se spiše in overi lastoročna oporoka.</p>
                <p className="text-body-big-2 text-center !mb-6">Po overitvi bo Vaša oporoka dodana pod &apos;Shrambo Oporok&apos;.</p>
                <p className="text-body-big-2 font-medium text-center">Najlepša hvala za Vaše zaupanje.</p>
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
