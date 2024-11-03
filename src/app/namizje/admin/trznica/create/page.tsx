'use client'
// React
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
import { Textarea } from '@/components/ui/text-area'
// Utils
import CharacteristicsForm from '@/components/dashboard/admin/marketplace/characteristics-form'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { characteristics } from '@/lib/constants/characteristics'
import { CreateProductSchema } from '@/lib/schemas/products'
import { createProduct } from '@/lib/services/admin/products'
import { allowOnlyNumbers } from '@/lib/utils/form'
import { cn } from '@/lib/utils/style'
import { zodResolver } from '@hookform/resolvers/zod'
import { add, format } from 'date-fns'
import DynamicNumber from 'react-dynamic-number'
import { toast } from 'sonner'
import * as z from 'zod'

export default function CreateProductPage() {
    const [picture, setPicture] = useState<string | null>(null)
    const [picture2, setPicture2] = useState<string | null>(null)
    const [picture3, setPicture3] = useState<string | null>(null)
    const [picture4, setPicture4] = useState<string | null>(null)
    const [cena, setCena] = useState(false)
    const [categoryId, setCategoryId] = useState<string | null>(null)
    const [updatedCharacteristics, setUpdatedCharacteristics] = useState<Characteristic[]>([])
    const form = useForm<z.infer<typeof CreateProductSchema>>({
        resolver: zodResolver(CreateProductSchema),
        defaultValues: {
            publishedAt: new Date()
        }
    })

    async function handleSubmit(data: z.infer<typeof CreateProductSchema>) {
        const payload = {
            ...data,
            ...((picture !== null) && { picture }),
            picture2,
            picture3,
            picture4,
            ...(data.publishedAt && { publishedAt: format(new Date(data.publishedAt), 'yyyy-MM-dd') }),
            characteristics: updatedCharacteristics
        }
        if (cena) {
            payload.price = -1
        }
        await createProduct(payload)
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

    const handleCharacteristicsChange = (newCharacteristics: Characteristic[]) => {
        setUpdatedCharacteristics(newCharacteristics)
    }

    return (
        <>
            <PageHeader>
                <PageHeaderName>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink className='text-body-medium font-dm-sans' href='/namizje/admin/trznica'>
                                    Tržnica /
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbItem className='text-body-medium font-dm-sans' >
                            Dodaj nov predmet
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </PageHeaderName>
            </PageHeader>
            <section className='flex flex-col min-h-screen relative'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-6'>
                        <div className="flex flex-col gap-6 lg:flex-row justify-center lg:justify-between items-center">
                            <h3 className='font-baskerville text-h6 text-center lg:text-left'>Predmet</h3>
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
                                            <Select onValueChange={field.onChange}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder='Status' />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="0">Neaktiven</SelectItem>
                                                    <SelectItem value="1">Aktiven</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div className='flex flex-col xl:flex-row gap-x-4 w-full'>
                            {/* Image */}
                            <Card className='flex flex-col gap-4 border-none w-full xl:w-1/2 p-4 h-fit'>
                                <div className='flex items-center justify-center w-full bg-primary-light-gray/20'>
                                    <ImageUploader
                                        title='image'
                                        url={picture}
                                        setUrl={setPicture}
                                    />
                                </div>
                                {(picture) &&
                                        <div className='flex items-center justify-center w-full bg-primary-light-gray/20'>
                                            <ImageUploader
                                                title='image'
                                                url={picture2}
                                                setUrl={setPicture2}
                                            />
                                        </div>}
                                {(picture2) &&
                                        <div className='flex items-center justify-center w-full bg-primary-light-gray/20'>
                                            <ImageUploader
                                                title='image'
                                                url={picture3}
                                                setUrl={setPicture3}
                                            />
                                        </div>}
                                {(picture3) &&
                                        <div className='flex items-center justify-center w-full bg-primary-light-gray/20'>
                                            <ImageUploader
                                                title='image'
                                                url={picture4}
                                                setUrl={setPicture4}
                                            />
                                        </div>}
                            </Card>
                            <Card className='flex flex-col gap-4 bg-primary-light-gray/20 border-none w-full xl:w-1/2 p-4'>
                                <CardContent>
                                    <div className='flex flex-col gap-y-6 py-4'>
                                        {/* Name */}
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Ime predmeta</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Vnesite ime predmeta"
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
                                        {/* CategoryId */}
                                        <FormField
                                            control={form.control}
                                            name="categoryId"
                                            render={({ field: { onChange, ...field } }) => (
                                                <FormItem className='flex flex-col w-full'>
                                                    <FormLabel>Kategorija</FormLabel>
                                                    <Select onValueChange={(value) => {
                                                        setCategoryId(value)
                                                        onChange?.(value)
                                                    }}
                                                    {...field}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger className='w-full'>
                                                                <SelectValue placeholder='Izberi' />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent className='w-full z-[999]'>
                                                            <SelectItem value={'1'}>Nepremičnina</SelectItem>
                                                            <SelectItem value={'2'}>Plovila</SelectItem>
                                                            <SelectItem value={'3'}>Vozilo</SelectItem>
                                                            <SelectItem value={'7'}>Zemljišče</SelectItem>
                                                            <SelectItem value={'5'}>Zlato/Nakit</SelectItem>
                                                            <SelectItem value={'6'}>Umetnine</SelectItem>
                                                            <SelectItem value={'4'}>Poslovni modeli</SelectItem>
                                                            <SelectItem value={'8'}>Ostalo</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {/* Characteristics */}
                                        <CharacteristicsForm
                                            characteristics={characteristics}
                                            onCharacteristicsChange={handleCharacteristicsChange}
                                            categoryId={categoryId}
                                        />
                                        {/* Price */}
                                        <FormField
                                            control={form.control}
                                            name="price"
                                            render={({ field: { onChange, ...field } }) => (
                                                <FormItem>
                                                    <FormLabel>Cena predmeta</FormLabel>
                                                    <FormControl>
                                                        <>
                                                            {cena
                                                                ? <Input
                                                                    min={1}
                                                                    value='Cena je po dogovoru'
                                                                    placeholder={'Cena je po dogovoru'}
                                                                    onKeyDown={allowOnlyNumbers}
                                                                    disabled={cena}
                                                                />
                                                                : <DynamicNumber
                                                                    className= 'flex h-[45px] w-full rounded-none border border-primary-medium-gray bg-primary-white text-body-big-2 font-medium px-4 py-3 ring-offset-primary-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:font-normal placeholder:text-primary-medium-gray/50 focus-visible:placeholder:text-primary-medium-gray focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                                                                    separator={','}
                                                                    positive={true}
                                                                    negative={false}
                                                                    fraction={4}
                                                                    thousand={true}
                                                                    defaultValue={0}
                                                                    {...field}
                                                                    onChange={(e, modelValue) => {
                                                                        // console.log(modelValue)
                                                                        // console.log(viewValue)
                                                                        // setQuantity((modelValue))
                                                                        onChange?.(modelValue)
                                                                    }}
                                                                />
                                                                // : <Input
                                                                //     type='number'
                                                                //     min={1}
                                                                //     onChange={(e) => {
                                                                //         onChange?.(parseFloat(e.target.value))
                                                                //         setCena(false)
                                                                //     }}
                                                                //     onKeyDown={allowOnlyNumbers}
                                                                //     onWheel={(e) => e.currentTarget.blur()}
                                                                //     {...field}
                                                                // />
                                                            }
                                                            <div className='flex items-center'>
                                                                <Checkbox checked={cena} onCheckedChange={(e) => {
                                                                    setCena(!!e)
                                                                }}/>
                                                                <Label>Cena je po dogovoru</Label>
                                                            </div>
                                                        </>
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
                                                                    date < new Date('1900-01-01') || date > add(new Date(), { days: 1 })
                                                                }
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {/* Resume */}
                                        <FormField
                                            control={form.control}
                                            name="description"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Opis predmeta</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder=''
                                                            autoComplete="off"
                                                            autoCorrect="off"
                                                            autoCapitalize='on'
                                                            className='h-[140px] resize-none'
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
                            <Button type='submit' className='w-[400px] max-w-full'>
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
