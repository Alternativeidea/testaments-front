import { Button } from '@/components/ui/button'
import { Ilustrations } from '@/components/ui/ilustrations'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Verification'
}

export default function SignInVerificationPage() {
    return (
        <div className="mx-auto flex h-full md:max-w-[627px] flex-col justify-center space-y-6 py-2 lg:py-0">
            {/* <div /> */}
            <div className='flex flex-col gap-6 md:gap-12'>
                <Link href='/' className="relative z-20 w-fit flex items-center gap-4 justify-center mx-auto">
                    <Ilustrations.Imagotype className='w-full max-w-44 lg:max-w-72 text-primary-dark-gray' />
                </Link>
                <div className='flex flex-col items-center [&_p]:text-center'>
                    <h1 className='text-h5 lg:text-h4 font-baskerville text-center px-6 mb-4 lg:mb-9'>Verificirajte svojo e-pošto</h1>
                    <p className='text-body-big-2'>Poslali smo vam e-mail za verifikacijo na</p>
                    <p className='font-medium md:!text-body-big-2 text-primary-dark-gray mb-4'>janez.novak@gmail.com</p>
                    <p className='text-body-big-2'>Preverite e-mail in sledite navodilom.</p>
                    <div className='bg-primary-light-gray/30 rounded-lg p-3 md:p-4 md:px-16 md:py-6 my-7 lg:my-14'>
                        <p className='text-body-small'>
                            Če e-pošte niste prejeli, poskusite preveriti mapo z neželeno pošto ali spremeniti e-pošto. Če vam to ne pomaga, se obrnite na našo podporo na
                            <span className='font-medium'>{' '} podpora@testament.si</span>
                        </p>
                    </div>
                    <Button className='w-full max-w-[504px]'>
                        <p className=' text-body-medium md:text-body-big'>Ponovno pošljite e-mail</p>
                    </Button>
                </div>
            </div>
        </div>
    )
}