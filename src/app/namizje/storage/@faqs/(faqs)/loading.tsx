import { Skeleton } from '@/components/ui/skeleton'

export default function FaqsLoading() {
    return (
        <div className='flex flex-col'>
            {[...Array(4)].map((_, i) => (
                <div key={`i-${i}`} className='flex items-center space-x-6 p-5'>
                    <Skeleton className='w-6 h-6 rounded-full' />
                    <Skeleton className='w-32 h-5' />
                </div>
            ))}
        </div>
    )
}
