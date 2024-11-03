import { buttonVariants } from '@/components/ui/button'
import { Ilustrations } from '@/components/ui/ilustrations'
import { cn } from '@/lib/utils/style'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Verification Resent'
}

export default function SignInVerificationResentPage() {
    return (
        <div className="mx-auto flex w-full h-full max-w-[624px] flex-col justify-center space-y-6 py-2 lg:py-0">
            {/* <div /> */}
            <div className='flex flex-col gap-6'>
                <Link
                    prefetch={false}
                    href='/' className="relative z-20 w-fit flex items-center gap-4 justify-center mx-auto">
                    <Ilustrations.Login className='w-full max-w-24 lg:max-w-40 h-[95px] lg:h-[145px] text-primary-dark-gray' />
                </Link>
                <div className='flex flex-col items-center [&_p]:text-center'>
                    <h1 className='text-h5 lg:text-h4 font-baskerville text-center mb-4 lg:mb-9'>Registracija uspešna!</h1>
                    <p className='text-body-big-2 mb-4'>Vaša registracija je zaključena. Sedaj lahko vstopite v svojo spletno pisarno.</p>
                    <Link
                        prefetch={false}
                        href='/namizje/domov'
                        className={cn(buttonVariants(), 'w-full max-w-[504px] mt-14 mb-4')}
                    >
                        Vstopite
                    </Link>
                </div>
            </div>
        </div>
    )
}
