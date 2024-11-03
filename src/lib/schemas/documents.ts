import * as z from 'zod'

export const NewDocumentSchema = z.object({
    name: z
        .string({
            required_error: ''
        })
        .min(2, { message: 'Ime mora vsebovati vsaj 2 znaka' }),
    description: z
        .string(),
    url: z
        .string()
        .optional(),
    processingDate: z
        .date({
            required_error: 'Neveljaven datum'
        })
})
