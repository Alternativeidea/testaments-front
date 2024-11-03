import { Separator } from '@/components/ui/separator'

interface BenefitsNumberProps {
    number: string
    title: string
    titleStyles?: string
}

export default function BenefitsNumber({ number, title, titleStyles }: BenefitsNumberProps) {
    return (
        <div className="w-fit min-w-[188px] flex flex-col items-end">
            <span
                className='bg-gradient-gold bg-clip-text !text-h2 font-baskerville text-transparent leading-none'
            >{number}</span>
            <span className={`text-body-big-2 text-primary-dark-gray ${titleStyles}`}>{title}</span>
            <Separator className='mt-6' />
        </div>
    )
}
