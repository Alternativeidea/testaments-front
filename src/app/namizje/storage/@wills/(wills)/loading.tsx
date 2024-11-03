import { MobileMovementFooter, MobileMovementItem, MobileMovementTrigger, MobileMovements, MovementIcon, MovementRow, MovementRowItem, MovementRows } from '@/components/dashboard/ui/movement-row'
import { Skeleton } from '@/components/ui/skeleton'

export default function WillsLoading() {
    return (
        <>
            <MovementRows className='flex-col gap-2 bg-transparent p-0'>
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
            </MovementRows>
            <MobileMovements>
                <MobileMovementItem value={'item' + 'id'} className='hover:!no-underline p-4 bg-primary-light-gray/20'>
                    <MobileMovementTrigger>
                        <div className='flex items-center gap-x-6'>
                            <MovementIcon
                                icon={<Skeleton className='w-6 h-6 rounded-full' />}
                            />
                            <div className='w-fit flex flex-col items-start justify-center space-y-2'>
                                <Skeleton className='w-20 h-4' />
                                <Skeleton className='w-28 h-5' />
                            </div>
                        </div>
                    </MobileMovementTrigger>
                    <MobileMovementFooter>
                        <div className='flex items-center gap-4'>
                            <Skeleton className='w-10 h-10' />
                            <Skeleton className='w-full h-10' />
                        </div>
                    </MobileMovementFooter>
                </MobileMovementItem>
            </MobileMovements>
            <MovementRows className='flex-col gap-2 bg-transparent p-0'>
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
            </MovementRows>
            <MobileMovements>
                <MobileMovementItem value={'item' + 'id'} className='hover:!no-underline p-4 bg-primary-light-gray/20'>
                    <MobileMovementTrigger>
                        <div className='flex items-center gap-x-6'>
                            <MovementIcon
                                icon={<Skeleton className='w-6 h-6 rounded-full' />}
                            />
                            <div className='w-fit flex flex-col items-start justify-center space-y-2'>
                                <Skeleton className='w-20 h-4' />
                                <Skeleton className='w-28 h-5' />
                            </div>
                        </div>
                    </MobileMovementTrigger>
                    <MobileMovementFooter>
                        <div className='flex items-center gap-4'>
                            <Skeleton className='w-10 h-10' />
                            <Skeleton className='w-full h-10' />
                        </div>
                    </MobileMovementFooter>
                </MobileMovementItem>
            </MobileMovements>
        </>
    )
}
