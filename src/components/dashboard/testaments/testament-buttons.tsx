'use client'
// Components
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { ChevronDownCircle, ChevronRightCircle, ChevronUpCircle, PlusCircle } from 'lucide-react'
import BuyTestamentForm from './buy-testament-form'
import ReceiveTestamentForm from './receive-testament-form'
import SellTestamentForm from './sell-testament-form'
import SendTestamentForm from './send-testament-form'

interface ButtonProps {
    title: string,
    icon: React.ReactNode
    content: React.ReactNode | string
    premiumUser: boolean
    balance: string
    isDisable: boolean
}

export default function TestamentButtons({ email, balance } : {email: string, balance: string}) {
    const buttons = [
        {
            title: 'Dodaj testamente',
            icon: <PlusCircle />,
            content: <BuyTestamentForm />,
            premiumUser: true,
            isDisable: false
        },
        {
            title: 'Vračilo testamentov',
            icon: <ChevronUpCircle />,
            content: <SellTestamentForm balance={parseFloat(balance)}/>,
            premiumUser: true,
            isDisable: false
        },
        {
            title: 'Prejmi testamente',
            icon: <ChevronDownCircle />,
            content: <ReceiveTestamentForm email={email}/>,
            premiumUser: true,
            isDisable: false
        },
        {
            title: 'Pošlji testamente',
            icon: <ChevronRightCircle />,
            content: <SendTestamentForm balance={parseFloat(balance)}/>,
            premiumUser: true,
            isDisable: false
        }
    ]
    return (
        <div className='flex gap-x-2 overflow-x-scroll no-scrollbar'>
            {buttons.map((item) => {
                return (
                    <SheetButton
                        key={item.title}
                        premiumUser={item.premiumUser}
                        icon={item.icon}
                        title={item.title}
                        content={item.content}
                        balance={balance}
                        isDisable={item.isDisable}
                    />
                )
            })}
        </div>
    )
}

function SheetButton({ title, icon, content, premiumUser, balance, isDisable } : ButtonProps) {
    if (title === 'Dodaj testamente' || title === 'Prejmi testamente') {
        balance = '1'
    }
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button disabled={isDisable || (!premiumUser || Number(balance) === 0)}>
                    <div className='flex items-center gap-x-4'>
                        {icon}
                        <p>
                            {title}
                        </p>
                    </div>
                </Button>
            </SheetTrigger>
            <SheetContent className='w-full lg:!max-w-[420px] h-full p-0'>
                {content}
            </SheetContent>
        </Sheet>
    )
}
