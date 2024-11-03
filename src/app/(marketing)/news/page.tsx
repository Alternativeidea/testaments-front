import ImageHero from '@/components/landing/sections/image-hero'
import OurNews from '@/components/landing/sections/our-news'

export default function News() {
    return (
        <>
            <ImageHero
                title='Zasebni arhiv'
                content='Diskretni, profesionalni in zanesljivi na področjih urejanja oporok, hrambe v sefih ter ostale pravno-formalne obveznosti.'
                image='/img/landing/news.webp'
                className='h-screen pt-16 bg-gradient-hero'
            />
            <div className='px-6 lg:px-44'>
                <OurNews/>
            </div>
        </>
    )
}
