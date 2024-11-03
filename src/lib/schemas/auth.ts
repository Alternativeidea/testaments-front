import * as z from 'zod'

export const AuthFormSchema = z.object({
    email: z
        .string()
        .optional(),
    password: z
        .string()
})
