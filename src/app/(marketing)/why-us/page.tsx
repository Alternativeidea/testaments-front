import HowToStart from '@/components/landing/sections/how-to-start'
import ImageHero from '@/components/landing/sections/image-hero'
import OfferYou from '@/components/landing/sections/offer-you'

export default function WhyUs() {
    return (
        <>
            <ImageHero
                title='Naša pomoč'
                content='Diskretni, profesionalni in zanesljivi na področjih urejanja oporok, hrambe v sefih ter ostale pravno-formalne obveznosti.'
                image='/img/landing/why.webp'
            />
            <div className='px-4 lg:px-44'>
                <OfferYou/>
            </div>
            <HowToStart />
        </>
    )
}
