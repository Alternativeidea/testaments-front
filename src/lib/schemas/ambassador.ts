import * as z from 'zod'

export const AcceptAmbassadorTermsFormSchema = z.object({
    isChecked: z
        .boolean()
}).superRefine((values, ctx) => {
    if (!values.isChecked) {
        ctx.addIssue({
            message: 'Treba je potrditi, da so podatki resnični in pravilni',
            code: z.ZodIssueCode.custom,
            path: ['isChecked']
        })
    }

    return ctx
})
