import * as z from 'zod'

export const AdminWillAssetFormSchema = z.object({
    categoryId: z
        .number({ required_error: 'Izberite kategorijo' }),
    description: z
        .string()
        .min(2, { message: 'Opis mora vsebovati vsaj 2 znaka' }),
    date: z
        .date({
            required_error: 'Neveljaven datum'
        })
})
