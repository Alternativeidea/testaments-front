'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useCookies } from '@/lib/hooks/use-cookies'
import { RegisterFormSchema } from '@/lib/schemas/register'
import { registerFirstStep } from '@/lib/services/auth'
import { cn } from '@/lib/utils/style'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { Icons } from '../ui/icons'
import { Input } from '../ui/input'

export default function RegisterForm() {
    const cookies = useCookies()
    const searchParams = useSearchParams()
    const reference = searchParams?.get('referralId')
    const { replace } = useRouter()
    console.log(reference)

    const form = useForm<z.infer<typeof RegisterFormSchema>>({
        resolver: zodResolver(RegisterFormSchema),
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
            isEnabledTerms: false,
            isEnabledInfo: false
        }
    })

    async function handleSubmit(data: z.infer<typeof RegisterFormSchema>) {
        try {
            const { confirmPassword, ...rest } = data
            const payload = {
                ...rest,
                password_confirmation: confirmPassword
            }
            const { token }:UserRegisterProps = await registerFirstStep(payload, reference)
            cookies.set('token', token, { path: '/' })
            replace(`/registracija/verifikacija?email=${encodeURIComponent(data.email)}`)
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
                <form onSubmit={form.handleSubmit(handleSubmit)} autoComplete='off'>
                    <input autoComplete='false' name="hidden" type="text" className="hidden" />
                    <div className="grid gap-4">
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
                                                autoCorrect="off"
                                                autoComplete='new-email'
                                                autoCapitalize='off'
                                                autoFocus
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
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Geslo</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Napiši svoje geslo"
                                                type='password'
                                                autoComplete='new-password'
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
                        <div className="grid gap-1">
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Potrdi geslo</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Potrdi svoje geslo"
                                                type='password'
                                                autoComplete='off'
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
                        <div className="mt-4 grid gap-1">
                            <FormField
                                control={form.control}
                                name="isEnabledTerms"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className='flex items-center'>
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormLabel>Strinjam se s <Link prefetch={false} className='font-bold text-primary-dark-gray hover:underline'
                                                href="https://www.testament.gold/politika-zasebnosti" target='_blank'>pogoji poslovanja</Link>
                                            </FormLabel>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="mb-4 grid gap-1">
                            <FormField
                                control={form.control}
                                name="isEnabledInfo"
                                render={({ field }) => (
                                    <FormItem
                                        className='flex items-center space-y-0'
                                    >
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormLabel> Strinjam se, da me podjetje Testament d.o.o. obvešča o novostih in spremembah.</FormLabel>
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
                                <span className='leading-none'>Registrirajte se</span>
                            </span>
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
