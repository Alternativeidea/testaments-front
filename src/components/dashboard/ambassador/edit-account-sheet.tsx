'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Icons } from '@/components/ui/icons'
import { Ilustrations } from '@/components/ui/ilustrations'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTrigger
} from '@/components/ui/sheet'
import { invalidateCacheByPath } from '@/lib/actions/cache'
import { BusinessAccountFormSchema, PersonalAccountFormSchema } from '@/lib/schemas/accounts'
import { deleteAccount, updateAccount } from '@/lib/services/accounts'
import { allowOnlyAlphanumeric } from '@/lib/utils/form'
import { cn } from '@/lib/utils/style'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreditCard } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'
import { create } from 'zustand'
import { NewAccountSheetTrigger } from './new-account-sheet'

/* ---------------------------------------------------------------------------------------------
 * State
 * ------------------------------------------------------------------------------------------- */

const INITIAL_ACCOUNT_STATE = {
    name: '',
    number: '',
    swift: '',
    type: 1
}

const INITIAL_PERSONAL_ACCOUNT_STATE = {
    address: ''
}

const INITIAL_BUSINESS_ACCOUNT_STATE = {
    company: '',
    companyAddress: '',
    companyTin: ''
}

type PersonalAccountState = Partial<typeof INITIAL_PERSONAL_ACCOUNT_STATE>
type BusinessAccountState = Partial<typeof INITIAL_BUSINESS_ACCOUNT_STATE>
type AccountState = typeof INITIAL_ACCOUNT_STATE & PersonalAccountState & BusinessAccountState & {id?: number}

interface NewAccountStoreProps {
    currentStep: number
    setCurrentStep: (v: number) => void
    account: AccountState
    setAccount: (v: AccountState) => void
}

const useNewAccountState = create<NewAccountStoreProps>()((set) => ({
    currentStep: 0,
    setCurrentStep: (v) => set(() => ({ currentStep: v })),
    account: INITIAL_ACCOUNT_STATE,
    setAccount: (v) => set(() => ({ account: v }))
}))

/* ---------------------------------------------------------------------------------------------
 * Main
 * ------------------------------------------------------------------------------------------- */
interface EditAccountSheetProps {
    accounts: AccountProps[]
    buttonVariant?: boolean
}

