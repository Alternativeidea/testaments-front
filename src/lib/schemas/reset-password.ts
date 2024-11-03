import * as z from 'zod'

export const ResetPasswordFormSchema = z.object({
    email: z
        .string()
        .email({ message: 'Neveljaven e-mail naslov' })
})
