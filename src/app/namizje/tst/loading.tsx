import FinancialCardsSkeleton from '@/components/dashboard/home/financial-cards-skeleton'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Icons } from '@/components/ui/icons'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

export default function TestamentsLoading() {
    return (
        <section>
            <FinancialCardsSkeleton/>

            <div className='w-full xl:w-fit flex gap-4 mx-auto overflow-x-scroll no-scrollbar'>
                <Skeleton className='w-[235px] h-[45px]' />
                <Skeleton className='w-[235px] h-[45px]' />
                <Skeleton className='w-[235px] h-[45px]' />
                <Skeleton className='w-[235px] h-[45px]' />
            </div>

            <div className='flex flex-col w-full gap-y-4'>
                <h3 className='text-h6'>Nakupna cena 1g zlata (TST)</h3>
                <Card className='w-full h-fit bg-primary-light-gray/20 border-none p-2'>
                    <CardHeader>
                        <div className='w-full flex flex-col gap-y-8 lg:flex-row items-start justify-between pb-4'>
                            <div className='flex items-start gap-4'>
                                <Skeleton className='w-[60px] h-[60px] aspect-square' />
                                <div className='flex flex-col gap-2 w-[200px]'>
                                    <Skeleton className='h-[20px] w-full '/>
                                    <Skeleton className='h-[40px] w-full '/>
                                </div>
                            </div>
                            <div className='flex gap-x-2 h-10'>
                                <Button variant='light' className='group border-none shadow-button py-2 px-2 h-full'>
                                    <Icons.Exchange className='h-5 invert group-hover:invert-0' />
                                </Button>
                            </div>
                        </div>
                        <Separator className='w-full bg-primary-light-gray h-[1px]' />
                    </CardHeader>
                    <CardContent className='flex flex-col gap-y-6'>
                        <div className='flex gap-4'>
                            <Skeleton className='w-[80px] h-[45px]' />
                            <Skeleton className='w-[80px] h-[45px]' />
                            <Skeleton className='w-[80px] h-[45px]' />
                            <Skeleton className='w-[80px] h-[45px]' />
                            <Skeleton className='w-[80px] h-[45px]' />
                            <Skeleton className='w-[80px] h-[45px]' />
                            <Skeleton className='w-[80px] h-[45px]' />
                        </div>
                        <Skeleton className='!max-w-full !h-[400px]' />
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}
