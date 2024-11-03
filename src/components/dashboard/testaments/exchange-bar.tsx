'use client'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { Ilustrations } from '@/components/ui/ilustrations'
import { Separator } from '@/components/ui/separator'
import { getRatesToday } from '@/lib/services/rates'
import { useEffect, useState } from 'react'

export default function ExchangeBar({ multiplier, toggle } : { multiplier : boolean, toggle: () => void }) {
    const [goldValue, setGoldValue] = useState<number>(0)

    useEffect(() => {
        const fetchData = async () => {
            const { priceBuy, priceSell }: RateProps = await getRatesToday()
            setGoldValue(multiplier ? Number(priceSell) : Number(priceBuy))
        }

        fetchData()
    }, [multiplier])

    return (
        <>
            <div className='w-full flex flex-col gap-y-8 lg:flex-row items-start justify-between pb-4'>
                <div className='flex items-center h-full gap-4'>
                    <Button variant='light' className='mt-2 group border-none shadow-button py-2 px-2 h-full'>
                        <Ilustrations.GoldIngot />
                    </Button>
                    <div className='flex flex-col'>
                        <p className='uppercase'>
                            <b>{`${multiplier ? 'Nakupni Tečaj' : 'Odkupni tečaj'}`}</b>
                        </p>
                        <h4 className='text-h4 text-primary-medium-gray font-baskerville !leading-none'>
                            {parseInt(goldValue.toString()).toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, '.').replace(/,/g, '.')}
                            <span>,</span>
                            <span className='text-h5'>{(goldValue % 1).toFixed(2).split('.')[1]}
                                <span className='text-h6'> EUR</span>
                            </span>
                        </h4>
                    </div>
                </div>
                <div className='flex gap-x-2 h-10'>
                    <Button
                        onClick={toggle}
                        variant='light'
                        className='group border-none shadow-button py-2 px-2 h-full'
                    >
                        <Icons.Exchange className='h-5 invert group-hover:invert-0' />
                    </Button>
                </div>
            </div>
            <Separator className='w-full bg-primary-light-gray h-[1px]' />
        </>
    )
}
