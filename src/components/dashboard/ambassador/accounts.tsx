'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { getAccounts } from '@/lib/services/accounts'
import { getBalance } from '@/lib/services/bonuses'
import { CreditCard } from 'lucide-react'
import { useEffect, useState } from 'react'
import { EditAccountSheet } from './edit-account-sheet'
import IzplaciloSheet from './izplacilo-sheet'
import { NewAccountSheet, NewAccountSheetTrigger } from './new-account-sheet'

export default function Accounts() {
    const [accounts, setAccounts] = useState<AccountProps[]>([])
    const [balance, setBalance] = useState<{ balance: number }>({ balance: 0 })
    const [accountId, setAccountId] = useState<number>()
    const handleAccountSelect = (selectedIndex: number) => {
        const selectedAccount = accounts[selectedIndex]
        setAccountId(selectedAccount.id)
    }

    useEffect(() => {
        const fetchData = async () => {
            const fetchedAccounts = await getAccounts()
            const fetchedBalance = await getBalance()
            setAccounts(fetchedAccounts)
            setBalance(fetchedBalance)
        }

        fetchData()
    }, [])

    return (
        <Card className='border-0 bg-primary-light-gray/30'>
            <CardHeader className='flex-row justify-between items-center'>
                <CardTitle className='font-baskerville text-h6 font-normal'>Moja izplačilna vsota</CardTitle>
                {accounts.length === 0
                    ? <EditAccountSheet buttonVariant={true} accounts={accounts} />
                    : <IzplaciloSheet accounts={accounts} preselectedAccount={accountId || 0} sheetDisabled={balance.balance < 50} />}
            </CardHeader>
            <CardContent className='space-y-4 mt-2'>
                <CardTitle className='font-baskerville text-h3 font-normal'>{balance.balance.toLocaleString('sl-SI', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}<span className="text-h5"> EUR</span></CardTitle>
                <Separator className='bg-primary-light-gray' />
            </CardContent>
            <CardFooter className='flex-col items-start space-y-4'>
                <div className='flex justify-between items-center w-full'>
                    <CardTitle className='font-baskerville text-h6 font-normal'>Moj bančni račun</CardTitle>
                    <EditAccountSheet accounts={accounts} />
                </div>
                {accounts.length > 0
                    ? <Select onValueChange={(selectedIndex) => handleAccountSelect(parseInt(selectedIndex))}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Izberite račun" />
                        </SelectTrigger>
                        <SelectContent className='w-full'>
                            {accounts.map(({ id, number }, index) => (
                                <SelectItem key={`i-${id}`} value={index.toString()}>  {/* El índice como valor */}
                                    <div className='flex items-center gap-4'>
                                        <CreditCard />
                                        <span>**** **** **** **** {number.slice(-3)}</span>
                                    </div>
                                </SelectItem>
                            ))}
                            <NewAccountSheetTrigger>
                                <button className='w-full text-start rounded-sm py-1.5 px-2 text-sm'>+ Dodaj novi račun</button>
                            </NewAccountSheetTrigger>
                        </SelectContent>
                    </Select>
                    : <NewAccountSheetTrigger>
                        <Button className='w-full'>Dodaj bančni račun</Button>
                    </NewAccountSheetTrigger>
                }
                <NewAccountSheet />
            </CardFooter>
        </Card>
    )
}
