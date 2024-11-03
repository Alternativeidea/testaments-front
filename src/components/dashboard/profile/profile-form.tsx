'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Icons } from '@/components/ui/icons'
import { Ilustrations } from '@/components/ui/ilustrations'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader } from '@/components/ui/sheet'
import { useCookies } from '@/lib/hooks/use-cookies'
import { ProfileFormSchema } from '@/lib/schemas/profile'
import { updateProfile } from '@/lib/services/auth'
import { allowOnlyNumbers } from '@/lib/utils/form'
import { cn } from '@/lib/utils/style'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'
import { PhoneAreaCodesCombobox } from '../ui/phone-area-codes-combobox'

export default function ProfileForm({ address, areaCode, phone, career } : z.infer<typeof ProfileFormSchema>) {
    const [isOpen, setIsOpen] = useState(false)
    const [hasChanged, setHasChanged] = useState(false)
    const cookies = useCookies()

    const form = useForm<z.infer<typeof ProfileFormSchema>>({
        resolver: zodResolver(ProfileFormSchema),
        defaultValues: {
            address,
            areaCode: (areaCode || '386'),
            phone,
            career
        }
    })

    async function handleSubmit(data: z.infer<typeof ProfileFormSchema>) {
        try {
            const user = await updateProfile(data)

            // Update the user data in the cookie
            cookies.set('user', JSON.stringify(user), { path: '/' })

            setIsOpen(true)
        } catch (error) {
            if (error instanceof Error) {
                toast.error('Nekaj je šlo narobe.', {
                    description: JSON.parse(error.message).message
                })
            }
        }
    }

    const handleOnChange = () => {
        setHasChanged(true)
    }

    return (
        <div className={cn('grid gap-6')}>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className="grid gap-2">
                        <div className="grid gap-1">
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Vaš naslov</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Naslov"
                                                autoComplete="street"
                                                autoCorrect="off"
                                                autoCapitalize="off"
                                                {...field}
                                                onChange={(e) => {
                                                    handleOnChange()
                                                    field.onChange(e) // Call the original onChange function
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="mb-6 grid gap-1">
                            <div className='space-y-2'>
                                <FormLabel>Telefonska številka</FormLabel>
                                <div className='relative w-full'>
                                    <FormField
                                        control={form.control}
                                        name="areaCode"
                                        render={({ field }) => (
                                            <FormItem className='absolute left-px top-px'>
                                                <FormControl>
                                                    <PhoneAreaCodesCombobox
                                                        value={field.value}
                                                        onChange={(value) => {
                                                            handleOnChange()
                                                            field.onChange(value) // Call the original onChange function
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Separator orientation='vertical' className='absolute left-[99px] top-[6.5px] h-[32px]' />
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
                                                        autoCapitalize="off"
                                                        className="py-2 !pl-28 pr-3"
                                                        onKeyDown={allowOnlyNumbers}
                                                        {...field}
                                                        onChange={(e) => {
                                                            handleOnChange()
                                                            field.onChange(e) // Call the original onChange function
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="grid gap-1">
                            <FormField
                                control={form.control}
                                name="career"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Vaš poklic</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Poklic"
                                                autoComplete="name"
                                                autoCorrect="off"
                                                autoCapitalize='off'
                                                {...field}
                                                onChange={(e) => {
                                                    handleOnChange()
                                                    field.onChange(e) // Call the original onChange function
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button className='mt-10 px-11 md:w-fit' disabled={!hasChanged}>
                            <span className='flex items-center gap-[10px]'>
                                {form.formState.isSubmitting && (
                                    <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                <span className='leading-none'>Posodobi</span>
                            </span>
                        </Button>
                    </div>
                </form>
            </Form>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetContent className='h-full w-full bg-[#F1F1F1] p-0 lg:!max-w-[420px]'>
                    <ScrollArea
                        className={cn(
                            'w-full h-full',
                            '[&>div>div]:min-h-full [&>div>div]:!flex [&>div>div]:flex-col'
                        )}
                    >
                        <div className={cn('flex flex-auto flex-col')}>
                            <SheetHeader className='relative z-[100] flex w-full flex-auto items-center justify-center space-y-0 px-7 pb-8 pt-10'>
                                <Ilustrations.Email className='w-full max-w-44 lg:max-w-72' />
                                <span className="!mb-8 text-center font-baskerville text-h5">Potrditev posodobitve podatkov</span>
                                <p className="text-center text-body-big-2 font-medium">Vaši podatki so bili uspešno posodobljeni.</p>
                            </SheetHeader>
                            <SheetFooter className='mt-auto flex w-full items-center justify-center bg-primary-white px-6 py-4'>
                                <SheetClose asChild>
                                    <Button
                                        className='w-full'
                                    >
                                        Končaj
                                    </Button>
                                </SheetClose>
                            </SheetFooter>
                        </div>
                    </ScrollArea>
                </SheetContent>
            </Sheet>
        </div>
    )
}
