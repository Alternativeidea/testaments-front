'use client'
import { MovementIcon, MovementRow, MovementRowItem } from '@/components/dashboard/ui/movement-row'
import { Icons } from '@/components/ui/icons'
import { Separator } from '@/components/ui/separator'
import { getMembershipsDataById } from '@/lib/services/ambassadors'
import { format } from 'date-fns'
import { sl } from 'date-fns/locale'
import { useEffect, useState } from 'react'

export default function NarocilaRows({ id }: {id: number}) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [orders, setOrders] = useState<ProvizijeProps[]>([])

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const data = await getMembershipsDataById(id)
            setOrders(data)
            setIsLoading(false)
        }
        fetchData()
    }, [])

    return (

        <div className='flex flex-col w-full'>
            {isLoading
                ? <Icons.Spinner className='animate-spin m-auto mt-6'/>
                : orders.length > 0
                    ? orders.map((order) =>
                        <OrderRow key={order.uId} {...order}/>
                    )
                    : <div className='w-full h-24 flex justify-center items-center'>
                        Stranka še ni opravila nobenih naročil
                    </div>}
        </div>
    )
}

export function OrderRow(order : ProvizijeProps) {
    const { total, commission } = order
    return (
        <>
            <MovementRow className='visible justify-start !gap-x-2 my-0'>
                <MovementRowItem className='justify-start items-center !w-[200px] gap-x-3 overflow-hidden'>
                    <MovementIcon icon={<Icons.Docs/>}/>
                    <div className='flex flex-col items-start justify-center'>
                        <b>
                            {order.type === 0 && 'Dodaj TST'}
                            {order.type === 1 && 'Dodaj TST'}
                            {order.type === 2 && 'Dodaj TST'}
                            {order.type === 3 && 'Premium'}
                        </b>
                        <span className='line-clamp-1 text-body-extra-small'>
                            {format(order.createdAt, 'PP', { locale: sl })}
                        </span>
                    </div>
                </MovementRowItem>
                <MovementRowItem className='flex justify-end items-center w-[140px] h-full font-bold'>
                    {Number(total).toLocaleString('sl-SI', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })} EUR
                </MovementRowItem>
                <MovementRowItem className='flex justify-end items-center w-[120px] h-full text-body-small'>
                    {Number(commission).toLocaleString('sl-SI', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })} EUR
                </MovementRowItem>
            </MovementRow >
            <Separator className='bg-primary-light-gray py-0 my-0'/>
        </>
    )
}
