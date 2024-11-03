'use client'
// React
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
// Components
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Icons } from '@/components/ui/icons'
import { Ilustrations } from '@/components/ui/ilustrations'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SheetClose } from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/text-area'
// Utils
import { TstConfirmSchema } from '@/lib/schemas/transactions'
import { updateAdminTransaction } from '@/lib/services/admin/transactions'
import { cn } from '@/lib/utils/style'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import * as z from 'zod'

interface UserConfirmProps {
    quantity: number
    rate: number
    id: number
}

export default function TstConfirmForm({ id, quantity, rate }: UserConfirmProps) {
    const router = useRouter()
    const [success, setSuccess] = useState<boolean>(false)
    const form = useForm<z.infer<typeof TstConfirmSchema>>({
        resolver: zodResolver(TstConfirmSchema),
        defaultValues: {
            status: 1,
            paymentMethod: 'IBAN',
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
                ? <div className={cn('grid gap-6')}>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-4'>
                            <Input name='status' value={1} readOnly className='sr-only' />
                            <div>
                                <Label>Število Testamentov</Label>
                                <Input
                                    value={(quantity).toLocaleString('sl-SI', {
                                        minimumFractionDigits: 4,
                                        maximumFractionDigits: 4
                                    })}
                                    readOnly
                                    className='p-6 bg-transparent'
                                />
                            </div>
                            <div className='flex gap-x-6'>
                                <div>
                                    <Label>Gram</Label>
                                    <Input
                                        value={(quantity).toLocaleString('sl-SI', {
                                            minimumFractionDigits: 4,
                                            maximumFractionDigits: 4
                                        })}
                                        placeholder="Gr"
                                        readOnly
                                        className='p-6 bg-transparent'
                                    />
                                </div>
                                <div>
                                    <Label>EUR</Label>
                                    <Input
                                        value={Number(rate * quantity).toLocaleString('sl-SI', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        })}
                                        placeholder="EUR"
                                        readOnly
                                        className='p-6 bg-transparent'
                                    />
                                </div>
                            </div>
                            <div>
                                <Label>Nakupni tečaj 1g zlata /EUR (danes)</Label>
                                <Input
                                    value={`${rate.toLocaleString('sl-SI', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })} EUR`}
                                    className='p-6 bg-transparent'
                                    readOnly
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
                <h3 className='text-h5 font-baskerville'>Čestitamo!</h3>
                <div className='flex flex-col gap-y-2 items-center justify-center text-center px-2'>
                    <p>
                        Akcija je bila uspešno opravljena!
                    </p>
                </div>
                <SheetClose asChild className='flex justify-center w-full border-none outline-none ' >
                    <Button onClick={() => location.reload()} className='w-3/5'>
                        Končaj
                    </Button>
                </SheetClose>
            </div>
        </div>
    )
}
