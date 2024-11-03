interface MembershipBenefitProps {
    id: number
    value: string
    enabled: boolean
}

interface MembershipProps {
    id: number
    currency: string
    description: MembershipBenefitProps[]
    image: null
    name: string
    paymentMode: string
    price: number
    status: number
    subtitle: string
}
