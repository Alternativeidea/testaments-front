import { buttonVariants } from '@/components/ui/button'
import { getBanner } from '@/lib/services/banners'
import { cn } from '@/lib/utils/style'
import Link from 'next/link'

export default async function Banner() {
    // const { title, subtitle, image, cta, ctaLink }: BannerProps = await getBanner(1)
    const banner: BannerProps = await getBanner(1)

    return (
        banner.active && <div
            style={{ backgroundImage: `url(${banner.image})` }}
            className='flex px-6 py-11 bg-cover bg-bottom relative'
        >
            <div className='absolute inset-0 bg-gradient-to-r from-primary-dark-gray from-30% to-transparent' />
            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8 relative">
                <div className='flex flex-col gap-6'>
                    <span className='text-body-small font-bold text-primary-light-gray text-center md:text-start'>{banner.subtitle}</span>
                    <span
                        dangerouslySetInnerHTML={{ __html: banner.title }}
                        className={cn(
                            '!text-h5 md:!text-h4 font-chapaza text-primary-white text-center md:text-start',
                            '[&_span]:text-gradient-gold'
                        )}
                    />
                </div>
                <Link
                    href={banner.ctaLink}
                    className={cn(buttonVariants(), 'w-full md:w-fit')}
                >
                    <span className='leading-none translate-y-[0.15em]'>{banner.cta}</span>
                </Link>
            </div>
        </div>
    )
}
