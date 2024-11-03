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
    SheetHeader
} from '@/components/ui/sheet'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { invalidateCacheByPath } from '@/lib/actions/cache'
import { BusinessAccountFormSchema, PersonalAccountFormSchema } from '@/lib/schemas/accounts'
import { createAccount } from '@/lib/services/accounts'
import { allowOnlyAlphanumeric } from '@/lib/utils/form'
import { cn } from '@/lib/utils/style'
import { zodResolver } from '@hookform/resolvers/zod'
import { Slot } from '@radix-ui/react-slot'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'
import { create } from 'zustand'

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
type AccountState = typeof INITIAL_ACCOUNT_STATE & PersonalAccountState & BusinessAccountState

interface NewAccountStoreProps {
    isOpen: boolean
    setIsOpen: (v: boolean) => void
    currentStep: number
    setCurrentStep: (v: number) => void
    account: AccountState
    setAccount: (v: AccountState) => void
}

const useNewAccountState = create<NewAccountStoreProps>()((set) => ({
    isOpen: false,
    setIsOpen: (v) => set(() => ({ isOpen: v })),
    currentStep: 0,
    setCurrentStep: (v) => set(() => ({ currentStep: v })),
    account: INITIAL_ACCOUNT_STATE,
    setAccount: (v) => set(() => ({ account: v }))
}))

/* ---------------------------------------------------------------------------------------------
 * Main
 * ------------------------------------------------------------------------------------------- */
interface NewAccountSheetTriggerProps {
    children: React.ReactNode
}

export function NewAccountSheetTrigger({ children }: NewAccountSheetTriggerProps) {
    const setIsOpen = useNewAccountState(s => s.setIsOpen)

    return (
        <Slot onClick={() => setIsOpen(true)}>
            {children}
        </Slot>
    )
}

export function NewAccountSheet() {
    const isOpen = useNewAccountState(s => s.isOpen)
    const setIsOpen = useNewAccountState(s => s.setIsOpen)
    const currentStep = useNewAccountState(s => s.currentStep)
    const setCurrentStep = useNewAccountState(s => s.setCurrentStep)
    const setAccount = useNewAccountState(s => s.setAccount)

    function handleChange(isOpen: boolean) {
        setIsOpen(isOpen)
        if (!isOpen) {
            setAccount(INITIAL_ACCOUNT_STATE)
            setCurrentStep(0)
        }
    }

    return (
        <Sheet open={isOpen} onOpenChange={handleChange} >
            <SheetContent className="w-full lg:!max-w-[420px] h-full bg-[#F1F1F1] p-0">
                <ScrollArea
                    className={cn(
                        'w-full h-full',
                        '[&>div>div]:min-h-full [&>div>div]:!flex [&>div>div]:flex-col'
                    )}
                >
                    <AccountFormStep className={cn(currentStep === 0 && 'flex')} />
                    <AccountResumeStep className={cn(currentStep === 1 && 'flex')} />
                    <AccountSuccessStep className={cn(currentStep === 2 && 'flex')} />
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

function AccountFormStep({ className }: StepComponentProps) {
    const account = useNewAccountState(s => s.account)
    const setAccount = useNewAccountState(s => s.setAccount)
    return (
        <div className={cn('hidden flex-auto flex-col', className)}>
            <SheetHeader className="flex items-start w-full bg-primary-white shadow-sheet-section px-7 pt-10 pb-8 space-y-0 relative z-[100]">
                <p className="text-h6 font-baskerville">Moj bančni račun</p>
                <span className="text-body-medium font-medium">Urejaj, dodaj ali izbriši bančni račun</span>
            </SheetHeader>
            <div className={cn('flex flex-auto flex-col')}>
                <Tabs value={String(account.type)} onValueChange={(v) => setAccount({ ...account, type: Number(v) })}>
                    <TabsList className='px-7 py-6'>
                        <TabsTrigger className='w-full' value='1'>Fizični</TabsTrigger>
                        <TabsTrigger className='w-full' value='2'>Poslovni</TabsTrigger>
                    </TabsList>
                    <TabsContent value='1'>
                        <SheetHeader className="flex flex-auto w-full px-7 pb-8 space-y-0 relative z-[100]">
                            <PersonalAccountForm />
                        </SheetHeader>
                    </TabsContent>
                    <TabsContent value='2' className='w-full'>
                        <SheetHeader className="flex flex-auto w-full px-7 pb-8 space-y-0 relative z-[100]">
                            <BusinessAccountForm />
                        </SheetHeader>
                    </TabsContent>
                </Tabs>
                <SheetFooter className="flex items-center justify-center w-full bg-primary-white px-6 py-4 mt-auto">
                    <Button form={ account.type === 1 ? 'personalAccountForm' : 'businessAccountForm'} className="w-full">Shrani</Button>
                </SheetFooter>
            </div>
        </div>
    )
}

function PersonalAccountForm() {
    const setAccount = useNewAccountState(s => s.setAccount)
    const setCurrentStep = useNewAccountState(s => s.setCurrentStep)

    const form = useForm<z.infer<typeof PersonalAccountFormSchema>>({
        resolver: zodResolver(PersonalAccountFormSchema),
        defaultValues: { ...INITIAL_ACCOUNT_STATE, ...INITIAL_PERSONAL_ACCOUNT_STATE, type: 1 }
    })

    async function handleSubmit(data: z.infer<typeof PersonalAccountFormSchema>) {
        try {
            setAccount(data)
            setCurrentStep(1)
        } catch (error) {
            if (error instanceof Error) {
                toast.error('Nekaj je šlo narobe.', {
                    description: JSON.parse(error.message).message
                })
            }
        }
    }

    return (
        <div className={cn('grid gap-6')}>
            <Form {...form} >
                <form id='personalAccountForm' onSubmit={form.handleSubmit(handleSubmit)}>
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
                                                placeholder="Janez Novak"
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
                                                placeholder="Slovenska cesta 1, 1000 Ljubljana"
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
    )
}

function BusinessAccountForm() {
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
            setAccount(data)
            setCurrentStep(1)
        } catch (error) {
            if (error instanceof Error) {
                toast.error('Nekaj je šlo narobe.', {
                    description: JSON.parse(error.message).message
                })
            }
        }
    }

    return (
        <div className={cn('grid gap-6')}>
            <Form {...form} >
                <form id='businessAccountForm' onSubmit={form.handleSubmit(handleSubmit)}>
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
                                                placeholder="ABC d.o.o."
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
                                                placeholder="Slovenska cesta 1, 1000 Ljubljana"
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
                                                placeholder="SI12345678"
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
                                                placeholder="Janez Novak"
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
    )
}

