'use client'
// React
import { useForm } from 'react-hook-form'
// Components
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar as CalendarIcon } from 'lucide-react'
// Utils
import { cn } from '@/lib/utils/style'
import { zodResolver } from '@hookform/resolvers/zod'
import { PopoverClose } from '@radix-ui/react-popover'
import { format } from 'date-fns'
import { useState } from 'react'
import * as z from 'zod'

const schema = z.object({
    startDate: z
        .date({
            required_error: 'Neveljaven datum'
        }),
    endDate: z
        .date({
            required_error: 'Neveljaven datum'
        })
})

interface CalendarButtonProps {
    changeStartDate: (startDate: string) => void
    changeEndDate: (endDate: string) => void
}

export default function CalendarButton({ changeStartDate, changeEndDate }: CalendarButtonProps) {
    const [activeFilter, setActiveFilter] = useState<boolean>(false)
    const [calendarStartOpen, setCalendarStartOpen] = useState<boolean>(false)
    const [calendarEndOpen, setCalendarEndOpen] = useState<boolean>(false)
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema)
    })

    async function handleSubmit(data: z.infer<typeof schema>) {
        const startDate = formatDateToFilter(data.startDate)
        const endDate = formatDateToFilter(data.endDate)
        changeStartDate(startDate)
        changeEndDate(endDate)
        setActiveFilter(true)
    }

    function formatDateToFilter(date: Date): string {
        const year = date.getFullYear()
        const month = ('0' + (date.getMonth() + 1)).slice(-2)
        const day = ('0' + date.getDate()).slice(-2)
        return `${year}-${month}-${day}`
    }

    function resetDates() {
        form.setValue('startDate', undefined as unknown as Date)
        form.setValue('endDate', undefined as unknown as Date)
        changeStartDate('2024-01-01')
        changeEndDate('')
        setActiveFilter(false)
    }

    return (
        <div className='flex gap-x-2'>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant={`${activeFilter ? 'default' : 'light'}`} className={`${!activeFilter && 'bg-primary-light-gray'} border-none`}>
                        <CalendarIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className='flex w-fit'>
                    <Form {...form}>
                        <form
                            className='flex flex-col gap-4 items-center justify-center'
                            onSubmit={form.handleSubmit(handleSubmit)}
                        >
                            <div className='grid gap-1 w-full'>
                                <FormField
                                    control={form.control}
                                    name="startDate"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel className='capitalize'>začetni datum</FormLabel>
                                            <Popover open={calendarStartOpen} onOpenChange={setCalendarStartOpen}>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={'light'}
                                                            className={cn(
                                                                'w-[170px] justify-center text-center font-normal font-dm-sans z-20',
                                                                !field.value && 'text-muted-foreground'
                                                            )}
                                                        >
                                                            {field.value
                                                                ? (
                                                                    <span>{format(field.value, 'd. LLL yyyy')}</span>
                                                                )
                                                                : (
                                                                    <span>DD / MM /YYYY</span>
                                                                )}
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0 z-[999]" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        onDayClick={() => {
                                                            setCalendarStartOpen(false)
                                                        }}
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
                            <div className='grid gap-1 w-full'>
                                <FormField
                                    control={form.control}
                                    name="endDate"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel className='capitalize'>končni datum</FormLabel>
                                            <Popover open={calendarEndOpen} onOpenChange={setCalendarEndOpen}>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={'light'}
                                                            className={cn(
                                                                'w-[170px] justify-center text-center font-normal font-dm-sans z-20',
                                                                !field.value && 'text-muted-foreground'
                                                            )}
                                                        >
                                                            {field.value
                                                                ? (
                                                                    <span>{format(field.value, 'd. LLL yyyy')}</span>
                                                                )
                                                                : (
                                                                    <span>DD / MM /YYYY</span>
                                                                )}
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0 z-[999]" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        onDayClick={() => {
                                                            setCalendarEndOpen(false)
                                                        }}
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
                            <PopoverClose asChild className='w-full'>
                                <Button type='submit'>
                                Potrdi
                                </Button>
                            </PopoverClose>
                            <PopoverClose asChild className='w-full'>
                                <Button onClick={resetDates} variant={!activeFilter ? 'default' : 'light'} disabled={!activeFilter}>
                                    Resetiraj
                                </Button>
                            </PopoverClose>
                        </form>
                    </Form>
                </PopoverContent>
            </Popover>
        </div>
    )
}
