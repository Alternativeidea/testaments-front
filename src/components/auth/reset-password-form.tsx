'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { ResetPasswordFormSchema } from '@/lib/schemas/reset-password'
import { sendResetPasswordCode } from '@/lib/services/auth'
import { cn } from '@/lib/utils/style'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'
import { Button } from '../ui/button'
import { Icons } from '../ui/icons'
import { Input } from '../ui/input'

export default function ResetPasswordForm() {
    const form = useForm<z.infer<typeof ResetPasswordFormSchema>>({
        resolver: zodResolver(ResetPasswordFormSchema),
        defaultValues: {
            email: ''
        }
    })

    async function handleSubmit(data: z.infer<typeof ResetPasswordFormSchema>) {
        try {
            await sendResetPasswordCode(data)
            form.reset()
            toast.success('Ponastavi geslo')
        } catch (error) {
            if (error instanceof Error) {
                const err = JSON.parse(error.message)
                if (err.type === 'Login Error') {
                    form.setError('email', {
                        type: 'manual',
                        message: 'S tem e-poštnim naslovom nismo našli uporabnika. Prosimo, vnesite e-poštni naslov, ki je povezan z vašim računom.'
                    })
                }
                toast.error('Nekaj je šlo narobe.', {
                    description: JSON.parse(error.message).message
                })
            }
        }
    }

    return (
        <div className={cn('grid gap-6')}>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className="grid gap-2">
                        <div className="grid gap-1 mb-9">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>E-mail naslov</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Napiši svoj e-mail naslov"
                                                autoComplete="email"
                                                autoCorrect="off"
                                                autoCapitalize='off'
                                                className='p-6'
                                                autoFocus
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
                                <span className='leading-none '>Ponastavi geslo</span>
                            </span>
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
