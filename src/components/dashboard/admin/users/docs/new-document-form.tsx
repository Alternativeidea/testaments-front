'use client'
// React
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
// Components
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import DocumentUploader from '@/components/ui/document-uploader'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/text-area'
// Utils
import { Ilustrations } from '@/components/ui/ilustrations'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { SheetClose } from '@/components/ui/sheet'
import { NewDocumentSchema } from '@/lib/schemas/documents'
import { createNewDocument } from '@/lib/services/documents'
import { formatDateWithNumbers } from '@/lib/utils/date'
import { cn } from '@/lib/utils/style'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { sl } from 'date-fns/locale'
import { toast } from 'sonner'
import * as z from 'zod'

export function NewDocumentForm({ id }: { id: string }) {
    const router = useRouter()
    const [image, setImage] = useState<string | null>(null)
    const [name, setName] = useState<string>('id-dokumenta')
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [openCalendar, setOpenCalendar] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)
    const form = useForm<z.infer<typeof NewDocumentSchema>>({
        resolver: zodResolver(NewDocumentSchema),
        defaultValues: {
            url: image || ''
        }
    })

    async function handleSubmit(data: z.infer<typeof NewDocumentSchema>) {
        const payload = {
            name: data.name,
            description: data.description,
            processingDate: format(data.processingDate, 'yyyy-MM-dd'),
            url: image
        }
        console.log(payload)
        await createNewDocument(id, payload)
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
        router.refresh()
        location.reload()
        setSuccess(true)
    }

    return (
        <>
            {success
                ? <SuccessScreen />
                : <Card className='border-none h-full w-full'>
                    <CardHeader className='flex shadow-dashboard-header'>
                        <CardTitle className='text-h6 pt-6 font-baskerville font-normal'>
                            Dodaj dokument
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col justify-between h-full'>
                                <div className='flex flex-col gap-y-6 py-8'>
                                    <FormField
                                        control={form.control}
                                        name='name'
                                        render={({ field: { onChange, ...field } }) => (
                                            <FormItem>
                                                <FormLabel>ID dokumenta</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Vpišite ID dokumenta"
                                                        className='p-6 bg-transparent'
                                                        onChange={(e) => {
                                                            setName(e.target.value)
                                                            onChange?.(e.target.value)
                                                        }}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="processingDate"
                                        render={({ field: { onChange, ...field } }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>Datum</FormLabel>
                                                <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
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
                                                                        <span>{'DD-MM-YYYY'}</span>
                                                                    )}
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0 z-[999]" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={(field) => {
                                                                setDate(field)
                                                                onChange?.(field)
                                                                setOpenCalendar(false)
                                                            }}
                                                            // disabled={(date) =>
                                                            //     date > new Date() || date < new Date('1900-01-01')
                                                            // }
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='ml-0'>Opis dokumenta</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Napiši tukaj..."
                                                        autoComplete="off"
                                                        autoCorrect="off"
                                                        autoCapitalize='on'
                                                        className='h-[100px] text-body-small'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className='flex flex-col gap-y-4'>
                                        <p className='font-baskerville font-medium text-body-big-2'>Dodaj dokument</p>
                                        <div className='w-full overflow-hidden p-2'>
                                            <DocumentUploader title={`${name}_${formatDateWithNumbers(date || '')}`} url={image} setUrl={setImage} />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex w-full justify-center items-center'>
                                    <Button type='submit' className='absolute bottom-6 w-3/4'>
                                        Dodaj dokument
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            }
        </>
    )
}

function SuccessScreen() {
    return (
        <div className='flex flex-col items-center justify-center gap-y-12 absolute w-full top-0 left-0 h-screen bg-primary-white overflow-hidden'>
            <Ilustrations.List />
            <p className='text-center font-baskerville text-h6'>
                Dokument uspešno naloženo!
            </p>
            <SheetClose
                asChild
                className='flex justify-center w-full border-none outline-none'
            >
                <Button
                    className='w-3/5'>
                    Končaj
                </Button>
            </SheetClose>
        </div>
    )
}
