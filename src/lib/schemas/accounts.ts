import * as z from 'zod'

const ACCOUNT_TYPES = {
    PERSONAL: 1,
    BUSINESS: 2
} as const

export const PersonalAccountFormSchema = z.object({
    name: z
        .string()
        .min(2, { message: 'Vnesite ime in priimek lastnika računa' }),
    address: z
        .string()
        .min(2, { message: 'Vnesite naslov lastnika računa' })
        .max(50, { message: 'Vnesite naslov lastnika računa' }),
    number: z
        .string()
        .length(19, { message: 'Vnesite IBAN številko bačnega računa' }),
    swift: z
        .string()
        .min(8, { message: 'Vnesite SWIFT/BIC bančnega računa.' })
        .max(11, { message: 'Vnesite SWIFT/BIC bančnega računa.' }),
    type: z.nativeEnum(ACCOUNT_TYPES)
})

export const BusinessAccountFormSchema = z.object({
    name: z
        .string()
        .min(2, { message: 'Vnesite ime podjetja' }),
    companyTin: z
        .string()
        .min(2, { message: 'Vnesite davčno številko podjetja' }),
    number: z
        .string()
        .length(19, { message: 'Vnesite številko bančnega računa' }),
    swift: z
        .string()
        .min(8, { message: 'Vnesite SWIFT/BIC Banke' })
        .max(11, { message: 'Vnesite SWIFT/BIC Banke' }),
    company: z
        .string()
        .min(2, { message: 'Vnesite Ime in Priimek lastnika računa' }),
    companyAddress: z
        .string()
        .min(2, { message: 'Vnesite naslov podjetja' })
        .max(50, { message: 'Vnesite naslov podjetja' }),
    type: z.nativeEnum(ACCOUNT_TYPES)
})
