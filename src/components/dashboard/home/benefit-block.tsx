import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils/style'
import Image from 'next/image'

interface BenefitBlockItemProps {
    image: string
    text: string
    className?: string
}

export function BenefitBlockItem({ image, text, className }: BenefitBlockItemProps) {
    return (
        <div
            className={cn(
                'flex items-center gap-4 bg-primary-light-gray px-4 py-2',
                className
            )}
        >
            <Image src={image} alt={text} className='max-w-[24px] min-w-[24px] max-h-[24px] min-h-[24px]' width={24} height={24} />
            <span className='text-body-small leading-tight'>{text}</span>
        </div>
    )
}

interface BenefitBlockProps {
    children?: React.ReactNode
    className?: string
}

export function BenefitBlockItems({ children, className }: BenefitBlockProps) {
    return (
        <div
            className={cn(
                'grid sm:grid-cols-2 gap-2.5',
                className
            )}
        >
            {children}
        </div>
    )
}

export function BenefitBlockDescription({ children, className }: BenefitBlockProps) {
    return (
        <p
            className={cn(
                '!text-body-medium text-primary-medium-gray/70',
                className
            )}
        >
            {children}
        </p>
    )
}

export function BenefitBlockSubTitle({ children, className }: BenefitBlockProps) {
    return (
        <span
            className={cn(
                'text-body-small font-bold',
                className
            )}
        >
            {children}
        </span>
    )
}

export function BenefitBlockTitle({ children, className }: BenefitBlockProps) {
    return (
        <span
            className={cn(
                'max-w-[80%] md:max-w-none text-h6 font-baskerville',
                className
            )}
        >
            {children}
        </span>
    )
}

export function BenefitBlockHeader({ children, className }: BenefitBlockProps) {
    return (
        <div
            className={cn(
                'flex flex-col gap-4',
                className
            )}
        >
            {children}
        </div>
    )
}

export function BenefitBlockFooter({ children, className }: BenefitBlockProps) {
    return (
        <div
            className={cn(
                'flex flex-col gap-4',
                className
            )}
        >
            <Separator className='bg-primary-light-gray' />
            {children}
        </div>
    )
}

export function BenefitBlock({ children, className }: BenefitBlockProps) {
    return (
        <div
            className={cn(
                'flex flex-col justify-between gap-4 bg-primary-light-gray/30 p-5 relative',
                className
            )}
        >
            {children}
        </div>
    )
}
