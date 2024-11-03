'use client'
// React
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
// Components
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Icons } from '@/components/ui/icons'
import { Ilustrations } from '@/components/ui/ilustrations'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SheetClose } from '@/components/ui/sheet'
import { Slider } from '@/components/ui/slider'
// Utils
import { UpdateRateSchema } from '@/lib/schemas/transactions'
import { updateAdminRates } from '@/lib/services/admin/rates'
import { preventWheel } from '@/lib/utils/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import * as z from 'zod'

interface UpdateRateFormProps {
    price: number
    updateBuy: boolean
    priceBuy: number
    priceSell: number
    rateBuy: number
    rateSell: number
}

export default function UpdateRateForm({ price, updateBuy, rateBuy, rateSell, priceBuy, priceSell }: UpdateRateFormProps) {
    const router = useRouter()
    const [success, setSuccess] = useState<boolean>(false)
    const [rate, setRate] = useState(updateBuy ? rateBuy : rateSell)
    const form = useForm<z.infer<typeof UpdateRateSchema>>({
        resolver: zodResolver(UpdateRateSchema),
        defaultValues: {
            type: 'buy'
        }
    })

    async function handleSubmit(data: z.infer<typeof UpdateRateSchema>) {
        const payload = {
            ...data,
            type: updateBuy ? 'buy' : 'sell'
        }
        await updateAdminRates(payload)
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
        router.refresh()
        setSuccess(true)
    }

    return (
        <>
            {success
                ? <SuccessScreen updateBuy={updateBuy} price={((updateBuy ? Number(priceBuy).toFixed(2) : Number(priceSell).toFixed(2)))} rate={rate}/>
                : <div className='w-full h-screen min-h-full'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col justify-between h-full gap-4'>
                            <div className='flex flex-col gap-4'>
                                <div className='flex items-start w-full shadow-button py-8'>
                                    <p className="pl-4 text-h6 font-baskerville max-w-[320px]">{ updateBuy ? 'Sprememba odkupnega tečaja' : 'Sprememba nakupnega tečaja'}</p>
                                </div>
                                <div className='w-full p-4 flex flex-col gap-4'>
                                    <p className='text-body-big font-baskerville'>{ updateBuy ? 'Vezava in koeficjent odkupne cene' : 'Vezava in koeficjent nakupne cene' }</p>
                                    <div className='flex gap-x-6'>
                                        <div>
                                            <Input
                                                placeholder="Golden API"
                                                readOnly
                                                className='p-6 bg-transparent'
                                            />
                                        </div>
                                        <div>
                                            <Input
                                                value={`${Number(price).toFixed(2)} 
                                            EUR`
                                                }
                                                placeholder="EUR"
                                                readOnly
                                                className='p-6 bg-transparent'
                                            />
                                        </div>
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name='rate'
                                        defaultValue={updateBuy ? rateBuy : rateSell}
                                        render={({ field: { value, onChange, ...field } }) => (
                                            <FormItem>
                                                <FormLabel>{ updateBuy ? 'TST Odkupna koeficjent' : 'TST Nakupni koeficjent'}</FormLabel>
                                                <FormControl>
                                                    <>
                                                        <Input
                                                            type='number'
                                                            value={value}
                                                            min={-50}
                                                            max={50}
                                                            step={0.01}
                                                            placeholder={`${updateBuy ? rateBuy : rateSell} %`}
                                                            className='p-6 bg-transparent'
                                                            onWheel={preventWheel}
                                                            onChange={(e) => {
                                                                setRate(parseFloat(e.target.value))
                                                                onChange?.(parseFloat(e.target.value))
                                                            }}
                                                            {...field}
                                                        />
                                                        <Slider
                                                            min={-50}
                                                            max={50}
                                                            step={0.01}
                                                            defaultValue={[value]}
                                                            onValueChange={(value) => {
                                                                setRate(value[0])
                                                                onChange?.(value[0])
                                                            }}
                                                            className='py-2'
                                                        />
                                                    </>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div>
                                        <Label>{ updateBuy ? 'TST Odkupna cena' : 'Tečaj 1g zlata / EUR'}</Label>
                                        <Input
                                            value={`${((price) * ((100 + rate) / 100)).toFixed(2)} EUR`}
                                            placeholder="EUR"
                                            readOnly
                                            className='p-6 bg-transparent'
                                        />
                                    </div>
                                </div>
                            </div>
                            <Button className='m-6'>
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
            }
        </>
    )
}

function SuccessScreen({ updateBuy, rate, price } : { updateBuy: boolean, rate : number, price : string}) {
    return (
        <div className='flex flex-col items-center justify-center gap-y-12 absolute w-full top-0 left-0 h-screen bg-primary-white overflow-hidden'>
            <div className='flex flex-col items-center w-full gap-y-6 px-6'>
                <Ilustrations.GoldIngot />
                <h3 className='text-h5 font-baskerville text-center'>Stopnja { updateBuy ? 'Odkupa' : 'Nakupa' } je bila uspešno spremenjena!</h3>
                <div className='flex justify-center items-center flex-col gap-y-2 w-full'>
                    <p>{ updateBuy ? 'TST Odkupna koeficjent' : 'TST Nakupni koeficjent' } = {rate} %</p>
                    <p>{ updateBuy ? 'TST Odkupna cena' : 'Tečaj 1g zlata / EUR' } = {price} EUR</p>
                </div>
                <SheetClose
                    className='flex justify-center w-full border-none outline-none ' >
                    <Button className='w-3/5'>
                    Končaj
                    </Button>
                </SheetClose>
            </div>
        </div>
    )
}
