import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils/style'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface MovementRowProps {
    children: React.ReactNode
    className?: string
}

interface MovementRowIconProps {
    icon: React.ReactNode | string
    className?: string
    oporoke?: boolean
}

interface MobileMovementItem extends MovementRowProps {
    value: string
}

export function MovementRows({ children, className }: MovementRowProps) {
    return (
        <div className={cn(
            'hidden lg:flex flex-col gap-y-4 gap-x-6 items-center justify-between w-full h-fit border-none',
            className)}>
            {children}
        </div>
    )
}

export function MovementRow({ children, className }: MovementRowProps) {
    return (
        <div className={cn(
            'hidden lg:flex gap-x-6 items-center justify-between w-full h-fit bg-primary-light-gray/20 border-none p-4',
            className)}>
            {children}
        </div>
    )
}

export function MovementIcon({ icon, className, oporoke }: MovementRowIconProps) {
    return (
        <div
            className={cn(
                'shadow-button hover:bg-primary-white/10 border-none bg-primary-white/10 w-12 h-12 md:min-w-16 md:w-16 md:h-16 !p-2 cursor-default',
                className
            )}
        >
            <div className='flex uppercase items-center justify-center w-full h-full rounded-full bg-primary-white text-body-extra-small lg:text-body-small !leading-none relative'>
                {icon}
                {oporoke && <span className='w-2 lg:w-3 h-2 lg:h-3 rounded-full bg-gradient-gold absolute top-0 right-0' />}
            </div>
        </div>
    )
}

export function MovementRowItem({ className, children }: MovementRowProps) {
    return (
        <div
            className={cn(
                'flex items-start justify-start w-fit text-primary-medium-gray text-body-medium text-left overflow-ellipsis',
                className
            )}
        >
            {children}
        </div>
    )
}

export function MobileMovements({ className, children }: MovementRowProps) {
    return (
        <Accordion
            type="single"
            collapsible
            className={cn(
                'w-full lg:hidden flex flex-col gap-y-2',
                className
            )}>
            {children}
        </Accordion>
    )
}

export function MobileMovementItem({ className, children, value }: MobileMovementItem) {
    return (
        <AccordionItem
            value={value}
            className={cn(
                'hover:!no-underline p-4 bg-primary-light-gray/20',
                className
            )}
        >
            {children}
        </AccordionItem>
    )
}

export function MobileMovementTrigger({ className, children }: MovementRowProps) {
    return (
        <AccordionTrigger
            className={cn(
                '[&[data-state=open]>.up]:block [&[data-state=open]>.down]:hidden py-4 flex text-h6-2 w-full justify-between relative',
                className
            )}>
            {children}
            <ChevronUp className="up h-6 w-6 shrink-0 duration-200 hidden text-primary-dark-gray" />
            <ChevronDown className="down h-6 w-6 shrink-0 duration-200 text-primary-dark-gray" />
        </AccordionTrigger>
    )
}

export function MobileMovementContent({ className, children }: MovementRowProps) {
    return (
        <AccordionContent
            className={cn('flex items-center gap-y-4 flex-col',
                className)
            }>
            {children}
        </AccordionContent>
    )
}

export function MobileMovementBlock({ className, children } : MovementRowProps) {
    return (
        <div className={cn('flex flex-col items-center justify-center w-full', className)}>
            <Separator className='mb-5 bg-primary-light-gray w-full h-[1px]' />
            {children}
        </div>
    )
}

export function MobileMovementFooter({ className, children } : MovementRowProps) {
    return (
        <div className={cn('', className)}>
            <Separator className='mb-5 bg-primary-light-gray w-full h-[1px]' />
            {children}
        </div>
    )
}
