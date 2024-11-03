'use client'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Icons } from '@/components/ui/icons'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils/style'

interface PricingPremiumCardProps {
    membership: MembershipProps
    onClick: (membership: MembershipProps) => void
    className?: string
}
export default function PricingPremiumCard({ membership, className }: PricingPremiumCardProps) {
    // function handleClick() {
    //     onClick(membership)
    // }

    return (
        <Card className={cn('w-full max-w-sm bg-primary-dark-gray border-primary-light-gray', className)}>
            <CardHeader className='text-primary-white space-y-0 pt-10'>
                <span className='text-gradient-gold text-h5 font-baskerville'>Premium</span>
                <span className='text-body-big-2'>Premium funkcionalnost</span>
                <span className='text-h3 font-baskerville pt-4'>75<span className='text-h5'>{' '}EUR</span></span>
                <span className='text-[12px]'>Enoletna naročnina</span>
                <Separator className='bg-primary-light-gray !mt-6' />
            </CardHeader>
            <CardContent className='space-y-2.5'>
                {
                    membership.description.map(({ id, value }) => (
                        <div key={`i-${id}`} className='flex items-center gap-4'>
                            <Icons.CheckCircleGold className='w-5 h-5 min-w-fit'/>
                            <span className='text-body-medium text-primary-white'>{value}</span>
                        </div>
                    ))
                }
            </CardContent>
            <CardFooter className='pb-8'>
                {/* <Button
                    onClick={handleClick}
                    className='w-full'
                >
                    Izberi
                </Button> */}
            </CardFooter>
        </Card>
    )
}
