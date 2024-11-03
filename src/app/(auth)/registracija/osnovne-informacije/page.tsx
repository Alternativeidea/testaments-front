import BasicInfoForm from '@/components/auth/basic-info-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Osnovne Informacije'
}

interface SignUpBasicInfoPageProps {
    searchParams: { [key: string]: string }
}

export default function SignUpBasicInfoPage({ searchParams }: SignUpBasicInfoPageProps) {
    return (
        <div className="mx-auto flex w-full h-full max-w-[506px] flex-col justify-center space-y-6">
            <div />
            <div className='flex flex-col gap-4'>
                <div className='flex flex-col items-center [&_p]:text-center'>
                    <h1 className='text-h5 font-baskerville text-center mb-4 lg:mb-9'>Osnovne informacije</h1>
                    <p className='text-body-small mb-4'>Prosimo izpolnite spodnji obrazec s svojim imenom, priimkom in telefonsko številko.</p>
                </div>
                <BasicInfoForm code={searchParams.code} />
            </div>
        </div>
    )
}
