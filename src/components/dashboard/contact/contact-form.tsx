'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Icons } from '@/components/ui/icons'
import { Ilustrations } from '@/components/ui/ilustrations'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader } from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/text-area'
import { ContactFormSchema } from '@/lib/schemas/contact'
import { contact } from '@/lib/services/auth'
import { cn } from '@/lib/utils/style'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

export default function ContactForm() {
    const [isOpen, setIsOpen] = useState(false)
    const searchParams = useSearchParams()
    const subject = searchParams?.get('subject')
    const form = useForm<z.infer<typeof ContactFormSchema>>({
        resolver: zodResolver(ContactFormSchema),
        defaultValues: {
            message: '',
            subject: 'Tehnična podpora'
        }
    })

    async function handleSubmit(data: z.infer<typeof ContactFormSchema>) {
        try {
            await contact(data)
            setIsOpen(true)
            form.reset()
        } catch (error) {
            if (error instanceof Error) {
                toast.error('Nekaj je šlo narobe.', {
                    description: JSON.stringify(error)
                })
            }
        }
    }
    return (
        <div className={cn('w-full lg:pl-16 grid gap-6')}>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className="grid gap-2 gap-y-6">
                        <div className="grid gap-1">
                            <FormField
                                control={form.control}
                                name="subject"
                                render={({ field }) => (
                                    <FormItem className='flex flex-col w-full'>
                                        <FormLabel>Predmet</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={subject || field.value}>
                                            <FormControl>
                                                <SelectTrigger className='w-full'>
                                                    <SelectValue placeholder="Izberi"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className='w-full'>
                                                <SelectItem value="TST/Zlato">TST/Zlato</SelectItem>
                                                <SelectItem value="Tržnica zapuščin">Tržnica zapuščin</SelectItem>
                                                <SelectItem value="Tehnična podpora">Tehnična podpora</SelectItem>
                                                <SelectItem value="Dokumenti">Dokumenti</SelectItem>
                                                <SelectItem value="Transakcije">Transakcije</SelectItem>
                                                <SelectItem value="Oporoke">Oporoke</SelectItem>
                                                <SelectItem value="Ostalo">Ostalo</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid gap-1">
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Sporočilo</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                className='h-32 p-6 rounded-none resize-none'
                                                placeholder="Vpišite sporočilo"
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
                        <Button className='lg:w-fit'>
                            <span className='flex items-center gap-[10px]'>
                                {form.formState.isSubmitting && (
                                    <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                <span className='leading-none '>Pošlji sporočilo</span>
                            </span>
                        </Button>
                    </div>
                </form>
            </Form>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetContent className='w-full lg:!max-w-[420px] h-full bg-[#F1F1F1] p-0'>
                    <ScrollArea
                        className={cn(
                            'w-full h-full',
                            '[&>div>div]:min-h-full [&>div>div]:!flex [&>div>div]:flex-col'
                        )}
                    >
                        <div className={cn('flex flex-auto flex-col')}>
                            <SheetHeader className='flex flex-auto justify-center items-center w-full px-7 pt-10 pb-8 space-y-0 relative z-[100]'>
                                <Ilustrations.Email className='w-full max-w-44 lg:max-w-72' />
                                <span className="text-h5 font-baskerville text-center !mb-8">Hvala za vaše sporočilo!</span>
                                <p className="text-body-big-2 text-center !mt-4">Vaš obrazec je bil uspešno poslan. Zelo cenimo, da ste si vzeli čas in nas kontaktirali.</p>
                                <p className="text-body-big-2 text-center !mt-4">Naša ekipa bo pregledala vaše informacije in vas bo po e-pošti kontaktirala v najkrajšem možnem času.</p>
                                <p className="text-body-big-2 text-center !mt-4">Želimo vam lep dan!</p>
                            </SheetHeader>
                            <SheetFooter className='flex items-center justify-center w-full bg-primary-white px-6 py-4 mt-auto'>
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
