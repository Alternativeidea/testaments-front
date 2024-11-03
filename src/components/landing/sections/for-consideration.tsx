import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function ForConsideration() {
    return (
        <section className='flex w-screen lg:h-[calc(100vh/1.5)] lg:max-h-screen'>
            <div className='flex items-center justify-end w-full h-full relative'>
                <Image src={'/img/landing/house.webp'} alt='banner' fill className='absolute -z-10 w-full h-full object-fit' />
                <div className='flex flex-col w-full lg:w-1/2 h-full py-16 px-4'>
                    <h2 className='text-h5 lg:text-h1 font-baskerville text-primary-white pb-6 lg:pb-0'>V razmislek</h2>
                    <div className='flex flex-col gap-y-6 pl-6 lg:pl-12 border-l-2 border-primary-medium-gray lg:border-primary-light-gray'>
                        <p className='text-primary-light-gray max-w-xl'>
                            Človek mora zapustiti vse. Ves svoj trud, s katerim se je mučil pod soncem in ga bo zapustil človeku, ki bo prišel za njim.Kdo ve, bo moder ali bo tepec? Vendar bo razpolagal z    vsem trudom, kar si je nekdo z muko in modrostjo pridobil.
                        </p>
                        <p className='text-primary-light-gray max-w-xl'>
                            JA, prav si razumel, tudi ti, ki to bereš, boš zapustil delež človeku, ki se ni trudil za to in to je velika nadloga. Zato ukrepaj dokler si še živ in po svoji vesti razporedi deleže, ki si jih pridobil s svojim trudom. Zato NIKOLI ne odlašaj z oporoko, ker ne veš kaj bo prinesel jutrišnji dan.
                        </p>
                        <Button className='w-fit'>
                            Kontakt
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
