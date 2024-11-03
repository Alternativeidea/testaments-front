import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { SECTION_HOME } from '@/lib/constants/sections'
import { getAdminBanners, getAdminMessages } from '@/lib/services/admin/banners'
import Image from 'next/image'
import EditBannerSheet from './edit-banner-sheet'
import EditSheet from './edit-sheet'
import SwitchButton from './switch-button'

export default async function GeneralConfig() {
    const data = await getAdminMessages(`?section=${SECTION_HOME}`)
    const message = data[0]
    const bannerData = await getAdminBanners(`?section=${SECTION_HOME}`)
    const banner = bannerData[0]

    return (
        <section className="flex flex-col gap-y-4 py-6 w-full">
            <div className="flex flex-col gap-2 md:flex-row w-full justify-center md:justify-between items-center">
                <h3 className="text-h6 font-baskerville">Naslovno sporočilo</h3>
                <SwitchButton active={message.active} id={message.id} />
            </div>
            <Card className='flex flex-col items-center gap-x-3 bg-primary-light-gray/20 p-6 border-none w-full'>
                <div className="flex flex-col gap-2 lg:flex-row w-full justify-center lg:justify-between items-start py-2">
                    <p className='font-baskerville text-h6'>
                        {message.title}
                    </p>
                    <Sheet>
                        <SheetTrigger>
                            <p className='text-gradient-gold text-h6 font-baskerville'>Uredi</p>
                        </SheetTrigger>
                        <SheetContent className='w-full lg:!max-w-[420px] h-full p-0'>
                            <EditSheet id={message.id} title={message.title} content={message.content}/>
                        </SheetContent>
                    </Sheet>
                </div>
                <div className='w-full'>
                    {message.content}
                </div>
            </Card>
            <div className="flex flex-col gap-2 md:flex-row w-full justify-center md:justify-between items-center">
                <h3 className="text-h6 font-baskerville">Banner slika</h3>
                <SwitchButton active={banner.active} id={banner.id} banner={true}/>
            </div>
            <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between w-full bg-primary-dark-gray p-6 gap-y-36 relative'>
                <Image src={banner.image} alt='banner-image' fill className='w-full object-cover absolute z-0'/>
                <div className='flex flex-col gap-y-4 items-start text-primary-white z-10'>
                    <p>{banner.subtitle}</p>
                    <h3 className='text-h4 font-baskerville'>
                        <div className="[&>span]:text-gradient-gold" dangerouslySetInnerHTML={{ __html: banner.title }}/>
                    </h3>
                </div>
                <Button className='z-10'>
                    {banner.cta}
                </Button>
            </div>
            <div className='flex flex-col gap-2 w-full'>
                <Label>Povezava pelje na</Label>
                <div className='flex flex-col md:flex-row gap-2 w-full'>
                    <Input
                        defaultValue={banner.ctaLink}
                        placeholder='url'
                    />
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button>
                        Naloži / Uredi
                            </Button>
                        </SheetTrigger>
                        <SheetContent className='w-full lg:!max-w-[420px] h-full p-0'>
                            <EditBannerSheet
                                id={banner.id}
                                title={banner.title}
                                subtitle={banner.subtitle}
                                ctaLink={banner.ctaLink}
                            />
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </section>
    )
}
