import { Button } from '@/components/ui/button'
import Image from 'next/image'
import BenefitsNumber from '../ui/benefits-number'

export default function Hero() {
    const numbers = [
        {
            number: '11+',
            title: 'Let izkušenj'
        },
        {
            number: '267+',
            title: 'Narejenih oporok'
        },
        {
            number: '412+',
            title: 'Zadovoljnih strank'
        }
    ]
    return (
        <section className='flex flex-col w-screen min-h-[900px] lg:min-h-0 lg:max-h-screen aspect-video'>
            <div className='flex flex-col lg:flex-row items-center w-full h-full relative bg-gradient-hero px-4 lg:px-44 top-0'>
                <Image src={'/img/banner.png'} alt='banner' fill className='absolute -z-10 object-cover min-h-[900px] lg:min-h-0' />
                <div className='flex flex-col w-full lg:w-1/2 pt-24'>
                    <h1 className='text-h3 lg:text-h1 text-primary-white font-baskerville'>Spletni portal Testament.si</h1>
                    <div className='flex flex-col gap-6 pl-6 lg:pl-12 max-w-[550px] border-l-2 border-primary-medium-gray pb-12 lg:pb-44'>
                        <p className='text-primary-white text-h6'>Diskretni, profesionalni in zanesljivi na področjih urejanja oporok, hrambe v sefih ter ostale pravno-formalne obveznosti.</p>
                        <Button className='w-fit px-8'>Izvedi več</Button>
                    </div>
                </div>
                <div className='flex items-end justify-end flex-col w-full lg:w-1/2 lg:h-full pb-2 lg:pb-44'>
                    {numbers.map((number, index) =>
                        <div key={index} className='border-b-2 border-primary-medium-gray'>
                            <BenefitsNumber
                                number={number.number}
                                title={number.title}
                                titleStyles='!text-primary-light-gray'
                            />
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
