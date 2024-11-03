'use client'
// React
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
// Components
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Ilustrations } from '@/components/ui/ilustrations'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { SheetClose } from '@/components/ui/sheet'
// Utils
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Icons } from '@/components/ui/icons'
import { Label } from '@/components/ui/label'
import { sendTransactionFormSchema } from '@/lib/schemas/transactions'
import { getRatesToday } from '@/lib/services/rates'
import { sendTransaction } from '@/lib/services/transactions'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import DynamicNumber from 'react-dynamic-number'
import { toast } from 'sonner'
import * as z from 'zod'

// const feePerRate = 1.01
// const feePerRateReverse = 0.01
const feePerRate = 1
const feePerRateReverse = 0

export default function SendTestamentForm({ balance }: { balance: number }) {
    const [control, setControl] = useState(1)
    const [email, setEmail] = useState<string>('')
    const [goldValue, setGoldValue] = useState<number>(0)
    const [quantity, setQuantity] = useState<number>(0)
    const schema = sendTransactionFormSchema(balance)
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema)
    })
    async function getValue() {
        const ratesValue = await getRatesToday()
        setGoldValue(parseFloat(ratesValue.priceSell))
    }

    async function handleSubmit() {
        setControl(2)
    }

    useEffect(() => {
        setControl(1)
        getValue()
    }, [])

    const isButtonDisabled = () => {
        return quantity === 0 || email === ''
    }

    return (
        <>
            {
                control === 3
                    ? <SuccessScreen />
                    : <Card className="flex flex-col justify-start w-full h-full min-h-full !py-0 border-none overflow-y-scroll no-scrollbar">
                        <CardHeader className='flex justify-end bg-primary-white w-full fixed shadow-button h-[100px] pb-2 z-10'>
                            <h3 className="text-h6 font-baskerville">
                                Pošlji testamente
                            </h3>
                        </CardHeader>
                        <CardContent className='mt-[100px] p-0 h-full relative'>
                            {control === 1 &&
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col justify-between h-full bg-primary-light-gray/20 px-6 gap-y-4 py-6'>
                                        <div className='flex flex-col gap-y-4'>
                                            <>
                                                <FormField
                                                    control={form.control}
                                                    name='email'
                                                    render={({ field: { onChange, ...field } }) => (
                                                        <FormItem>
                                                            <FormLabel>Prejemnik</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    type='string'
                                                                    placeholder="E-mail naslov prejemnika"
                                                                    className='p-6 bg-transparent'
                                                                    onChange={(e) => {
                                                                        setEmail(e.target.value)
                                                                        onChange(e)
                                                                    }}
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                            </>
                                            <Separator className='bg-primary-light-gray h-[1px] w-full' />
                                            <div className='flex flex-col'>
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
                                                                        setQuantity((modelValue))
                                                                        onChange?.(modelValue)
                                                                        isButtonDisabled()
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <span className='text-body-small px-6 mt-2'>
                                                                Razpoložljiva sredstva:
                                                                <b> {Number(balance).toLocaleString('sl-SI', {
                                                                    minimumFractionDigits: 4,
                                                                    maximumFractionDigits: 4
                                                                })} TST</b></span>
                                                            <FormMessage/>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div className='flex gap-x-6'>
                                                <div>
                                                    <Label>Gram</Label>
                                                    <Input
                                                        value={Number((!quantity ? 0 : quantity).toFixed(4)).toLocaleString('sl-SI')}
                                                        placeholder="Gr"
                                                        readOnly
                                                        className='p-6 bg-transparent'
                                                    />
                                                </div>
                                                <div>
                                                    <Label>EUR</Label>
                                                    <Input
                                                        value={Number((goldValue * (!quantity ? 0 : quantity)).toFixed(2)).toLocaleString('sl-SI')}
                                                        placeholder="EUR"
                                                        readOnly
                                                        className='p-6 bg-transparent'
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <Label>Nakupni tečaj 1g zlata /EUR (danes)</Label>
                                                <Input
                                                    value={`${Number(goldValue).toLocaleString('sl-SI', {
                                                        maximumFractionDigits: 2,
                                                        minimumFractionDigits: 2
                                                    })} EUR`}
                                                    className='p-6 bg-transparent'
                                                    readOnly
                                                />
                                            </div>
                                            <Separator className='bg-primary-light-gray h-[1px] w-full' />
                                            <div className='flex flex-col'>
                                                <Label>Sredstva ki bodo dodana na vaš račun (1 TST = 1g zlata)</Label>
                                                <Input
                                                    value={`${Number((!quantity ? 0 : quantity)).toLocaleString('sl-SI', {
                                                        maximumFractionDigits: 4,
                                                        minimumFractionDigits: 4
                                                    })} TST`}
                                                    readOnly
                                                    placeholder=""
                                                    className='p-6 bg-transparent'
                                                />
                                            </div>
                                            <div className='flex flex-col'>
                                                <Label>Strošek obdelave</Label>
                                                <Input
                                                    placeholder=""
                                                    autoComplete="name"
                                                    autoCorrect="off"
                                                    autoCapitalize='off'
                                                    className='p-6 bg-transparent'
                                                    readOnly
                                                    value={`${Number(((!quantity ? 0 : quantity) * feePerRateReverse)).toLocaleString('sl-SI', {
                                                        maximumFractionDigits: 4,
                                                        minimumFractionDigits: 4
                                                    })} TST`}
                                                />
                                            </div>
                                        </div>
                                        <div className='flex flex-col w-full'>
                                            <div className="flex w-full justify-between py-8 bg-primary-light-gray/10 px-6">
                                                <p>VSE SKUPAJ</p>
                                                {/* <b>{Number((((!quantity ? 0 : quantity) * 1.01))).toLocaleString('sl-SI', { */}
                                                <b>{Number((((!quantity ? 0 : quantity) * feePerRate))).toLocaleString('sl-SI', {
                                                    maximumFractionDigits: 4,
                                                    minimumFractionDigits: 4
                                                })} TST</b>
                                            </div>
                                            <Button className='mx-20 my-6' disabled={isButtonDisabled()}>
                                                Nadaljuj
                                            </Button>
                                        </div>
                                    </form>
                                </Form>
                            }
                            {control === 2 &&
                                <ConfirmScreen
                                    quantity={quantity}
                                    email={email}
                                    goldValue={goldValue}
                                    previous={() => setControl(1)}
                                    next={() => setControl(3)}
                                />}
                        </CardContent>
                    </Card>
            }
        </>
    )
}

function ConfirmScreen({ next, previous, quantity, goldValue, email }: { goldValue: number, quantity: number, next: () => void, previous: () => void, email: string }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const handleSubmit = async () => {
        setLoading(true)
        const payload = {
            email,
            quantity
        }
        try {
            await sendTransaction(payload)
            toast.success('Urejeno!', {
                position: 'bottom-center'
            })
            next()
        } catch (error) {
            if (error instanceof Error) {
                toast.error('Nekaj je šlo narobe.', {
                    description: JSON.parse(error.message).message
                })
            }
        }
        setLoading(false)
        router.refresh()
    }
    return (
        <div className='flex flex-col w-full justify-between h-full'>
            <div>
                <div className='flex w-full justify-between p-6 py-12 shadow-button'>
                    <p className='uppercase'>Znesek</p>
                    <b>{Number(quantity).toLocaleString('sl-SI', {
                        maximumFractionDigits: 4,
                        minimumFractionDigits: 4
                    })} TST</b>
                </div>
                <div className='flex w-full justify-between p-6 py-12 shadow-button'>
                    <p className='uppercase'>PREJEMNIK</p>
                    <b>{email}</b>
                </div>
                <div className='flex flex-col w-full shadow-box py-6 px-6'>
                    <p className='text-h6 font-bold'>{quantity.toLocaleString('sl-SI', { maximumFractionDigits: 4, minimumFractionDigits: 4 })} TST = {quantity.toLocaleString('sl-SL')}g zlata = {Number((quantity * goldValue).toFixed(2)).toLocaleString('sl-SI')} EUR</p>
                    <p>Danes nakupni tečaj zlata: 1g = {goldValue.toLocaleString('sl-SI')} EUR</p>
                    <p className='font-bold'>Stroški obledave: {Number((quantity * feePerRateReverse)).toLocaleString('sl-SI', {
                        maximumFractionDigits: 4,
                        minimumFractionDigits: 4
                    })} TST</p>
                </div>
            </div>
            <div className='flex flex-col w-full shadow-box'>
                <div className="flex w-full justify-between py-8 bg-primary-light-gray/10 px-6">
                    <p>VSE SKUPAJ</p>
                    <b>{(quantity * feePerRate).toLocaleString('sl-SI', {
                        minimumFractionDigits: 4,
                        maximumFractionDigits: 4
                    })} TST</b>
                </div>
                <div className='flex gap-2 w-full items-center justify-between px-6 py-6'>
                    <Button disabled={loading} onClick={async () => {
                        await handleSubmit()
                    }}
                    className='w-3/5'>
                        {loading && <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" /> } Potrdi
                    </Button>
                    <Button onClick={() => previous()} variant='light' className='w-2/5'>
                        Prekliči
                    </Button>
                </div>
            </div>
        </div>
    )
}

function SuccessScreen() {
    return (
        <div className='flex flex-col w-full justify-between h-full p-6'>
            <div className='flex flex-col justify-end items-center w-full h-2/3 gap-y-6'>
                <Ilustrations.Wallet />
                <h3 className='text-h5 font-baskerville'>Vaš zahtevek je oddan!</h3>
                <div className='flex flex-col gap-y-2 items-center justify-center text-center px-2'>
                    <p>Obveščamo vas, da smo vam poslali e-pošto za verifikacijo, ki je potrebna za potrditev pošiljanja testamentov.</p>
                    <p>Takoj ko potrdite transakcijo preko e-pošte, bodo TST žetoni nemudoma poslani prejemniku.</p>
                </div>
            </div>
            <SheetClose className='flex justify-center w-full border-none outline-none' >
                <Button className='w-3/5'>
                    Končaj
                </Button>
            </SheetClose>
        </div>
    )
}
