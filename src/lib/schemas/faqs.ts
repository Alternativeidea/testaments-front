import * as z from 'zod'

export const CreateFaqSchema = z.object({
    question: z
        .string({
            required_error: ''
        })
        .min(2, { message: 'Ime mora vsebovati vsaj 2 znaka' }),
    response: z
        .string(),
    section: z
        .string(),
    active: z
        .boolean()
        .optional(),
    isFeatured: z
        .boolean()
        .optional()
})

export const EditFaqSchema = z.object({
    question: z
        .string({
            required_error: ''
        })
        .min(2, { message: 'Ime mora vsebovati vsaj 2 znaka' })
        .optional(),
    response: z
        .string()
        .optional(),
    section: z
        .string()
        .optional(),
    active: z
        .string()
        .optional(),
    isFeatured: z
        .boolean()
        .optional()
})
