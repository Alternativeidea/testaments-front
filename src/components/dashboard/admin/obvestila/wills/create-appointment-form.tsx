'use client'
// Next
import { useForm } from 'react-hook-form'
// Components
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SheetHeader } from '@/components/ui/sheet'
// Utils
import { Checkbox } from '@/components/ui/checkbox'
import { Icons } from '@/components/ui/icons'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/text-area'
import { useFetch } from '@/lib/hooks/use-fetch'
import { getUser } from '@/lib/services/admin/users'
import { updateAdminWill } from '@/lib/services/admin/wills'
import { cn } from '@/lib/utils/style'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { jsPDF } from 'jspdf'
import { useState } from 'react'
import { toast } from 'sonner'
import * as z from 'zod'

interface CreateAppointmentFormProps {
    id: number
    userId: number
    willId: number
    request: WillProps
}

export default function CreateAppointmentForm({ id, userId, willId, request } : CreateAppointmentFormProps) {
    const [ckDate, setCkDate] = useState(false)
    const [ckCalendar, setCkCalendar] = useState(false)
    const [ckDown, setCkDown] = useState(false)
    const schema = z.object({
        date: z
            .date({
                required_error: 'Neveljaven datum'
            }),
        time: z
            .string(),
        address: z
            .string()
    })
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema)
    })

    const { data, isLoading } = useFetch<ProfileProps>(() => getUser(userId))

    async function createPDF() {
        // eslint-disable-next-line new-cap
        const doc = new jsPDF('p', 'pt', 'letter')
        let stringHeirs = ''

        request.heirs.forEach(h => {
            stringHeirs += `${h.name}\n${h.relationship}\n${h.share}`
        })
        stringHeirs += ''

        // const html = `
        //     <div style='width:100%; min-width: 8000px;>
        //         <p style='font-size: 10px'; letter-spacing: 0.01px;>Appointment</p>
        //         <p style='font-size: 8px'; letter-spacing: 0.01px;>Oporoke ID: <span>${request.id}</span></p>
        //         <p style='font-size: 8px'; letter-spacing: 0.01px;>Ime Predmeta:</p>
        //         <p dir="ltr" style='font-size:8px;'>${request.description}</p>
        //         <p dir="ltr" style="line-height:1.2;text-align: justify;background-color:#ffffff;margin-top:0pt;margin-bottom:0pt;"><span style='font-size: 12px; font-family: "Arial Narrow", sans-serif; color: rgb(34, 34, 34); background-color: transparent; font-weight: 700; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>Dedici</span></p>
        //         <p><span style="font-size: 10px;">${stringHeirs}</span></p>
        //         <p dir="ltr" style="line-height:1.2;text-align: justify;background-color:#ffffff;margin-top:0pt;margin-bottom:0pt;"><span style='font-size: 12px; font-family: "Arial Narrow", sans-serif; color: rgb(34, 34, 34); background-color: transparent; font-weight: 700; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>Kategorija</span></p>
        //         <p dir="ltr" style="line-height:1.2;text-align: justify;background-color:#ffffff;margin-top:0pt;margin-bottom:0pt;"><span style='font-size: 10px; font-family: "Arial Narrow", sans-serif; color: rgb(34, 34, 34); background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;'>${request.category.name}&nbsp;</span></p>
        //         <p dir="ltr" style="line-height:1.2;text-align: justify;background-color:#ffffff;margin-top:0pt;margin-bottom:0pt;"><br></p>
        //         <p dir="ltr" style="line-height:1.2;text-align: justify;background-color:#ffffff;margin-top:0pt;margin-bottom:0pt;"><br></p>
        //         <p><br></p>
        //     </div>
        // `

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formatString =
            `\n\nAppointment made on Testament d.o.o\n\nOporoke ID: #${request.id}\n\nOporoke Kategorija ${request.category.name}\n\n\nIme Predmeta: ${request.description}\n\n\nDedici: \n\n${stringHeirs}\n\n`
        doc.text(formatString, 10, 10)
        // // doc.text(`Ime Predmeta: ${request.description}`, 20, 10)
        // // doc.text(`Dediči ${request.id}`, 30, 10)
        // // doc.text(`Kategorija ${request.category.name}`, 40, 10)
        // await doc.html(html, {
        //     callback: function(pdf) {
        //         const iframe = document.createElement('iframe')
        //         iframe.setAttribute('style', 'position:fixed;right:0; top:0; bottom:0; height:100%; width:500px')
        //         document.body.appendChild(iframe)
        //         iframe.src = pdf.output('datauristring')
        //     }
        // })

        doc.save(`oporoke_${request.id}.pdf`)
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async function handleSubmit(data: z.infer<typeof schema>) {
        const payload = {
            ...data,
            date: format(data.date, 'yyyy-MM-dd')
        }
        await updateAdminWill(payload, id)
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
        <>
            <SheetHeader className='flex items-start w-full shadow-button py-8'>
                <p className="pl-4 leading-none text-h6 font-baskerville">Oproke / Oddan zahtevek</p>
                {isLoading
                    ? <Skeleton className='ml-4 w-[120px] h-[16px]'/>
                    : <p className='pl-4 leading-none'>{data?.name}</p>
                }
            </SheetHeader>
            <div className='flex flex-col gap-y-4 w-full'>
                <p className='text-body-medium shadow-button px-4 py-4'>
                    V primeru, da ste se dogovorili za sestanek z stranko glede kreacije, izbrisa ali ureditve oporoke, prosim, vnesite datum, čas in lokacijo sestanka spodaj ter potrdite sestanek. Ob potrditvi bo avtomatsko poslano e-poštno sporočilo o potrditvi sestanka stranki.
                </p>
                <Form {...form}>
                    {/* <form className='px-4'> */}
                    <form onSubmit={form.handleSubmit(handleSubmit)} className='px-4'>
                        <p className='font-[500]'>ID Oporoka: {willId}</p>
                        <p className='py-2'>Kdaj boste imeli sestanek s stranko glede oporoke?</p>
                        <div className='flex flex-col gap-4 py-4'>
                            {/* Date */}
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Datum</FormLabel>
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
                                                                <span>
                                                                    {'DD-MM-YYYY'}
                                                                </span>
                                                            )}
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0 z-[999]" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Time */}
                            <FormField
                                control={form.control}
                                name="time"
                                render={({ field }) => (
                                    <FormItem className='flex flex-col w-full'>
                                        <FormLabel>Določite uro sestanka</FormLabel>
                                        <Select onValueChange={field.onChange}>
                                            <SelectTrigger className='w-full'>
                                                <SelectValue className='w-full' placeholder='Ur' />
                                            </SelectTrigger>
                                            <SelectContent className='w-full z-[999]'>
                                                <SelectItem value="09:00">09:00</SelectItem>
                                                <SelectItem value="10:00">10:00</SelectItem>
                                                <SelectItem value="11:00">11:00</SelectItem>
                                                <SelectItem value="12:00">12:00</SelectItem>
                                                <SelectItem value="13:00">13:00</SelectItem>
                                                <SelectItem value="14:00">14:00</SelectItem>
                                                <SelectItem value="15:00">15:00</SelectItem>
                                                <SelectItem value="16:00">16:00</SelectItem>
                                                <SelectItem value="17:00">17:00</SelectItem>
                                                <SelectItem value="18:00">18:00</SelectItem>
                                                <SelectItem value="19:00">19:00</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Address */}
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Naslov</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                className='resize-none h-[120px]'
                                                placeholder="Naslov"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className='flex mx-auto' onClick={() => createPDF()}>
                                Prenesi izpoljnen obrazec strank
                            </div>
                            <div className='flex items-center'>
                                <Checkbox defaultChecked={ckDate} onCheckedChange={() => setCkDate(!ckDate)}/>
                                <Label>Dogovoril sem se z stranko za sastanek</Label>
                            </div>
                            <div className='flex items-center'>
                                <Checkbox defaultChecked={ckCalendar} onCheckedChange={() => setCkCalendar(!ckCalendar)}/>
                                <Label>Dodal sem sastanek v koledar podjetja</Label>
                            </div>
                            <div className='flex items-center pb-16'>
                                <Checkbox defaultChecked={ckDown} onCheckedChange={() => setCkDown(!ckDown)}/>
                                <Label>Prenesel sem izpoljnen obrazec in ga spravil za sastanek</Label>
                            </div>
                            <Button disabled={!ckDate || !ckDown || !ckCalendar}>
                                {form.formState.isSubmitting && (
                                    <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Potrjujem sastanek
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </>
    )
}
