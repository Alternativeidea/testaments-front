import SendVerificationCodeButton from '@/components/auth/send-verification-code-button'
import { buttonVariants } from '@/components/ui/button'
import { Ilustrations } from '@/components/ui/ilustrations'
import { cn } from '@/lib/utils/style'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Verification'
}

interface SignInVerificationPageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}

export default function ChangeEmailVerificationPage({ searchParams }: SignInVerificationPageProps) {
    return (
        <div className="mx-auto flex w-full h-full max-w-[627px] flex-col justify-center space-y-6 py-2 lg:py-0">
            {/* <div /> */}
            <div className='flex flex-col gap-6 md:gap-12'>
                <Link href='/' className="relative z-20 w-fit flex items-center gap-4 justify-center mx-auto">
                    <Ilustrations.Imagotype className='w-full max-w-44 lg:max-w-72 text-primary-dark-gray' />
                </Link>
                <div className='flex flex-col items-center [&_p]:text-center'>
                    <h1 className='text-h5 lg:text-h4 font-baskerville text-center mb-4 lg:mb-9'>Verificirajte svojo e-pošto</h1>
                    <p>Poslali smo vam e-mail za verifikacijo na</p>
                    <p className='font-medium text-primary-dark-gray mb-4'>{searchParams.email}</p>
                    <p>Preverite e-mail in sledite navodilom.</p>
                    <div className='bg-primary-light-gray/30 rounded-lg p-4 md:px-16 md:py-6 my-7 lg:my-14'>
                        <p>
                            Če e-pošte niste prejeli, poskusite preveriti mapo z vsiljeno pošto ali spremeniti e-poštni naslov. Če vam to ne pomaga, se obrnite na našo podporo na
                            <Link href='mailto:podpora@testament.si' className='font-medium'>{' '} podpora@testament.si</Link>
                        </p>
                    </div>
                    {/* <Button className='w-full max-w-[504px]'>
                        Ponovno pošljite e-mail
                    </Button> */}
                    <SendVerificationCodeButton />
                    <Link
                        prefetch={false}
                        href='/change-email'
                        className={cn(buttonVariants({ variant: 'light' }), 'w-full max-w-[504px]')}
                    >
                        Spremenite e-mail
                    </Link>
                </div>
            </div>
        </div>
    )
}