/* ---------------------------------------------------------------------------------------------
 * Step 1
 * ------------------------------------------------------------------------------------------- */
function AccountResumeStep({ className }: StepComponentProps) {
    const [isLoading, setIsLoading] = useState(false)
    const account = useNewAccountState(s => s.account)
    const setCurrentStep = useNewAccountState(s => s.setCurrentStep)

    async function handleConfirm() {
        try {
            setIsLoading(true)
            await createAccount(account)
            setCurrentStep(2)
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

    return (
        <div className={cn('hidden flex-auto flex-col', className)}>
            <SheetHeader className='flex items-start w-full bg-primary-white shadow-sheet-section px-7 pt-10 pb-8 space-y-0 relative z-[100]'>
                <p className="text-h6 font-baskerville">Dodaj TRR račun</p>
                <span className="text-body-medium font-medium">Potrdi podatke računa</span>
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
                    className='w-full'
                    onClick={handleConfirm}
                    disabled={isLoading}
                >
                    <span className='flex items-center gap-[10px]'>
                        {isLoading && (
                            <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        <span className='leading-none '>Potrdi podatke in shrani</span>
                    </span>
                </Button>
            </SheetFooter>
        </div>
    )
}

/* ---------------------------------------------------------------------------------------------
 * Step 2
 * ------------------------------------------------------------------------------------------- */
function AccountSuccessStep({ className }: StepComponentProps) {
    async function handleClick() {
        await invalidateCacheByPath('/namizje/tst-svetovalec')
        location.reload()
    }

    return (
        <div className={cn('hidden flex-auto flex-col', className)}>
            <SheetHeader className='flex flex-auto justify-center items-center w-full px-7 pt-10 pb-8 space-y-0 relative z-[100]'>
                <Ilustrations.List className='w-full max-w-44 lg:max-w-72' />
                <span className="text-h5 font-baskerville text-center !mb-8">Bančni račun je bil uspešno dodan!</span>
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
