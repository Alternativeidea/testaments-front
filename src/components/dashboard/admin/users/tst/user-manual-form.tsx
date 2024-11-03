'use client'
// React
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
// Components
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Icons } from '@/components/ui/icons'
import { Ilustrations } from '@/components/ui/ilustrations'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SheetClose } from '@/components/ui/sheet'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/text-area'
// Utils
import { TstManualSchema } from '@/lib/schemas/transactions'
import { addTstManually, removeTstManually } from '@/lib/services/admin/transactions'
import { getRatesToday } from '@/lib/services/rates'
import { getYearsToNow } from '@/lib/utils/date'
import { allowOnlyNumbers, preventWheel } from '@/lib/utils/form'
import { cn } from '@/lib/utils/style'
import { zodResolver } from '@hookform/resolvers/zod'
import { differenceInCalendarYears, format } from 'date-fns'
import { sl } from 'date-fns/locale'
import DynamicNumber from 'react-dynamic-number'
import { toast } from 'sonner'
import * as z from 'zod'

interface UserConfirmProps {
    id: number
    buy: boolean
}

export default function UserManualForm({ id, buy }: UserConfirmProps) {
    const router = useRouter()
    const [success, setSuccess] = useState<boolean>(false)
    const [rateValue, setRateValue] = useState<number>(0)
    const [quantity, setQuantity] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>()
    const form = useForm<z.infer<typeof TstManualSchema>>({
        resolver: zodResolver(TstManualSchema),
        defaultValues: {
            paymentMethod: 'iban'
        }
    })

    async function handleSubmit(data: z.infer<typeof TstManualSchema>) {
        const payload = {
            quantity: data.quantity,
            paymentMethod: data.paymentMethod,
            rate: data.rate,
            createdAt: format(data.createdAt, 'yyyy-MM-dd')
        }
        if (buy) {
            await addTstManually(id, payload)
        } else {
            await removeTstManually(id, payload)
        }
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
        setSuccess(true)
        router.refresh()
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const { priceBuy, priceSell } = await getRatesToday()
            if (buy) {
                const value = parseFloat(priceSell)
                setRateValue(parseFloat(value.toFixed(2)))
            } else {
                const value = parseFloat(priceBuy)
                setRateValue(parseFloat(value.toFixed(2)))
            }
            setLoading(false)
        }

        fetchData()
    }, [])

    return (
        <>
            {success
                ? <SuccessScreen/>
                : <div className={cn('grid gap-6 pb-6')}>
                    <h3 className='text-body-big font-baskerville'>{
                        buy ? 'Dodaj testamente' : 'Vračilo testamentov'
                    }</h3>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-4'>
                            <div>
                                <FormField
                                    control={form.control}
                                    name='quantity'
                                    render={({ field: { onChange } }) => (
                                        <FormItem>
                                            <FormLabel>Število Testamentov</FormLabel>
                                            <FormControl>
                                                <DynamicNumber
                                                    className= 'flex h-[45px] w-full rounded-none border border-primary-medium-gray bg-primary-white text-body-big-2 font-medium px-4 py-3 ring-offset-primary-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:font-normal placeholder:text-primary-medium-gray/50 focus-visible:placeholder:text-primary-medium-gray focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                                                    separator={','}
                                                    positive={true}
                                                    negative={false}
                                                    fraction={4}
                                                    thousand={true}
                                                    defaultValue={0}
                                                    onChange={(e, modelValue) => {
                                                        // console.log(modelValue)
                                                        // console.log(viewValue)
                                                        setQuantity((modelValue))
                                                        onChange?.(modelValue)
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='flex gap-x-6'>
                                <div>
                                    <Label>Gram</Label>
                                    <Input
                                        value={(quantity).toLocaleString('sl-SI', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        })}
                                        placeholder="Gr"
                                        readOnly
                                        className='p-6 bg-transparent'
                                    />
                                </div>
                                <div>
                                    <Label>EUR</Label>
                                    <Input
                                        value={Number(rateValue * quantity).toLocaleString('sl-SI', {
                                            maximumFractionDigits: 2,
                                            minimumFractionDigits: 2
                                        })}
                                        placeholder="EUR"
                                        readOnly
                                        className='p-6 bg-transparent'
                                    />
                                </div>
                            </div>
                            <div>
                                <FormField
                                    control={form.control}
                                    name='rate'
                                    render={({ field: { onChange, ...field } }) => (
                                        <FormItem>
                                            <FormLabel>{
                                                buy ? 'Nakupni tečaj 1g zlata /EUR (danes)' : 'Odkupni tečaj 1g zlata /EUR (danes)'}
                                            </FormLabel>
                                            <FormControl>
                                                {loading
                                                    ? <Skeleton className='w-full h-12'/>
                                                    : <Input
                                                        defaultValue={rateValue}
                                                        type='number'
                                                        min={1}
                                                        step={0.01}
                                                        onWheel={preventWheel}
                                                        onKeyDown={allowOnlyNumbers}
                                                        className='p-6 bg-transparent'
                                                        onChange={(e) => {
                                                            setRateValue(parseFloat(e.target.value))
                                                            onChange?.(parseFloat(e.target.value))
                                                        }}
                                                        {...field}
                                                    />
                                                }
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="createdAt"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Datum naročila</FormLabel>
                                        <Popover>
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
                                                                <span>{format(field.value, 'PPP', { locale: sl })}</span>
                                                            )
                                                            : (
                                                                <span>DD / MM /YYYY</span>
                                                            )}
                                                        {/* <CalendarIcon className="ml-auto h-4 w-4 opacity-50" /> */}
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent avoidCollisions={false} className="w-auto p-0 z-[99]" align="start">
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
                                                    <SelectContent position="popper" className='w-full z-[100]' >
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
                            <div>
                                <h3 className='font-bold py-4'>{
                                    buy ? 'Tip Naročila (kako je stranka plačala)' : 'Tip plačila (kako smo stranko plačali)'}
                                </h3>
                                <FormField
                                    control={form.control}
                                    defaultValue={'iban'}
                                    name="paymentMethod"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Label className='ml-0'>Drugo, obrazložitev...</Label>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="iban" id="r1" />
                                                        <Label htmlFor="r1">IBAN</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="gotovina" id="r2" />
                                                        <Label htmlFor="r2">Gotovina</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="crypto" id="r3" />
                                                        <Label htmlFor="r3">Crypto</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="lastno zlato" id="r4" />
                                                        <Label htmlFor="r4">Lastno zlato</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="drugo" id="r5" />
                                                        <Label htmlFor="r5">Drugo</Label>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='pb-12'>
                                <FormField
                                    control={form.control}
                                    name="notes"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Label className='ml-0'>Drugo, obrazložitev...</Label>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Napiši tukaj..."
                                                    autoComplete="off"
                                                    autoCorrect="off"
                                                    autoCapitalize='on'
                                                    className='h-[100px]'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button>
                                <span className='flex items-center gap-[10px]'>
                                    {form.formState.isSubmitting && (
                                        <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    <span className='leading-none '>Potrdi</span>
                                </span>
                            </Button>
                        </form>
                    </Form>
                </div>
            }</>
    )
}

function SuccessScreen() {
    function handleRefresh() {
        location.reload()
    }

    return (
        <div className='flex flex-col items-center justify-center gap-y-12 absolute w-full top-0 left-0 h-screen bg-primary-white overflow-hidden'>
            <div className='flex flex-col items-center w-full gap-y-6'>
                <Ilustrations.Wallet />
                <h3 className='text-h5 font-baskerville'>Urejeno!</h3>
                <div className='flex flex-col gap-y-2 items-center justify-center text-center px-2'>
                    <p>Vaš proces je bil uspešno obdelan in opravljen.</p>
                </div>
                <SheetClose className='flex justify-center w-full border-none outline-none ' >
                    <Button onClick={handleRefresh} className='w-3/5'>
                    Končaj
                    </Button>
                </SheetClose>
            </div>
        </div>
    )
}
