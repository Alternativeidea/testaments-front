import GoldText from '@/components/landing/sections/gold-text'
import ImageHero from '@/components/landing/sections/image-hero'
import WhoAreWe from '@/components/landing/sections/who-are-we'
import BenefitsNumber from '@/components/landing/ui/benefits-number'

export default function About() {
    const numbers = [
        {
            number: '11+',
            title: 'Let izkušenj'
        },
        {
            number: '267+',
            title: 'Narejenih oporok'
        },
        {
            number: '412+',
            title: 'Zadovoljnih strank'
        }
    ]
    return (
        <>
            <ImageHero
                title='O nas'
                content='Diskretni, profesionalni in zanesljivi na področjih urejanja oporok, hrambe v sefih ter ostale pravno-formalne obveznosti.'
                image='/img/landing/about.webp'
            >
                <>

                    {numbers.map((number, index) =>
                        <div key={index} className='border-b-2 border-primary-medium-gray'>
                            <BenefitsNumber
                                number={number.number}
                                title={number.title}
                                titleStyles='!text-primary-light-gray'
                            />
                        </div>
                    )}
                </>
            </ImageHero>
            <WhoAreWe/>
            <GoldText content='“Pri TESTAMENT.SI smo tu, da vam stojimo ob strani in vam pomagamo pri najpomembnejših odločitvah v življenju.”'/>
        </>
    )
}
