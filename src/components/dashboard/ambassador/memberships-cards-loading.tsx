import { Card, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export async function MembershipsCardsLoading() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Card className="flex w-full border-0 bg-primary-light-gray/30 min-w-60 lg:min-w-fit">
                    <CardHeader className="w-full py-12">
                        <div className='flex gap-2 items-end'>
                            <Skeleton className='h-12 w-28' />
                            <span className="text-h5 font-baskerville"> EUR</span>
                        </div>
                        <span className="font-bold text-body-small">PROVIZIJA 1. NIVOJA</span>
                    </CardHeader>
                </Card>
                <div className="w-full flex gap-4 overflow-x-auto no-scrollbar">
                    <div className="flex gap-x-2 min-w-full">
                        <Card className="flex w-full border-0 bg-primary-light-gray/30 min-w-60 lg:min-w-fit">
                            <CardHeader className="w-full py-10 space-y-4">
                                <div className='flex gap-2 items-end'>
                                    <Skeleton className='h-5 w-12' />
                                    <span className="text-body-small font-baskerville"> EUR</span>
                                </div>
                                <span className="font-bold text-body-small">PREMIUM 1. NIVO</span>
                            </CardHeader>
                        </Card>
                        <Card className="flex w-full border-0 bg-primary-light-gray/30 min-w-60 lg:min-w-fit">
                            <CardHeader className="py-10 space-y-4">
                                <div className='flex gap-2 items-end'>
                                    <Skeleton className='h-5 w-12' />
                                    <span className="text-body-small font-baskerville"> EUR</span>
                                </div>
                                <span className="font-bold text-body-small">TST 1. NIVO</span>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </div>
            <div className="space-y-2">
                <Card className="flex w-full border-0 bg-primary-light-gray/30 min-w-60 lg:min-w-fit">
                    <CardHeader className="w-full py-12">
                        <div className='flex gap-2 items-end'>
                            <Skeleton className='h-12 w-28' />
                            <span className="text-h5 font-baskerville"> EUR</span>
                        </div>
                        <span className="font-bold text-body-small">PROVIZIJA 2. NIVOJA</span>
                    </CardHeader>
                </Card>
                <div className="w-full flex gap-4 overflow-x-auto no-scrollbar">
                    <div className="flex gap-x-2 min-w-full">
                        <Card className="flex w-full border-0 bg-primary-light-gray/30 min-w-60 lg:min-w-fit">
                            <CardHeader className="py-10 space-y-4">
                                <div className='flex gap-2 items-end'>
                                    <Skeleton className='h-5 w-12' />
                                    <span className="text-body-small font-baskerville"> EUR</span>
                                </div>
                                <span className="font-bold text-body-small">PREMIUM 2. NIVO</span>
                            </CardHeader>
                        </Card>
                        <Card className="flex w-full border-0 bg-primary-light-gray/30 min-w-60 lg:min-w-fit">
                            <CardHeader className="py-10 space-y-4">
                                <div className='flex gap-2 items-end'>
                                    <Skeleton className='h-5 w-12' />
                                    <span className="text-body-small font-baskerville"> EUR</span>
                                </div>
                                <span className="font-bold text-body-small">TST 2. NIVO</span>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
