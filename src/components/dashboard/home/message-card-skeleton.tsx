import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function MessageCardSkeleton() {
    return (
        <Card className='border-none bg-primary-light-gray/20'>
            <div className='flex w-full flex-1 flex-col gap-4 p-4'>
                <Skeleton className='w-1/2 h-[30px]'/>
                <Skeleton className='w-full h-[16px]'/>
                <Skeleton className='w-full h-[16px]'/>
            </div>
        </Card>
    )
}
