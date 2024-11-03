interface BonusesProps {
    sums: {
        direct: number
        indirect: number
    }
    counts: {
        direct: number
        indirect: number
    }
    traffic: {
        direct: number
        indirect: number
    }
}

/* interface BonusRatesProps {
    createdAt: Date | string
    premium: number
    premiumIndirect: number
    tst: number
    tstIndirect: number
} */

interface BonusRatesProps {
    direct: number
    indirect: number
    type: 'tst' | 'premium'
    isCurrent: boolean
    createdAt: Date | string
}
