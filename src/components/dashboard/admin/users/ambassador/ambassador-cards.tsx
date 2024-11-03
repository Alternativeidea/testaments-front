'use client'
import { MembershipsCardsAdmin } from '@/components/dashboard/ambassador/memberships-cards-admin'
import { TreeCardsAdmin } from '@/components/dashboard/ambassador/tree-cards-admin'
import { TreeCardsLoading } from '@/components/dashboard/ambassador/tree-cards-loading'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { getBonusesByUser, getMembershipBonusesByUser } from '@/lib/services/bonuses'
import { getTreeByUser } from '@/lib/services/tree'
import { useEffect, useState } from 'react'

export default function AmbassadorCards({ userId }: { userId: number }) {
    const [loading, setLoading] = useState(true)
    const [bonuses, setBonuses] = useState<BonusesProps | null>(null)
    const [membershipBonuses, setMembershipBonuses] = useState<BonusesProps | null>(null)
    const [tree, setTree] = useState<TreeProps | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const [fetchedMembershipBonuses, fetchedTree, fetchedBonuses] = await Promise.all([
                    getMembershipBonusesByUser(userId),
                    getTreeByUser(userId),
                    getBonusesByUser(userId)
                ])
                setMembershipBonuses(fetchedMembershipBonuses)
                setTree(fetchedTree)
                setBonuses(fetchedBonuses)
            } catch (error) {
                console.error('Error fetching data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [userId])

    if (loading) {
        return <>
            <TreeCardsLoading/>
            <br/>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                {Array(2).fill(0).map((_, i) => (
                    <div key={i} className='space-y-2'>
                        <Card className='flex w-full border-0 bg-primary-light-gray/30 min-w-60 lg:min-w-fit'>
                            <CardHeader className='py-12'>
                                <CardTitle className='font-baskerville text-h3 font-normal'>
                                    <Skeleton className='w-60 h-full'/>
                                </CardTitle>
                                <span className='font-bold text-body-small'>
                                    <Skeleton />
                                </span>
                            </CardHeader>
                        </Card>
                        <div className="w-full flex gap-4 overflow-x-auto no-scrollbar">
                            <div className='flex gap-x-2 min-w-full'>
                                {Array(2).fill(0).map((_, i) => (
                                    <Card key={i} className='flex w-full border-0 bg-primary-light-gray/30 min-w-60 lg:min-w-fit'>
                                        <CardHeader className='py-10 space-y-4'>
                                            <CardTitle className='font-baskerville text-h6 font-normal'>
                                                <Skeleton className='w-[80px] h-full'/>
                                            </CardTitle>
                                            <span className='font-bold text-body-small'>
                                                <Skeleton className='w-[100px] h-full' />
                                            </span>
                                        </CardHeader>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>))}
            </div>
        </>
    }

    return (
        <>
            {bonuses && membershipBonuses && tree && (
                <>
                    <TreeCardsAdmin bonuses={bonuses} membershipBonuses={membershipBonuses} tree={tree} />
                    <br />
                    <MembershipsCardsAdmin bonuses={bonuses} membershipBonuses={membershipBonuses} />
                </>
            )}
        </>
    )
}
