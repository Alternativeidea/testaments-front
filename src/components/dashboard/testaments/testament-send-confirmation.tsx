'use client'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { Ilustrations } from '@/components/ui/ilustrations'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetClose, SheetContent } from '@/components/ui/sheet'
import { verifySendTransaction } from '@/lib/services/transactions'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface TransactionDataProps {
    id: number
    quantity: string
    status: number
    rate: null | number
    reference: string
    total: string
    type: number
    createdAt: string
    updatedAt: string
    userId: number
    reviewerId: null | number
    toUserId: number
    to: {
        id: number
        name: string
        email: string
    }
}

export default function TestamentSendConfirmation({ code }: { code: string }) {
    const [isOpen, setIsOpen] = useState<boolean>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [transactionData, setTransactionData] = useState<TransactionDataProps>()
    const router = useRouter()

    useEffect(() => {
        const fetchData = async () => {
            const payload = {
                code
            }
            try {
                const { transaction } = await verifySendTransaction(payload)
                setIsOpen(true)
                setTransactionData(transaction)
                router.refresh()
            } catch (error) {
                if (error instanceof Error) {
                    setIsOpen(false)
                    const err = JSON.parse(error.message)
                    toast.error('Nekaj je šlo narobe.', {
                        description: err.message
                    })
                }
            }
            setIsLoading(false)
        }
        if (code) {
            fetchData()
            setIsLoading(true)
        }
    }, [code])

    const formatNewDate = (date : string) => {
        const newDate = new Date(date)
        const formattedDate = `${newDate.getDate()}.${newDate.getMonth() + 1}.${newDate.getFullYear()}`
        return formattedDate
    }

    return (
        <div>
            <Sheet open={isOpen}>
                <SheetContent className='w-full lg:!max-w-[420px] h-full p-0'>
                    {isLoading && transactionData
                        ? <div className='flex items-center justify-center h-full bg-primary-white relative z-[200] p-6'>
                            <Icons.Spinner className="mr-2 h-12 w-12 animate-spin" />
                        </div>
                        : <div className='flex flex-col w-full justify-between h-full bg-primary-white relative z-[200] p-6'>
                            <div className='flex flex-col justify-end items-center w-full h-2/3 gap-y-6'>
                                <Ilustrations.Wallet />
                                <h3 className='text-h5 font-baskerville text-center'>Vaša transakcija je bila uspešna!</h3>
                                <div className='flex flex-col items-center justify-center text-center px-2 w-full gap-y-4'>
                                    <div className='flex justify-between w-full'>
                                        <p className='uppercase text-left'>ID TRANSAKCIJE</p>
                                        <p className='font-bold text-right'>{transactionData?.id}</p>
                                    </div>
                                    <Separator className='w-full h-[1px] bg-primary-light-gray' />
                                    <div className='flex justify-between w-full'>
                                        <p className='uppercase text-left'>PREJEMNIK</p>
                                        <p className='font-bold text-right'>{transactionData?.to.email}</p>
                                    </div>
                                    <Separator className='w-full h-[1px] bg-primary-light-gray' />
                                    <div className='flex justify-between w-full'>
                                        <p className='uppercase text-left'>DATUM ZAHTEVKA</p>
                                        <p className='font-bold text-right'>{transactionData?.createdAt ? formatNewDate(transactionData.createdAt) : ' - '}</p>
                                    </div>
                                    <Separator className='w-full h-[1px] bg-primary-light-gray' />
                                    <div className='flex justify-between w-full'>
                                        <p className='uppercase text-left'>DATUM OBDELAVE</p>
                                        <p className='font-bold text-right'>{transactionData?.updatedAt ? formatNewDate(transactionData.updatedAt) : ' - '}</p>
                                    </div>
                                    <Separator className='w-full h-[1px] bg-primary-light-gray' />
                                    <div className='flex justify-between w-full'>
                                        <p className='uppercase text-left'>VSOTA</p>
                                        <p className='font-bold text-right'>{Number(transactionData?.quantity).toLocaleString('sl-SI', {
                                            minimumFractionDigits: 4,
                                            maximumFractionDigits: 4
                                        })} TST</p>
                                    </div>
                                    <Separator className='w-full h-[1px] bg-primary-light-gray' />
                                </div>
                            </div>
                            <SheetClose asChild>
                                <Button onClick={() => setIsOpen(false)} className='w-full'>
                                    Končaj
                                </Button>
                            </SheetClose>
                        </div>
                    }
                </SheetContent>
            </Sheet>
        </div>
    )
}
