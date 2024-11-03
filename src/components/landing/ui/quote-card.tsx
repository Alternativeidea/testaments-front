import { Card, CardFooter, CardHeader } from '@/components/ui/card'
import { Icons } from '@/components/ui/icons'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils/style'

interface QuoteCardProps {
    content: string
    author: string
}

export default function QuoteCard({ content, author }: QuoteCardProps) {
    return (
        <Card
            className={cn(
                'group w-full max-w-[752px] bg-primary-white border-2 border-primary-medium-gray relative transition-colors min-h-[400px] lg:min-h-0',
                'hover:bg-primary-dark-gray'
            )}
        >
            <Separator orientation='vertical' className='w-1 h-3/5 bg-gradient-gold absolute -top-[2px] -left-[2px] opacity-0 transition-opacity group-hover:opacity-100 ' />
            <Separator orientation='vertical' className='w-1 h-3/5 bg-gradient-gold absolute -bottom-[2px] -right-[2px] opacity-0 transition-opacity group-hover:opacity-100 ' />
            <CardHeader className='px-8 pt-[39px]'>
                <Icons.Quote />
            </CardHeader>
            <CardFooter className='px-8 pb-[39px]'>
                <div className='flex flex-col gap-6'>
                    <p
                        className='text-body-medium text-primary-medium-gray group-hover:text-primary-white transition-colors'
                    >{content}</p>
                    <span
                        className='text-body-big-2 font-baskerville text-primary-medium-gray group-hover:text-primary-white transition-colors'
                    >{author}</span>
                </div>
            </CardFooter>
        </Card>
    )
}
