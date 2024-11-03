'use client'
import HomeNotifications from '@/components/dashboard/admin/obvestila/home-notifications'
import MembershipsNotifications from '@/components/dashboard/admin/obvestila/membership/memberships-notifications'
import OrderNotificationsManager from '@/components/dashboard/admin/obvestila/orders/order-notifications-manager'
import TicketNotifications from '@/components/dashboard/admin/obvestila/support/ticket-notifications'
import WillsNotifications from '@/components/dashboard/admin/obvestila/wills/wills-notifications'
import TabComponent from '@/components/dashboard/admin/ui/tab-component'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AllNotifications({ roleId } : {roleId: number}) {
    const searchParams = useSearchParams()
    const [selectedValue, setSelectedValue] = useState('all')
    const router = useRouter()

    const handleTabChange = (value: string) => {
        setSelectedValue(value)
        // update the URL query parameter
        const params = new URLSearchParams()
        params.set('tab', value)
        router.push(`?${params.toString()}`)
    }

    useEffect(() => {
        const tabSelected = searchParams?.get('tab') || 'all'
        // console.log('tabSelected', tabSelected)
        if (tabSelected) {
            // console.log(tabSelected)
            setSelectedValue(tabSelected)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const TABS = [
        {
            value: 'all',
            title: 'Vsa obvestila',
            content: <HomeNotifications handleTab={handleTabChange}/>,
            disabled: roleId === 4
        },
        {
            value: 'membership',
            title: 'Članstvo in Verifikacija',
            content: <>
                <MembershipsNotifications/>
            </>,
            disabled: roleId === 4
        },
        // {
        //     value: 'tst',
        //     title: 'TST',
        //     content: null
        // },
        {
            value: 'oporoke',
            title: 'Oporoke',
            content: <WillsNotifications/>
        },
        {
            value: 'trznica',
            title: 'Tržnica',
            content: <OrderNotificationsManager/>
        },
        {
            value: 'tickets',
            title: 'Podpora',
            content: <TicketNotifications />
        }
    ]

    return (
        <div>
            <TabComponent tabs={TABS} defaultValue={selectedValue} customHandle={handleTabChange} customSelectedTab={selectedValue}/>
        </div>
    )
}
