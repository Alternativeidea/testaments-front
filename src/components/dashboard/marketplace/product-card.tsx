'use client'
// Components
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Icons } from '@/components/ui/icons'
import { Ilustrations } from '@/components/ui/ilustrations'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from '@/components/ui/sheet'
import { Heart, Search } from 'lucide-react'
import Image from 'next/image'
import { BenefitBlockItem, BenefitBlockItems } from '../home/benefit-block'
// Utils
import { addToWishlist, createOrder } from '@/lib/services/products'
import { cn } from '@/lib/utils/style'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

interface ProductCardProps {
    product: ProductProps
    membershipId: string
    isPFeatured: boolean
}

export function ProductCard({ product: { id, category, name, description, characteristics, isFeatured, price, picture, picture2, picture3, picture4, wishlist, interest }, membershipId, isPFeatured }: ProductCardProps) {
    const [favorite, setFavorite] = useState(wishlist)
    const [openSheet, setOpenSheet] = useState(false)
    const { refresh } = useRouter()

    async function handleClick() {
        try {
            setFavorite(!favorite)
            await addToWishlist(id)
            refresh()
        } catch (error) {
            setFavorite(wishlist)
            if (error instanceof Error) {
                toast.error('Nekaj je šlo narobe.', {
                    description: JSON.parse(error.message).message
                })
            }
        }
    }

    return (
        <>
            <Card className='flex w-full flex-col border-none bg-primary-light-gray/20 @container'>
                <CardHeader className='aspect-video w-full px-6 py-4'>
                    <div className='relative h-full w-full'>
                        {isFeatured
                            ? <CardBadge title='Novo' className='absolute left-2 top-2 z-20' />
                            : null}
                        <CardBadge title={
                            (price === -1)
                                ? 'Cena je po dogovoru'
                                : `${price.toLocaleString('sl-SI')} EUR`} className='absolute right-2 top-2 z-20 font-bold' />
                        {interest && (
                            <CardBadge
                                title='Oddano zanimanje'
                                className='absolute bottom-2 right-2 z-20 bg-gradient-gold text-body-small font-bold capitalize text-primary-white'
                            />
                        )}
                        <Image src={picture} alt={picture} fill className='cursor-pointer object-cover' onClick={() => setOpenSheet(true)}/>
                    </div>
                </CardHeader>
                <CardContent className='flex flex-auto flex-col'>
                    <div className='flex flex-col'>
                        {/* <div className='h-32 @[500px]:h-36 mb-4'> */}
                        <div className='@[500px]:h-36 h-fit mb-4'>
                            <div className='flex w-full items-center justify-between py-2'>
                                <p className='text-body-medium uppercase'>{category.name}</p>
                                <Button
                                    onClick={handleClick}
                                    variant='light'
                                    disabled={membershipId === 'PLAN_FREE'}
                                    className='h-fit border-none !bg-transparent !p-0'>
                                    <Heart
                                        className={cn(
                                            'w-5 h-5 stroke-primary-dark-gray',
                                            favorite && 'fill-primary-dark-gray'
                                        )}
                                    />
                                </Button>
                            </div>
                            <p className={`line-clamp-1 overflow-ellipsis font-baskerville ${isPFeatured ? 'text-h5 leading-relaxed' : 'text-h6 leading-[1.725]'}`}>{name}</p>
                            <p className='line-clamp-2 mb-2 overflow-ellipsis text-body-medium'>{description.substring(0, 240)}</p>
                        </div>
                        {characteristics && (
                            <BenefitBlockItems>
                                {characteristics.map((item) =>
                                    <BenefitBlockItem
                                        className='w-full'
                                        key={item.text}
                                        text={item.text}
                                        image={item.icon}
                                    />
                                )}
                            </BenefitBlockItems>
                        )}
                    </div>
                </CardContent>
                <CardFooter className='px-4 py-0'>
                    <ProductDetails
                        product={{
                            id,
                            name,
                            description,
                            characteristics,
                            price,
                            picture,
                            picture2,
                            picture3,
                            picture4,
                            category,
                            wishlist,
                            interest
                        }}
                        membershipId={membershipId}
                        setOpenSheet={setOpenSheet}
                        openSheet={openSheet}
                        favorite={favorite}
                        setFavorite={setFavorite}
                    />
                </CardFooter>
            </Card>
        </>
    )
}

