'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
import DocumentUploader from '@/components/ui/document-uploader'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Icons } from '@/components/ui/icons'
import { Ilustrations } from '@/components/ui/ilustrations'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader } from '@/components/ui/sheet'
import { Slider } from '@/components/ui/slider'
import { Textarea } from '@/components/ui/text-area'
import { AdminWillAssetFormSchema } from '@/lib/schemas/admin/will'
import { WillHeirsFormSchema, WillSharesFormSchema } from '@/lib/schemas/will'
import { createWill, updateWill } from '@/lib/services/admin/users/wills'
import { formatDateWithNumbers, getYearsToNow } from '@/lib/utils/date'
import { cn } from '@/lib/utils/style'
import { zodResolver } from '@hookform/resolvers/zod'
import { differenceInCalendarYears, format } from 'date-fns'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { create } from 'zustand'

/* ---------------------------------------------------------------------------------------------
 * State
 * ------------------------------------------------------------------------------------------- */
interface NewHeirProps {
    id?: number
    name: string
    address: string
    relationship: string
    share?: number
    constrains?: string
}

interface AdminNewWillProps {
    id?: number
    description: string
    categoryId: number
    heirs: NewHeirProps[]
    date: Date
    url: string
}

interface AdminNewWillStoreProps {
    isOpen: boolean
    setIsOpen: (v: boolean) => void
    currentStep: number
    setCurrentStep: (v: number) => void
    currentWill: AdminNewWillProps
    setCurrentWill: (v: AdminNewWillProps) => void
}

export const useAdminNewWillState = create<AdminNewWillStoreProps>()((set) => ({
    isOpen: false,
    setIsOpen: (v) => set(() => ({ isOpen: v })),
    currentStep: 0,
    setCurrentStep: (v) => set(() => ({ currentStep: v })),
    currentWill: {
        description: '',
        categoryId: 0,
        heirs: [],
        date: new Date(),
        url: ''
    },
    setCurrentWill: (v) => set(() => ({ currentWill: v }))
}))

/* ---------------------------------------------------------------------------------------------
 * Main
 * ------------------------------------------------------------------------------------------- */
interface AdminNewWillSheetProps{
    heirs: HeirProps[]
    categories: CategoryProps[]
}

