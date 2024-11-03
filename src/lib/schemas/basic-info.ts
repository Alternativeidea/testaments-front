import * as z from 'zod'

// const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/

export const BasicInfoFormSchema = z.object({
    gender: z
        .enum(['moški', 'ženska'], { required_error: 'Prosimo izberite spol' }),
    name: z
        .string()
        .min(2, { message: 'Ime mora vsebovati vsaj 2 znaka' }),
    lastName: z
        .string()
        .min(2, { message: 'Priimek mora biti dolg vsaj 2 znaka' }),
    areaCode: z
        .string()
        .min(1, { message: 'Država mora vsebovati vsaj 1 znaka' }),
    phone: z
        .string()
        .min(8, { message: 'Neveljavna telefonska številka' })
        .max(11, { message: 'Neveljavna telefonska številka' })
        // .regex(phoneRegex, { message: 'Neveljavna telefonska številka' })
})
