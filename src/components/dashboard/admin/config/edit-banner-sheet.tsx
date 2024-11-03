'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import DocumentUploader from '@/components/ui/document-uploader'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Icons } from '@/components/ui/icons'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/text-area'
// import { putAdminBanner } from '@/lib/services/admin/banners'
import { formatDateWithNumbers } from '@/lib/utils/date'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

interface EditBannerSheetProps {
    id: number
    title: string
    subtitle: string
    ctaLink: string
}

export default function EditBannerSheet({ id, title, subtitle, ctaLink }: EditBannerSheetProps) {
    const [image, setImage] = useState<string | null>(null)
    const schema = z.object({
        title: z
            .string().optional(),
        subtitle: z
            .string().optional(),
        ctaLink: z
            .string().optional()
    })
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema)
    })
    async function handleSubmit(data: z.infer<typeof schema>) {
        const payload = {
            ...data,
            ...((image !== null) && { image })
        }
        const filteredPayload = Object.fromEntries(
            Object.entries(payload).filter(([, value]) => value !== undefined && value !== null && value !== '')
        )
        if (Object.keys(filteredPayload).length > 0) {
            console.log(id, filteredPayload)
            // await putAdminBanner(id, payload)
        }
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
                            name="subtitle"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Vsebina</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            defaultValue={subtitle}
                                            placeholder='Vsebina'
                                            className='min-h-[180px] resize-none'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Image */}
                        <DocumentUploader title={`banner_${formatDateWithNumbers(Date())}`} url={image} setUrl={setImage} />
                        {/* Url */}
                        <FormField
                            control={form.control}
                            name="ctaLink"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Povezava pelje na</FormLabel>
                                    <FormControl>
                                        <Input
                                            defaultValue={ctaLink}
                                            placeholder="Glavni naslov"
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