export function AdminNewWillSheet({ heirs, categories }: AdminNewWillSheetProps) {
    const isOpen = useAdminNewWillState(s => s.isOpen)
    const setIsOpen = useAdminNewWillState(s => s.setIsOpen)
    const currentStep = useAdminNewWillState(s => s.currentStep)
    const setCurrentStep = useAdminNewWillState(s => s.setCurrentStep)
    const setCurrentWill = useAdminNewWillState(s => s.setCurrentWill)

    function handleOpenChange(isOpen: boolean) {
        if (isOpen === false) {
            setCurrentWill({
                id: undefined,
                description: '',
                categoryId: 0,
                heirs: [],
                date: new Date(),
                url: ''
            })
            setIsOpen(false)
            setCurrentStep(0)
        }
    }

    return (
        <Sheet open={isOpen} onOpenChange={handleOpenChange}>
            {/* <SheetTrigger asChild onClick={() => setIsOpen(true)}>
                <Button>
                    <span className='flex items-center gap-4'>
                        <Icons.Plus />
                        <span className='leading-none '>Dodaj oporoko</span>
                    </span>
                </Button>
            </SheetTrigger> */}
            <SheetContent className='w-full lg:!max-w-[420px] h-full bg-[#F1F1F1] p-0'>
                <ScrollArea
                    className={cn(
                        'w-full h-full',
                        '[&>div>div]:min-h-full [&>div>div]:!flex [&>div>div]:flex-col'
                    )}
                >
                    <WillAssetFormStep categories={categories} className={cn(currentStep === 0 && 'flex')} />
                    <WillHeirChooseStep heirs={heirs} className={cn(currentStep === 1 && 'flex')} />
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
interface WillAssetFormStepProps extends StepComponentProps {
    categories: CategoryProps[]
}

function WillAssetFormStep({ categories, className }: WillAssetFormStepProps) {
    const currentWill = useAdminNewWillState(s => s.currentWill)
    const setCurrentStep = useAdminNewWillState(s => s.setCurrentStep)
    const setCurrentWill = useAdminNewWillState(s => s.setCurrentWill)

    const form = useForm<z.infer<typeof AdminWillAssetFormSchema>>({
        resolver: zodResolver(AdminWillAssetFormSchema),
        defaultValues: {
            description: ''
        }
    })

    async function handleSubmit(data: z.infer<typeof AdminWillAssetFormSchema>) {
        try {
            setCurrentWill({
                ...currentWill,
                ...data
            })
            setCurrentStep(1)
        } catch (error) {
            if (error instanceof Error) {
                toast.error('Nekaj je šlo narobe.', {
                    description: JSON.stringify(error)
                })
            }
        }
    }

    useEffect(() => {
        if (currentWill.categoryId !== 0) {
            form.reset(currentWill)
        }
    }, [currentWill, form])

    return (
        <div className={cn('hidden flex-auto flex-col', className)}>
            <SheetHeader className='flex items-start w-full bg-primary-white shadow-sheet-section px-7 pt-10 pb-8 space-y-0'>
                <p className="text-h6 font-baskerville">{ currentWill.id ? 'Uredi Oporoko' : 'Dodaj novo oporoko'}</p>
                {/* <span className="text-body-medium font-medium">Izberite kategorijo</span> */}
            </SheetHeader>
            <div className={cn('flex flex-auto')}>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(handleSubmit)} className='w-full flex flex-col'>
                        <SheetHeader className='flex items-start w-full p-7'>
                            <div className="w-full grid gap-2">
                                <div className="grid gap-1">
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Ime oporoke</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Vpišite sporočilo"
                                                        autoComplete="off"
                                                        autoCorrect="off"
                                                        autoCapitalize='on'
                                                        className='min-h-[45px]'
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
                                        name="date"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Datum obdelave</FormLabel>
                                                <Popover modal >
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant={'light'}
                                                                className={cn(
                                                                    'w-full justify-start text-left font-normal font-dm-sans',
                                                                    !field.value && 'text-muted-foreground'
                                                                )}
                                                            >
                                                                {field.value
                                                                    ? (
                                                                        <span>{format(field.value, 'PPP')}</span>
                                                                    )
                                                                    : (
                                                                        <span>DD / MM /YYYY</span>
                                                                    )}
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent avoidCollisions={false} className="w-auto p-0 z-[71]" align="start">
                                                        <Select
                                                            onValueChange={(value) => {
                                                                const selectedYear = new Date().getFullYear() + parseInt(value)
                                                                const currentMonth = field.value ? field.value.getMonth() : new Date().getMonth() // Default to January if no date is set
                                                                const currentDay = field.value ? field.value.getDate() : new Date().getDate() // Default to 1 if no date is set

                                                                // Create a new date with the selected year, current month, and current day
                                                                const newDate = new Date(selectedYear, currentMonth, currentDay)
                                                                field.onChange(newDate)
                                                            }}
                                                        >
                                                            <SelectTrigger className='w-full'>
                                                                <SelectValue placeholder='Izberite leto' />
                                                            </SelectTrigger>
                                                            <SelectContent position="popper" className='w-full z-[72]'>
                                                                <ScrollArea className="h-[200px] w-full">
                                                                    {getYearsToNow(1900).reverse().map(year => (
                                                                        <SelectItem key={year} value={differenceInCalendarYears(new Date(year, 1, 1), new Date()).toString()}>{year}</SelectItem>
                                                                    ))}
                                                                </ScrollArea>
                                                            </SelectContent>
                                                        </Select>
                                                        <Calendar
                                                            key={field.value?.toISOString()}
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            defaultMonth={field.value}
                                                            disabled={(date) =>
                                                                date > new Date() || date < new Date('1900-01-01')
                                                            }
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-1 mt-7">
                                    <FormField
                                        control={form.control}
                                        name="categoryId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='!text-h6 font-baskerville m-0'>Izberite kategorijo</FormLabel>
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
                            </div>
                        </SheetHeader>
                        <SheetFooter className='flex flex-row items-center justify-center w-full bg-primary-white px-6 py-4 mt-auto'>
                            <Button className='w-full'>
                                Naprej
                            </Button>
                        </SheetFooter>
                    </form>
                </Form>
            </div>
        </div>
    )
}

/* ---------------------------------------------------------------------------------------------
 * Step 1
 * ------------------------------------------------------------------------------------------- */
interface WillHeirChooseStepProps extends StepComponentProps {
    heirs: HeirProps[]
}

function WillHeirChooseStep({ heirs, className }: WillHeirChooseStepProps) {
    const currentWill = useAdminNewWillState(s => s.currentWill)
    const setCurrentStep = useAdminNewWillState(s => s.setCurrentStep)
    const setCurrentWill = useAdminNewWillState(s => s.setCurrentWill)
    const { replace } = useRouter()
    const pathname = usePathname()

    const form = useForm<z.infer<typeof WillHeirsFormSchema>>({
        resolver: zodResolver(WillHeirsFormSchema),
        defaultValues: {
            heirs: []
        }
    })

    const { fields, append, remove } = useFieldArray({
        name: 'heirs',
        control: form.control
    })

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

    function handleHeirs(value : string) {
        const params = new URLSearchParams()
        if (value) {
            params.delete('view')
            params.set('view', value)
            replace(`${pathname}?${params.toString()}`)
        }
    }

    async function handleSubmit(data: z.infer<typeof WillHeirsFormSchema>) {
        const newHeirs = data.heirs.map(({ id }) => {
            const heirFound = heirs.find(heir => heir.id === Number(id))
            if (heirFound) {
                return {
                    ...heirFound,
                    id: Number(heirFound.id),
                    share: currentWill.heirs.find(({ id }) => heirFound.id === id)?.share
                }
            }
            return null
        }).filter(heir => heir !== null)

        try {
            setCurrentWill({
                ...currentWill,
                heirs: [
                    // ...currentWill.heirs,
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
        remove()
        heirs.forEach((heir, i) => {
            append({
                id: ''
            })
            if (currentWill.heirs.length > 0) {
                const isFound = currentWill.heirs.some(({ id }) => heir.id === id)
                if (isFound) {
                    form.setValue(`heirs.${i}.id`, heir.id?.toString())
                }
            }
        })
        // }
    }, [heirs, append, remove])

    return (
        <div className={cn('hidden flex-auto flex-col', className)}>
            <SheetHeader className='flex items-start w-full bg-primary-white shadow-sheet-section px-7 pt-10 pb-8 space-y-0 relative z-[100]'>
                <p className="text-h6 font-baskerville">{ currentWill.id ? 'Uredi Oporoko' : 'Dodaj novo oporoko'}</p>
            </SheetHeader>
            <SheetHeader className='flex items-start w-full bg-primary-white shadow-sheet-section px-7 py-6 space-y-0 relative z-[99]'>
                <p className="text-body-big-2 font-baskerville">Določi dediče</p>
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
                    : <SheetHeader>
                        <Button
                            variant={'default'}
                            onClick={() => handleHeirs('heirs')}
                            className='h-fit'
                        >
                            Dodaj novega dediča
                        </Button>
                    </SheetHeader>
                }
                <SheetFooter className='flex flex-row items-center justify-center w-full bg-primary-white px-6 py-4 mt-auto'>
                    <Button
                        variant='light'
                        size='icon'
                        className='min-w-10'
                        onClick={() => setCurrentStep(0)}
                    >
                        <Icons.ArrowLeft className='w-5 h-5' />
                    </Button>
                    <Button
                        form='heirChooseForm'
                        className='w-full'
                    >
                        Naprej
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
    const setCurrentStep = useAdminNewWillState(s => s.setCurrentStep)
    const setCurrentWill = useAdminNewWillState(s => s.setCurrentWill)
    const currentWill = useAdminNewWillState(s => s.currentWill)
    const currentStep = useAdminNewWillState(s => s.currentStep)

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
        setCurrentStep(1)
        remove()
    }

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
    //     // if (currentStep === 3 && currentWill.heirs.length > 0) {
    //     // console.log('Current heirs -> ', heirs)
    //     remove()
    //     heirs.forEach((heir, i) => {
    //         append({
    //             id: ''
    //         })
    //         if (currentWill.heirs.length > 0) {
    //             const isFound = currentWill.heirs.some(({ id }) => heir.id === id)
    //             if (isFound) {
    //                 form.setValue(`heirs.${i}.id`, heir.id?.toString())
    //             }
    //         }
    //     })
    //     // }
    // }, [heirs, append, remove])

    return (
        <div className={cn('hidden flex-auto flex-col', className)}>
            <SheetHeader className='flex items-start w-full bg-primary-white shadow-sheet-section px-7 pt-10 pb-8 space-y-0 relative z-[100]'>
                <p className="text-h6 font-baskerville">{ currentWill.id ? 'Uredi Oporoko' : 'Dodaj novo oporoko'}</p>
            </SheetHeader>
            <SheetHeader className='flex items-start w-full bg-primary-white shadow-sheet-section px-7 py-6 space-y-0 relative z-[99]'>
                <p className="text-body-big-2 font-baskerville">Določi deleže dedičev</p>
            </SheetHeader>
            <div className={cn('flex flex-col flex-auto')}>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col flex-auto'>
                        {fields.map((_, i) => (
                            <SheetHeader
                                key={`i-${i}`}
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

                                </div>
                            </SheetHeader>
                        ))}
                        <SheetFooter className='flex flex-row items-center justify-center w-full bg-primary-white px-6 py-4 mt-auto'>
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
                                Naprej
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
    const [image, setImage] = useState<string | null>(null)
    const setCurrentStep = useAdminNewWillState(s => s.setCurrentStep)
    const setCurrentWill = useAdminNewWillState(s => s.setCurrentWill)
    const currentWill = useAdminNewWillState(s => s.currentWill)

    function handleBack() {
        setCurrentStep(3)
    }

    async function handleSubmit() {
        try {
            if (image) {
                setCurrentWill({
                    ...currentWill,
                    url: image
                })
                setCurrentStep(5)
            }
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
                <p className="text-h6 font-baskerville">{ currentWill.id ? 'Uredi Oporoko' : 'Dodaj novo oporoko'}</p>
            </SheetHeader>
            <SheetHeader className='flex items-start w-full p-7'>
                <p className="text-body-big-2 font-baskerville">Dodaj oporoko/Dokument</p>
            </SheetHeader>
            <div className={cn('flex flex-col flex-auto')}>
                <SheetHeader className='flex items-start w-full p-7 pt-0'>
                    <DocumentUploader title={`id-dokumenta_${formatDateWithNumbers(currentWill.date || '')}`} url={image} setUrl={setImage} />
                </SheetHeader>
                <SheetFooter className='flex flex-row items-center justify-center w-full bg-primary-white px-6 py-4 mt-auto'>
                    <Button
                        type='button'
                        variant='light'
                        size='icon'
                        className='min-w-10'
                        onClick={handleBack}
                    >
                        <Icons.ArrowLeft className='w-5 h-5' />
                    </Button>
                    <Button className='w-full' onClick={handleSubmit}>
                        Naprej in preglej
                    </Button>
                </SheetFooter>
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
    const setCurrentStep = useAdminNewWillState(s => s.setCurrentStep)
    const currentWill = useAdminNewWillState(s => s.currentWill)
    const params = useParams<{ id: string }>()
    const userId = params?.id ? parseInt(params.id) : 0

    async function handleConfirm() {
        try {
            if (isConfirmed) {
                setIsLoading(true)
                if (currentWill.id) {
                    await updateWill(currentWill.id || 0, {
                        ...currentWill,
                        date: format(new Date(currentWill.date), 'yyyy-MM-dd'),
                        heirs: currentWill.heirs.map(({ id, share, constrains }) => ({ id, share, constrains }))
                    })
                } else {
                    await createWill(userId, {
                        ...currentWill,
                        date: format(new Date(currentWill.date), 'yyyy-MM-dd'),
                        heirs: currentWill.heirs.map(({ id, share, constrains }) => ({ id, share, constrains }))
                    })
                }
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
                <p className="text-h6 font-baskerville">{ currentWill.id ? 'Uredi Oporoko' : 'Dodaj novo oporoko'}</p>
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
                            onClick={() => setCurrentStep(0)}
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
                            onClick={() => setCurrentStep(0)}
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
                                onClick={() => setCurrentStep(1)}
                            >Uredi</button>
                        </div>
                    </div>
                    {
                        currentWill.heirs.map(({ name, relationship, address }, i) => (
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
            </div>
            <SheetFooter className='flex flex-row items-center justify-center w-full bg-primary-white px-6 py-4 mt-auto'>
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
