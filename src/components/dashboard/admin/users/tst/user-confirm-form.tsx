'use client'
// React
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
// Components
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Icons } from '@/components/ui/icons'
import { Ilustrations } from '@/components/ui/ilustrations'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { SheetClose } from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/text-area'
// Utils
import { TstConfirmSchema } from '@/lib/schemas/transactions'
import { updateAdminTransaction } from '@/lib/services/admin/transactions'
import { cn } from '@/lib/utils/style'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { toast } from 'sonner'
import * as z from 'zod'

interface UserConfirmProps {
    quantity: number
    rate: number
    id: number
}

export default function UserConfirmForm({ id, quantity, rate }: UserConfirmProps) {
    const router = useRouter()
    const [success, setSuccess] = useState<boolean>(false)
    const form = useForm<z.infer<typeof TstConfirmSchema>>({
        resolver: zodResolver(TstConfirmSchema),
        defaultValues: {
            status: 1,
            notes: ''
        }
    })

    async function handleSubmit(data: z.infer<typeof TstConfirmSchema>) {
        await updateAdminTransaction(data, id)
        try {
            toast.success('Urejeno!', {
                position: 'bottom-center'
            })
            setSuccess(true)
        } catch (error) {
            if (error instanceof Error) {
                const err = JSON.parse(error.message)
                toast.error('Nekaj je šlo narobe.', {
                    description: err.message
                })
            }
        }
        router.refresh()
    }

    return (
        <>
            {!success
                ? <div className={cn('grid gap-6 py-12')}>
                    <h3 className='text-body-big font-baskerville'>Dodaj testamente</h3>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-4'>
                            <Input name='status' value={1} readOnly className='sr-only' />
                            <div>
                                <Label>Gram</Label>
                                <Input
                                    value={(quantity)}
                                    placeholder="Gr"
                                    readOnly
                                    className='p-6 bg-transparent'
                                />
                            </div>
                            <div className='flex gap-x-6'>
                                <div>
                                    <Label>Gram</Label>
                                    <Input
                                        value={(quantity)}
                                        placeholder="Gr"
                                        readOnly
                                        className='p-6 bg-transparent'
                                    />
                                </div>
                                <div>
                                    <Label>EUR</Label>
                                    <Input
                                        value={Number(rate * quantity).toFixed(2)}
                                        placeholder="EUR"
                                        readOnly
                                        className='p-6 bg-transparent'
                                    />
                                </div>
                            </div>
                            <div>
                                <Label>Nakupni tečaj 1g zlata /EUR (danes)</Label>
                                <Input
                                    value={`${rate.toFixed(2)} EUR`}
                                    className='p-6 bg-transparent'
                                    readOnly
                                />
                            </div>
                            <div>
                                <h3 className='font-bold py-4'>Tip Naročila (kako je stranka plačala)</h3>
                                <FormField
                                    control={form.control}
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
                                                        <RadioGroupItem value="lastno zlato" id="r3" />
                                                        <Label htmlFor="r3">Lastno zlato</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="drugo" id="r3" />
                                                        <Label htmlFor="r3">Drugo</Label>
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
                                {form.formState.isSubmitting && (
                                    <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                                )}
                        Potrdi
                            </Button>
                        </form>
                    </Form>
                </div>
                : <SuccessScreen/>
            }
        </>
    )
}

function SuccessScreen() {
    return (
        <div className='flex flex-col items-center justify-center gap-y-12 absolute w-full top-0 left-0 h-screen bg-primary-white overflow-hidden'>
            <div className='flex flex-col items-center w-full gap-y-6'>
                <Ilustrations.Wallet />
                <h3 className='text-h5 font-baskerville'>Vaš zahtevek je oddan!</h3>
                <div className='flex flex-col gap-y-2 items-center justify-center text-center px-2'>
                    <p>Plačilo mora biti izvedeno v istem delovnem dnevu.</p>
                    <p>
                        <b>Opozorilo:</b> Plačilo mora biti izvedeno v istem delovnem dnevu. Če tega ne storite bo vaše naročilo avtomatsko preklicano.
                    </p>
                </div>
                <SheetClose asChild className='flex justify-center w-full border-none outline-none ' >
                    <Button className='w-3/5'>
                    Končaj
                    </Button>
                </SheetClose>
            </div>
        </div>
    )
}
