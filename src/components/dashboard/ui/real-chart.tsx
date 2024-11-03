'use client'
import { Button } from '@/components/ui/button'
import { getChartData } from '@/lib/services/rates'
import { cn } from '@/lib/utils/style'
import { useEffect, useState } from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export interface ChartProps {
    time: string
    cena: number
}

interface RealChartProps {
    className?: string
    multiplier: boolean
}

const buttons = [
    {
        name: 'Danes',
        period: 'today',
        disabled: false
    },
    {
        name: 'Teden',
        period: 'week',
        disabled: false
    },
    {
        name: 'Mesec',
        period: 'month',
        disabled: false
    },
    {
        name: '6 mesecev',
        period: 'six',
        disabled: false
    },
    {
        name: 'Leto',
        period: 'year',
        disabled: false
    },
    {
        name: '5 let',
        period: 'five',
        disabled: false
    }
]

export default function RealChart({ className, multiplier }: RealChartProps) {
    const [selected, setSelected] = useState<string>('six')
    const [chartData, setChartData] = useState<ChartProps[]>()

    useEffect(() => {
        const fetchData = async () => {
            const data = await getChartData(`?period=${selected}&price=${multiplier ? 'sell' : 'buy'}`)
            setChartData(data)
        }

        fetchData()
    }, [selected, multiplier])

    const handleChange = (period : string) => {
        setSelected(period)
    }

    return (
        <div className='w-full'>
            <div className='flex gap-x-2 items-center justify-start w-full'>
                {buttons.map((item, i) =>
                    <Button
                        disabled={item.disabled}
                        className='disabled'
                        variant={selected === item.period || item.disabled ? 'default' : 'light'}
                        onClick={() => handleChange(item.period)}
                        key={i}>
                        {item.name}
                    </Button>)}
            </div>
            <ResponsiveContainer className={cn('w-full !h-[90px] lg:max-w-[154px] aspect-video relative', className)}>
                <AreaChart
                    width={300}
                    height={60}
                    data={chartData}
                    margin={{
                        top: 40,
                        right: 0,
                        left: 0,
                        bottom: 5
                    }}
                >
                    <CartesianGrid strokeWidth={0.3}/>
                    <XAxis
                        axisLine={false}
                        tickSize={15}
                        dataKey={'time'}
                        tick={{ stroke: '#7B7E80', strokeWidth: 0.1, transform: 'translate(0, 5)' }}
                        className='text-body-extra-small'
                        padding={{ left: 20, right: 20 }}
                    />
                    <YAxis
                        width={45}
                        tickLine={false}
                        tickSize={8}
                        tickCount={5}
                        axisLine={false}
                        className='text-body-extra-small'
                        allowDecimals={false}
                        allowDataOverflow
                    />
                    <Tooltip />
                    <defs>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#BF8034" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#D99E32" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <Area type="linear" dataKey="cena" stroke="#BF8034" strokeWidth={1} fillOpacity={1} fill="url(#colorPv)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}
