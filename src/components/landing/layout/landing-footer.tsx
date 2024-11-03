import { Ilustrations } from '@/components/ui/ilustrations'
import { Separator } from '@/components/ui/separator'
import { footerLinks, headerLinks } from '@/lib/constants/landing'
import Link from 'next/link'

export default function LandingFooter() {
    return (
        <footer className="flex flex-col py-16 items-center justify-center gap-y-6 lg:gap-y-12">
            <Ilustrations.Imagotype className='max-w-[200px] lg:max-w-[360px]'/>
            <div className="flex gap-x-6 lg:gap-x-12">
                {headerLinks.map((link) =>
                    <Link key={link.name} href={`${link.url}`}>
                        <h3 className='lg:text-body-big-2'>{link.name}</h3>
                    </Link>
                )}
            </div>
            <Separator className='bg-primary-medium-gray'/>
            <div className='flex flex-col lg:flex-row lg:gap-6 items-center justify-center'>
                {footerLinks.map((link) =>
                    <div key={link.name} className='flex gap-x-6 items-center'>
                        <Link href={`${link.url}`}>
                            <h3 className='text-body-big-2'>{link.name}</h3>
                        </Link>
                        <Separator orientation='vertical' className='hidden lg:block bg-gradient-gold w-[2px] h-[90%]'/>
                    </div>
                )}
            </div>
        </footer>
    )
}
