import { Skeleton } from '@/components/ui/skeleton'

export function CategoriesSkeleton() {
    return (
        <div className='flex gap-x-2 overflow-x-scroll no-scrollbar'>
            {[...Array(9)].map((_, i) => (
                <Skeleton key={`i-${i}`} className="w-32 h-[45px]" />
            ))}
        </div>
    )
}
