import { buttonVariants } from '@/components/ui/button'
import { Ilustrations } from '@/components/ui/ilustrations'
import { cn } from '@/lib/utils/style'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Success'
}

export default function ResetPasswordSuccessPage() {
    return (
        <div className="mx-auto flex w-full h-full max-w-[633px] flex-col justify-center space-y-6 py-2 lg:py-0">
            <div className='flex flex-col gap-6'>
                <Link href='/' className="relative z-20 w-fit flex items-center gap-4 justify-center mx-auto">
                    <Ilustrations.Password className='w-full max-w-24 lg:max-w-40 h-[95px] lg:h-[145px] text-primary-dark-gray' />
                </Link>
                <div className='flex flex-col items-center [&_p]:text-center'>
                    <h1 className='text-h5 lg:text-h4 font-baskerville text-center mb-4 lg:mb-7'>Uspelo Vam je!</h1>
                    <p className='mb-10'>Uspešno ste zamenjali svoje geslo.</p>
                    <Link href='/prijava' className={cn(buttonVariants(), 'w-full max-w-[504px]')}>
                        Vpiši se
                    </Link>
                </div>
            </div>
        </div>
    )
}
