import ContactForm from '@/components/dashboard/contact/contact-form'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { Suspense } from 'react'

export default function ContactPage() {
    return (
        <>
            <h3 className="text-h5 lg:text-h4 lg:pb-12">Stopite v stik z nami</h3>
            <div className="flex flex-col-reverse lg:flex-row gap-y-12 w-full gap-x-6">
                <div className="flex flex-col gap-y-6 w-full lg:w-1/2">
                    <p>
                        Za vsa vprašanja, povpraševanja ali komentarje smo vam na voljo. Lahko nas kontaktirate direktno preko spodnjega kontaktnega formularja ali pa nas pokličete na našo telefonsko številko. Ne glede na način, kako se odločite stopiti v stik z nami, se bomo potrudili odgovoriti čim prej.
                    </p>
                    <Separator className="w-full bg-primary-light-gray h-[1px]" />
                    <div className='flex lg:flex-row flex-col-reverse w-full h-fit text-primary-medium-gray font-medium'>
                        <div className='flex lg:flex-col mx-auto w-[95%] items-start py-6 justify-between lg:justify-start gap-y-12'>
                            <div className='flex flex-col font-medium'>
                                <p>Email:</p>
                                <Link href={'mailto:info@testament.si'} className='font-normal'>
                                    info@testament.si
                                </Link>
                                <br/>
                                <p>Telefon:</p>
                                <Link href={'tel:+38651272100'} className='font-normal'>
                                    +38651272100
                                </Link>
                                <br/>
                                <div>TESTAMENT d.o.o.<br></br> Deteljica 8, 4290 Tržic</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex w-full lg:w-1/2 h-full'>
                    <Suspense>
                        <ContactForm/>
                    </Suspense>
                </div>
            </div>
        </>
    )
}
