import ResetPasswordForm from '@/components/auth/reset-password-form'
import { Ilustrations } from '@/components/ui/ilustrations'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Reset password'
}

export default function ResetPasswordPage() {
    return (
        <div className="mx-auto flex w-full h-full max-w-[504px] flex-col justify-center space-y-6">
            <div className='flex flex-col gap-10'>
                <Link href='/' className="relative z-20 w-fit flex items-center gap-4 justify-center mx-auto">
                    <Ilustrations.Imagotype className='w-full max-w-44 lg:max-w-72 text-primary-dark-gray' />
                </Link>
                <h1 className='text-h5 lg:text-h4 font-baskerville text-center'>Vpišite svoj e-mail naslov</h1>
                <ResetPasswordForm />
            </div>
        </div>
    )
}
