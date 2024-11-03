interface minWill {
    id: number
}
interface HeirProps {
    id?: number
    name: string
    address: string
    postcode: string
    city: string
    residenceCountry: string
    areaCode: string
    phone: string
    email: string
    relationship: string
    wills?: minWill[]
}
