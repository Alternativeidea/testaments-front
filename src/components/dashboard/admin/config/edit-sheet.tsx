'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Icons } from '@/components/ui/icons'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/text-area'
import { putAdminMessage } from '@/lib/services/admin/banners'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

export default function EditSheet({ id, title, content }: { id : number, title : string, content : string }) {
    const schema = z.object({
        title: z
            .string(),
        content: z
            .string()
    })
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema)
    })
    async function handleSubmit(data: z.infer<typeof schema>) {
        const payload = {
            ...data
        }
        console.log(payload)
        await putAdminMessage(id, payload)
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
                    Uredi naslovno sporočilo
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col justify-between h-full gap-y-6 py-6'>
                        {/* Title */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Glavni naslov</FormLabel>
                                    <FormControl>
                                        <Input
                                            defaultValue={title}
                                            placeholder="Glavni naslov"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Content */}
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Vsebina</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            defaultValue={content}
                                            placeholder='Vsebina'
                                            className='min-h-[380px] resize-none'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className='flex w-full justify-center items-center'>
                            <Button className='absolute bottom-6 w-3/4'>
                                {form.formState.isSubmitting && (
                                    <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                                )}
                            Shrani
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
