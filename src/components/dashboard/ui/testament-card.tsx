import { Card, CardHeader } from '@/components/ui/card'
import { Icons } from '@/components/ui/icons'

interface TestamentCardProps {
    amount: number
    label: string
}

export default function TestamentCard({
    amount,
    label
}: TestamentCardProps) {
    return (
        <Card className='w-full max-w-[747px] min-h-[156px] bg-gold-card border-none relative overflow-hidden'>
            <Icons.Testament className='w-48 h-60 text-[#F8F8F8] opacity-25 absolute -top-10 -right-8 rotate-[20deg]' />
            <CardHeader className='h-full justify-center space-y-0 relative'>
                <div className='flex flex-col md:flex-row justify-between md:items-center gap-4'>
                    <div className='md:min-w-max flex flex-col'>
                        <span className='min-w-max text-h3 font-baskerville text-primary-white'>
                            {Number(amount).toLocaleString('sl-SI', {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0
                            })}
                            <span>,</span>
                            <span className='text-h5'>{(amount % 1).toFixed(4).split('.')[1]}
                                <span className='text-h6'> TST</span>
                            </span>
                        </span>
                        <span className='text-body-small font-bold text-primary-light-gray'>{label}</span>
                    </div>
                </div>
            </CardHeader>
        </Card>
    )
}
