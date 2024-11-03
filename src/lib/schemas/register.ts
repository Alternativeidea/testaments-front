import * as z from 'zod'

export const RegisterFormSchema = z.object({
    email: z
        .string()
        .email('S tem e-poštnim naslovom nismo našli uporabnika. Prosimo, vnesite e-poštni naslov, ki je povezan z vašim računom.'),
    password: z
        .string()
        .min(8, 'Vpisali ste napačno geslo'),
    confirmPassword: z
        .string()
        .min(8, 'Vpisali ste napačno geslo'),
    isEnabledTerms: z
        .boolean(),
    isEnabledInfo: z
        .boolean()
}).superRefine((values, ctx) => {
    if (!values.isEnabledTerms) {
        ctx.addIssue({
            message: 'Pogoje je treba sprejeti',
            code: z.ZodIssueCode.custom,
            path: ['isEnabledTerms']
        })
    }
    if (values.password !== values.confirmPassword) {
        ctx.addIssue({
            message: 'Gesli se ne ujemata',
            code: z.ZodIssueCode.custom,
            path: ['confirmPassword']
        })
    }

    return ctx
})
