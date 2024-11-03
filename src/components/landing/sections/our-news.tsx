import { Button } from '@/components/ui/button'
import NewsCard from '@/components/ui/news-card'

export default function OurNews() {
    return (
        <section className="flex w-full flex-col py-16 gap-y-12">
            <div className="flex justify-center lg:justify-between items-center">
                <h2 className="text-h5 lg:text-h1 font-baskerville">Naše novice</h2>
                <Button variant='light' className="w-fit hidden lg:block">
                Ostale novice
                </Button>
            </div>
            <div className='flex lg:flex-row gap-6'>
                <div className='hidden lg:flex'>
                    <NewsCard
                        image='/img/landing/news1.webp'
                        category='OPOROKE'
                        title='Ležarine: kaj so in kako se izogniti plačevanju visokih stroškov le-teh'
                        content='Ko se pogovarjamo o bančnih stroških, se večinoma osredotočamo na provizije, obresti in druge oblike stroškov, ki jih banke zaračunajo uporabnikom svojih …'
                    />
                </div>
                <div className='flex overflow-x-scroll lg:overflow-hidden lg:flex-row gap-6 w-screen lg:w-1/2 -mx-4 px-4 lg:px-0 lg:mx-0'>
                    <div className='lg:hidden'>
                        <NewsCard
                            image='/img/landing/news1.webp'
                            category='OPOROKE'
                            title='Ležarine: kaj so in kako se izogniti plačevanju visokih stroškov le-teh'
                            content='Ko se pogovarjamo o bančnih stroških, se večinoma osredotočamo na provizije, obresti in druge oblike stroškov, ki jih banke zaračunajo uporabnikom svojih …'
                        />
                    </div>
                    <NewsCard
                        image='/img/landing/news2.webp'
                        category='OPOROKE'
                        title='Ležarine: kaj so in kako se izogniti plačevanju visokih stroškov le-teh'
                    />
                    <NewsCard
                        image='/img/landing/news3.webp'
                        category='OPOROKE'
                        title='Ležarine: kaj so in kako se izogniti plačevanju visokih stroškov le-teh'
                    />
                </div>
            </div>
        </section>
    )
}
