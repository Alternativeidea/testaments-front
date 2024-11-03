'use client'
import { AccountsAdmin } from '@/components/dashboard/ambassador/accounts-admin'
import { AmbassadorStructureAdmin } from '@/components/dashboard/ambassador/ambasssador-structure-admin'
import { AmbassadorInfoAdmin } from '@/components/dashboard/ambassador/info-admin'
import IzplacilaAdmin from '@/components/dashboard/ambassador/izplacila-admin'
import { ProvizijeAdmin } from '@/components/dashboard/ambassador/provizije-admin'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import TabComponent from '../../ui/tab-component'
import AmbassadorCards from './ambassador-cards'
import AmbassadorReferralCard from './ambassador-referral-card'

export function AmbassadorUser({ userId } : { userId: number}) {
    // Hooks
    const searchParams = useSearchParams()
    const { replace } = useRouter()
    const pathname = usePathname()

    const TABS = [
        {
            title: 'Info',
            value: 'info',
            content: <AmbassadorInfoAdmin userId={userId}/>
        },
        {
            title: 'Struktura',
            value: 'struktura',
            content: <AmbassadorStructureAdmin userId={userId}/>
        },
        {
            title: 'Provizije',
            value: 'provizije',
            content: <ProvizijeAdmin userId={userId}/>
        },
        {
            title: 'Izplačila',
            value: 'izplačila',
            content: <IzplacilaAdmin userId={userId}/>
        }
    ]

    const handleTab = (value: string) => {
        const currentParams = new URLSearchParams(searchParams?.toString() || '')
        currentParams.set('innerTab', value)
        replace(`${pathname}?${currentParams.toString()}`)
    }

    return (
        <>
            <section>
                <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
                    <TabComponent defaultValue={TABS[0].value} tabs={TABS} customHandle={handleTab} paramName='innerTab'/>
                    <div className='space-y-4'>
                        <AmbassadorReferralCard userId={userId}/>
                        <AccountsAdmin userId={userId}/>
                    </div>
                </div>
                <br />
                <AmbassadorCards userId={userId}/>
            </section>
        </>
    )
}
