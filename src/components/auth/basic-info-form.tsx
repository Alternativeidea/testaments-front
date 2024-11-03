'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useCookies } from '@/lib/hooks/use-cookies'
import { BasicInfoFormSchema } from '@/lib/schemas/basic-info'
import { registerSecondStep } from '@/lib/services/auth'
import { allowOnlyLetters, allowOnlyNumbers } from '@/lib/utils/form'
import { cn } from '@/lib/utils/style'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'
import { PhoneAreaCodesCombobox } from '../dashboard/ui/phone-area-codes-combobox'
import { Button } from '../ui/button'
import { Icons } from '../ui/icons'
import { Input } from '../ui/input'
import { Separator } from '../ui/separator'

interface BasicInfoFormProps {
    code: string
}

export default function BasicInfoForm({ code }: BasicInfoFormProps) {
    const cookies = useCookies()
    const { replace } = useRouter()

    const form = useForm<z.infer<typeof BasicInfoFormSchema>>({
        resolver: zodResolver(BasicInfoFormSchema),
        defaultValues: {
            name: '',
            lastName: '',
            areaCode: '386',
            phone: ''
        }
    })

    async function handleSubmit(data: z.infer<typeof BasicInfoFormSchema>) {
        try {
            const payload = {
                ...data,
                code
            }
            const { token, ...user }: UserAuthProps = await registerSecondStep(payload)

            cookies.set('token', token, { path: '/' })
            cookies.set('user', JSON.stringify(user), { path: '/' })
            replace('/registracija/registracija-uspesna')
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
                    <div className="grid gap-4">
                        <div className="grid gap-1">
                            <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className='w-full flex justify-center'>
                                            <FormLabel className='text-primary-dark-gray m-0'>Izberite spol</FormLabel>
                                        </div>
                                        <FormControl>
                                            <div className='flex flex-col lg:flex-row justify-between items-center gap-4'>
                                                <Button
                                                    type='button'
                                                    variant='light'
                                                    onClick={() => field.onChange('moški')}
                                                    className={cn(
                                                        'w-full',
                                                        field.value === 'moški' && 'bg-primary-dark-gray text-primary-white'
                                                    )}
                                                >Moški</Button>
                                                <Button
                                                    type='button'
                                                    variant='light'
                                                    onClick={() => field.onChange('ženska')}
                                                    className={cn(
                                                        'w-full',
                                                        field.value === 'ženska' && 'bg-primary-dark-gray text-primary-white'
                                                    )}
                                                >Ženska</Button>
                                            </div>
                                        </FormControl>
                                        <div className='w-full flex justify-center'>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid gap-1">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Vaše ime</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Vpišite svoje ime"
                                                autoComplete="given-name"
                                                autoCorrect="off"
                                                autoCapitalize='off'
                                                onKeyDown={allowOnlyLetters}
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
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Vaš priimek</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Vpišite priimek"
                                                autoComplete="family-name"
                                                autoCorrect="off"
                                                autoCapitalize='off'
                                                onKeyDown={allowOnlyLetters}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid gap-1 mb-6">
                            <div className='space-y-2'>
                                <FormLabel>Telefonska številka</FormLabel>
                                <div className='w-full relative'>
                                    <FormField
                                        control={form.control}
                                        name="areaCode"
                                        render={({ field }) => (
                                            <FormItem className='absolute top-px left-px'>
                                                <FormControl>
                                                    <PhoneAreaCodesCombobox
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Separator orientation='vertical' className='h-[32px] absolute top-[6.5px] left-[99px]' />
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Vaša telefonska številka"
                                                        autoComplete="tel"
                                                        autoCorrect="off"
                                                        autoCapitalize='off'
                                                        className='!pl-28 pr-3 py-2'
                                                        onKeyDown={allowOnlyNumbers}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <Button>
                            <span className='flex items-center gap-[10px]'>
                                {form.formState.isSubmitting && (
                                    <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                <span className='leading-none '>Potrdi</span>
                            </span>
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
