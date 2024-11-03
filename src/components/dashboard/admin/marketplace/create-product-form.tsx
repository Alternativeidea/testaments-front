'use client'
// React
import { useForm } from 'react-hook-form'
// Components
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Icons } from '@/components/ui/icons'
import ImageUploader from '@/components/ui/image-uploader'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/text-area'
// Utils
import { characteristics } from '@/lib/constants/characteristics'
import { CreateProductSchema } from '@/lib/schemas/products'
import { createProduct } from '@/lib/services/admin/products'
import { allowOnlyNumbers, preventWheel } from '@/lib/utils/form'
import { cn } from '@/lib/utils/style'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { useState } from 'react'
import { toast } from 'sonner'
import * as z from 'zod'
import CharacteristicsForm from './characteristics-form'

export default function CreateProductForm() {
    const [picture, setPicture] = useState<string | null>(null)
    const [categoryId, setCategoryId] = useState<string | null>(null)
    const [updatedCharacteristics, setUpdatedCharacteristics] = useState<Characteristic[]>([])
    const form = useForm<z.infer<typeof CreateProductSchema>>({
        resolver: zodResolver(CreateProductSchema)
    })

    async function handleSubmit(data: z.infer<typeof CreateProductSchema>) {
        const payload = {
            ...data,
            ...((picture !== null) && { picture }),
            ...(data.publishedAt && { publishedAt: format(new Date(data.publishedAt), 'yyyy-MM-dd') }),
            characteristics: updatedCharacteristics
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
        <Card className='w-full border-none'>
            <CardHeader className='flex shadow-dashboard-header'>
                <CardTitle className='text-h6 pt-6 font-baskerville font-normal'>
                Dodaj nov predmet
                </CardTitle>
            </CardHeader>
            <CardContent className='min-h-full overflow-y-scroll'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-6 w-full min-h-full'>
                        <div className='flex flex-col py-6 gap-6'>
                            {/* Status */}
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem className='flex flex-col w-full'>
                                        <FormLabel>Stanje</FormLabel>
                                        <Select onValueChange={field.onChange}>
                                            <SelectTrigger className='w-full'>
                                                <SelectValue placeholder='Status' />
                                            </SelectTrigger>
                                            <SelectContent className='z-[999] w-full'>
                                                <SelectItem value="0">Neaktiven</SelectItem>
                                                <SelectItem value="1">Aktiven</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Name */}
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Ime predmeta</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Ime"
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
                                                <SelectItem value={'4'}>Poslovni modeli</SelectItem>
                                                <SelectItem value={'5'}>Zlatnina/Nakit</SelectItem>
                                                <SelectItem value={'6'}>Umetnine</SelectItem>
                                                <SelectItem value={'7'}>Zemljišče</SelectItem>
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
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Cena predmeta</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='number'
                                                min={1}
                                                onWheel={preventWheel}
                                                onScroll={preventWheel}
                                                onKeyDown={allowOnlyNumbers}
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
                            {/* Image */}
                            <Card className='flex flex-col gap-4 border-none w-full h-fit'>
                                <p className='text-body-big font-baskerville'>Dodaj sliko predmeta</p>
                                <ImageUploader
                                    title='picture'
                                    url={picture}
                                    setUrl={setPicture}
                                />
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
            </CardContent>
        </Card>
    )
}
