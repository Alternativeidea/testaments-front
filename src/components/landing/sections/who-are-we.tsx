import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'

export default function WhoAreWe() {
    const texts = [
        {
            title: 'Naša vizija',
            content: ' TESTAMENT.SI je bil ustanovljen z vizijo, da bi ljudem ponudil mir v časih, ko je najbolj potreben. Vemo, da je razmišljanje o lastni smrti težko, vendar je prav tako pomembno, da naše želje in premoženje ostanejo urejeni ter da se ljubljenim osebam olajša proces žalovanja.'
        },
        {
            title: 'Naša ekipa',
            content: 'Naša ekipa strokovnjakov iz različnih področij – prava, financ, tehnologije in psihologije – nenehno dela na izboljšavah naših storitev, da bi vam ponudili najboljšo možno izkušnjo.'
        },
        {
            title: 'Naše poslanstvo',
            content: 'Naše poslanstvo je, da digitaliziramo in poenostavimo proces priprave in upravljanja zapuščine. S kombinacijo tehnologije in človeške empatije želimo premostiti vrzel med tradicionalnimi metodami upravljanja zapuščine in sodobnimi potrebami družbe.'
        },
        {
            title: 'Naše vrednote',
            content: 'Naše vodilo je transparentnost, zasebnost in spoštovanje vaših želja. Vse, kar počnemo, je osredotočeno na zagotavljanje, da so vaše poslednje želje razumljene in izpolnjene.'
        }
    ]
    return (
        <section className="flex flex-col px-6 lg:px-44 py-6 lg:pt-16">
            <div className="flex justify-between items-center py-12">
                <h2 className="text-h5 lg:text-h1 font-baskerville">Kdo smo?</h2>
                <Button variant={'light'} className="w-fit hidden lg:flex">Kontaktirajte nas</Button>
            </div>
            <Separator className='bg-primary-medium-gray'/>
            <div className='w-full flex pt-16'>
                <div className='w-full lg:w-1/2 flex flex-col gap-y-6'>
                    {texts.map((item) =>
                        <div key={item.title} className='flex flex-col gap-4 max-w-xl group'>
                            <h3 className='lg:text-primary-light-gray group-hover:text-gradient-gold text-gradient-gold text-h5 font-baskerville'>
                                {item.title}
                            </h3>
                            <p className='lg:text-primary-light-gray group-hover:text-primary-medium-gray'>
                                {item.content}
                            </p>
                        </div>
                    )}
                </div>
                <div className='hidden w-1/2 h-full px-24 py-12 lg:flex items-center justify-center'>
                    <div className='w-full h-[600px] relative'>
                        <Image src={'/img/landing/plain-image.webp'} fill alt='image' className='absoluet w-full h-full'/>
                    </div>
                </div>
            </div>
        </section>
    )
}
