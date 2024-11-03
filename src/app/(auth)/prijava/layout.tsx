import Image from 'next/image'

interface SignInLayoutProps {
    children: React.ReactNode
}

export default function SignInLayout({ children }: SignInLayoutProps) {
    return (
        <main>
            <div className="container relative grid min-h-screen flex-col items-center overflow-hidden bg-primary-dark-gray px-0 lg:max-w-none lg:!grid-cols-3">
                <div className="text-white relative flex h-full max-h-[328px] flex-col px-16 py-10 dark:border-r lg:mt-48 lg:max-h-full">
                    <div className="absolute inset-0">
                        <Image src='/img/banner.png' alt='Testament' fill className='object-cover object-center duration-500 animate-in fade-in' />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-dark-gray from-0% via-primary-dark-gray/30 via-30% to-transparent to-50%" />
                    <div className="absolute inset-0 bg-gradient-to-b from-primary-dark-gray from-0% via-primary-dark-gray/30 via-30% to-transparent to-50%" />
                    <div className="absolute inset-0 bg-gradient-to-l from-primary-dark-gray from-0% via-primary-dark-gray/30 via-30% to-transparent to-50%" />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-dark-gray from-0% via-primary-dark-gray/30 via-30% to-transparent to-50%" />

                    <div className='relative flex w-full flex-col justify-center gap-6'>
                        <span className='text-center font-baskerville text-h5 text-primary-white lg:text-left lg:text-h3'>Pozdravljeni</span>
                        <div className='flex flex-col gap-2'>
                            <span className='text-center text-body-medium font-bold text-gradient-gold lg:text-left'>PRIJAVITE SE V SVOJ RAČUN</span>
                            <span className='text-center text-body-medium text-primary-light-gray lg:text-left'>Prosimo, vnesite svoje podatke, da dostopate do vašega računa.</span>
                        </div>
                    </div>
                </div>
                <div className='col-span-1 h-full w-full min-w-0 p-1 pb-4 lg:col-span-2 lg:p-4'>
                    <div className='flex h-full items-center justify-center rounded-xl bg-primary-white'>
                        <div className="h-full w-full p-4 lg:p-8">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
