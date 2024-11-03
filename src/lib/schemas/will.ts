import * as z from 'zod'

export const WillAssetFormSchema = z.object({
    categoryId: z
        .number({ required_error: 'Izberite kategorijo' }),
    description: z
        .string()
        .min(2, { message: 'Opis mora vsebovati vsaj 2 znaka' })
})

export const WillHeirsFormSchema = z.object({
    heirs: z
        .array(
            z.object({
                id: z
                    .string()
                    .optional()
            })
        )
// })
}).superRefine((values, ctx) => {
    const areEmpty = values.heirs.every(({ id }) => id === '')
    if (areEmpty) {
        ctx.addIssue({
            message: 'Izberite vsaj enega dediča',
            code: z.ZodIssueCode.custom,
            path: [`heirs.${values.heirs.length - 1}.id`]
        })
        return ctx
    }
})

export const WillHeirFormSchema = z.object({
    name: z
        .string()
        .min(2, { message: 'Polno ime mora vsebovati vsaj 2 znaka' })
        .max(35, { message: 'Polno ime mora vsebovati največ 35 znakov' }),
    address: z
        .string()
        .min(2, { message: 'Naslov mora vsebovati vsaj 2 znaka' })
        .max(50, { message: 'Naslov ne sme biti daljši od 50 znakov' }),
    postcode: z
        .string()
        .min(2, { message: 'Poštna številka mora vsebovati vsaj 2 znaka' })
        .max(10, { message: 'Poštna številka ne sme biti daljša od 10 znakov' }),
    city: z
        .string()
        .min(2, { message: 'Mesto mora vsebovati vsaj 2 znaka' })
        .max(20, { message: 'Mesto ne sme biti daljše od 20 znakov' }),
    residenceCountry: z
        .string()
        .min(2, { message: 'Država mora vsebovati vsaj 2 znaka' }),
    areaCode: z
        .string()
        .min(1, { message: 'Država mora vsebovati vsaj 1 znaka' }),
    phone: z
        .string()
        .min(8, { message: 'Neveljavna telefonska številka' })
        .max(11, { message: 'Neveljavna telefonska številka' }),
    email: z
        .string()
        .email({ message: 'Neveljaven e-mail naslov' }),
    relationship: z
        .string()
        .min(2, { message: 'Razmerje mora vsebovati vsaj 2 znaka' })
})

export const WillSharesFormSchema = z.object({
    shares: z
        .array(
            z.object({
                share: z
                    .string().refine(v => {
                        const n = Number(v)
                        return !isNaN(n) && v?.length > 0 && n >= 1 && n <= 100
                    }, { message: 'Odstotek mora biti število med 1 in 100' }),
                constrains: z
                    .string()
                    // .min(2, { message: 'Pogoji morajo vsebovati vsaj 2 znaka' })
            })
        )
}).superRefine((values, ctx) => {
    const isEmpty = values.shares.some(({ share }) => share === '')
    if (!isEmpty) {
        const totalShare = values.shares.reduce((acc, curr) => acc + Number(curr.share), 0)
        if (totalShare !== 100) {
            values.shares.forEach((_, i) => {
                ctx.addIssue({
                    message: 'Skupni odstotek mora biti enak 100',
                    code: z.ZodIssueCode.custom,
                    path: [`shares.${i}.share`]
                })
            })
        }
        return ctx
    }
})

export const WillConstrainsFormSchema = z.object({
    constrains: z
        .string()
        // .min(2, { message: 'Pogoji morajo vsebovati vsaj 2 znaka' })
})
