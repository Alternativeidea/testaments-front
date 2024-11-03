import * as z from 'zod'

export const ContactFormSchema = z.object({
    subject: z
        .enum(['TST/Zlato', 'Tržnica zapuščin', 'Tehnična podpora', 'Datoteke', 'Dokumenti', 'Transakcije', 'Ostalo', 'Oporoke'],
            { required_error: 'Prosim, izberite kategorijo.' }),
    message: z
        .string()
        .min(20, { message: 'Sporočilo mora vsebovati minimalno 20 znakov.' })
})
