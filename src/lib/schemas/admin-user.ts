import * as z from 'zod'

// const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/

export const EditUserFormSchema = z.object({
    name: z
        .string()
        .min(2, { message: 'Ime mora vsebovati vsaj 2 znaka' })
        .optional(),
    lastName: z
        .string()
        .min(2, { message: 'Priimek mora biti dolg vsaj 2 znaka' })
        .optional(),
    birthdate: z
        .date({
            required_error: 'Neveljaven datum'
        })
        .optional(),
    countryId: z
        .string()
        .optional(),
    // .min(2, { message: 'Država vsebuje vsaj 2 znaka' }),
    city: z
        .string()
        .min(2, { message: 'Mesto mora vsebovati vsaj 2 znaka' })
        .optional(),
    zipcode: z
        .string()
        .min(2, { message: 'Poštna številka mora vsebovati vsaj 2 znaka' })
        .optional(),
    tin: z
        .string()
        .min(2, { message: 'Davčna številka mora vsebovati vsaj 2 znaka' })
        .optional()
        .or(z.literal('')),
    emso: z
        .string()
        .min(13, { message: 'Emso neveljaven' })
        .max(13, { message: 'Emso neveljaven' })
        .optional()
        .or(z.literal('')),
    career: z
        .string()
        .min(2, { message: 'Kariera mora vsebovati vsaj 2 lika' })
        .optional(),
    address: z
        .string()
        .min(2, { message: 'Stalni naslov vsaj 2 lika' })
        .optional()
        .or(z.literal(''))
})
