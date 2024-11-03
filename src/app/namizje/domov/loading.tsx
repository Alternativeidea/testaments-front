import FinancialCardsSkeleton from '@/components/dashboard/home/financial-cards-skeleton'
import LatestWillsSkeleton from '@/components/dashboard/home/latest-wills-skeleton'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

export default function HomeLoading() {
    return (
        <>
            <Card className='border-primary-light-gray !m-0'>
                <div className='h-fit flex flex-col md:flex-row justify-between p-4 md:p-3'>
                    <div className='flex flex-1 flex-col gap-4 md:p-3'>
                        <Skeleton className='w-1/2 h-[31px]' />
                        <div className='flex flex-col gap-px'>
                            <Skeleton className='w-full h-4' />
                            <Skeleton className='w-full h-4' />
                        </div>
                    </div>
                    <div className='md:min-w-[273px] flex flex-col md:flex-row'>
                        <Separator className='md:hidden bg-primary-light-gray my-4' />
                        <Separator orientation='vertical' className='hidden md:block bg-primary-light-gray mx-3' />
                        <div className='w-full flex justify-center items-center md:px-6 md:py-3'>
                            <Skeleton className='w-full h-[45px]' />
                        </div>
                    </div>
                </div>
            </Card>

            <FinancialCardsSkeleton />

            <div className='w-full xl:w-fit flex gap-4 mx-auto overflow-x-scroll no-scrollbar'>
                <Skeleton className='w-[235px] h-[45px]' />
                <Skeleton className='w-[235px] h-[45px]' />
                <Skeleton className='w-[235px] h-[45px]' />
                <Skeleton className='w-[235px] h-[45px]' />
            </div>

            <div className='grid md:grid-cols-2 gap-4'>
                <LatestWillsSkeleton />
                <LatestWillsSkeleton />
            </div>
        </>
    )
}
