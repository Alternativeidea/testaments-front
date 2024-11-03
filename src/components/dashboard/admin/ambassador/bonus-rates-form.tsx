'use client'

import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { Ilustrations } from '@/components/ui/ilustrations'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from '@/components/ui/sheet'
import { getCurrentBonusesRates, updateBonusesRates } from '@/lib/services/admin/ambassadors'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface BonusRatesFormProps {
    formType: 'tst' | 'premium'
}

export default function BonusRatesForm({ formType }: BonusRatesFormProps) {
    const router = useRouter()
    const [data, setData] = useState<BonusRatesProps[]>()
    const [premium, setPremium] = useState<BonusRatesProps>()
    const [tst, setTST] = useState<BonusRatesProps>()
    const [type, setType] = useState<'tst' | 'premium'>(formType)
    const [openForm, setOpenForm] = useState<boolean>(false)
    const [tstValue, setTstValue] = useState<number | undefined>()
    const [tstIndirectValue, setTstIndirectValue] = useState<number | undefined>()
    const [premiumValue, setPremiumValue] = useState<number | undefined>()
    const [premiumIndirectValue, setPremiumIndirectValue] = useState<number | undefined>()

    function closeAll() {
        setOpenForm(false)
        router.refresh()
    }

    useEffect(() => {
        async function fetchBonusData() {
            const data: BonusRatesProps[] = await getCurrentBonusesRates()
            const premium: BonusRatesProps | undefined = data.find(bonus => bonus.type === 'premium')
            const tst: BonusRatesProps | undefined = data.find(bonus => bonus.type === 'tst')
            setData(data)
            setPremium(premium)
            setTST(tst)
        }
        fetchBonusData()
    }, [])

    const isButtonDisabled = () => {
        if (type === 'tst') {
            return (tstValue === undefined || tstValue === null) || (tstIndirectValue === undefined || tstIndirectValue === null)
        } else if (type === 'premium') {
            return (premiumValue === undefined || premiumValue === null) || (premiumIndirectValue === undefined || premiumIndirectValue === undefined)
        }
        return true
    }

    function SuccessScreen() {
        return (
            <div className='absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-between gap-y-12 overflow-hidden bg-primary-white py-12'>
                <div className='flex w-full flex-col items-center gap-y-6 pt-[180px]'>
                    <Ilustrations.List />
                    <div className='flex flex-col items-center justify-center px-2 text-center'>
                        <h3 className='font-baskerville text-h5'>Čestitamo!</h3>
                        <p className='font-baskerville text-h5'>
                            Akcija je bila uspešno opravljena.
                        </p>
                    </div>
                </div>
                <SheetClose asChild>
                    <Button onClick={closeAll} className='w-3/5'>
                        Končaj
                    </Button>
                </SheetClose>
            </div>
        )
    }

    return (
        <Sheet open={openForm} onOpenChange={setOpenForm}>
            <SheetTrigger asChild>
                <Button className='w-full'>Spremeni koeficient</Button>
            </SheetTrigger>
            <SheetContent className='h-full w-full overflow-y-scroll p-0 no-scrollbar lg:!max-w-[420px]'>
                <SheetHeader className='flex w-full items-start py-8 shadow-dashboard-header'>
                    <p className="pl-4 font-baskerville text-body-big">Sprememba Koeficienta provizije</p>
                </SheetHeader>
                <div className='flex min-h-[calc(100%-160px)] flex-col justify-between px-6'>
                    <div className='flex flex-col gap-y-4 px-2 py-4'>
                        <p className='font-baskerville text-body-big'>Provizija</p>
                        <RadioGroup
                            className='flex w-full justify-between'
                            onValueChange={() => {
                                setType(type === 'tst' ? 'premium' : 'tst')
                            }}
                            defaultValue={type}>
                            <div className='flex w-full items-center justify-start'>
                                <RadioGroupItem value='tst' />
                                <Label>Dodaj TST</Label>
                            </div>
                            <div className='flex w-full items-center justify-start'>
                                <RadioGroupItem value='premium' />
                                <Label>Premium</Label>
                            </div>
                        </RadioGroup>
                        <div className='flex flex-col gap-y-4'>
                            <Input
                                readOnly={true}
                                placeholder={type === 'tst' ? 'Dodaj TST' : 'Premium'} />
                            {type === 'premium' && <>
                                <div className='flex flex-col gap-y-2'>
                                    <Label>Koeficient provizije <b>1. Nivoja</b></Label>
                                    <Input
                                        type='number'
                                        min={0}
                                        max={100}
                                        onKeyDown={preventNegativeValues}
                                        placeholder={`${data ? ((premium?.direct ?? 0) * 100) + '%' : ''}`}
                                        onChange={(e) => {
                                            console.log(premiumValue)
                                            if (e.target.value.trim() === '') {
                                                console.log('Input is empty')
                                                setPremiumValue(undefined)
                                            } else {
                                                setPremiumValue(Number(e.target.value))
                                            }
                                            isButtonDisabled()
                                        }
                                        }
                                    />
                                </div>
                                <div className='flex flex-col gap-y-2'>
                                    <Label>Koeficient provizije <b>2. Nivoja</b></Label>
                                    <Input
                                        type='number'
                                        min={0}
                                        max={100}
                                        onKeyDown={preventNegativeValues}
                                        placeholder={`${data ? ((premium?.indirect ?? 0) * 100) + '%' : ''}`}
                                        onChange={(e) => {
                                            if (e.target.value.trim() === '') {
                                                console.log('Input is empty')
                                                setPremiumValue(undefined)
                                            } else {
                                                setPremiumIndirectValue(Number(e.target.value))
                                            }
                                            isButtonDisabled()
                                        }}
                                    />
                                </div>
                            </>
                            }
                            {type === 'tst' &&
                                <>
                                    <div className='flex flex-col gap-y-2'>
                                        <Label>Koeficient provizije <b>1. Nivoja</b></Label>
                                        <Input
                                            type='number'
                                            min={0}
                                            max={100}
                                            onKeyDown={preventNegativeValues}
                                            placeholder={`${data ? ((tst?.direct ?? 0) * 100) + '%' : ''}`}
                                            onChange={(e) => {
                                                if (e.target.value.trim() === '') {
                                                    setTstValue(Number(undefined))
                                                } else {
                                                    setTstValue(Number(e.target.value))
                                                }
                                                isButtonDisabled()
                                            }}
                                            required
                                        />
                                    </div>
                                    <div className='flex flex-col gap-y-2'>
                                        <Label>Koeficient provizije <b>2. Nivoja</b></Label>
                                        <Input
                                            type='number'
                                            min={0}
                                            max={100}
                                            onKeyDown={preventNegativeValues}
                                            placeholder={`${data ? ((tst?.indirect ?? 0) * 100) + '%' : ''}`}
                                            onChange={(e) => {
                                                if (e.target.value.trim() === '') {
                                                    setTstIndirectValue(undefined)
                                                } else {
                                                    setTstIndirectValue(Number(e.target.value))
                                                }
                                                isButtonDisabled()
                                            }}
                                            required
                                        />
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
                <SheetFooter className='flex w-full items-center justify-center px-6'>
                    <ConfirmScreen disabled={isButtonDisabled()} direct={type === 'premium' ? (premiumValue ?? 0) : (tstValue ?? 0)} indirect={type === 'premium' ? (premiumIndirectValue ?? 0) : (tstIndirectValue ?? 0)} type={type}>
                        <SuccessScreen />
                    </ConfirmScreen>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
interface BonusConfirmRatesProps {
    children: React.ReactNode
    direct: number
    indirect: number
    type: 'tst' | 'premium'
    disabled: boolean
}

function ConfirmScreen({ direct, indirect, type, children, disabled }: BonusConfirmRatesProps) {
    const [success, setSuccess] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    async function handleSubmit() {
        setSuccess(false)
        setLoading(true)
        const payload = {
            direct,
            indirect,
            type
        }

        try {
            await updateBonusesRates(payload)
            toast.success('Koeficienti so bili uspešno posodobljeni!', {
                position: 'bottom-center'
            })
        } catch (error) {
            if (error instanceof Error) {
                toast.error('Napaka pri posodabljanju koeficientov.', {
                    description: error.message
                })
            }
        } finally {
            setLoading(false)
            setSuccess(true)
        }
    }
    return (
        <Sheet>
            <SheetTrigger disabled={disabled} asChild>
                <Button className='w-full'>
                    Spremeni koeficient
                </Button>
            </SheetTrigger>
            <SheetContent className='h-full w-full overflow-y-scroll p-0 no-scrollbar lg:!max-w-[420px]'>
                {success
                    ? children
                    : <div className='absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-between gap-y-12 overflow-hidden bg-primary-white py-12'>
                        <div className='flex w-full flex-col items-center gap-y-6 pt-[180px]'>
                            <Ilustrations.List />
                            <div className='flex flex-col items-center justify-center px-2 text-center'>
                                <p className='font-baskerville text-h5'>
                                    Ste prepričani, da želite opraviti to spremembo?
                                </p>
                            </div>
                        </div>
                        <div className='flex w-full gap-x-4 px-6'>
                            <Button type='button' onClick={handleSubmit} disabled={loading} className='flex w-full gap-x-2'>
                                {loading && (
                                    <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                DA
                            </Button>
                            <SheetClose asChild>
                                <Button type='button' className='w-full' variant={'destructive'}>NE</Button>
                            </SheetClose>
                        </div>
                    </div>}
            </SheetContent>
        </Sheet>
    )
}

export const preventNegativeValues = (e: { key: string; preventDefault: () => unknown }) => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()
