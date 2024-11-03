'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { Icons } from '@/components/ui/icons'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from '@/components/ui/sheet'
import { useMediaQuery } from '@/lib/hooks/use-media-query'
import { cn } from '@/lib/utils/style'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Image1 from '../../../../public/img/will-contact-1.png'
import Image2 from '../../../../public/img/will-contact-2.png'
import Image3 from '../../../../public/img/will-contact-3.png'

interface NewWillContactDialogProps {
    text?: string
}

export function NewWillContactDialog({ text = 'Dodaj oporoko' }: NewWillContactDialogProps) {
    const [isOpen, setIsOpen] = useState(false)
    const isDesktop = useMediaQuery('(min-width: 768px)')

    if (isDesktop) {
        return <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>
                    <span className='flex items-center gap-4'>
                        <Icons.Plus />
                        <span className='leading-none '>{text}</span>
                    </span>
                </Button>
            </DialogTrigger>
            <DialogContent className='py-14 pl-16 pr-0 max-w-2xl z-[60]'>
                <DialogHeader className='flex-row space-y-0 gap-4'>
                    <DialogHeader className='text-left'>
                        <DialogTitle className='font-baskerville text-h6 font-normal leading-9'>Želite ustvariti oporoko? Tukaj smo, da vam pomagamo!</DialogTitle>
                        <DialogDescription className='space-y-12 !mt-12'>
                            <div className='text-body-small font-medium'>
                                <p>
                                Pisanje oporok v digitalni obliki v Sloveniji je trenutno urejeno z zakonodajo, vendar z določenimi omejitvami. Slovenija se sicer prilagaja evropskim smernicam in standardom, ki omogočajo večjo digitalizacijo pravnih postopkov, vendar popolna digitalizacija oporok še ni dosežena.
                                </p><br/>
                                <p>
                                Za veljavno digitalno oporoko je zato potrebno zagotoviti varnostne mehanizme, ki omogočajo preverjanje identitete oporočitelja, avtentičnost podpisa ter zanesljivost in varnost shranjevanja takšnih oporok.
                                </p><br/>
                                <p>
                                Glede na hitre tehnološke spremembe in prilagajanje zakonodaje v EU lahko v prihodnosti pričakujemo večjo fleksibilnost glede digitalnih oporok. Zaenkrat pa morajo tisti, ki želijo sestaviti oporoko v Sloveniji, slediti bolj tradicionalnim postopkom, pri čemer je pomembno, da se posvetujejo s pravnikom ali notarjem, da zagotovijo veljavnost oporoke.
                                </p><br/>
                                <p>
                                Testament.si na tem področju uvaja novost in vam zagotavlja izdelavo digitalne oporoke pod vodstvom naših specializiranih svetovalcev. Za zagotovitev vseh pravno formalnih predpisov in postopkov pa nad tem budno bdi skupina izkušenih pravnikov z dolgoletnimi izkušnjami in dokazljivimi uspehi na področju oporok in dedovanja.
                                </p>
                            </div>
                            {/* <li><b>Izkušnje:</b> Na področju priprave oporok delujemo že več kot 7 let.</li>
                                <li><b>Strokovnost:</b> Sodelujemo z izkušenimi odvetniki in notarji, ki skrbijo, da je vse zakonito urejeno.</li>
                                <li><b>Zaupanje:</b> Pomagali smo že več kot 1300 strankam pri ustvarjanju njihovih oporok.</li>
                                <li><b>Vodenje:</b> Kot glavni svetovalec vam zagotavljamo, da boste brez skrbi tako med življenjem kot po smrti.</li>
                                <li><b>Podpora:</b> Naša ekipa je vedno na voljo za vaša vprašanja in pomoč pri vseh korakih procesa</li> */}
                            {/* <ul className='list-disc text-body-small space-y-4 pl-6'>
                            </ul> */}
                            <div className='text-body-small font-bold'>
                                <p>Kontaktirajte nas in ustvarite svojo oporoko. Začnite zdaj in poskrbite, da bodo vaše želje vedno upoštevane!</p>
                            </div>
                            <Link
                                href='/namizje/pomoc?subject=Oporoke'
                                className={cn(buttonVariants())}
                            >
                                <span className='leading-none '>
                                    Kontaktirajte Nas
                                </span>
                            </Link>
                        </DialogDescription>
                    </DialogHeader>
                    <div className='min-w-fit flex items-center'>
                        <div className='relative'>
                            <Image src={Image1} alt='Image 1' width={157} className='absolute -top-[140px] right-0' />
                            <Image src={Image2} alt='Image 2' width={239} />
                            <Image src={Image3} alt='Image 3' width={182} className=' absolute -bottom-[178px] right-0'/>
                        </div>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    }

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild >
                <Button>
                    <span className='flex items-center gap-4'>
                        <Icons.Plus />
                        <span className='leading-none '>{text}</span>
                    </span>
                </Button>
            </SheetTrigger>
            <SheetContent className='w-full lg:!max-w-[420px] h-full bg-[#F1F1F1] p-0'>
                <ScrollArea
                    className={cn(
                        'w-full h-full',
                        '[&>div>div]:min-h-full [&>div>div]:!flex [&>div>div]:flex-col'
                    )}
                >
                    <div className={cn('flex flex-auto flex-col')}>
                        <SheetHeader className='flex items-start w-full px-7 pt-20 pb-10'>
                            <p className="text-h6 font-baskerville">Želite ustvariti oporoko? Tukaj smo, da vam pomagamo!</p>
                        </SheetHeader>
                        <SheetHeader className='flex items-start w-full bg-primary-white shadow-sheet-section px-7 pt-[52px]'>
                            <div className='flex flex-col gap-8'>
                                <ul className='list-disc text-body-small font-bold space-y-4 pl-6'>
                                    <p>
                                        Pisanje oporok v digitalni obliki v Sloveniji je trenutno urejeno z zakonodajo, vendar z določenimi omejitvami. Slovenija se sicer prilagaja evropskim smernicam in standardom, ki omogočajo večjo digitalizacijo pravnih postopkov, vendar popolna digitalizacija oporok še ni dosežena.
                                    </p><br/>
                                    <p>
                                        Za veljavno digitalno oporoko je zato potrebno zagotoviti varnostne mehanizme, ki omogočajo preverjanje identitete oporočitelja, avtentičnost podpisa ter zanesljivost in varnost shranjevanja takšnih oporok.
                                    </p><br/>
                                    <p>
                                        Glede na hitre tehnološke spremembe in prilagajanje zakonodaje v EU lahko v prihodnosti pričakujemo večjo fleksibilnost glede digitalnih oporok. Zaenkrat pa morajo tisti, ki želijo sestaviti oporoko v Sloveniji, slediti bolj tradicionalnim postopkom, pri čemer je pomembno, da se posvetujejo s pravnikom ali notarjem, da zagotovijo veljavnost oporoke.
                                    </p><br/>
                                    <p>
                                        Testament.si na tem področju uvaja novost in vam zagotavlja izdelavo digitalne oporoke pod vodstvom naših specializiranih svetovalcev. Za zagotovitev vseh pravno formalnih predpisov in postopkov pa nad tem budno bdi skupina izkušenih pravnikov z dolgoletnimi izkušnjami in dokazljivimi uspehi na področju oporok in dedovanja.
                                    </p>
                                </ul>
                                <div className='text-body-small font-bold'>
                                    <p>Kontaktirajte nas in ustvarite svojo oporoko. Začnite zdaj in poskrbite, da bodo vaše želje vedno upoštevane!</p>
                                    {/* <p>Kontaktirajte nas in ustvarite svojo oporoko.</p>
                                    <p>Začnite zdaj in poskrbite, da bodo vaše želje vedno upoštevane!</p> */}
                                </div>
                                <div className='flex justify-center items-center'>
                                    <div className='relative'>
                                        <Image src={Image1} alt='Image 1' width={157} className='absolute bottom-0 right-[-140px] rounded-t-2xl rounded-br-2xl' />
                                        <Image src={Image2} alt='Image 2' width={239} className='relative rounded-t-2xl'/>
                                        <Image src={Image3} alt='Image 3' width={182} className=' absolute bottom-0 left-[-140px] rounded-t-2xl'/>
                                    </div>
                                </div>
                            </div>
                        </SheetHeader>
                        <SheetFooter className='flex items-center justify-center w-full bg-primary-white px-6 py-4 mt-auto'>
                            <Link
                                href='/namizje/pomoc?subject=Oporoke'
                                className={cn(buttonVariants(), 'w-full')}
                            >
                                <span className='leading-none '>
                                    Kontaktirajte Nas
                                </span>
                            </Link>
                        </SheetFooter>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}
