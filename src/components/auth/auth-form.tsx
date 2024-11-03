'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { invalidateCacheByPath } from '@/lib/actions/cache'
import { ADMIN_ROLE_ID, GOLD_ADMIN_ROLE_ID } from '@/lib/constants/roles'
import { useCookies } from '@/lib/hooks/use-cookies'
import { AuthFormSchema } from '@/lib/schemas/auth'
import { signIn } from '@/lib/services/auth'
import { cn } from '@/lib/utils/style'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'
import { Button } from '../ui/button'
import { Icons } from '../ui/icons'
import { Input } from '../ui/input'

interface AuthFormProps {
    redirectTo?: string
}

export default function AuthForm({ redirectTo }: AuthFormProps) {
    const cookies = useCookies()
    const { replace } = useRouter()

    const form = useForm<z.infer<typeof AuthFormSchema>>({
        resolver: zodResolver(AuthFormSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    async function handleSubmit(data: z.infer<typeof AuthFormSchema>) {
        try {
            await cookies.delete('token') // Ensure old token is deleted
            await cookies.delete('user') // Ensure old user data is deleted

            const { token, ...user }: UserAuthProps = await signIn(data)

            console.log('New user data:', user) // Debugging log
            await invalidateCacheByPath('/namizje/domov')
            await invalidateCacheByPath('/namizje/admin')
            await invalidateCacheByPath('/namizje')
            await invalidateCacheByPath('/')

            cookies.set('token', token, { path: '/' })
            cookies.set('user', JSON.stringify(user), { path: '/' })

            if (!user.name) {
                console.log(redirectTo)
                console.log('User not fully registered, redirecting')
                return replace(`/registracija/verifikacija?email=${encodeURIComponent(user.email)}`)
            }

            if (user.roleId === ADMIN_ROLE_ID || user.roleId === GOLD_ADMIN_ROLE_ID) return replace('/namizje/admin')
            else replace('/namizje/domov')
        } catch (error) {
            if (error instanceof Error) {
                const err = JSON.parse(error.message)
                let message = 'Prijava ni uspela. Preverite vnesene podatke in poskusite znova.'
                // Set error messages based on error type
                if (err.type === 'Login Error' && err.message === 'Incorrect username or password. 1001') {
                    form.setError('email', {
                        type: 'manual',
                        message: ''
                    })
                    form.setError('password', {
                        type: 'manual',
                        message: 'Prijava ni uspela. Preverite vnesene podatke in poskusite znova.'
                    })
                } else if (err.type === 'Login Error' && err.message === 'This User has been deactivated from the system. 1003') {
                    message = 'Ta uporabnik je bil deaktiviran iz sistema.'
                } else if (err.type === 'Login Error' && err.message === 'This User has been suspended from the system. 1004') {
                    message = 'Ta uporabnik je bil začasno izključen iz sistema.'
                } else {
                    message = 'Nekaj ​​je šlo narobe, obrnite se na uporabnika skrbnika.'
                }
                toast.error('Nekaj je šlo narobe.', {
                    description: message
                })
            }
        }
    }

    return (
        <div className={cn('grid gap-6')}>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(handleSubmit)}>
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
                                                autoComplete="email"
                                                type="email"
                                                autoCorrect="off"
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
                                                autoComplete="current-password"
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
                        <div className='mb-4 flex justify-end'>
                            <Link
                                prefetch={false}
                                href='/resetiraj-geslo' className='text-body-small font-medium'>Pozabljeno geslo?</Link>
                        </div>
                        <Button>
                            <span className='flex items-center gap-[10px]'>
                                {form.formState.isSubmitting && (
                                    <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                <span className='leading-none'>Vpiši se</span>
                            </span>
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
