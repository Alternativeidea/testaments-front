'use client'
import { Skeleton } from '@/components/ui/skeleton'
import { getBonusesByUser, getMembershipBonusesByUser } from '@/lib/services/bonuses'
import { useEffect, useState } from 'react'

export function AmbassadorInfoAdmin({ userId } : {userId: number}) {
    const [bonuses, setBonuses] = useState<BonusesProps>()
    const [membershipBonuses, setMembershipBonuses] = useState<BonusesProps>()
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true)
                const bonusesData = await getBonusesByUser(userId)
                const membershipBonusesData = await getMembershipBonusesByUser(userId)
                setBonuses(bonusesData)
                setMembershipBonuses(membershipBonusesData)
            } catch (error) {
                console.error('Error fetching data: ', error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Changed this one from counts to traffic PROMET means traffic
    const tst = (bonuses?.traffic?.direct || 0) + (bonuses?.traffic?.indirect || 0)
    const clanarine = (membershipBonuses?.traffic?.direct || 0) + (membershipBonuses?.traffic?.indirect || 0)

    return (
        <div className="w-full flex h-full flex-col flex-auto gap-4 pt-2">
            <div className="bg-gradient-gold flex flex-col justify-center flex-auto p-6 text-primary-white">
                {loading
                    ? (
                        <div className="flex items-end gap-4 pb-2">
                            <Skeleton className='w-[300px] h-[80px] pb-6'/>
                            <span className="font-baskerville text-h4">EUR</span>
                        </div>
                    )
                    : (
                        <span className="text-h2 font-baskerville">
                            {Number(tst + clanarine).toLocaleString('sl-SI', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })}
                            <span className="text-h4"> EUR</span>
                        </span>
                    )}
                <span className="text-primary-light-gray font-bold text-body-extra-small">PROMET VSE SKUPAJ</span>
            </div>
            <div className="flex gap-x-4 overflow-x-auto no-scrollbar">
                <div className="w-full flex flex-col bg-primary-dark-gray pl-6 pr-16 text-primary-white space-y-4 pb-7 pt-14">
                    {loading
                        ? (
                            <div className="flex items-end gap-4 pb-2">
                                <Skeleton className='w-[100px] h-[30px] pb-2'/>
                                <span className="font-baskerville text-body-big-2">EUR</span>
                            </div>
                        )
                        : <p className="text-h5 font-baskerville text-nowrap">{Number(clanarine).toLocaleString('sl-SI', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })}<span className="text-body-big-2"> EUR</span></p>}
                    <p className="text-primary-light-gray font-bold text-body-extra-small text-nowrap">PROMET PREMIUM</p>
                </div>
                <div className="w-full flex flex-col bg-primary-dark-gray pl-6 pr-16 text-primary-white space-y-4 pb-7 pt-14">
                    {loading
                        ? (
                            <div className="flex items-end gap-4 pb-2">
                                <Skeleton className='w-[100px] h-[30px] pb-2'/>
                                <span className="font-baskerville text-body-big-2">EUR</span>
                            </div>
                        )
                        : <p className="text-h5 font-baskerville text-nowrap">{Number(tst).toLocaleString('sl-SI', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })}<span className="text-body-big-2"> EUR</span></p>}
                    <p className="text-primary-light-gray font-bold text-body-extra-small text-nowrap">PROMET TST</p>
                </div>
                {/* <div className="flex flex-col bg-primary-dark-gray pl-6 pr-16 text-primary-white space-y-4 pb-7 pt-14">
                        <p className="text-h5 font-baskerville text-nowrap">0,00<span className="text-body-big-2"> EUR</span></p>
                        <p className="text-primary-light-gray font-bold text-body-extra-small text-nowrap">PROMET TRŽNICA</p>
                    </div> */}
            </div>
        </div>
    )
}
