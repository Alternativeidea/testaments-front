import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { withCommas } from '@/lib/utils/format'
interface MembershipsCardsAdminProps {
    bonuses: BonusesProps
    membershipBonuses: BonusesProps
}

export function MembershipsCardsAdmin({ bonuses, membershipBonuses }: MembershipsCardsAdminProps) {
    const dClanarine = membershipBonuses.sums.direct

    const dTst = bonuses.sums.direct

    const direktni = dClanarine + dTst
    const pClanarine = membershipBonuses.sums.indirect

    const pTst = bonuses.sums.indirect
    const podDirektni = pClanarine + pTst

    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
            <div className='space-y-2'>
                <Card className='flex w-full border-0 bg-primary-light-gray/30 min-w-60 lg:min-w-fit'>
                    <CardHeader className='py-12'>
                        <CardTitle className='font-baskerville text-h3 font-normal'>{withCommas(direktni).replaceAll('.', ',')}<span className="text-h5"> EUR</span></CardTitle>
                        <span className='font-bold text-body-small'>PROVIZIJA 1. NIVOJA</span>
                    </CardHeader>
                </Card>
                <div className="w-full flex gap-4 overflow-x-auto no-scrollbar">
                    <div className='flex gap-x-2 min-w-full'>
                        <Card className='flex w-full border-0 bg-primary-light-gray/30 min-w-60 lg:min-w-fit'>
                            <CardHeader className='py-10 space-y-4'>
                                <CardTitle className='font-baskerville text-h6 font-normal'>{withCommas(dClanarine).replaceAll('.', ',')}<span className="text-body-small">  EUR</span></CardTitle>
                                <span className='font-bold text-body-small'>PREMIUM 1. NIVO</span>
                            </CardHeader>
                        </Card>
                        <Card className='flex w-full border-0 bg-primary-light-gray/30 min-w-60 lg:min-w-fit'>
                            <CardHeader className='py-10 space-y-4'>
                                <CardTitle className='font-baskerville text-h6 font-normal'>{withCommas(dTst).replaceAll('.', ',')}<span className="text-body-small">  EUR</span></CardTitle>
                                <span className='font-bold text-body-small'>TST 1. NIVO</span>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </div>
            <div className='space-y-2'>
                <Card className='flex w-full border-0 bg-primary-light-gray/30 min-w-60 lg:min-w-fit'>
                    <CardHeader className='py-12'>
                        <CardTitle className='font-baskerville text-h3 font-normal'>{withCommas(podDirektni).replaceAll('.', ',')}<span className="text-h5"> EUR</span></CardTitle>
                        <span className='font-bold text-body-small'>PROVIZIJA 2. NIVOJA</span>
                    </CardHeader>
                </Card>
                <div className="w-full flex gap-4 overflow-x-auto no-scrollbar">
                    <div className='flex gap-x-2 min-w-full'>
                        <Card className='flex w-full border-0 bg-primary-light-gray/30 min-w-60 lg:min-w-fit'>
                            <CardHeader className='py-10 space-y-4'>
                                <CardTitle className='font-baskerville text-h6 font-normal'>{withCommas(pClanarine).replaceAll('.', ',')}<span className="text-body-small">  EUR</span></CardTitle>
                                <span className='font-bold text-body-small'>PREMIUM 2. NIVO</span>
                            </CardHeader>
                        </Card>
                        <Card className='flex w-full border-0 bg-primary-light-gray/30 min-w-60 lg:min-w-fit'>
                            <CardHeader className='py-10 space-y-4'>
                                <CardTitle className='font-baskerville text-h6 font-normal'>{withCommas(pTst).replaceAll('.', ',')}<span className="text-body-small">  EUR</span></CardTitle>
                                <span className='font-bold text-body-small'>TST 2. NIVO</span>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
