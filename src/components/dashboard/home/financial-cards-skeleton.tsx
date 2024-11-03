import { Card, CardHeader } from '@/components/ui/card'
import { Icons } from '@/components/ui/icons'
import { Skeleton } from '@/components/ui/skeleton'

export default async function FinancialCardsSkeleton() {
    return (
        <div className='grid md:grid-cols-3 gap-4'>
            <Card className='w-full max-w-[747px] min-h-[156px] bg-gradient-gold border-none relative overflow-hidden'>
                <Icons.Testament className='w-60 h-60 text-[#F0D48E] absolute -top-8 -right-8 rotate-[20deg]' />
                <CardHeader className='h-full justify-center space-y-0 relative'>
                    <div className='flex flex-col md:flex-row justify-between md:items-center gap-4'>
                        <div className='md:min-w-max flex flex-col'>
                            <div className='min-w-max h-[62px] flex items-end font-baskerville text-primary-white'>
                                <Skeleton className='w-32 h-[42px] my-4 mr-2' />
                                <span className='text-h6 mb-2'>TST</span>
                            </div>
                            <span className='text-body-small font-bold text-primary-light-gray'>BILANCA TESTAMENTOV</span>
                        </div>
                    </div>
                </CardHeader>
            </Card>
            <Card className='w-full max-w-[747px] min-h-[156px] bg-primary-dark-gray border-none relative'>
                <CardHeader className='h-full justify-center space-y-0'>
                    <div className='flex flex-col lg:flex-row justify-between md:items-center  gap-4'>
                        <div className='w-full lg:w-1/2 flex flex-col'>
                            <div className='min-w-max h-[62px] flex items-end font-baskerville text-primary-white'>
                                <Skeleton className='w-32 h-[42px] my-4 mr-2' />
                                <span className='text-h6 mb-2'>EUR</span>
                            </div>
                            <span className='flex flex-col text-body-small font-bold text-primary-light-gray'>
                                <Skeleton className='w-32 h-4' />
                            </span>
                        </div>
                    </div>
                </CardHeader>
            </Card>
            <Card className='w-full max-w-[747px] min-h-[156px] bg-primary-dark-gray border-none relative'>
                <Skeleton className='w-5 h-5 absolute top-4 right-4' />
                <CardHeader className='h-full justify-center space-y-0'>
                    <div className='flex flex-col lg:flex-row justify-between md:items-center  gap-4'>
                        <div className='w-full lg:w-1/2 flex flex-col'>
                            <div className='min-w-max h-[62px] flex items-end font-baskerville text-primary-white'>
                                <Skeleton className='w-32 h-[42px] my-4 mr-2' />
                                <span className='text-h6 mb-2'>EUR</span>
                            </div>
                            <span className='flex flex-col text-body-small font-bold text-primary-light-gray'>
                                <Skeleton className='w-32 h-4' />
                                <Skeleton className='w-20 h-4' />
                                <Skeleton className='w-10 h-4' />
                            </span>
                        </div>
                    </div>
                </CardHeader>
            </Card>
        </div>
    )
}
