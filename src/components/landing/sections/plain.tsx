import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import BenefitsText from '../ui/benefits-text'

export default function Plain() {
    const benefitTexts = [
        {
            number: '01',
            title: 'Načrtovanje Dediščine',
            content: 'Verjetno ste prišli do točke svojega življenja, kjer ste pripravljeni deliti, hraniti ali zapustiti svoje premoženje tistim, ki Vam pomenijo največ.'
        },
        {
            number: '02',
            title: 'Priprava na Dedovanje',
            content: 'Nemški pregovor pravi, da smrt in dediščina prinašata veliko skrbi. Vendar z pravo pripravo, razumevanjem in podporo lahko te skrbi preoblikujemo v jasnost, mir in gotovost za naše ljubljene.'
        },
        {
            number: '03',
            title: 'Izogibanje Pravnim Sporom',
            content: 'Žal se danes pogosto dogaja, da se dediči vrsto let srečujejo na sodišču, ker zapustnik ni naredil oporoke ali pa je smrt bila nenadna.'
        },
        {
            number: '04',
            title: 'Breme Nerazkrite Zapuščine',
            content: 'Zapustnik tako kljub svojemu premoženju naredi veliko breme svojcem, ker jih nihče ni obvestil o zapuščini, ki jo je zapustnik vzporedno shranjeval na neznanih področjih. '
        }
    ]
    return (
        <section className="flex flex-col w-full lg:h-screen bg-primary-white lg: py-16">
            <div className="flex flex-col lg:flex-row w-full pb-8 lg:pb-16">
                <div className="flex flex-col lg:w-2/3 items-start justify-center">
                    <h3 className="text-h5 lg:text-h2">Spoštovani obiskovalec</h3>
                    <h4 className="text-h5 lg:text-h3">Spletnega portala testament.si</h4>
                </div>
                <div className="flex flex-col lg:w-1/3 lg:items-end justify-center lg:text-right">
                    <p>Urejanje in varnost vaše zapuščine postaneta preprosta z testament.si. Naj bo vaša dediščina izraz vaše skrbi za ljubljene.</p>
                </div>
            </div>
            <Separator className='!bg-primary-medium-gray' />
            <div className="flex w-full pb-16">
                <div className="flex w-full lg:w-1/2 flex-col gap-8 py-16">
                    {benefitTexts.map((item) =>
                        <BenefitsText
                            key={item.number}
                            number={item.number}
                            title={item.title}
                            content={item.content}
                            isInactive={item.number !== '01'}
                        />
                    )}
                </div>
                <div className="hidden lg:flex w-1/2 items-center justify-center py-16 relative">
                    <Image src={'/img/landing/plain-image.webp'} fill alt='plain' className='absolute max-w-[600px] object-contain mr-0 ml-auto' />
                </div>
            </div>
        </section>
    )
}
