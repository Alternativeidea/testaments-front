import { cn } from '@/lib/utils/style'

interface BenefitsTextProps {
    number: string
    title: string
    content: string
    isInactive?: boolean
}

export default function BenefitsText({ number, title, content, isInactive }: BenefitsTextProps) {
    return (
        <div className="w-full h-fit max-w-[732px] min-h-[110px] flex gap-[73px]">
            <span
                className={cn(
                    'text-gradient-gold !text-h1 font-baskerville leading-none',
                    isInactive && 'bg-primary-light-gray'
                )}
            >{number}</span>
            <div className="flex flex-col gap-2">
                <span
                    className={cn(
                        'text-gradient-gold !text-h5 font-baskerville',
                        isInactive && 'bg-primary-light-gray'
                    )}
                >{title}</span>
                <p
                    className={cn(
                        'text-body-big-2',
                        isInactive && 'text-primary-medium-gray/50'
                    )}
                >{content}</p>
            </div>
        </div>
    )
}
