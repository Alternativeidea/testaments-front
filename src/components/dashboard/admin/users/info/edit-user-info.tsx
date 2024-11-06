'use client'
// Next
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
// Components
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Icons } from '@/components/ui/icons'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CountriesCombobox } from '../../../verification/countries-combobox'
// Utils
import { EditUserFormSchema } from '@/lib/schemas/admin-user'
import { getUser, updateUser } from '@/lib/services/admin/users'
import { allowOnlyLetters, allowOnlyNumbers } from '@/lib/utils/form'
import { cn } from '@/lib/utils/style'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { sl } from 'date-fns/locale'
import { toast } from 'sonner'
import * as z from 'zod'

export default function EditUserInfo({ id } : { id: number}) {
    const [loading, setLoading] = useState<boolean>(true)
    const [tried, setTried] = useState<boolean>(false)
    const [userData, setUserData] = useState<Partial<ProfileProps>>({})
    const form = useForm<z.infer<typeof EditUserFormSchema>>({
        resolver: zodResolver(EditUserFormSchema),
        defaultValues: {
            // countryId: (userData.countryId)?.toString() || '446'
        }
    })

    async function handleSubmit(data: z.infer<typeof EditUserFormSchema>) {
        setTried(true)
        const payload = {
            countryId: Number(data.countryId),
            ...data
        }
        if (data.birthdate) {
            payload.birthdate = data.birthdate
        }
        await updateUser(payload, id)
        try {
            toast.success('Urejeno!', {
                position: 'bottom-center'
            })
            setTried(false)
        } catch (error) {
            if (error instanceof Error) {
                const err = JSON.parse(error.message)
                toast.error('Nekaj je šlo narobe.', {
                    description: err.message
                })
            }
            setTried(false)
        }
        location.reload()
    }

    function resetErrors() {
        if (tried) {
            form.clearErrors()
            setTried(false)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const data = await getUser(id)
            data.countryId && form.setValue('countryId', data.countryId.toString())
            setUserData(data)
            setLoading(false)
        }

        fetchData()
    }, [id])

    return (
        <>
            {loading
                ? <div className='flex items-center justify-center h-full w-full'>
                    <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                </div>
                : <Card className='border-none h-full'>
                    <CardHeader className='flex px-6 shadow-dashboard-header'>
                        <CardTitle className='text-h6 pt-6 font-baskerville font-normal'>
                            Uredi uporabnika
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='p-2 overflow-y-scroll min-h-full no-scrollbar'>
                        <Form {...form}>
                            <form
                                onKeyDown={resetErrors}
                                onSubmit={form.handleSubmit(handleSubmit)}
                                className='flex flex-col justify-between w-full p-2 min-h-full'>
                                <div className='grid gap-4'>
                                    <div className='grid gap-1'>
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Ime</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            defaultValue={userData.name || ''}
                                                            placeholder="Vpišite svoje ime"
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
                                    <div className='grid gap-1'>
                                        <FormField
                                            control={form.control}
                                            name="lastName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Vaš priimek</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            defaultValue={userData.lastName || ''}
                                                            placeholder="Vpišite priimek"
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
                                    <div className='grid gap-1'>
                                        <FormField
                                            control={form.control}
                                            name="birthdate"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel>Datum rojstva</FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant={'light'}
                                                                    className={cn(
                                                                        'w-full justify-start text-left font-normal font-dm-sans z-20',
                                                                        !field.value && 'text-muted-foreground'
                                                                    )}
                                                                >
                                                                    {field.value
                                                                        ? (
                                                                            <span>{format(field.value, 'PPP', { locale: sl })}</span>
                                                                        )
                                                                        : (
                                                                            <span>{userData.birthdate}</span>
                                                                        )}
                                                                    {/* <CalendarIcon className="ml-auto h-4 w-4 opacity-50" /> */}
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0 z-[999]" align="start">
                                                            <Calendar
                                                                mode="single"
                                                                selected={field.value}
                                                                onSelect={field.onChange}
                                                                disabled={(date) =>
                                                                    date > new Date() || date < new Date('1900-01-01')
                                                                }
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className='grid gap-1'>
                                        <FormField
                                            control={form.control}
                                            name="countryId"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Država prebivališča</FormLabel>
                                                    <FormControl>
                                                        <CountriesCombobox
                                                            value={field.value || ''}
                                                            onChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className='grid gap-1'>
                                        <FormField
                                            control={form.control}
                                            name="city"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Mesto bivališča</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            defaultValue={userData.city || ''}
                                                            placeholder="Mesto bivališča"
                                                            autoComplete="lastname"
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
                                    <div className='grid gap-1'>
                                        <FormField
                                            control={form.control}
                                            name="zipcode"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Poštna številka</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            defaultValue={userData.zipcode || ''}
                                                            placeholder="Vpišite poštno številko"
                                                            autoComplete="lastname"
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
                                    <div className='grid gap-1'>
                                        <FormField
                                            control={form.control}
                                            name="address"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Stalni naslov</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            defaultValue={userData.address || ''}
                                                            placeholder="Stalni naslov"
                                                            autoCorrect="off"
                                                            autoComplete='off'
                                                            autoCapitalize='off'
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className='grid gap-1'>
                                        <FormField
                                            control={form.control}
                                            name="tin"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Davčna številka</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            defaultValue={userData.tin || ''}
                                                            placeholder="Vpišite davčno številko"
                                                            autoComplete="taxnumber"
                                                            autoCorrect="off"
                                                            autoCapitalize='off'
                                                            onKeyDown={allowOnlyNumbers}
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className='grid gap-1'>
                                        <FormField
                                            control={form.control}
                                            name="emso"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Emšo</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            defaultValue={userData.emso || ''}
                                                            placeholder="EMŠO"
                                                            autoComplete="number"
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
                                    <div className='grid gap-1'>
                                        <FormField
                                            control={form.control}
                                            name="career"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Poklic</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            defaultValue={userData.career || ''}
                                                            placeholder='Vpišite poklic'
                                                            autoComplete="career"
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
                                    <Button
                                        disabled={form.formState.isSubmitting}
                                        className='w-full mt-6'>
                                        <span className='flex items-center gap-[10px]'>
                                            {form.formState.isSubmitting && (
                                                <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                                            )}
                                            <span className='leading-none '>Shrani</span>
                                        </span>
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>}
        </>
    )
}
