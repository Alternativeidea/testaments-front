import { Icons } from '@/components/ui/icons'
import { cn } from '@/lib/utils/style'
import { Slot } from '@radix-ui/react-slot'
import Link from 'next/link'
import { Card, CardHeader } from '../../ui/card'
import { Separator } from '../../ui/separator'

interface ActionCardProps {
    icon: React.ReactNode
    title: string
    content: string
    href: string
}

export default function ActionCard({ icon, title, content, href }: ActionCardProps) {
    return (
        <Link href={href} className='w-full max-w-[496px]'>
            <Card
                className={cn(
                    'group w-full h-fit bg-primary-dark-gray border-primary-medium-gray relative transition-colors',
                    'hover:bg-primary-white hover:border-primary-light-gray'
                )}
            >
                <Separator orientation='vertical' className='w-1 h-3/5 bg-gradient-gold absolute -top-px -left-px opacity-0 transition-opacity group-hover:opacity-100 ' />
                <Separator orientation='vertical' className='w-1 h-3/5 bg-gradient-gold absolute -bottom-px -right-px opacity-0 transition-opacity group-hover:opacity-100 ' />
                <CardHeader className='min-h-[165px] justify-center px-8'>
                    <div className="flex items-center gap-8">
                        <Slot className='w-11 h-11'>
                            {icon}
                        </Slot>
                        <div className='flex flex-col'>
                            <span
                                className={cn(
                                    '!text-h5 font-baskerville text-primary-white transition-colors',
                                    'group-hover:text-primary-medium-gray'
                                )}
                            >{title}</span>
                            <span
                                className={cn(
                                    'flex items-center gap-[10px] text-primary-light-gray transition-colors',
                                    'group-hover:text-primary-medium-gray'
                                )}
                            >
                                <span>{content}</span>
                                <Icons.ArrowRight className='w-3.5 h-3.5'/>
                            </span>
                        </div>
                    </div>
                </CardHeader>
            </Card>
        </Link>
    )
}
