'use client'
// React
import { useFetch } from '@/lib/hooks/use-fetch'
import { useParams, useRouter } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
// Components
import { PageHeader, PageHeaderName } from '@/components/dashboard/layout/page-header'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Icons } from '@/components/ui/icons'
import ImageUploader from '@/components/ui/image-uploader'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/text-area'
// Utils
import CharacteristicsForm from '@/components/dashboard/admin/marketplace/characteristics-form'
import { characteristics } from '@/lib/constants/characteristics'
import { EditProductSchema } from '@/lib/schemas/products'
import { getAdminProduct, updateProduct } from '@/lib/services/admin/products'
import { formatDate } from '@/lib/utils/date'
import { allowOnlyNumbers } from '@/lib/utils/form'
import { formatData } from '@/lib/utils/format'
import { cn } from '@/lib/utils/style'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import DynamicNumber from 'react-dynamic-number'
import { toast } from 'sonner'
import * as z from 'zod'

export default function EditProductPage() {
    const router = useRouter()
    const params = useParams<{ id: string }>()
    const productId = params?.id ? parseInt(params.id) : 0
    const { data, isLoading } = useFetch<ProductProps>(() => getAdminProduct(productId))
    const [cena, setCena] = useState(false)
    const [updatedCharacteristics, setUpdatedCharacteristics] = useState<Characteristic[]>([])
    const [picture, setPicture] = useState<string | null>(null)
    const [picture2, setPicture2] = useState<string | null>(null)
    const [picture3, setPicture3] = useState<string | null>(null)
    const [picture4, setPicture4] = useState<string | null>(null)
    const [categoryId, setCategoryId] = useState<number | null>(null)
    const [featuredImage, setFeaturedImage] = useState<string | null>(picture)
    const form = useForm<z.infer<typeof EditProductSchema>>({
        resolver: zodResolver(EditProductSchema),
        defaultValues: {
            price: data?.price
        }
    })

    useEffect(() => {
        if (data) {
            setPicture(data.picture || null)
            setPicture2(data.picture2 || null)
            setPicture3(data.picture3 || null)
            setPicture4(data.picture4 || null)
            setFeaturedImage(picture)
            if (data.price === -1) {
                setCena(true)
            } else {
                form.setValue('price', data.price)
            }
        }
    }, [data, picture])

    async function handleSubmit(data: z.infer<typeof EditProductSchema>) {
        const payload = {
            ...data,
            picture: featuredImage,
            picture2,
            picture3,
            picture4,
            ...(data.publishedAt && { publishedAt: format(new Date(data.publishedAt), 'yyyy-MM-dd') })
        }
        if (updatedCharacteristics.length > 0) {
            payload.characteristics = updatedCharacteristics
        }
        const hasValidProperties = Object.entries(payload).some(([, value]) => value !== undefined && value !== '')
        if (hasValidProperties) {
            await updateProduct(productId, payload)
            router.replace('/namizje/admin/trznica')
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
    }

    const handleInputChange = (index: number, charId : string, event: string | ChangeEvent<HTMLInputElement>) => {
        const updatedValue = typeof event === 'string' ? event : event.target.value
        setUpdatedCharacteristics(() => {
            const newArray = [...data?.characteristics || []]
            newArray[index].text = updatedValue
            return newArray
        })
        console.log(updatedCharacteristics)
    }

    const swapImages = (newFeature: string, position: number) => {
        const setters = [setPicture, setPicture2, setPicture3, setPicture4]

        if (position > 1 && position <= setters.length) {
            const previousImageSetter = setters[position - 1]
            if (previousImageSetter) {
                previousImageSetter(featuredImage)
            }
        }

        setFeaturedImage(newFeature)
    }

    const handleCharacteristicsChange = (newCharacteristics: Characteristic[]) => {
        setUpdatedCharacteristics(newCharacteristics)
        console.log('edit', updatedCharacteristics)
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
                                {!isLoading && data?.name}
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </PageHeaderName>
            </PageHeader>
            <section className='flex flex-col min-h-screen relative'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-6'>
                        <div className="flex flex-col gap-6 xl:flex-row justify-center xl:justify-between items-center">
                            <h3 className='font-baskerville text-h6 text-center xl:text-left'>Predmet</h3>
                            <div className="flex gap-x-4 items-center">
                                {/* IsFeatured */}
                                {isLoading
                                    ? <Skeleton className='flex w-[180px] h-12' />
                                    : <div className='flex items-center gap-x-3 bg-primary-light-gray/20 p-3'>
                                        <span>Priljubljen</span>
                                        <FormField
                                            control={form.control}
                                            name="isFeatured"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className='flex items-center'>
                                                        <FormControl>
                                                            <Switch
                                                                defaultChecked={data?.isFeatured}
                                                                onCheckedChange={field.onChange}
                                                            />
                                                        </FormControl>
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                }
                                {/* Status */}
                                {isLoading
                                    ? <Skeleton className='w-[160px] h-12' />
                                    : <>
                                        <FormField
                                            control={form.control}
                                            name="status"
                                            render={({ field }) => (
                                                <FormItem className='flex flex-col w-full'>
                                                    <Select defaultValue={data?.status.toString()} onValueChange={field.onChange}>
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
                                    </>
                                }
                            </div>
                        </div>
                        <div className='flex flex-col xl:flex-row gap-x-4 w-full'>
                            {/* Image */}
                            <Card className='flex flex-col gap-4 border-none w-full xl:w-1/2 p-4 h-fit'>
                                {isLoading
                                    ? <>
                                        <div className='flex items-center justify-center w-full h-[300px] bg-primary-light-gray/20'>
                                            <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                                        </div>
                                        <div className='flex items-center justify-center w-full h-[300px] bg-primary-light-gray/20'>
                                            <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                                        </div>
                                        <div className='flex items-center justify-center w-full h-[300px] bg-primary-light-gray/20'>
                                            <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                                        </div>
                                        <div className='flex items-center justify-center w-full h-[300px] bg-primary-light-gray/20'>
                                            <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                                        </div>
                                    </>
                                    : <>
                                        <div className='flex items-center justify-center w-full bg-primary-light-gray/20'>
                                            <ImageUploader
                                                title='image'
                                                url={featuredImage}
                                                setUrl={setFeaturedImage}
                                                featuredImage={featuredImage}
                                            />
                                        </div>
                                        {picture &&
                                        <div className='flex items-center justify-center w-full bg-primary-light-gray/20'>
                                            <ImageUploader
                                                title='image'
                                                url={picture2}
                                                setUrl={setPicture2}
                                                position={2}
                                                setNewFeatured={swapImages}
                                                featuredImage={featuredImage}
                                            />
                                        </div>}
                                        {picture2 &&
                                        <div className='flex items-center justify-center w-full bg-primary-light-gray/20'>
                                            <ImageUploader
                                                title='image'
                                                url={picture3}
                                                setUrl={setPicture3}
                                                position={3}
                                                setNewFeatured={swapImages}
                                                featuredImage={featuredImage}
                                            />
                                        </div>}
                                        {picture3 &&
                                        <div className='flex items-center justify-center w-full bg-primary-light-gray/20'>
                                            <ImageUploader
                                                title='image'
                                                url={picture4}
                                                setUrl={setPicture4}
                                                position={4}
                                                setNewFeatured={swapImages}
                                                featuredImage={featuredImage}
                                            />
                                        </div>}
                                    </>
                                }
                            </Card>
                            <Card className='flex flex-col gap-4 bg-primary-light-gray/20 border-none w-full xl:w-1/2 p-4'>
                                <CardContent>
                                    <div className='flex flex-col gap-y-6 py-4'>
                                        {/* Name */}
                                        <div>
                                            <FormLabel>ID predmeta</FormLabel>
                                            <Input value={`${data ? formatData(data.id, 'ID') : '-'}`} readOnly disabled/>
                                        </div>
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Ime predmeta</FormLabel>
                                                    <FormControl>
                                                        {isLoading
                                                            ? <Skeleton className='w-full h-12' />
                                                            : <Input
                                                                defaultValue={data?.name}
                                                                placeholder="Vnesite ime predmeta"
                                                                autoComplete="name"
                                                                autoCorrect="off"
                                                                autoCapitalize='off'
                                                                {...field}
                                                            />
                                                        }
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {/* CategoryId */}
                                        {isLoading
                                            ? <Skeleton className='w-full h-12'/>
                                            : <FormField
                                                control={form.control}
                                                name="categoryId"
                                                defaultValue={data?.categoryId.toString()}
                                                render={({ field: { onChange, ...field } }) => (
                                                    <FormItem className='flex flex-col w-full'>
                                                        <FormLabel>Predmet</FormLabel>
                                                        <Select onValueChange={(value) => {
                                                            setCategoryId(parseInt(value))
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
                                        }
                                        {/* Characteristics */}
                                        {isLoading
                                            ? <div className='flex flex-col gap-2'>
                                                <Skeleton className='w-full h-4 ' />
                                                <Skeleton className='w-full h-12 ' />
                                            </div>
                                            : categoryId === null
                                                ? data?.characteristics.map(({ name, text, charId }, index) => (
                                                    name === 'Vrsta goriva'
                                                        ? <div key={charId} className='flex flex-col gap-2 w-full'>
                                                            <FormLabel>Gorivo {text}</FormLabel>
                                                            <Select onValueChange={(event) => handleInputChange(index, charId, event)}>
                                                                <SelectTrigger className='w-full'>
                                                                    <SelectValue placeholder={text} />
                                                                </SelectTrigger>
                                                                <SelectContent className='w-full z-[999]'>
                                                                    <SelectItem value={'Bencin'}>Bencin</SelectItem>
                                                                    <SelectItem value={'Dizel'}>Dizel</SelectItem>
                                                                    <SelectItem value={'Plin'}>Plin</SelectItem>
                                                                    <SelectItem value={'Plin / Bencin'}>Plin / Bencin</SelectItem>
                                                                    <SelectItem value={'Elektrika'}>Elektrika</SelectItem>
                                                                    <SelectItem value={'Bencin / Elektrika'}>Bencin / Elektrika</SelectItem>
                                                                    <SelectItem value={'Vodik'}>Vodik</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                        : <div key={index}>
                                                            <FormLabel>{name}</FormLabel>
                                                            <Input
                                                                defaultValue={text}
                                                                onChange={(event) => handleInputChange(index, charId, event)}
                                                            />
                                                        </div>))
                                                : <CharacteristicsForm
                                                    characteristics={characteristics}
                                                    onCharacteristicsChange={handleCharacteristicsChange}
                                                    categoryId={categoryId.toString()}
                                                />}
                                        {/* Price */}
                                        <FormField
                                            control={form.control}
                                            name="price"
                                            render={({ field: { onChange, ...field } }) => (
                                                <FormItem>
                                                    <FormLabel>Cena predmeta</FormLabel>
                                                    <FormControl>
                                                        <>
                                                            {isLoading
                                                                ? <Skeleton className='w-full h-12' />
                                                                : cena
                                                                    ? <Input
                                                                        min={1}
                                                                        value='Cena je po dogovoru'
                                                                        placeholder={'Cena je po dogovoru'}
                                                                        onKeyDown={allowOnlyNumbers}
                                                                        disabled={true}
                                                                    />
                                                                    : <DynamicNumber
                                                                        className= 'flex h-[45px] w-full rounded-none border border-primary-medium-gray bg-primary-white text-body-big-2 font-medium px-4 py-3 ring-offset-primary-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:font-normal placeholder:text-primary-medium-gray/50 focus-visible:placeholder:text-primary-medium-gray focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                                                                        separator={','}
                                                                        positive={true}
                                                                        negative={false}
                                                                        fraction={4}
                                                                        thousand={true}
                                                                        defaultValue={data?.price}
                                                                        {...field}
                                                                        onChange={(e, modelValue) => {
                                                                            // console.log(modelValue)
                                                                            // console.log(viewValue)
                                                                            // setQuantity((modelValue))
                                                                            onChange?.(modelValue)
                                                                        }}
                                                                    />
                                                            }
                                                            <div className='flex items-center'>
                                                                <Checkbox checked={cena} defaultChecked={data?.price === -1} onCheckedChange={(e) => {
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
                                                                                {data?.publishedAt
                                                                                    ? formatDate(data.publishedAt)
                                                                                    : 'DD-MM-YYYY'}
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
                                                                    date < new Date('1900-01-01')
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
                                                        {isLoading
                                                            ? <Skeleton className='w-full h-[140px]' />
                                                            : <Textarea
                                                                defaultValue={data?.description}
                                                                placeholder=''
                                                                autoComplete="off"
                                                                autoCorrect="off"
                                                                autoCapitalize='on'
                                                                className='h-[140px] resize-none'
                                                                {...field}
                                                            />
                                                        }
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
