import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

export function AccountsLoading() {
    return (
        <Card className='border-0 bg-primary-light-gray/30'>
            <CardHeader className='flex-row justify-between items-center'>
                <CardTitle className='font-baskerville text-h6 font-normal'>Moja izplačilna vsota</CardTitle>
                <Skeleton className='h-[45px] w-full max-w-[101px]' />
            </CardHeader>
            <CardContent className='space-y-4 mt-2'>
                <Skeleton className='h-[50px] w-full max-w-52' />
                <Separator className='bg-primary-light-gray' />
            </CardContent>
            <CardFooter className='flex-col items-start space-y-4'>
                <div className='flex justify-between items-center w-full'>
                    <CardTitle className='font-baskerville text-h6 font-normal'>Moj bančni račun</CardTitle>
                    <Skeleton className='h-6 w-full max-w-[39px]' />
                </div>
                <Skeleton className='h-11 w-full' />
            </CardFooter>
        </Card>
    )
}
