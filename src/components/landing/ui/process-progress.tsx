import { Icons } from '@/components/ui/icons'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils/style'

interface ProcessProgressProps {
    step: 1 | 2 | 3
}

export default function ProcessProgress({ step = 1 }: ProcessProgressProps) {
    return (
        <div className="w-full">
            <div className="w-full relative">
                <Separator
                    className={cn(
                        'h-full w-[1px] lg:h-[1px] lg:w-full bg-primary-light-gray absolute',
                        'left-[11px] lg:left-0 lg:top-[11px]'
                    )}
                />
                <div className='grid lg:grid-cols-3 gap-8'>
                    <div className='flex lg:flex-col gap-4'>
                        <Icons.DotGold className='min-w-fit mt-7 lg:mt-0 lg:ml-7 relative' />
                        <div className='flex flex-col lg:flex-row lg:gap-8'>
                            <span
                                className={cn(
                                    'w-fit text-gradient-gold !text-h2 lg:!text-h1 font-baskerville leading-none',
                                    'bg-primary-light-gray'
                                )}
                            >01</span>
                            <div className='grid lg:mt-11 text-primary-white lg:gap-4'>
                                <span className='text-h5 font-baskerville'>Kontakt</span>
                                <span className='text-body-big-2'>Prvi korak je, da izpolnete kontaktni obrazec, svoje podatke ter ga pošljete nam.</span>
                            </div>
                        </div>
                    </div>
                    <div className='flex lg:flex-col gap-4'>
                        {
                            step > 1
                                ? <Icons.DotGold className='min-w-fit mt-7 lg:mt-0 lg:ml-7 relative' />
                                : <Icons.Dot className='min-w-fit mt-7 lg:mt-0 lg:ml-7 relative' />
                        }
                        <div className='flex flex-col lg:flex-row lg:gap-8'>
                            <span
                                className={cn(
                                    'w-fit bg-primary-light-gray/50 bg-clip-text !text-h2 lg:!text-h1 font-baskerville text-transparent leading-none',
                                    step > 1 && '!bg-gradient-gold'
                                )}
                            >02</span>
                            <div
                                className={cn(
                                    'grid lg:mt-11 text-primary-white/50 lg:gap-4',
                                    step > 1 && 'text-primary-white'
                                )}
                            >
                                <span className='text-h5 font-baskerville'>Izvedba</span>
                                <span className='text-body-big-2'>Po pogovoru in Vaši potrditvi začnemo s postopkom ter vas o napredku sprotno obveščamo.</span>
                            </div>
                        </div>
                    </div>
                    <div className='flex lg:flex-col gap-4'>
                        {
                            step === 3
                                ? <Icons.DotGold className='min-w-fit mt-7 lg:mt-0 lg:ml-7 relative' />
                                : <Icons.Dot className='min-w-fit mt-7 lg:mt-0 lg:ml-7 relative' />
                        }
                        <div className='flex flex-col lg:flex-row lg:gap-8'>
                            <span
                                className={cn(
                                    'w-fit bg-primary-light-gray/50 bg-clip-text !text-h2 lg:!text-h1 font-baskerville text-transparent leading-none',
                                    step === 3 && '!bg-gradient-gold'
                                )}
                            >03</span>
                            <div
                                className={cn(
                                    'grid lg:mt-11 text-primary-white/50 lg:gap-4',
                                    step === 3 && 'text-primary-white'
                                )}
                            >
                                <span className='text-h5 font-baskerville'>Odgovor</span>
                                <span className='text-body-big-2'>Takoj, ko vaš kontaktni obrazec prejmemo, ugotovimo kaj želite in vas v najkrajšem času kontaktiramo nazaj.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
