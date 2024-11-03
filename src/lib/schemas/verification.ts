import * as z from 'zod'

export const AcceptVerificationFormSchema = z.object({
    isCheckedTruthInfo: z
        .boolean(),
    isCheckedTerms: z
        .boolean(),
    isCheckedEmailSubscription: z
        .boolean()
}).superRefine((values, ctx) => {
    if (!values.isCheckedTruthInfo) {
        ctx.addIssue({
            message: 'Treba je potrditi, da so podatki resnični in pravilni',
            code: z.ZodIssueCode.custom,
            path: ['isCheckedTruthInfo']
        })
    }
    if (!values.isCheckedTerms) {
        ctx.addIssue({
            message: 'Pogoje je treba sprejeti',
            code: z.ZodIssueCode.custom,
            path: ['isCheckedTerms']
        })
    }
    if (!values.isCheckedEmailSubscription) {
        ctx.addIssue({
            message: 'Za prejemanje e-pošte se morate strinjati',
            code: z.ZodIssueCode.custom,
            path: ['isCheckedEmailSubscription']
        })
    }

    return ctx
})

export const VerificationPersonalInfoFormSchema = z.object({
    name: z
        .string()
        .min(2, { message: 'Ime mora vsebovati vsaj 2 znaka' }),
    lastName: z
        .string()
        .min(2, { message: 'Priimek mora biti dolg vsaj 2 znaka' }),
    birthdate: z
        .date({
            required_error: 'Neveljaven datum'
        }),
    birthplace: z
        .string()
        .min(2, { message: 'Država mora vsebovati vsaj 2 znaka' }),
    career: z
        .string()
        .min(2, { message: 'Vpišite svoj poklic tukaj' })
        .max(20, { message: 'Kariera ne sme vsebovati več kot 20 znakov' })
})

export const VerificationAddressFormSchema = z.object({
    address: z
        .string()
        .min(2, { message: 'Naslov mora vsebovati vsaj 2 znaka' })
        .max(50, { message: 'Naslov ne sme biti daljši od 50 znakov' }),
    zipcode: z
        .string()
        .min(2, { message: 'Poštna številka mora vsebovati vsaj 2 znaka' })
        .max(10, { message: 'Poštna številka ne sme biti daljša od 10 znakov' }),
    city: z
        .string()
        .min(2, { message: 'Mesto mora vsebovati vsaj 2 znaka' })
        .max(20, { message: 'Mesto ne sme biti daljše od 20 znakov' }),
    countryId: z
        .string()
        .min(2, { message: 'Država vsebuje vsaj 2 znaka' })
})

// export const VerificationProfesionalFormSchema = z.object({
//     tin: z
//         .string()
//         .min(2, { message: 'Davčna številka mora vsebovati vsaj 2 znaka' })
//         .max(10, { message: 'Davčna številka ne sme vsebovati več kot 10 znakov' }),
//     career: z
//         .string()
//         .min(2, { message: 'Kariera mora vsebovati vsaj 2 lika' })
//         .max(20, { message: 'Kariera ne sme vsebovati več kot 20 znakov' }),
//     emso: z
//         .string()
//         .length(13, { message: 'Emso neveljaven' })
// })
