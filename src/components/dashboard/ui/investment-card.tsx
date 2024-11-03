import { Card, CardHeader } from '@/components/ui/card'
import { Slot } from '@radix-ui/react-slot'
import TinyChart from './tiny-chart'

interface InvestmentCardProps<T> {
    data?: T[]
    amount: number
    amountLabelBlack: string
    amountLabelNormal?: string
    chartLabelBlack?: string
    chartLabelNormal?: string
    icon?: React.ReactNode
}

export default function InvestmentCard<T>({
    data,
    amount,
    amountLabelBlack,
    amountLabelNormal,
    chartLabelBlack,
    chartLabelNormal,
    icon
}: InvestmentCardProps<T>) {
    return (
        <Card className='w-full max-w-[747px] min-h-[156px] bg-primary-dark-gray border-none relative'>
            <Slot className='flex items-center justify-center !w-16 h-16 absolute top-0 right-0'>
                {icon}
            </Slot>
            <CardHeader className='h-full justify-center space-y-0'>
                <div className='flex flex-col lg:flex-row justify-between md:items-center  gap-4'>
                    <div className='w-full lg:w-1/2 flex flex-col'>
                        <span className='min-w-max text-h3 font-baskerville text-primary-white'>
                            {parseInt(amount.toString()).toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, '.').replace(/,/g, '.')}
                            <span>,</span>
                            <span className='text-h5'>{(amount % 1).toFixed(2).split('.')[1]}
                                <span className='text-h6'> EUR</span>
                            </span>
                        </span>
                        <span className='flex flex-wrap gap-x-2 text-body-small font-bold text-primary-light-gray'>
                            <span>{amountLabelBlack}</span>
                            <span className='font-normal'>{amountLabelNormal}</span>
                        </span>
                    </div>
                    {
                        data && <div className='w-full lg:w-1/2 h-full flex items-end relative'>
                            <TinyChart
                                data={data}
                            />
                            <span
                                className='w-fit flex flex-wrap gap-x-2 text-body-medium font-bold text-primary-light-gray absolute inset-x-0 -bottom-2 mx-auto'
                            >
                                <span>{chartLabelBlack}</span>
                                <span className='font-normal'>{chartLabelNormal}</span>
                            </span>
                        </div>
                    }
                </div>
            </CardHeader>
        </Card>
    )
}
