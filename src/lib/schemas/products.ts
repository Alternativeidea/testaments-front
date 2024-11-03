import * as z from 'zod'

export const EditProductSchema = z.object({
    name: z
        .string({
            required_error: ''
        })
        .min(2, { message: 'Ime mora vsebovati vsaj 2 znaka' })
        .optional(),
    picture: z
        .string()
        .optional(),
    description: z
        .string()
        .optional(),
    categoryId: z
        .string()
        .optional(),
    price: z
        .number()
        .optional(),
    updatedAt: z
        .date()
        .optional(),
    status: z
        .string()
        .optional(),
    isFeatured: z
        .boolean()
        .optional(),
    publishedAt: z
        .date()
        .optional(),
    characteristics: z
        .array(z.object({}))
        .optional()
})

export const CreateProductSchema = z.object({
    name: z
        .string({
            required_error: ''
        })
        .min(2, { message: 'Ime mora vsebovati vsaj 2 znaka' }),
    picture: z
        .string()
        .optional(),
    status: z
        .enum(['0', '1']),
    description: z
        .string(),
    categoryId: z
        .string(),
    price: z
        .number()
        .optional(),
    publishedAt: z
        .date(),
    isFeatured: z
        .boolean()
        .optional()
})
