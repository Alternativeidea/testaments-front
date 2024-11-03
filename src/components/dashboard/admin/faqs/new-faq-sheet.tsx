'use client'
// Components
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Icons } from '@/components/ui/icons'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/text-area'
// Utils
import { CreateFaqSchema } from '@/lib/schemas/faqs'
import { createFaq } from '@/lib/services/admin/faqs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

export default function NewFaqSheet() {
    const form = useForm<z.infer<typeof CreateFaqSchema>>({
        resolver: zodResolver(CreateFaqSchema)
    })

    async function handleSubmit(data: z.infer<typeof CreateFaqSchema>) {
        const payload = {
            ...data,
            active: true,
            isFeatured: false
        }
        await createFaq(payload)
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
        <Card className='border-none h-full w-full'>
            <CardHeader className='flex shadow-dashboard-header'>
                <CardTitle className='text-h6 pt-6 font-baskerville font-normal'>
                    Dodaj pomoč
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className='flex flex-col justify-between h-full'>
                        <div className='flex flex-col gap-y-6 py-4'>
                            {/* Question */}
                            <FormField
                                control={form.control}
                                name="question"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Pogosto vprašanje</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder=""
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Section Selector */}
                            <FormField
                                control={form.control}
                                name="section"
                                render={({ field }) => (
                                    <FormItem className='flex flex-col w-full'>
                                        <FormLabel>Kategorija</FormLabel>
                                        <Select onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger className='w-full'>
                                                    <SelectValue placeholder='Izberi'/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className='w-full z-[999]'>
                                                <SelectItem value={'1'}>DASHBOARD</SelectItem>
                                                <SelectItem value={'2'}>STORAGE</SelectItem>
                                                <SelectItem value={'3'}>TST</SelectItem>
                                                <SelectItem value={'4'}>MARKET</SelectItem>
                                                <SelectItem value={'5'}>NEWS</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Response */}
                            <FormField
                                control={form.control}
                                name="response"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Opis pomoči</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder=''
                                                className='h-[140px] resize-none'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='flex w-full justify-center items-center'>
                            <Button className='flex items-center absolute bottom-6 w-3/4'>
                                {form.formState.isSubmitting && (
                                    <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                <span className=''>Dodaj pomoč</span>
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