export function EditAccountSheet({ accounts, buttonVariant = false }: EditAccountSheetProps) {
    const currentStep = useNewAccountState(s => s.currentStep)
    const setCurrentStep = useNewAccountState(s => s.setCurrentStep)
    const setAccount = useNewAccountState(s => s.setAccount)

    function handleChange(isOpen: boolean) {
        if (!isOpen) {
            setAccount(INITIAL_ACCOUNT_STATE)
            setCurrentStep(0)
        }
    }

    return (
        <Sheet onOpenChange={handleChange}>
            <SheetTrigger asChild>
                {buttonVariant
                    ? <Button>Izplačaj</Button>
                    : <button className='text-sm'>Uredi</button>
                }
            </SheetTrigger>
            <SheetContent className="w-full lg:!max-w-[420px] h-full bg-[#F1F1F1] p-0">
                <ScrollArea
                    className={cn(
                        'w-full h-full',
                        '[&>div>div]:min-h-full [&>div>div]:!flex [&>div>div]:flex-col'
                    )}
                >
                    <AccountListStep accounts={accounts} className={cn(currentStep === 0 && 'flex')} />
                    <AccountFormStep className={cn(currentStep === 1 && 'flex')} />
                    <AccountDeleteStep className={cn(currentStep === 2 && 'flex')} />
                    <AccountEditSuccessStep className={cn(currentStep === 3 && 'flex')} />
                    <AccountDeleteSuccessStep className={cn(currentStep === 4 && 'flex')} />
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}

/* ---------------------------------------------------------------------------------------------
 * Step 0
 * ------------------------------------------------------------------------------------------- */
interface StepComponentProps {
    className?: string
}

interface AccountListStepProps extends StepComponentProps {
    accounts: AccountProps[]
}

function AccountListStep({ accounts, className }: AccountListStepProps) {
    const setAccount = useNewAccountState(s => s.setAccount)
    const setCurrentStep = useNewAccountState(s => s.setCurrentStep)

    function handleEdit(account: AccountState) {
        setAccount(account)
        setCurrentStep(1)
    }

    function handleDelete(account: AccountState) {
        setAccount(account)
        setCurrentStep(2)
    }

    return (
        <div className={cn('hidden flex-auto flex-col', className)}>
            <SheetHeader className="flex items-start w-full bg-primary-white shadow-sheet-section px-7 pt-10 pb-8 space-y-0 relative z-[100]">
                <p className="text-h6 font-baskerville">Moj bančni račun</p>
                <span className="text-body-medium font-medium">Urejaj, dodaj ali izbriši bančni račun</span>
            </SheetHeader>
            <div className={cn('flex flex-auto flex-col')}>
                {accounts.map((account) => (
                    <SheetHeader
                        key={`i-${account.id}`}
                        className='flex flex-row justify-between items-start w-full bg-primary-white shadow-sheet-section px-7 py-6 relative z-[99]'
                    >
                        <div className='w-full flex flex-col gap-2'>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-2'>
                                    <CreditCard />
                                    <span className='text-body-medium font-bold'>{account.number.replace(/(.{3})/g, '$1 ').trim()}</span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <button
                                        className='w-fit'
                                        onClick={() => handleEdit(account as unknown as AccountState)}
                                    >Uredi</button>
                                    <button
                                        className='text-accent-red w-fit'
                                        onClick={() => handleDelete(account as unknown as AccountState)}
                                    >Izbriši</button>
                                </div>
                            </div>
                            <span className="text-body-medium font-bold">
                                {account.type === 1 && 'FIZIČNI RAČUN'}
                                {account.type === 2 && 'POSLOVNI RAČUN'}
                            </span>
                            <p className="text-body-small">{account.name}</p>
                            {account.type === 2 && <p className="text-body-small">{account.company}</p>}
                            {account.type === 2 && <p className="text-body-small">{account.companyAddress}</p>}
                            {account.type === 1 && <p className="text-body-small">{account.address}</p>}
                            {account.type === 2 && <p className="text-body-small">{account.companyTin}</p>}
                            <p className="text-body-small">{account.swift}</p>
                        </div>
                    </SheetHeader>
                ))}
                <SheetFooter className="flex items-center justify-center w-full bg-primary-white px-6 py-4 mt-auto">
                    <NewAccountSheetTrigger>
                        <SheetClose asChild>
                            <Button className='w-full max-w-[279px] mx-auto'>
                                <span className='flex items-center gap-4'>
                                    <Icons.Plus />
                                    <span className='leading-none '>Dodaj bančni račun</span>
                                </span>
                            </Button>
                        </SheetClose>
                    </NewAccountSheetTrigger>
                </SheetFooter>
            </div>
        </div>
    )
}

/* ---------------------------------------------------------------------------------------------
 * Step 1
 * ------------------------------------------------------------------------------------------- */
function AccountFormStep({ className }: StepComponentProps) {
    const account = useNewAccountState(s => s.account)

    return (
        <div className={cn('hidden flex-auto flex-col', className)}>
            <SheetHeader className="flex items-start w-full bg-primary-white shadow-sheet-section px-7 pt-10 pb-8 space-y-0 relative z-[100]">
                <p className="text-h6 font-baskerville">Moj bančni račun</p>
                <span className="text-body-medium font-medium">Urejaj, dodaj ali izbriši bančni račun</span>
            </SheetHeader>
            <div className={cn('flex flex-auto flex-col')}>
                {account.type === 1 && <PersonalAccountForm />}
                {account.type === 2 && <BusinessAccountForm />}
            </div>
        </div>
    )
}

function PersonalAccountForm() {
    const [isLoading, setIsLoading] = useState(false)
    const account = useNewAccountState(s => s.account)
    const setAccount = useNewAccountState(s => s.setAccount)
    const setCurrentStep = useNewAccountState(s => s.setCurrentStep)

    const form = useForm<z.infer<typeof PersonalAccountFormSchema>>({
        resolver: zodResolver(PersonalAccountFormSchema),
        defaultValues: { ...INITIAL_ACCOUNT_STATE, type: 1 }
    })

    async function handleSubmit(data: z.infer<typeof PersonalAccountFormSchema>) {
        try {
            setIsLoading(true)
            setAccount(data)
            await updateAccount(account.id ?? 0, data)
            setCurrentStep(3)
        } catch (error) {
            if (error instanceof Error) {
                toast.error('Nekaj je šlo narobe.', {
                    description: JSON.parse(error.message).message
                })
            }
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { type, company, companyAddress, companyTin, id, ...rest } = account
        form.reset({ ...rest, type: 1 })
    }, [account, form])

    return (
        <>
            <SheetHeader className="flex flex-auto w-full px-7 pb-8 space-y-0 relative z-[100]">
                <div className={cn('grid gap-6')}>
                    <Form {...form} >
                        <form id='editPersonalAccountForm' onSubmit={form.handleSubmit(handleSubmit)}>
                            <div className="grid gap-4">
                                <div className="grid gap-1">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Ime in priimek lastnika računa</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Ime in priimek"
                                                        autoComplete="name"
                                                        autoCorrect="off"
                                                        autoCapitalize='off'
                                                        autoFocus
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-1">
                                    <FormField
                                        control={form.control}
                                        name="address"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Naslov lastnika računa</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Naslov"
                                                        autoComplete="street-address"
                                                        autoCorrect="off"
                                                        autoCapitalize='off'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-1">
                                    <FormField
                                        control={form.control}
                                        name="number"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>TRR številka</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="xxxx xxxx xxxx xxxx"
                                                        autoComplete="account-number"
                                                        autoCorrect="off"
                                                        autoCapitalize='off'
                                                        onKeyDown={allowOnlyAlphanumeric}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-1">
                                    <FormField
                                        control={form.control}
                                        name="swift"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>BIC/SWIFT koda banke</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="xxxxxxxx"
                                                        autoComplete="bank-account"
                                                        autoCorrect="off"
                                                        autoCapitalize='off'
                                                        onKeyDown={allowOnlyAlphanumeric}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </form>
                    </Form>
                </div>
            </SheetHeader>
            <SheetFooter className="flex items-center justify-center w-full bg-primary-white px-6 py-4 mt-auto">
                <Button form='editPersonalAccountForm' className="w-full" disabled={isLoading}>
                    <span className='flex items-center gap-[10px]'>
                        {isLoading && (
                            <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        <span className='leading-none '>Shrani</span>
                    </span>
                </Button>
            </SheetFooter>
        </>
    )
}

function BusinessAccountForm() {
    const [isLoading, setIsLoading] = useState(false)
    const account = useNewAccountState(s => s.account)
    const setAccount = useNewAccountState(s => s.setAccount)
    const setCurrentStep = useNewAccountState(s => s.setCurrentStep)

    const form = useForm<z.infer<typeof BusinessAccountFormSchema>>({
        resolver: zodResolver(BusinessAccountFormSchema),
        defaultValues: {
            ...INITIAL_ACCOUNT_STATE,
            ...INITIAL_BUSINESS_ACCOUNT_STATE,
            type: 2
        }
    })

    async function handleSubmit(data: z.infer<typeof BusinessAccountFormSchema>) {
        try {
            setIsLoading(true)
            setAccount(data)
            await updateAccount(account.id ?? 0, data)
            setCurrentStep(3)
        } catch (error) {
            if (error instanceof Error) {
                toast.error('Nekaj je šlo narobe.', {
                    description: JSON.parse(error.message).message
                })
            }
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { type, address, id, ...rest } = account
        form.reset({ ...rest, type: 2 })
    }, [account, form])

    return (
        <>
            <SheetHeader className="flex flex-auto w-full px-7 pb-8 space-y-0 relative z-[100]">
                <div className={cn('grid gap-6')}>
                    <Form {...form} >
                        <form id='editBusinessAccountForm' onSubmit={form.handleSubmit(handleSubmit)}>
                            <div className="grid gap-4">
                                <div className="grid gap-1">
                                    <FormField
                                        control={form.control}
                                        name="company"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Ime podjetja in pravna oblika</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Ime in priimek"
                                                        autoComplete="name"
                                                        autoCorrect="off"
                                                        autoCapitalize='off'
                                                        autoFocus
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-1">
                                    <FormField
                                        control={form.control}
                                        name="companyAddress"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Naslov podjetja</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Naslov"
                                                        autoComplete="street-address"
                                                        autoCorrect="off"
                                                        autoCapitalize='off'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-1">
                                    <FormField
                                        control={form.control}
                                        name="companyTin"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Davčna številka podjetja</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Naslov"
                                                        autoComplete="on"
                                                        autoCorrect="off"
                                                        autoCapitalize='off'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-1">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Ime in priimek lastnika računa</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Ime in priimek"
                                                        autoComplete="name"
                                                        autoCorrect="off"
                                                        autoCapitalize='off'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-1">
                                    <FormField
                                        control={form.control}
                                        name="number"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>TRR številka</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="xxxx xxxx xxxx xxxx"
                                                        autoComplete="account-number"
                                                        autoCorrect="off"
                                                        autoCapitalize='off'
                                                        onKeyDown={allowOnlyAlphanumeric}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-1">
                                    <FormField
                                        control={form.control}
                                        name="swift"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>BIC/SWIFT koda banke</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="xxxxxxxx"
                                                        autoComplete="bank-account"
                                                        autoCorrect="off"
                                                        autoCapitalize='off'
                                                        onKeyDown={allowOnlyAlphanumeric}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </form>
                    </Form>
                </div>
            </SheetHeader>
            <SheetFooter className="flex items-center justify-center w-full bg-primary-white px-6 py-4 mt-auto">
                <Button form='editBusinessAccountForm' className="w-full" disabled={isLoading}>
                    <span className='flex items-center gap-[10px]'>
                        {isLoading && (
                            <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        <span className='leading-none '>Shrani</span>
                    </span>
                </Button>
            </SheetFooter>
        </>
    )
}

/* ---------------------------------------------------------------------------------------------
 * Step 2
 * ------------------------------------------------------------------------------------------- */
function AccountDeleteStep({ className }: StepComponentProps) {
    const [isLoading, setIsLoading] = useState(false)
    const account = useNewAccountState(s => s.account)
    const setCurrentStep = useNewAccountState(s => s.setCurrentStep)

    async function handleConfirm() {
        try {
            setIsLoading(true)
            await deleteAccount(account.id ?? 0)
            setCurrentStep(4)
        } catch (error) {
            if (error instanceof Error) {
                toast.error('Nekaj je šlo narobe.', {
                    description: JSON.parse(error.message).message
                })
            }
        } finally {
            setIsLoading(false)
        }
    }

    function handleBack() {
        setCurrentStep(0)
    }

    return (
        <div className={cn('hidden flex-auto flex-col', className)}>
            <SheetHeader className='flex items-start w-full bg-primary-white shadow-sheet-section px-7 pt-10 pb-8 space-y-0 relative z-[100]'>
                <p className="text-h6 font-baskerville">Izbriši TRR račun</p>
                <span className="text-body-medium font-medium">Ste prepričani, da želite izbrisati bančni račun?</span>
            </SheetHeader>
            <div className={cn('flex flex-col flex-auto')}>
                {account.type === 2 && (
                    <>
                        <SheetHeader
                            className='flex flex-row justify-between items-start w-full bg-primary-white shadow-sheet-section px-7 py-6 relative z-[97]'
                        >
                            <div className='flex flex-col'>
                                <p className="text-body-small uppercase">Ime podjetja in pravna oblika</p>
                                <span className="text-body-big-2 font-medium">{account.company}</span>
                            </div>
                        </SheetHeader>
                        <SheetHeader
                            className='flex flex-row justify-between items-start w-full bg-primary-white shadow-sheet-section px-7 py-6 relative z-[97]'
                        >
                            <div className='flex flex-col'>
                                <p className="text-body-small uppercase">Naslov podjetja</p>
                                <span className="text-body-big-2 font-medium">{account.companyAddress}</span>
                            </div>
                        </SheetHeader>
                        <SheetHeader
                            className='flex flex-row justify-between items-start w-full bg-primary-white shadow-sheet-section px-7 py-6 relative z-[97]'
                        >
                            <div className='flex flex-col'>
                                <p className="text-body-small uppercase">Davčna številka podjetja</p>
                                <span className="text-body-big-2 font-medium">{account.companyTin}</span>
                            </div>
                        </SheetHeader>
                    </>
                )}
                <SheetHeader
                    className='flex flex-row justify-between items-start w-full bg-primary-white shadow-sheet-section px-7 py-6 relative z-[99]'
                >
                    <div className='flex flex-col'>
                        <p className="text-body-small uppercase">Ime in priimek lastnika računa</p>
                        <span className="text-body-big-2 font-medium">{account.name}</span>
                    </div>
                </SheetHeader>
                {account.type === 1 && (
                    <SheetHeader
                        className='flex flex-row justify-between items-start w-full bg-primary-white shadow-sheet-section px-7 py-6 relative z-[98]'
                    >
                        <div className='flex flex-col'>
                            <p className="text-body-small uppercase">Naslov lastnika računa</p>
                            <span className="text-body-big-2 font-medium">{account.address}</span>
                        </div>
                    </SheetHeader>
                )}
                <SheetHeader
                    className='flex flex-row justify-between items-start w-full bg-primary-white shadow-sheet-section px-7 py-6 relative z-[97]'
                >
                    <div className='flex flex-col'>
                        <p className="text-body-small uppercase">TRR številka</p>
                        <span className="text-body-big-2 font-medium">{account.number}</span>
                    </div>
                </SheetHeader>
                <SheetHeader
                    className='flex flex-row justify-between items-start w-full bg-primary-white shadow-sheet-section px-7 py-6 relative z-[96]'
                >
                    <div className='flex flex-col'>
                        <p className="text-body-small uppercase">BIC/SWIFT koda banke</p>
                        <span className="text-body-big-2 font-medium">{account.swift}</span>
                    </div>
                </SheetHeader>
            </div>
            <SheetFooter className='flex items-center justify-center w-full bg-primary-white px-6 py-4 mt-auto'>
                <Button
                    onClick={handleBack}
                    className='w-full'
                >
                        NE
                </Button>
                <Button
                    variant='destructive'
                    className='w-full'
                    onClick={handleConfirm}
                    disabled={isLoading}
                >
                    <span className='flex items-center gap-[10px]'>
                        {isLoading && (
                            <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        <span className='leading-none '>DA, IZBRIŠI</span>
                    </span>
                </Button>
            </SheetFooter>
        </div>
    )
}

/* ---------------------------------------------------------------------------------------------
 * Step 3
 * ------------------------------------------------------------------------------------------- */
function AccountEditSuccessStep({ className }: StepComponentProps) {
    async function handleClick() {
        await invalidateCacheByPath('/namizje/tst-svetovalec')
        location.reload()
    }

    return (
        <div className={cn('hidden flex-auto flex-col', className)}>
            <SheetHeader className='flex flex-auto justify-center items-center w-full px-7 pt-10 pb-8 space-y-0 relative z-[100]'>
                <Ilustrations.List className='w-full max-w-44 lg:max-w-72' />
                <span className="text-h5 font-baskerville text-center !mb-8">Bančni račun je bil uspešno urejen!</span>
                <p className="text-body-big-2 font-medium text-center">Najlepša hvala za Vaše zaupanje.</p>
            </SheetHeader>
            <SheetFooter className='flex items-center justify-center w-full bg-primary-white px-6 py-4 mt-auto'>
                <SheetClose asChild>
                    <Button
                        onClick={handleClick}
                        className='w-full'
                    >
                        Končaj
                    </Button>
                </SheetClose>
            </SheetFooter>
        </div>
    )
}

/* ---------------------------------------------------------------------------------------------
 * Step 4
 * ------------------------------------------------------------------------------------------- */
function AccountDeleteSuccessStep({ className }: StepComponentProps) {
    async function handleClick() {
        await invalidateCacheByPath('/namizje/tst-svetovalec')
        location.reload()
    }

    return (
        <div className={cn('hidden flex-auto flex-col', className)}>
            <SheetHeader className='flex flex-auto justify-center items-center w-full px-7 pt-10 pb-8 space-y-0 relative z-[100]'>
                <Ilustrations.List className='w-full max-w-44 lg:max-w-72' />
                <span className="text-h5 font-baskerville text-center !mb-8">Bančni račun je bil uspešno izbrisan!</span>
                <p className="text-body-big-2 font-medium text-center">Najlepša hvala za Vaše zaupanje.</p>
            </SheetHeader>
            <SheetFooter className='flex items-center justify-center w-full bg-primary-white px-6 py-4 mt-auto'>
                <SheetClose asChild>
                    <Button
                        onClick={handleClick}
                        className='w-full'
                    >
                        Končaj
                    </Button>
                </SheetClose>
            </SheetFooter>
        </div>
    )
}
