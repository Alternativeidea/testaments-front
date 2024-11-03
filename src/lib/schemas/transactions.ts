import * as z from 'zod'

export const TransactionFormSchema = (maxValue: number) => z.object({
    quantity: z
        .number({
            required_error: '',
            invalid_type_error: ''
        })
        .min(0.0001, 'Nimate dovolj sredstev')
        .max(maxValue, 'Nimate dovolj sredstev')
})

export const BuyTransactionFormSchema = z.object({
    quantity: z
        .number({
            required_error: '',
            invalid_type_error: ''
        })
        .min(0.0001, 'Niste poslali ničesar')
})

export const sendTransactionFormSchema = (maxValue : number) => z.object({
    quantity: z
        .number({
            required_error: '',
            invalid_type_error: ''
        })
        .min(0.0001, 'Niste poslali ničesar')
        .max(maxValue, 'Nimate dovolj sredstev'),
    email: z
        .string()
        .email({ message: 'Neveljaven e-mail naslov' })
})

export const TstConfirmSchema = z.object({
    status: z
        .number(),
    paymentMethod: z
        .string(),
    notes: z
        .string()
})

export const TstManualSchema = z.object({
    quantity: z
        .number({
            invalid_type_error: ''
        })
        .optional(),
    createdAt: z
        .date({
            required_error: 'Neveljaven datum'
        }),
    paymentMethod: z
        .enum(['iban', 'gotovina', 'crypto', 'lastno zlato', 'drugo'],
            { required_error: 'Prosimo izberite tip naročila' }),
    notes: z
        .string()
        .optional(),
    rate: z
        .number({
            required_error: 'This field is required'
        })
        .optional()
})

export const UpdateRateSchema = z.object({
    type: z
        .enum(['buy', 'sell']),
    rate: z
        .number({
            required_error: '',
            invalid_type_error: ''
        })
})
