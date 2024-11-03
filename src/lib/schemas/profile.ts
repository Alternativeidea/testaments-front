import * as z from 'zod'

export const ProfileFormSchema = z.object({
    address: z
        .string({
            invalid_type_error: 'To polje mora vsebovati besedilo'
        })
        .min(2, { message: 'Naslov mora imeti vsaj 2 znakov' }),
    areaCode: z
        .string()
        .min(1, { message: 'Država mora vsebovati vsaj 1 znaka' }),
    phone: z
        .string()
        .min(8, { message: 'Neveljavna telefonska številka' })
        .max(11, { message: 'Neveljavna telefonska številka' }),
    career: z
        .string({
            invalid_type_error: 'To polje mora vsebovati besedilo'
        })
        .min(2, { message: 'Poklic mora imeti vsaj 2 lika' })
})
