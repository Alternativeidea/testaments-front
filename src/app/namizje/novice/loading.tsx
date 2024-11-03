import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function NewsLoading() {
    return (
        <div className='grid md:grid-cols-3 gap-4'>
            {Array(9).fill(0).map((_, i) => (
                <Card key={i} className='group w-full max-w-[752px] border-none min-w-fit'>
                    <CardContent className='relative px-0'>
                        <Skeleton className='w-full aspect-square lg:aspect-video' />
                    </CardContent>
                    <CardFooter className='p-0'>
                        <div className='w-full flex flex-col gap-2'>
                            <Skeleton className='w-16 h-5' />
                            <Skeleton className='w-11/12 h-7' />
                            <div className='flex flex-col gap-1 mt-2'>
                                <Skeleton className='w-full h-4' />
                                <Skeleton className='w-full h-4' />
                                <Skeleton className='w-[116px] h-[26px] mt-4' />
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}
