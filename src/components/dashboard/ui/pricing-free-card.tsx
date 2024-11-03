'use client'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Icons } from '@/components/ui/icons'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils/style'

interface PricingFreeCardProps {
    membership: MembershipProps
    onClick: (membership: MembershipProps) => void
    className?: string
}

export default function PricingFreeCard({ membership, className }: PricingFreeCardProps) {
    // function handleClick() {
    //     onClick(membership)
    // }

    return (
        <Card className={cn('w-full max-w-sm border-primary-light-gray', className)}>
            <CardHeader className='text-primary-dark-gray space-y-0'>
                <span className='text-h5 font-baskerville'>Free</span>
                <span className='text-body-big-2'>Osnovna funkcionalnost</span>
                <span className='text-h3 font-baskerville pt-4'>0<span className='text-h5'>{' '}EUR</span></span>
                <span className='text-[12px] text-primary-medium-gray'>Brezplačna naročnina</span>
                <Separator className='bg-primary-light-gray !mt-6' />
            </CardHeader>
            <CardContent className='space-y-2.5'>
                {
                    membership.description.map(({ id, value, enabled }) => (
                        <div key={`i-${id}`} className='flex items-center gap-4'>
                            <Icons.CheckCircle
                                className={cn(
                                    'w-5 h-5 min-w-fit',
                                    !enabled && 'text-primary-light-gray'
                                )}
                            />
                            <span className='text-body-medium'>{value}</span>
                        </div>
                    ))
                }
            </CardContent>
            <CardFooter className='pb-8'>
                {/* <Button
                    variant='light'
                    onClick={handleClick}
                    className='w-full'
                >
                    Izberi
                </Button> */}
            </CardFooter>
        </Card>
    )
}
