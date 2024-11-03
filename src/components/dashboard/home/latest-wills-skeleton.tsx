import { BenefitBlock, BenefitBlockFooter, BenefitBlockHeader, BenefitBlockItems } from '@/components/dashboard/home/benefit-block'
import { Skeleton } from '@/components/ui/skeleton'

export default function LatestWillsSkeleton() {
    return (
        <BenefitBlock>
            <BenefitBlockHeader className='gap-0 space-y-px'>
                <Skeleton className='w-7/12 h-[31px] mb-10' />
                <Skeleton className='w-full h-4' />
                <Skeleton className='w-full h-4' />
                <Skeleton className='w-full h-4' />
                <Skeleton className='w-full h-4' />
            </BenefitBlockHeader>
            <BenefitBlockFooter>
                <BenefitBlockItems>
                    <Skeleton className='w-full h-10' />
                    <Skeleton className='w-full h-10' />
                    <Skeleton className='w-full h-10' />
                    <Skeleton className='w-full h-10' />
                </BenefitBlockItems>
                <Skeleton className='w-full h-[45px]' />
            </BenefitBlockFooter>
        </BenefitBlock>
    )
}
