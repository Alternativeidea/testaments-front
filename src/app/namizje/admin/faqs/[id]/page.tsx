'use client'
import { PageHeader, PageHeaderName } from '@/components/dashboard/layout/page-header'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Icons } from '@/components/ui/icons'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/text-area'
import { useFetch } from '@/lib/hooks/use-fetch'
import { EditFaqSchema } from '@/lib/schemas/faqs'
import { deleteFaq, getFaq, updateFaq } from '@/lib/services/admin/faqs'
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

export default function EditFaqPage() {
    const params = useParams<{ id: string }>()
    const faqId = params?.id ? parseInt(params.id) : 0
    const { data, isLoading } = useFetch<NewFaqProps>(() => getFaq(faqId))
    const form = useForm<z.infer<typeof EditFaqSchema>>({
        resolver: zodResolver(EditFaqSchema),
        defaultValues: {
            isFeatured: false
        }
    })

    async function handleSubmit(data: z.infer<typeof EditFaqSchema>) {
        const payload = {
            ...data
        }
        await updateFaq(payload, faqId)
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
    }

    return (
        <><PageHeader>
            <PageHeaderName>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink className='text-body-medium font-dm-sans' href='/namizje/admin/novice'>
                                Pomoč
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </PageHeaderName>
        </PageHeader>
        <Form {...form}>
            <section className='flex flex-col min-h-[90vh] relative'>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className="flex flex-col gap-6 lg:flex-row justify-center lg:justify-between items-center">
                        <h3 className='font-baskerville text-h6 text-center lg:text-left'>Zakaj je arhiviranje pomembno?</h3>
                        <div className="flex gap-x-4 items-center">
                            {/* Status */}
                            <FormField
                                control={form.control}
                                name="active"
                                render={({ field }) => (
                                    <FormItem className='flex flex-col w-full'>
                                        {isLoading
                                            ? <Skeleton className='w-[160px] h-12' />
                                            : <Select
                                                defaultValue={data?.active ? '1' : '0'}
                                                onValueChange={field.onChange}>
                                                <SelectTrigger>
                                                    <SelectValue
                                                        placeholder='Status' />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1">Aktiven</SelectItem>
                                                    <SelectItem value="0">Neaktiven</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        }
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DeleteFaqButton id={faqId} />
                        </div>
                    </div>
                    <Card className='bg-primary-light-gray/20 border-none max-w-xl'>
                        <CardContent>
                            <div className='flex flex-col justify-between h-full'>
                                <div className='flex flex-col gap-y-6 py-4'>
                                    {/* Question */}
                                    <FormField
                                        control={form.control}
                                        name="question"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Pogosto vprašanje</FormLabel>
                                                <FormControl>
                                                    {isLoading
                                                        ? <Skeleton className='w-full h-12' />
                                                        : <Input
                                                            defaultValue={data?.question}
                                                            {...field}
                                                        />
                                                    }
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
                                                {isLoading
                                                    ? <Skeleton className='w-full h-12' />
                                                    : <Select onValueChange={field.onChange}>
                                                        <FormControl>
                                                            <SelectTrigger className='w-full'>
                                                                <SelectValue placeholder='Izberi' />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent className='w-full z-[999]'>
                                                            <SelectItem value={'1'}>DASHBOARD</SelectItem>
                                                            <SelectItem value={'2'}>STORAGE</SelectItem>
                                                            <SelectItem value={'3'}>TST</SelectItem>
                                                            <SelectItem value={'4'}>MARKET</SelectItem>
                                                            <SelectItem value={'5'}>NEWS</SelectItem>
                                                        </SelectContent>
                                                    </Select>}
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
                                                    {isLoading
                                                        ? <Skeleton className='w-full h-[140px]' />
                                                        : <Textarea
                                                            defaultValue={data?.response}
                                                            placeholder=''
                                                            className='h-[140px] resize-none'
                                                            {...field}
                                                        />}
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <div className='absolute w-full flex items-center justify-center bottom-12'>
                        <Button className='w-[400px] max-w-full'>
                            {form.formState.isSubmitting && (
                                <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            <span className=''>Shrani spremembe</span>
                        </Button>
                    </div>
                </form>
            </section>
        </Form>
        </>
    )
}

function DeleteFaqButton({ id }: { id: number }) {
    const router = useRouter()

    async function handleDelete() {
        await deleteFaq(id)
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
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant='destructive'>
                    Odstrani
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className='flex flex-col gap-y-4 py-6 border-none px-8'>
                <AlertDialogHeader className='flex flex-col items-center justify-center text-center'>
                    <AlertDialogTitle className='font-baskerville text-body-big font-normal'>Odpravite vprašanje</AlertDialogTitle>
                    <AlertDialogDescription className='flex flex-col items-center justify-center text-center gap-y-4 py-6'>
                        {/* <h3 className='text-h5 font-baskerville text-primary-dark-gray'>Izbris Question</h3> */}
                        <span className='text-body-small'>
                            Ali ste prepričani, da želite odpraviti vprašanje?
                        </span>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className='w-full'>
                    <AlertDialogAction onClick={handleDelete} className='w-full'>
                        <p className=''>Da</p>
                    </AlertDialogAction>
                    <AlertDialogCancel className='w-full'>
                        <p className=''>Ne</p>
                    </AlertDialogCancel>
                </AlertDialogFooter>
                <AlertDialogCancel className='absolute top-2 right-2 w-fit border-none bg-transparent hover:bg-transparent hover:text-primary-dark-gray cursor-pointer'>
                    <X />
                </AlertDialogCancel>
            </AlertDialogContent>
        </AlertDialog>
    )
}