interface ProductDetailsProps {
    product: Partial<ProductProps>
    membershipId: string
    openSheet: boolean
    setOpenSheet: (v: boolean) => void
    favorite: boolean
    setFavorite: (v: boolean) => void
}

function ProductDetails({ product: { id, category, name, description, characteristics, price, picture, picture2, picture3, picture4, wishlist, interest }, favorite, setFavorite, openSheet, setOpenSheet, membershipId }: ProductDetailsProps) {
    const [control, setControl] = useState(false)
    const [isLoadingOrder, setIsLoadingOrder] = useState(false)
    const { refresh } = useRouter()
    const [open, setOpen] = useState(false)
    const slides = []

    if (picture) {
        slides.push({ src: picture })
    }
    if (picture2) {
        slides.push({ src: picture2 })
    }
    if (picture3) {
        slides.push({ src: picture3 })
    }
    if (picture4) {
        slides.push({ src: picture4 })
    }

    async function handleClickFavorite() {
        try {
            setFavorite(!favorite)
            await addToWishlist(id || 0)
            refresh()
        } catch (error) {
            setFavorite(wishlist || false)
            if (error instanceof Error) {
                toast.error('Nekaj je šlo narobe.', {
                    description: JSON.parse(error.message).message
                })
            }
        }
    }

    async function handleClickOrder() {
        try {
            setIsLoadingOrder(true)
            await createOrder({
                products: [
                    {
                        id,
                        quantity: 1
                    }
                ]
            })
            setControl(true)
            refresh()
        } catch (error) {
            if (error instanceof Error) {
                toast.error('Nekaj je šlo narobe.', {
                    description: JSON.parse(error.message).message
                })
            }
        } finally {
            setIsLoadingOrder(false)
        }
    }

    function handleOpenChange(isOpen: boolean) {
        if (isOpen === false) {
            setControl(false)
            setOpenSheet(false)
        }
    }

    return (
        <>
            <Lightbox
                open={open}
                close={() => setOpen(false)}
                slides={slides}
            />
            <Sheet open={openSheet && membershipId !== 'PLAN_FREE'} onOpenChange={handleOpenChange}>
                <SheetTrigger onClick={() => setOpenSheet(membershipId !== 'PLAN_FREE')} className='flex items-start gap-x-4 p-2 font-baskerville text-h6'>
                    Zanima me
                    <Icons.ArrowRight className='h-4' />
                </SheetTrigger>
                <SheetContent className='h-full w-full p-0 lg:!max-w-[420px]'>
                    <ScrollArea
                        className={cn(
                            'w-full h-full',
                            '[&>div>div]:min-h-full [&>div>div]:!flex [&>div>div]:flex-col'
                        )}
                    >
                        <div className='flex flex-auto flex-col'>
                            {control
                                ? <SuccessScreen />
                                : <>
                                    <SheetHeader className='p-6 py-8 font-baskerville text-h5 shadow-box'>
                                        {name}
                                    </SheetHeader>
                                    <div className='flex w-full flex-col'>
                                        <div className='group relative'>
                                            <span
                                                onClick={() => setOpen(true)}
                                                className='absolute z-10 hidden h-full w-full cursor-pointer items-center justify-center bg-primary-dark-gray/80 group-hover:flex'>
                                                <Search className='rotate-90 text-primary-white' size={60}/>
                                            </span>
                                            <div className='relative h-[220px] w-full' onClick={() => setOpen(true)}>
                                                <Image src={picture || ''} alt={name || ''} fill className='w-full object-cover'/>
                                            </div>
                                            {picture2 &&
                                                <div className='grid h-[120px] grid-flow-col' onClick={() => setOpen(true)}>
                                                    <div className='relative'>
                                                        <Image src={picture2} alt={picture2} fill className='object-cover'/>
                                                    </div>
                                                    {picture3 &&
                                                    <div className='relative'>
                                                        <Image src={picture3} alt={picture3} fill className='object-cover'/>
                                                    </div>}
                                                    {picture4 &&
                                                    <div className='relative'>
                                                        <Image src={picture4} alt={picture4} fill className='object-cover'/>
                                                    </div>}
                                                </div>}
                                        </div>
                                        <div className='p-4'>
                                            <div className='flex w-full items-center justify-between pb-2'>
                                                <p className='text-body-small font-medium uppercase'>{category?.name}</p>
                                                <Button
                                                    onClick={handleClickFavorite}
                                                    variant='light'
                                                    className='h-fit border-none !bg-transparent !p-0'>
                                                    <Heart
                                                        className={cn(
                                                            'w-5 h-5 stroke-primary-dark-gray',
                                                            favorite && 'fill-primary-dark-gray'
                                                        )}
                                                    />
                                                </Button>
                                            </div>
                                            <p className='line-clamp-1 h-8 overflow-ellipsis font-baskerville text-h6'>{name}</p>
                                            <p className='text-body-small font-semibold uppercase'>{ `${(price === -1) ? 'Cena je po dogovoru' : (price?.toLocaleString('sl-SI') + ' EUR')}`}</p>
                                            <p className='mb-2 mt-4 overflow-ellipsis text-body-small'>{description}</p>
                                            {characteristics && (
                                                <BenefitBlockItems>
                                                    {characteristics.map((item) =>
                                                        <BenefitBlockItem
                                                            className='w-full'
                                                            key={item.text}
                                                            text={item.text}
                                                            image={item.icon}
                                                        />
                                                    )}
                                                </BenefitBlockItems>
                                            )}
                                        </div>
                                    </div>
                                    <SheetFooter className='mt-auto flex w-full p-6'>
                                        <Button
                                            onClick={handleClickOrder}
                                            className='w-full'
                                            disabled={interest || isLoadingOrder}
                                        >
                                            <span className='flex items-center gap-[10px]'>
                                                {isLoadingOrder && (
                                                    <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                                                )}
                                                <span className='leading-none'>Oddaj zanimanje</span>
                                            </span>
                                        </Button>
                                    </SheetFooter>
                                </>
                            }
                        </div>
                    </ScrollArea>
                </SheetContent>
            </Sheet>
        </>
    )
}

