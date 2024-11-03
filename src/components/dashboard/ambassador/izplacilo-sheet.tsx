'use client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Icons } from '@/components/ui/icons'
import { Ilustrations } from '@/components/ui/ilustrations'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from '@/components/ui/sheet'
import { createWithdraws } from '@/lib/services/ambassadors'
import { getBalance } from '@/lib/services/bonuses'
import { CreditCard } from 'lucide-react'
import { useEffect, useState } from 'react'
import DynamicNumber from 'react-dynamic-number'
import { toast } from 'sonner'

// Withdraw From
export default function IzplaciloSheet({ sheetDisabled, accounts, preselectedAccount } : {sheetDisabled: boolean, preselectedAccount: number, accounts: AccountProps[]}) {
    const [openForm, setOpenForm] = useState<boolean>(false)
    const [openConfirmForm, setOpenConfirmForm] = useState<boolean>(false)
    const [quantity, setQuantity] = useState<number>(0)
    const [balance, setBalance] = useState<number>(0)
    const [disabled, setDisabled] = useState<boolean>(true)
    // AccountData
    const [accountId, setAccountId] = useState<number | undefined>(undefined)
    const [accountSelected, setAccountSelected] = useState<AccountProps | undefined>()

    useEffect(() => {
        const fetchData = async () => {
            const data = await getBalance()
            setBalance(data.balance)
            setQuantity(0)
            setAccountId(preselectedAccount)
        }
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [preselectedAccount])

    useEffect(() => {
        setAccountId(accountId)
        const selectedAccount = accounts.find(account => account.id === accountId)
        setAccountSelected(selectedAccount)
        setDisabled(quantity < 50 || quantity > balance || !accountId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accountId, quantity])

    useEffect(() => {
        if (openForm === false) {
            // closeAll()
            setQuantity(0)
            setOpenForm(false)
            setOpenConfirmForm(false)
            setDisabled(true)
        }
    }, [openForm])

    const handleAccountChange = (e: string) => {
        setAccountId(parseInt(e))
        const selectedAccount = accounts.find(account => account.id === accountId)
        setAccountSelected(selectedAccount)
    }

    function IzplaciloConfirm({ quantity, disabled, accountSelected }: { quantity: number, disabled: boolean, accountSelected?: AccountProps }) {
        const [success, setSuccess] = useState<boolean>(false)
        const [isLoading, setIsLoading] = useState<boolean>(false)
        const { number, type, name, address, swift, company } = accountSelected ?? {}

        async function handleSubmit() {
            setIsLoading(true)
            if (!accountSelected) {
                toast.error('Ninguna cuenta seleccionada.')
                return
            }
            const payload = {
                quantity,
                accountId: accountSelected.id
            }
            await createWithdraws(payload)
            setIsLoading(false)
            setSuccess(true)
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
        }

        function closeAll() {
            setQuantity(0)
            setOpenForm(false)
            setOpenConfirmForm(false)
            setDisabled(true)
        }

        return (
            <Sheet open={openConfirmForm} onOpenChange={setOpenConfirmForm}>
                <SheetTrigger asChild>
                    <Button disabled={disabled || quantity < 50 || !accountId} className='w-full'>
                        Nadaljuj
                    </Button>
                </SheetTrigger>
                <SheetContent className='w-full lg:!max-w-[420px] h-full p-0 overflow-y-scroll no-scrollbar'>
                    {success
                        ? <SuccessScreen close={closeAll}/>
                        : <div>
                            <SheetHeader className='flex items-start w-full shadow-dashboard-header py-8'>
                                <p className="pl-4 text-h6 font-baskerville">Izplačilo</p>
                            </SheetHeader>
                            <div className='flex flex-col justify-start min-h-[calc(100%-100px)]'>
                                <div className='flex justify-between items-start w-full bg-primary-white shadow-box px-7 space-y-0 py-8'>
                                    <p className='font-dm-sans uppercase'>ZNESEK</p>
                                    <p className='font-bold'>{quantity.toLocaleString('sl-SL', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })} EUR</p>
                                </div>
                                <div className='flex justify-between items-start w-full bg-primary-white shadow-box px-7 space-y-0 py-8'>
                                    <p className='font-dm-sans uppercase'>STROŠEK OBDELAVE</p>
                                    <b>5,00 EUR</b>
                                </div>
                                {accountSelected &&
                            <div className='flex flex-col justify-between items-start w-full bg-primary-white shadow-box px-7 space-y-0 py-2'>
                                <p className='font-dm-sans uppercase'>TRR RAČUN</p>
                                <div className="flex flex-col gap-y-1 items-start w-full py-4">
                                    <div className='flex items-center gap-x-4 justify-start w-full'>
                                        <CreditCard size={36} />
                                        <p className='font-bold text-body-big'>{number}</p>
                                    </div>
                                    <p className='font-bold'>{type === 1 && 'FIZIČNI RAČUN'}</p>
                                    <p className='font-bold'>{type === 2 && 'POSLOVNI RAČUN'}</p>
                                    <p className='text-body-small'>{name}</p>
                                    <p className='text-body-small'>{address}</p>
                                    <p className='text-body-small'>{swift}</p>
                                    {type === 2 && <p className='font-bold'>{company}</p>}
                                </div>
                            </div>
                                }
                            </div>
                            <SheetFooter className='absolute bottom-0 shadow-sheet-section w-full px-4 py-4 flex !flex-col'>
                                <div className='flex flex-col items-center justify-center h-24'>
                                    <div className="flex w-full justify-between items-center py-8 px-2">
                                        <p className='text-body-small'>VSE SKUPAJ ZA IZPLAČILO</p>
                                        <div className='flex flex-col items-end justify-end'>
                                            <b>{quantity > 5
                                                ? (quantity - 5).toLocaleString('sl-SI', {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2
                                                })
                                                : 0} EUR</b>
                                            <p className='text-body-extra-small'>*Znesek že vsebuje DDV</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex items-center justify-center w-full py-2 px-4 gap-x-2'>
                                    <SheetClose asChild>
                                        <Button variant={'light'}>
                                            <Icons.ArrowLeft />
                                        </Button>
                                    </SheetClose>
                                    <Button disabled={isLoading} onClick={handleSubmit} className='flex items-center justify-center w-full'>
                                        {isLoading && (
                                            <Icons.Spinner className="mr-2 h-4 w-4 animate-spin my-auto" />
                                        )}
                                        <p className=''>Potrdi</p>
                                    </Button>
                                </div>
                            </SheetFooter>
                        </div>
                    }
                </SheetContent>
            </Sheet>
        )
    }

    return (
        // withdraw form
        <Sheet open={openForm} onOpenChange={setOpenForm}>
            <SheetTrigger asChild>
                <Button disabled={sheetDisabled}>Izplačaj</Button>
            </SheetTrigger>
            <SheetContent className='w-full lg:!max-w-[420px] h-full p-0  overflow-y-scroll no-scrollbar'>
                <SheetHeader className='flex items-start w-full shadow-button py-8'>
                    <p className="pl-4 text-h6 font-baskerville">Izplačilo</p>
                </SheetHeader>
                <div className='w-full h-[calc(100%-90px)] relative overflow-y-scroll no-scrollbar '>
                    <div className='flex flex-col gap-y-4 w-full p-4 py-6'>
                        <div className='flex flex-col gap-y-2'>
                            <div className='flex justify-between w-full'>
                                <Label>Vnesite znesek</Label>
                                <span className={`text-primary-medium-gray/60 text-body-small ${quantity < 50 && '!text-accent-red'}`}>Min. 50 EUR</span>
                            </div>
                            <DynamicNumber
                                className= 'flex h-[45px] w-full rounded-none border border-primary-medium-gray bg-primary-white text-body-big-2 font-medium px-4 py-3 ring-offset-primary-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:font-normal placeholder:text-primary-medium-gray/50 focus-visible:placeholder:text-primary-medium-gray focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                                separator={','}
                                positive={true}
                                negative={false}
                                fraction={4}
                                thousand={true}
                                defaultValue={quantity}
                                onChange={(e, modelValue) => {
                                    // console.log(viewValue)
                                    setQuantity(modelValue)
                                    setDisabled(modelValue < 50 || modelValue > balance || !accountId)
                                }}
                            />
                            <div className='flex justify-between w-full text-body-extra-small px-4'>
                                <span className={`${quantity > balance && '!text-accent-red'}`}>Raspoložljiva sredstva za izplačilo: <b>{balance.toLocaleString('sl-SL', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })} EUR</b></span>
                                <span onClick={() => setQuantity(balance)}>MAX</span>
                            </div>
                            <Separator className='bg-primary-light-gray my-4' />
                        </div>
                        <div className='flex flex-col gap-y-2'>
                            <Label>Sredstva ki bodo odvzeta z vašega računa</Label>
                            <Input placeholder='0,00 EUR' value={`${quantity > 0
                                ? quantity.toLocaleString('sl-SI', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })
                                : '0,00'} EUR`} readOnly />
                        </div>
                        <div className='flex flex-col gap-y-2'>
                            <Label>Strošek obdelave</Label>
                            <Input placeholder='5,00 EUR' value={'5,00 EUR'} readOnly />
                        </div>
                        <Separator className='bg-primary-light-gray my-4' />
                        <div className='flex flex-col items-start w-full'>
                            <h3 className='font-bold'>Izberi TRR račun</h3>
                            <RadioGroup
                                defaultValue={`${preselectedAccount}`}
                                onValueChange={handleAccountChange}
                                className='w-full my-4'>
                                {accounts.map((item) => (
                                    <Card key={item.id} className="flex flex-col gap-y-1 items-start bg-primary-light-gray/20 w-full p-4 border-none">
                                        <RadioGroupItem value={`${item.id}`} id={`${item.id}`} />
                                        <AccountCard {...item}/>
                                    </Card>
                                ))}
                            </RadioGroup>
                        </div>
                    </div>
                    {/* Footer */}
                    <div className='sticky bottom-0 shadow-sheet-section w-full px-4 py-4 bg-primary-white'>
                        <div className='flex flex-col items-center justify-center h-32'>
                            <div className="flex w-full justify-between items-center py-8 px-2">
                                <p className='text-body-small'>VSE SKUPAJ ZA IZPLAČILO</p>
                                <div className='flex flex-col items-end justify-end'>
                                    <b>{ quantity > 5
                                        ? Number(quantity - 5).toLocaleString('sl-SI', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        })
                                        : '0,00'} EUR</b>
                                    <p className='text-body-extra-small'>*Znesek že vsebuje DDV</p>
                                </div>
                            </div>
                        </div>
                        <IzplaciloConfirm
                            quantity={quantity}
                            disabled={disabled}
                            accountSelected={accountSelected}
                        />
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}

