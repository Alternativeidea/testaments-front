import * as z from 'zod'

export const NewPasswordFormSchema = z.object({
    password: z
        .string()
        .min(8, { message: 'Geslo mora imeti vsaj 8 znakov' }),
    confirmPassword: z
        .string()
        .min(8, { message: 'Geslo mora imeti vsaj 8 znakov' })
}).superRefine((values, ctx) => {
    if (values.password !== values.confirmPassword) {
        ctx.addIssue({
            message: 'Gesli se ne ujemata',
            code: z.ZodIssueCode.custom,
            path: ['confirmPassword']
        })
    }

    return ctx
})