function SuccessScreen() {
    return (
        <div className='flex w-full flex-auto flex-col justify-between py-6'>
            <div className='flex w-full flex-auto flex-col items-center justify-center gap-y-6'>
                <Ilustrations.Wallet />
                <h3 className='font-baskerville text-h5'>Vaš zahtevek je oddan!</h3>
                <div className='flex flex-col items-center justify-center gap-y-4 px-6 text-center text-body-medium'>
                    <p>Spoštovani,</p>
                    <p>Zahvaljujemo se vam, ker ste izrazili zanimanje za naš izdelek na Tržnici.</p>
                    <p>Naša ekipa bo pregledala zahtevo in kmalu stopila v stik z vami.</p>
                    <p>Pričakujte, da vas bomo kontaktirali po telefonu in preko e-pošte, da bomo lahko podrobneje razpravljali o vašem zanimanju in odgovorili na morebitna vprašanja.</p>
                </div>
            </div>
            <SheetFooter className='mt-auto flex w-full items-center justify-center bg-primary-white px-6 py-4'>
                <SheetClose asChild >
                    <Button className='w-full'>
                        Končaj
                    </Button>
                </SheetClose>
            </SheetFooter>
        </div>
    )
}

function CardBadge({ title, className }: { title: string, className?: string }) {
    return (
        <div className={`${className} flex bg-primary-light-gray items-center justify-center px-2 py-1 uppercase`}>
            {title}
        </div>
    )
}
