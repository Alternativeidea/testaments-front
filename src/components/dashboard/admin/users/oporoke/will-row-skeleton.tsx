import { MovementIcon, MovementRow, MovementRowItem } from '@/components/dashboard/ui/movement-row'
import { Skeleton } from '@/components/ui/skeleton'

export function WillRowSkeleton() {
    return (
        <MovementRow>
            <MovementRowItem className='justify-start items-center min-w-[200px] gap-x-6'>
                <MovementIcon
                    icon={<Skeleton className='w-6 h-6 rounded-full' />}
                />
                <div className='w-fit flex flex-col items-start justify-center space-y-2'>
                    <Skeleton className='w-20 h-4' />
                    <Skeleton className='w-28 h-5' />
                </div>
            </MovementRowItem>
            <MovementRowItem>
                <div className='w-fit flex flex-col items-start justify-center space-y-2'>
                    <Skeleton className='w-20 h-4' />
                    <Skeleton className='w-28 h-5' />
                </div>
            </MovementRowItem>
            <MovementRowItem>
                <div className='w-fit flex flex-col items-start justify-center space-y-2'>
                    <Skeleton className='w-20 h-4' />
                    <Skeleton className='w-28 h-5' />
                    <Skeleton className='w-28 h-5' />
                </div>
            </MovementRowItem>
            <MovementRowItem >
                <Skeleton className='w-28 h-5' />
            </MovementRowItem>
            <MovementRowItem>
                <Skeleton className='w-[85px] h-11' />
            </MovementRowItem>
        </MovementRow >
    )
}
