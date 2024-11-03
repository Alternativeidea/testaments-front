'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useCookies } from '@/lib/hooks/use-cookies'
import { ChangeEmailFormSchema } from '@/lib/schemas/change-email'
import { changeEmail } from '@/lib/services/auth'
import { cn } from '@/lib/utils/style'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'
import { Button } from '../ui/button'
import { Icons } from '../ui/icons'
import { Input } from '../ui/input'

export default function ChangeEmailForm() {
    const cookies = useCookies()
    const { replace } = useRouter()

    const form = useForm<z.infer<typeof ChangeEmailFormSchema>>({
        resolver: zodResolver(ChangeEmailFormSchema),
        defaultValues: {
            email: '',
            confirmEmail: ''
        }
    })

    async function handleSubmit(data: z.infer<typeof ChangeEmailFormSchema>) {
        try {
            const { token, ...user }: UserAuthProps = await changeEmail({ email: data.email })

            cookies.set('token', token, { path: '/' })
            cookies.set('user', JSON.stringify(user), { path: '/' })
            replace(`/change-email/verification?email=${data.email}`)
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
                        <div className="grid gap-1 mb-10">
                            <FormField
                                control={form.control}
                                name="confirmEmail"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Potrdi e-mail naslov</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Potrdi svoj e-mail naslov"
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
                                <span className='leading-none '>Spremeni e-mail</span>
                            </span>
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
