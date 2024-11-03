'use client'
// React
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
// Components
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Ilustrations } from '@/components/ui/ilustrations'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { SheetClose } from '@/components/ui/sheet'
// Utils
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Icons } from '@/components/ui/icons'
import { BuyTransactionFormSchema } from '@/lib/schemas/transactions'
import { getRatesToday } from '@/lib/services/rates'
import { buyTransaction } from '@/lib/services/transactions'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import DynamicNumber from 'react-dynamic-number'
import { toast } from 'sonner'
import * as z from 'zod'

let resultReference: string = ''

export default function BuyTestamentForm() {
    const [control, setControl] = useState(1)
    const [goldValue, setGoldValue] = useState<number>(0.0)
    const router = useRouter()
    const [quantity, setQuantity] = useState<number>(0)
    const form = useForm<z.infer<typeof BuyTransactionFormSchema>>({
        resolver: zodResolver(BuyTransactionFormSchema)
    })

    async function handleSubmit() {
        setControl(2)
    }

    async function getValue() {
        router.refresh()
        const ratesValue = await getRatesToday()
        setGoldValue(ratesValue.priceSell)
        console.log(ratesValue.priceSell)
    }

    useEffect(() => {
        setControl(1)
        getValue()
    }, [])

    const isButtonDisabled = () => {
        return quantity === 0
    }

    return (
        <>
            {control === 3
                ? <SuccessScreen quantity={quantity} goldValue={goldValue} />
                : <Card className="flex flex-col justify-start w-full h-full border-none overflow-y-scroll no-scrollbar">
                    <CardHeader className='flex justify-end bg-primary-white z-10 w-full fixed shadow-button h-[100px] pb-2'>
                        <h3 className="pl-4 text-h6 font-baskerville">Dodaj testamente</h3>
                    </CardHeader>
                    <CardContent className='mt-[100px] px-0 h-full py-0'>
                        {control === 1 &&
                            <Form {...form} >
                                <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col h-full justify-between">
                                    <div className='flex flex-col pt-8 pb-16 p-4 gap-y-4 bg-primary-light-gray/20 relative'>
                                        <>
                                            <FormField
                                                control={form.control}
                                                name='quantity'
                                                render={({ field: { onChange } }) => (
                                                    <FormItem className='flex flex-col'>
                                                        <FormLabel>Število testamentov</FormLabel>
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
                                                                    isButtonDisabled()
                                                                }}
                                                            />
                                                        </FormControl>
                                                        {/* <span className='text-body-small px-6 mt-2'>
                                                            Razpoložljiva sredstva: <b>100 TST</b>
                                                        </span> */}
                                                        <FormMessage/>
                                                    </FormItem>
                                                )}
                                            />
                                        </>
                                        <div className='flex gap-x-6'>
                                            <div>
                                                <Label>Gram</Label>
                                                <Input
                                                    value={(!quantity
                                                        ? 0
                                                        : quantity.toLocaleString('sl-SI', {
                                                            minimumFractionDigits: 4,
                                                            maximumFractionDigits: 4
                                                        }))}
                                                    placeholder="Gr"
                                                    readOnly
                                                    className='p-6 bg-transparent'
                                                />
                                            </div>
                                            <div>
                                                <Label>EUR</Label>
                                                <Input
                                                    value={Number((goldValue * (!quantity ? 0 : quantity))).toLocaleString('sl-SI', {
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
                                            <Label>Nakupni tečaj 1,0000g zlata /EUR (danes)</Label>
                                            <Input
                                                value={`${Number(goldValue).toLocaleString('sl-SI', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} EUR`}
                                                className='p-6 bg-transparent'
                                                readOnly
                                            />
                                        </div>
                                        <Separator className='w-full h-[1px] bg-primary-light-gray' />
                                        <div>
                                            <Label>Sredstva, ki bodo dodana na vaš račun (1,0000 TST = 1,0000g zlata)</Label>
                                            <Input
                                                value={`${!quantity
                                                    ? '0,0000'
                                                    : quantity.toLocaleString('sl-SI', {
                                                        minimumFractionDigits: 4,
                                                        maximumFractionDigits: 4
                                                    })} TST`}
                                                readOnly
                                                placeholder=""
                                                className='p-6 bg-transparent'
                                            />
                                        </div>
                                        <div>
                                            <Label>Strošek obdelave</Label>
                                            <Input
                                                placeholder=""
                                                autoComplete="name"
                                                autoCorrect="off"
                                                autoCapitalize='off'
                                                className='p-6 bg-transparent'
                                                readOnly
                                                value={'0,0000 TST'}
                                            />
                                        </div>
                                    </div>
                                    <div className='flex flex-col w-full'>
                                        <div className="flex w-full justify-between py-8 bg-primary-light-gray/10 px-6">
                                            <p>VSE SKUPAJ</p>
                                            <b>{Number((goldValue * (!quantity ? 0 : quantity))).toLocaleString('sl-SI', {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2
                                            })} EUR</b>
                                        </div>
                                        <Button className='mx-20 my-6' disabled={isButtonDisabled()}>
                                            Nadaljuj
                                        </Button>
                                    </div>
                                </form>
                            </Form>}
                        {control === 2 &&
                            <ConfirmScreen
                                quantity={quantity}
                                goldValue={goldValue}
                                next={() => setControl(3)}
                                previous={() => setControl(1)}
                            />}
                    </CardContent>
                </Card>
            }
        </>
    )
}

function ConfirmScreen({ next, previous, quantity, goldValue }: { goldValue: number, quantity: number, next: () => void, previous: () => void }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const handleSubmit = async () => {
        setLoading(true)
        const payload = {
            quantity
        }
        try {
            const { reference } = await buyTransaction(payload)
            resultReference = reference
            toast.success('Urejeno!', {
                position: 'bottom-center'
            })
            next()
        } catch (error) {
            if (error instanceof Error) {
                const err = JSON.parse(error.message)
                toast.error('Nekaj je šlo narobe.', {
                    description: err.message
                })
            }
        }
        setLoading(false)
        router.refresh()
    }

    return (
        <div className='flex flex-col w-full justify-between h-full py-6'>
            <div>
                <div className='flex w-full justify-between p-6 py-12'>
                    <p className='uppercase'>Znesek </p>
                    <b>{quantity.toLocaleString('sl-SL', {
                        minimumFractionDigits: 4,
                        maximumFractionDigits: 4
                    })} TST</b>
                </div>
                <div className='flex flex-col w-full shadow-box py-6 px-6'>
                    <p className='text-h6 font-bold'>{quantity.toLocaleString('sl-SI', { minimumFractionDigits: 4, maximumFractionDigits: 4 })} TST = {quantity.toLocaleString('sl-SL', { minimumFractionDigits: 4, maximumFractionDigits: 4 })}g zlata = {(goldValue * quantity).toLocaleString('sl-SL', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })} EUR</p>
                    <p>Danes nakupni tečaj zlata: 1,0000g = {goldValue.toLocaleString('sl-SI', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} EUR</p>
                    <p className='font-bold'> Stroški obledave: 0,0000 TST</p>
                </div>
            </div>
            <div className='flex flex-col w-full shadow-box'>
                <div className="flex w-full justify-between py-8 bg-primary-light-gray/10 px-6">
                    <p>VSE SKUPAJ</p>
                    <b>{ (goldValue * quantity).toLocaleString('sl-SL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} EUR</b>
                </div>
                <div className='flex gap-2 w-full items-center justify-between px-6'>
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

function SuccessScreen({ goldValue, quantity } : {goldValue: number, quantity: number}) {
    return (
        <div className='flex flex-col w-full justify-between h-full py-6'>
            <div className='flex flex-col justify-end items-center w-full h-3/4 gap-y-6'>
                <Ilustrations.Wallet />
                <h3 className='text-h5 font-baskerville'>Vaš zahtevek je oddan!</h3>
                <div className='flex flex-col gap-y-2 items-center justify-center text-center px-2'>
                    {/* <p>Plačilo mora biti izvedeno v istem delovnem dnevu.</p> */}
                    <p>
                        <b>Opozorilo:</b> Plačilo mora biti izvedeno v istem delovnem dnevu. Če tega ne storite bo vaše naročilo avtomatsko preklicano.
                    </p>
                    <Separator className='w-full bg-primary-light-gray h-[1px] my-4' />
                    <p><b>Naslovnik:</b> TAD d.o.o.</p>
                    <p><b>Naslov firme:</b> Dunajska cesta 101, 1000 Ljubljana</p>
                    <p><b>IBAN:</b> SI56 0400 0027 7925 020</p>
                    <p><b>BIC:</b> KBMASI2X</p>
                    <p><b>Namen:</b> PRME</p>
                    <p><b>Referenca:</b> {resultReference}</p>
                    <p><b>Vsota plačila:</b> {(quantity * goldValue).toLocaleString('sl-SI', {
                        minimumFractionDigits: 4,
                        maximumFractionDigits: 4
                    })} EUR</p>
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
