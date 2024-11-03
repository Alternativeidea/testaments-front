import * as z from 'zod'

export const ChangeEmailFormSchema = z.object({
    email: z
        .string()
        .email({ message: 'Neveljaven e-mail naslov' }),
    confirmEmail: z
        .string()
        .email({ message: 'Neveljaven e-mail naslov' })
}).superRefine((values, ctx) => {
    if (values.email !== values.confirmEmail) {
        ctx.addIssue({
            message: 'E-mail naslovi se ne ujemajo',
            code: z.ZodIssueCode.custom,
            path: ['confirmEmail']
        })
    }

    return ctx
})
