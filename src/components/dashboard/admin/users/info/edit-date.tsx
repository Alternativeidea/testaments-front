'use client'
// Next
import { useForm } from 'react-hook-form'
// Components
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Icons } from '@/components/ui/icons'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
// Utils
import { patchUser } from '@/lib/services/admin/users'
import { cn } from '@/lib/utils/style'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { toast } from 'sonner'
import * as z from 'zod'

export default function EditDate({ id } : {id: number}) {
    const schema = z.object({
        date: z
            .date({
                required_error: 'Neveljaven datum'
            }),
        isConfirmed: z
            .boolean(),
        message: z
            .string().optional()
    })
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema)
    })

    async function handleSubmit(data: z.infer<typeof schema>) {
        const payload = {
            ...data,
            date: format(data.date, 'yyyy-MM-dd'),
            status: 4
        }
        await patchUser(payload, id)
        try {
            toast.success('Urejeno!', {
                position: 'bottom-center'
            })
        } catch (error) {
            if (error instanceof Error) {
                const err = JSON.parse(error.message)
                toast.error('Nekaj je šlo narobe.', {
                    description: err.message
                })
            }
        }
        location.reload()
    }

    return (
        <Card className='border-none h-full'>
            <CardHeader className='flex px-6 shadow-dashboard-header'>
                <CardTitle className='text-h6 pt-6 font-baskerville font-normal'>
                    Uredi status stranke
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col justify-between h-full'>
                        <div className='flex flex-col gap-y-6 py-8'>
                            <div className='flex flex-col gap-y-2'>
                                <FormField
                                    control={form.control}
                                    name="date"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Datum smrti</FormLabel>
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
                                                                    <span>{format(field.value, 'PPP')}</span>
                                                                )
                                                                : (
                                                                    <span>DD-MM-YYYY</span>
                                                                )}
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
                            <div className='flex gap-4 items-center'>
                                <FormField
                                    control={form.control}
                                    name="isConfirmed"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className='flex items-center'>
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                                <FormLabel><b>Potrjujem da je stranka preminila.</b>
                                                    <p>Račun se bo deaktiviral in status računa bo postal <b>‘Pokojni’</b></p>
                                                </FormLabel>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div className='flex w-full justify-center items-center'>
                            <Button className='absolute bottom-6 w-3/4'>
                                {form.formState.isSubmitting && (
                                    <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Potrdi
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
