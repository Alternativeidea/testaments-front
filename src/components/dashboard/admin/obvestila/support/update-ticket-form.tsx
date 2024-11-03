'use client'
// Next
import { useState } from 'react'
// Components
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { Separator } from '@/components/ui/separator'
import { SheetClose, SheetHeader } from '@/components/ui/sheet'
// Utils
import { updateAdminTicket } from '@/lib/services/admin/tickets'
import { format } from 'date-fns'
import { sl } from 'date-fns/locale'
import { toast } from 'sonner'

interface UpdateTicketFormProps {
    id: number
    name: string
    email: string
    subject: string
    message: string
    status: number
    updatedAt: string
}

export default function UpdateTicketForm({ id, name, email, subject, message, status, updatedAt }: UpdateTicketFormProps) {
    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)

    async function handleSubmit() {
        setLoading(true)
        const payload = {
            status: '2'
        }
        await updateAdminTicket(payload, id)
        try {
            toast.success('Urejeno!', {
                position: 'bottom-center'
            })
        } catch (error) {
            if (error instanceof Error) {
                const err = JSON.parse(error.message)
                toast.error('Nekaj je šlo narobe.', {
                    description: err.message
                })
            }
        }
        setSuccess(true)
        setLoading(false)
        location.reload()
    }

    return (
        <>
            {success
                ? <SuccessScreen />
                : <div className='flex flex-col justify-between w-full h-screen min-h-full'>
                    <SheetHeader className='flex items-start w-full shadow-button pt-8 pb-4'>
                        <p className="pl-4 text-h6 font-baskerville">Podpora / Zahtevek</p>
                        <p className="pl-4 font-baskerville">{name}</p>
                    </SheetHeader>
                    <div className='flex flex-col justify-between h-full p-6'>
                        <div className='flex flex-col h-full gap-y-4'>
                            <p className='text-body-medium py-2'>
                            Ko želite zaključiti zahtevek, prosimo, kliknite na gumb Zaključi podporo, ki se nahaja spodaj. Ob zaključku podpore bomo stranko obvestili po e-pošti.
                            </p>
                            <p className='font-bold py-2'>ID Ticket : {id.toString().padStart(4, '0')}</p>
                            <div className='flex justify-between w-full'>
                                <p className='text-body-medium'>Ime in priimek</p>
                                <p className='font-bold'>{name}</p>
                            </div>
                            <Separator className='w-full h-[1px] bg-primary-light-gray'/>
                            <div className='flex justify-between w-full'>
                                <p className='text-body-medium'>Email</p>
                                <p className='font-bold'>{email}</p>
                            </div>
                            <Separator className='w-full h-[1px] bg-primary-light-gray'/>
                            <div className='flex justify-between w-full'>
                                <p className='text-body-medium'>Predmet</p>
                                <p className='font-bold'>{subject}</p>
                            </div>
                            <Separator className='w-full h-[1px] bg-primary-light-gray'/>
                            <div className='flex justify-between w-full'>
                                <p className='text-body-medium'>Zaključeno</p>
                                <p className='font-bold'> {
                                    status === 2
                                        ? format(updatedAt, 'PP', { locale: sl })
                                        : '-'
                                }</p>
                            </div>
                            <Separator className='w-full h-[1px] bg-primary-light-gray'/>
                            <p className='text-body-medium'>Sporočilo</p>
                            <p>{message}</p>
                        </div>
                        <Button className='my-2' onClick={handleSubmit}
                            disabled={status === 2}>
                            {loading && (
                                <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Zaključi podporo
                        </Button>
                    </div>
                </div>
            }
        </>
    )
}

function SuccessScreen() {
    return (
        <div className='flex flex-col items-center justify-center gap-y-12 absolute w-full top-0 left-0 h-screen bg-primary-white overflow-hidden'>
            <div className='flex flex-col items-center w-full gap-y-6'>
                <h3 className='text-h5 font-baskerville'>Urejeno!</h3>
                <div className='flex flex-col gap-y-2 items-center justify-center text-center px-2'>
                    <p>Vaš proces je bil uspešno obdelan in opravljen.</p>
                </div>
                <SheetClose
                    asChild
                    className='flex justify-center w-full border-none outline-none'
                >
                    <Button
                        className='w-3/5'>
                        Končaj
                    </Button>
                </SheetClose>
            </div>
        </div>
    )
}