// AccountCard
function AccountCard({ number, type, name, address, swift, company, companyAddress, companyTin } : AccountProps) {
    return (
        <div className='w-full flex flex-col gap-2'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <CreditCard />
                    <span className='text-body-medium font-bold'>{number.replace(/(.{4})/g, '$1 ').trim()}</span>
                </div>
                {/* <div className='flex items-center gap-2'>
                <button
                    className='w-fit'
                >Uredi</button>
                <button
                    className='text-accent-red w-fit'
                >Izbriši</button>
            </div> */}
            </div>
            <span className="text-body-medium font-bold">
                {type === 1 && 'FIZIČNI RAČUN'}
                {type === 2 && 'POSLOVNI RAČUN'}
            </span>
            <p className="text-body-small">{name}</p>
            {type === 2 && <p className="text-body-small">{company}</p>}
            {type === 2 && <p className="text-body-small">{companyAddress}</p>}
            {type === 1 && <p className="text-body-small">{address}</p>}
            {type === 2 && <p className="text-body-small">{companyTin}</p>}
            <p className="text-body-small">{swift}</p>
        </div>
    )
}

// Success Screen
function SuccessScreen({ close } : { close : () => void}) {
    return (
        <div className='flex flex-col items-center justify-between py-12 gap-y-12 absolute w-full top-0 left-0 h-screen bg-primary-white overflow-hidden'>
            <div className='flex flex-col items-center w-full gap-y-6 pt-[180px]'>
                <Ilustrations.Email />
                <div className='flex flex-col items-center justify-center text-center px-2'>
                    <h3 className='text-h5 font-baskerville'>Potrdite vaš zahtevek</h3>
                    <p className='text-center'>Obveščamo vas, da smo vam poslali e-pošto za verifikacijo, ki je potrebna za potrditev zahtevka izplačila.</p>
                    <p className='text-center'>Takoj ko potrdite zahtevek preko e-pošte, bo izplačilo poslano v obdelavo.</p>
                </div>
            </div>
            <Button onClick={close} className='w-3/5'>
            Končaj
            </Button>
        </div>
    )
}
