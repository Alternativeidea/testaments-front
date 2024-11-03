import { Ilustrations } from '@/components/ui/ilustrations'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Verification Resent'
}

export default function SignInVerificationResentPage() {
    return (
        <div className="mx-auto flex w-full h-full max-w-[627px] flex-col justify-center space-y-6 py-2 lg:py-0">
            {/* <div /> */}
            <div className='flex flex-col gap-6'>
                <Link href='/' className="relative z-20 w-fit flex items-center gap-4 justify-center mx-auto">
                    <Ilustrations.Email className='w-full max-w-24 lg:max-w-40 h-[95px] lg:h-[145px] text-primary-dark-gray' />
                </Link>
                <div className='flex flex-col items-center [&_p]:text-center'>
                    <h1 className='text-h5 font-baskerville text-center mb-4 lg:mb-9'>Verifikacijski e-mail poslan</h1>
                    <p className='text-body-big-2'>Ponovno vam smo vam e-mail za verifikacijo na</p>
                    <p className='font-medium !text-body-big-2 text-primary-dark-gray mb-4'>janez.novak@gmail.com</p>
                    <p className='text-body-big-2'>Preverite e-mail in sledite navodilom.</p>
                    <div className='bg-primary-light-gray/30 rounded-lg p-4 md:px-16 md:py-6 my-7 lg:my-14'>
                        <p className='text-body-small'>
                        Če e-pošte niste prejeli, poskusite preveriti mapo z neželeno pošto ali spremeniti e-pošto. Če vam to ne pomaga, se obrnite na našo podporo na
                            <span className='font-medium'>{' '} pomoc@testamenti.si</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
