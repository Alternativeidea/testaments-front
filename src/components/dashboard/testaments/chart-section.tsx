'use client'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useState } from 'react'
import RealChart from '../ui/real-chart'
import ExchangeBar from './exchange-bar'

export default function ChartSection() {
    const [multiplier, setMultiplier] = useState<boolean>(true)

    const handleToggle = () => {
        setMultiplier(!multiplier)
    }

    return (
        <div className='flex flex-col w-full gap-y-4'>
            <h3 className='text-h6'>{multiplier ? 'Nakupna cena' : 'Odkupna cena'}  1g zlata (TST)</h3>
            <Card className='w-full h-fit bg-primary-light-gray/20 border-none p-2'>
                <CardHeader>
                    <ExchangeBar multiplier={multiplier} toggle={handleToggle} />
                </CardHeader>
                <CardContent className='overflow-x-auto'>
                    <div className='flex w-full min-w-[900px] overflow-x-scroll no-scrollbar'>
                        <RealChart
                            multiplier={multiplier}
                            className='!max-w-full !h-[600px]'
                            key={`${multiplier ? 'Nakupna cena' : 'Odkupna cena'}`}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
