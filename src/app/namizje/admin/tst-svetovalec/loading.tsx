import { Skeleton } from '@/components/ui/skeleton'

export default async function LoadingAdminAmbassadorPage() {
    return (
        <>
            <section className='flex flex-col gap-6 min-h-screen'>
                <div className='flex gap-2 w-full items-end justify-end'>
                    {Array(5).fill(0).map((_, i) => (
                        <Skeleton key={i} className='w-[120px] h-[45px]'/>
                    ))}
                </div>
                <div className='flex w-full items-center justify-between'>
                    <Skeleton className='w-[220px] h-[45px]'/>
                    <Skeleton className='w-[160px] h-[45px]'/>
                </div>
                <Skeleton className='w-full h-[120px]'/>
                <div className='flex w-full items-center justify-between'>
                    <Skeleton className='w-[220px] h-[45px]'/>
                    <Skeleton className='w-[160px] h-[45px]'/>
                </div>
                <Skeleton className='w-full h-[120px]'/>
                <div className='flex gap-2'>
                    <Skeleton className='w-full h-[45px]'/>
                    <Skeleton className='w-[160px] h-[45px]'/>
                </div>
            </section>
        </>
    )
}
