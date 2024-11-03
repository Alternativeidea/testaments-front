import { Card, CardHeader, CardTitle } from '@/components/ui/card'

interface TreeCardsAdminProps {
    bonuses: BonusesProps
    membershipBonuses: BonusesProps
    tree: TreeProps
}

export function TreeCardsAdmin({ bonuses, membershipBonuses, tree }: TreeCardsAdminProps) {
    return (
        <div className="w-full flex gap-4 overflow-x-auto no-scrollbar">
            <div className='flex gap-x-4 min-w-full'>
                <Card className='flex w-full border-0 bg-primary-light-gray/30 min-w-60 lg:min-w-fit'>
                    <CardHeader className='py-12'>
                        <CardTitle className='font-baskerville text-h4 font-normal'>{tree?.sums.directs}</CardTitle>
                        <span className='text-body-small'>1. NIVO</span>
                    </CardHeader>
                </Card>
                <Card className='flex w-full border-0 bg-primary-light-gray/30 min-w-60 lg:min-w-fit'>
                    <CardHeader className='py-12'>
                        <CardTitle className='font-baskerville text-h4 font-normal'>{tree?.sums.indirects}</CardTitle>
                        <span className='text-body-small'>2. NIVO</span>
                    </CardHeader>
                </Card>
                <Card className='flex w-full border-0 bg-primary-light-gray/30 min-w-60 lg:min-w-fit'>
                    <CardHeader className='py-12'>
                        <CardTitle className='font-baskerville text-h4 font-normal'>{membershipBonuses?.counts.direct}</CardTitle>
                        <span className='text-body-small'>PREMIUM 1. NIVO</span>
                    </CardHeader>
                </Card>
                <Card className='flex w-full border-0 bg-primary-light-gray/30 min-w-60 lg:min-w-fit'>
                    <CardHeader className='py-12'>
                        <CardTitle className='font-baskerville text-h4 font-normal'>{membershipBonuses?.counts.indirect}</CardTitle>
                        <span className='text-body-small'>PREMIUM 2. NIVO</span>
                    </CardHeader>
                </Card>
                <Card className='flex w-full border-0 bg-primary-light-gray/30 min-w-60 lg:min-w-fit'>
                    <CardHeader className='py-12'>
                        <CardTitle className='font-baskerville text-h4 font-normal'>{bonuses?.counts.direct}</CardTitle>
                        <span className='text-body-small'>TST 1. NIVO</span>
                    </CardHeader>
                </Card>
                <Card className='flex w-full border-0 bg-primary-light-gray/30 min-w-60 lg:min-w-fit'>
                    <CardHeader className='py-12'>
                        <CardTitle className='font-baskerville text-h4 font-normal'>{bonuses?.counts.indirect}</CardTitle>
                        <span className='text-body-small'>TST 2. NIVO</span>
                    </CardHeader>
                </Card>
            </div>
        </div>
    )
}
