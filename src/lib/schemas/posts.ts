import * as z from 'zod'

export const EditPostSchema = z.object({
    title: z
        .string({
            required_error: ''
        })
        .min(2, { message: 'Ime mora vsebovati vsaj 2 znaka' })
        .optional(),
    image: z
        .string()
        .optional(),
    resume: z
        .string()
        .url()
        .optional(),
    content: z
        .string()
        .optional(),
    categoryId: z
        .string()
        .optional(),
    publishedAt: z
        .date()
        .optional(),
    status: z
        .string()
        .optional(),
    isFeatured: z
        .boolean()
        .optional()
})

export const CreatePostSchema = z.object({
    title: z
        .string({
            required_error: ''
        })
        .min(2, { message: 'Ime mora vsebovati vsaj 2 znaka' }),
    image: z
        .string()
        .optional(),
    resume: z
        .string(),
    content: z
        .string(),
    categoryId: z
        .string(),
    publishedAt: z
        .date(),
    status: z
        .string(),
    isFeatured: z
        .boolean()
        .optional()
})
