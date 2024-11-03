import RegisterForm from '@/components/auth/register-form'
import { Ilustrations } from '@/components/ui/ilustrations'
import { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'

export const metadata: Metadata = {
    title: 'Sign Up'
}

export default function SignUpPage() {
    return (
        <div className="mx-auto flex h-full w-full max-w-sm flex-col justify-between space-y-6">
            <div />
            <div className='flex flex-col gap-6 lg:gap-20'>
                <Link href='/' className="relative z-20 mx-auto flex w-fit items-center justify-center gap-4">
                    <Ilustrations.Imagotype className='w-full max-w-44 text-primary-dark-gray lg:max-w-72' />
                </Link>
                <Suspense>
                    <RegisterForm />
                </Suspense>
            </div>
            <p className="py-4 text-center text-body-small text-primary-medium-gray lg:py-8">
                Že imate račun?{' '}
                <br className='lg:hidden' />
                <Link
                    prefetch={false}
                    href="/prijava"
                    className="font-bold text-primary-dark-gray hover:underline"
                >
                    Vpišite se
                </Link>
            </p>
        </div>
    )
}
