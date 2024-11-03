import { cn } from '@/lib/utils/style'
import { Card, CardFooter, CardHeader } from '../../ui/card'
import { Icons } from '../../ui/icons'
import { Separator } from '../../ui/separator'

interface BenefitsCardProps {
    title: string
    content: string
    icon?: React.ReactNode
}

export default function BenefitsCard({ title, content, icon }: BenefitsCardProps) {
    return (
        <Card
            className={cn(
                'group w-full h-full max-w-[752px] bg-primary-dark-gray border-primary-medium-gray relative transition-colors',
                'hover:bg-primary-white hover:border-primary-light-gray'
            )}
        >
            <Separator orientation='vertical' className='w-1 h-3/5 bg-gradient-gold absolute -top-px -left-px opacity-0 transition-opacity group-hover:opacity-100 ' />
            <Separator orientation='vertical' className='w-1 h-3/5 bg-gradient-gold absolute -bottom-px -right-px opacity-0 transition-opacity group-hover:opacity-100 ' />
            <CardHeader className='px-8 mt-20'>
                {icon || <Icons.Two />}
            </CardHeader>
            <CardFooter className='px-8'>
                <div className='flex flex-col gap-6'>
                    <span
                        className='text-h5 font-baskerville text-primary-white group-hover:text-primary-medium-gray transition-colors'
                    >{title}</span>
                    <p
                        className='text-body-medium text-primary-light-gray group-hover:text-primary-medium-gray transition-colors'
                    >{content}</p>
                </div>
            </CardFooter>
        </Card>
    )
}
