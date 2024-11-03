import AuthForm from '@/components/auth/auth-form'
import { Ilustrations } from '@/components/ui/ilustrations'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Sign In'
}

export default async function SignInPage({ searchParams }: PageWithSearchParamsProps) {
    return (
        <div className="mx-auto flex h-full w-full max-w-sm flex-col justify-between space-y-6">
            <div />
            <div className='flex flex-col gap-6 lg:gap-20'>
                <Link href='/' className="relative z-20 mx-auto flex w-fit items-center justify-center gap-4">
                    <Ilustrations.Imagotype className='w-full max-w-44 text-primary-dark-gray lg:max-w-72' />
                </Link>
                <AuthForm redirectTo={searchParams.redirectTo} />
            </div>
            <p className="py-4 text-center text-body-small text-primary-medium-gray">
                Nimate še uporabniškega računa?{' '}
                <br className='lg:hidden' />
                <Link
                    prefetch={false}
                    href="/registracija"
                    className="font-bold text-primary-dark-gray hover:underline"
                >
                    Registrirajte se
                </Link>
            </p>
        </div>
    )
}
