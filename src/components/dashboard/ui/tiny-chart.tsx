'use client'
import { cn } from '@/lib/utils/style'
import { Area, AreaChart, ResponsiveContainer } from 'recharts'

interface TinyChartProps<T> {
    data: T[]
    noDataPlaceholder?: string
    className?: string
}

export default function TinyChart<T>({
    data,
    noDataPlaceholder = 'No data',
    className
}: TinyChartProps<T>) {
    if (data.length === 0) {
        return <span>{noDataPlaceholder}</span>
    }

    return (
        <ResponsiveContainer className={cn('w-full !h-[90px] lg:max-w-[154px] aspect-video', className)}>
            <AreaChart
                width={200}
                height={60}
                data={data}
                margin={{
                    top: 5,
                    right: 0,
                    left: 0,
                    bottom: 5
                }}
            >
                <defs>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#BF8034" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#D99E32" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <Area type="linear" dataKey="cena" stroke="#BF8034" strokeWidth={2} fillOpacity={1} fill="url(#colorPv)" />
            </AreaChart>
        </ResponsiveContainer>
    )
}
