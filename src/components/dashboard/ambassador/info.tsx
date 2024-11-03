import { getBonuses, getMembershipBonuses } from '@/lib/services/bonuses'

export async function AmbassadorInfo() {
    const bonuses: BonusesProps = await getBonuses()
    const membershipBonuses: BonusesProps = await getMembershipBonuses()

    // Changed this one from counts to traffic PROMET means traffic
    const tst = bonuses.traffic.direct + bonuses.traffic.indirect
    const clanarine = membershipBonuses.traffic.direct + membershipBonuses.traffic.indirect

    return (
        <div className="w-full flex h-full flex-col flex-auto gap-4">
            <div className="bg-gradient-gold flex flex-col justify-center flex-auto p-6 text-primary-white">
                <span className="text-h2 font-baskerville">{Number(tst + clanarine).toLocaleString('sl-SI', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })}<span className="text-h4"> EUR</span></span>
                <span className="text-primary-light-gray font-bold text-body-extra-small">PROMET VSE SKUPAJ</span>
            </div>
            <div className="flex gap-x-4 overflow-x-auto no-scrollbar">
                <div className="w-full flex flex-col bg-primary-dark-gray pl-6 pr-16 text-primary-white space-y-4 pb-7 pt-14">
                    <p className="text-h5 font-baskerville text-nowrap">{Number(clanarine).toLocaleString('sl-SI', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })}<span className="text-body-big-2"> EUR</span></p>
                    <p className="text-primary-light-gray font-bold text-body-extra-small text-nowrap">PROMET PREMIUM</p>
                </div>
                <div className="w-full flex flex-col bg-primary-dark-gray pl-6 pr-16 text-primary-white space-y-4 pb-7 pt-14">
                    <p className="text-h5 font-baskerville text-nowrap">{Number(tst).toLocaleString('sl-SI', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })}<span className="text-body-big-2"> EUR</span></p>
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
