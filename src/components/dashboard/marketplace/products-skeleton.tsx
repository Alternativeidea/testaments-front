import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function ProductsSkeleton() {
    return (
        <>
            <div className='grid lg:grid-cols-2 gap-6 w-full'>
                {[...Array(2)].map((_, i) => (
                    <Card key={`i-${i}`} className='@container w-full bg-primary-light-gray/20 border-none'>
                        <CardHeader className='w-full aspect-video px-6 py-4'>
                            <Skeleton className="w-full h-full" />
                        </CardHeader>
                        <CardContent>
                            <div className='flex flex-col'>
                                <div className='h-32 @[500px]:h-36'>
                                    <div className='flex w-full justify-between py-2 items-center'>
                                        <Skeleton className="w-[47px] h-[21px]" />
                                        <Skeleton className="w-6 h-6" />
                                    </div>
                                    <Skeleton className="w-full h-8" />
                                    <Skeleton className="w-full h-[29px]" />
                                </div>
                                <div className='hidden @[500px]:flex gap-x-2 py-2'>
                                    <Skeleton className="w-full h-[33px]" />
                                    <Skeleton className="w-full h-[33px]" />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className='px-4 pt-0'>
                            <Skeleton className="w-full max-w-[180px] h-[27px]" />
                        </CardFooter>
                    </Card>
                ))}
            </div>
            <p className='flex w-full justify-start font-baskerville text-h5'>
                Vsi produkti
            </p>
            <div className='grid lg:grid-cols-3 gap-4 w-full'>
                {[...Array(9)].map((_, i) => (
                    <Card key={`i-${i}`} className='@container w-full bg-primary-light-gray/20 border-none'>
                        <CardHeader className='w-full aspect-video px-6 py-4'>
                            <Skeleton className="w-full h-full" />
                        </CardHeader>
                        <CardContent>
                            <div className='flex flex-col'>
                                <div className='h-32 @[500px]:h-36'>
                                    <div className='flex w-full justify-between py-2 items-center'>
                                        <Skeleton className="w-[47px] h-[21px]" />
                                        <Skeleton className="w-6 h-6" />
                                    </div>
                                    <Skeleton className="w-full h-8" />
                                    <Skeleton className="w-full h-[29px]" />
                                </div>
                                <div className='hidden @[500px]:flex gap-x-2 py-2'>
                                    <Skeleton className="w-full h-[33px]" />
                                    <Skeleton className="w-full h-[33px]" />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className='px-4 pt-0'>
                            <Skeleton className="w-full max-w-[180px] h-[27px]" />
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </>
    )
}
