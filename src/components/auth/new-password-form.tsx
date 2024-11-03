'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { NewPasswordFormSchema } from '@/lib/schemas/new-password'
import { resetPassword } from '@/lib/services/auth'
import { cn } from '@/lib/utils/style'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'
import { Button } from '../ui/button'
import { Icons } from '../ui/icons'
import { Input } from '../ui/input'

interface NewPasswordFormProps {
    email: string
    code: string
}

export default function NewPasswordForm({ email, code }: NewPasswordFormProps) {
    const { replace } = useRouter()

    const form = useForm<z.infer<typeof NewPasswordFormSchema>>({
        resolver: zodResolver(NewPasswordFormSchema),
        defaultValues: {
            password: '',
            confirmPassword: ''
        }
    })

    async function handleSubmit(data: z.infer<typeof NewPasswordFormSchema>) {
        try {
            const { confirmPassword, ...rest } = data
            const payload = {
                ...rest,
                email,
                code,
                password_confirmation: confirmPassword
            }
            await resetPassword(payload)
            replace('/resetiraj-geslo/success')
        } catch (error) {
            if (error instanceof Error) {
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
                        <div className="grid gap-1">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Novo geslo</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Vpišite novo geslo"
                                                type='password'
                                                autoComplete="password"
                                                autoCorrect="off"
                                                autoCapitalize='off'
                                                className='p-6'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid gap-1 mb-9">
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Potrdi novo geslo</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Potrdi novo geslo"
                                                type='password'
                                                autoComplete="password"
                                                autoCorrect="off"
                                                autoCapitalize='off'
                                                className='p-6'
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
                                <span className='leading-none '>Poenostavi geslo</span>
                            </span>
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
