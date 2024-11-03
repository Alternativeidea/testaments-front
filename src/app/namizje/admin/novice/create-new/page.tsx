'use client'
// React
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
// Components
import { PageHeader, PageHeaderName } from '@/components/dashboard/layout/page-header'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Icons } from '@/components/ui/icons'
import ImageUploader from '@/components/ui/image-uploader'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/text-area'
// Utils
import { CreatePostSchema } from '@/lib/schemas/posts'
import { createPost } from '@/lib/services/admin/post'
import { cn } from '@/lib/utils/style'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { toast } from 'sonner'
import * as z from 'zod'

export default function CreatePostPage() {
    const router = useRouter()
    const [image, setImage] = useState<string | null>(null)
    const form = useForm<z.infer<typeof CreatePostSchema>>({
        resolver: zodResolver(CreatePostSchema),
        defaultValues: {
            status: '1'
        }
    })

    async function handleSubmit(data: z.infer<typeof CreatePostSchema>) {
        const payload = {
            ...data,
            ...(data.publishedAt && { publishedAt: format(data.publishedAt, 'yyyy-MM-dd') }),
            image
        }
        await createPost(payload)
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
        router.push('/namizje/admin/novice')
        router.refresh()
    }

    return (
        <>
            <PageHeader>
                <PageHeaderName>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink className='text-body-medium font-dm-sans' href='/namizje/admin/novice'>
                                    Novice / <span className='text-primary-dark-gray pl-1'>Dodaj novico</span>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </PageHeaderName>
            </PageHeader>
            <section className='flex flex-col min-h-screen relative'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-6'>
                        <div className="flex flex-col gap-6 lg:flex-row justify-center lg:justify-between items-center">
                            <h3 className='font-baskerville text-h6 text-center lg:text-left'>Dodaj novico</h3>
                            <div className="flex gap-x-4 items-center">
                                {/* IsFeatured */}
                                <div className='flex items-center gap-x-3 bg-primary-light-gray/20 p-3'>
                                    <span>Priljubljen</span>
                                    <FormField
                                        control={form.control}
                                        name="isFeatured"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className='flex items-center'>
                                                    <FormControl>
                                                        <Switch
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                {/* Status */}
                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem className='flex flex-col w-full'>
                                            <Select onValueChange={field.onChange} defaultValue='1'>
                                                <SelectTrigger>
                                                    <SelectValue placeholder='Status' />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1">Aktiven</SelectItem>
                                                    <SelectItem value="0">Neaktiven</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div className='flex gap-x-4'>
                            {/* Image */}
                            <Card className='flex flex-col gap-4 bg-primary-light-gray/20 border-none w-1/2 p-4 h-fit'>
                                <ImageUploader
                                    title='image'
                                    url={image}
                                    setUrl={setImage}
                                />
                            </Card>
                            <Card className='flex flex-col gap-4 bg-primary-light-gray/20 border-none w-1/2 p-4'>
                                <CardContent>
                                    <div className='flex flex-col gap-y-6 py-4'>
                                        {/* Name */}
                                        <FormField
                                            control={form.control}
                                            name="title"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Ime novice</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Vnesite ime novice"
                                                            autoComplete="name"
                                                            autoCorrect="off"
                                                            autoCapitalize='off'
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {/* PublishedAt */}
                                        <FormField
                                            control={form.control}
                                            name="publishedAt"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel>Datum objave</FormLabel>
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
                                        {/* CategoryId */}
                                        <FormField
                                            control={form.control}
                                            name="categoryId"
                                            render={({ field }) => (
                                                <FormItem className='flex flex-col w-full'>
                                                    <FormLabel>Kategorija</FormLabel>
                                                    <Select onValueChange={field.onChange}>
                                                        <FormControl>
                                                            <SelectTrigger className='w-full'>
                                                                <SelectValue placeholder='Izberi'/>
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent className='w-full'>
                                                            <SelectItem value={'9'}>Oporoke</SelectItem>
                                                            <SelectItem value={'10'}>Davek</SelectItem>
                                                            <SelectItem value={'11'}>Dedovanje</SelectItem>
                                                            <SelectItem value={'12'}>Premoženje</SelectItem>
                                                            <SelectItem value={'13'}>Novice TST</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {/* Resume */}
                                        <FormField
                                            control={form.control}
                                            name="content"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Vsebina novice</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder='Vsebina novice'
                                                            autoComplete="off"
                                                            autoCorrect="off"
                                                            autoCapitalize='on'
                                                            className='h-[180px] resize-none'
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {/* URL */}
                                        <FormField
                                            control={form.control}
                                            name="resume"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Spletni URL do novice</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type='url'
                                                            placeholder='Spletni URL do novice'
                                                            autoComplete="off"
                                                            autoCorrect="off"
                                                            autoCapitalize='on'
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className='w-full flex items-center justify-center'>
                            <Button type='submit' className='w-[400px] max-w-full' disabled={!image || form.formState.isSubmitting }>
                                {form.formState.isSubmitting && (
                                    <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Shrani spremembe
                            </Button>
                        </div>
                    </form>
                </Form>
            </section>
        </>
    )
}
