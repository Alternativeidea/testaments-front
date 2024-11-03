import { Card, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function TreeCardsLoading() {
    return (
        <div className="w-full flex gap-4 overflow-x-auto no-scrollbar">
            <div className='flex gap-x-4 min-w-full'>
                <Card className='flex w-full border-0 bg-primary-light-gray/30 min-w-60 lg:min-w-fit'>
                    <CardHeader className='py-12'>
                        <Skeleton className='h-10 w-full' />
                        <span className='text-body-small'>1. NIVO</span>
                    </CardHeader>
                </Card>
                <Card className='flex w-full border-0 bg-primary-light-gray/30 min-w-60 lg:min-w-fit'>
                    <CardHeader className='py-12'>
                        <Skeleton className='h-10 w-full' />
                        <span className='text-body-small'>2. NIVO</span>
                    </CardHeader>
                </Card>
                <Card className='flex w-full border-0 bg-primary-light-gray/30 min-w-60 lg:min-w-fit'>
                    <CardHeader className='py-12'>
                        <Skeleton className='h-10 w-full' />
                        <span className='text-body-small'>PREMIUM 1. NIVO</span>
                    </CardHeader>
                </Card>
                <Card className='flex w-full border-0 bg-primary-light-gray/30 min-w-60 lg:min-w-fit'>
                    <CardHeader className='py-12'>
                        <Skeleton className='h-10 w-full' />
                        <span className='text-body-small'>PREMIUM 2. NIVO</span>
                    </CardHeader>
                </Card>
                <Card className='flex w-full border-0 bg-primary-light-gray/30 min-w-60 lg:min-w-fit'>
                    <CardHeader className='py-12'>
                        <Skeleton className='h-10 w-full' />
                        <span className='text-body-small'>TST 1. NIVO</span>
                    </CardHeader>
                </Card>
                <Card className='flex w-full border-0 bg-primary-light-gray/30 min-w-60 lg:min-w-fit'>
                    <CardHeader className='py-12'>
                        <Skeleton className='h-10 w-full' />
                        <span className='text-body-small'>TST 2. NIVO</span>
                    </CardHeader>
                </Card>
            </div>
        </div>
    )
}
