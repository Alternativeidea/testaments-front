import { Skeleton } from '@/components/ui/skeleton'

export default function NewsLoading() {
    return (
        <div className='flex px-6 py-11 relative'>
            <div className='absolute inset-0 bg-gradient-to-r from-primary-dark-gray from-30% to-transparent' />
            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8 relative">
                <div className='w-full flex flex-auto flex-col gap-6'>
                    <Skeleton className='w-full max-w-[374px] h-4' />
                    <Skeleton className='w-full max-w-[374px] h-[50px]' />
                </div>
                <Skeleton className='w-full md:max-w-[171px] h-[45px]' />
            </div>
        </div>
    )
}
