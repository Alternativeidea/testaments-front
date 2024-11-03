'use client'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTrigger
} from '@/components/ui/sheet'
import { getBonusesById, getMembershipBonusesById } from '@/lib/services/bonuses'
import { cn } from '@/lib/utils/style'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import NarocilaRows from './narocila-rows'

interface ReferralDetailsProps {
    id: number
    createdAt: Date
    children: React.ReactNode
}

export function ReferralDetailsSheet({ id, createdAt, children }: ReferralDetailsProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [bonuses, setBonuses] = useState({
        direct: {
            premium: 0,
            oporoke: 0,
            tst: 0,
            trznica: 0
        },
        indirect: {
            premium: 0,
            oporoke: 0,
            tst: 0,
            trznica: 0
        }
    })

    useEffect(() => {
        async function loadData() {
            if (isOpen) {
                try {
                    const baseBonuses: BonusesProps = await getBonusesById(id)
                    const membershipBonuses: BonusesProps = await getMembershipBonusesById(id)

                    setBonuses({
                        direct: {
                            ...bonuses.direct,
                            premium: membershipBonuses.sums.direct,
                            tst: baseBonuses.sums.direct
                        },
                        indirect: {
                            ...bonuses.indirect,
                            premium: membershipBonuses.sums.indirect,
                            tst: baseBonuses.sums.indirect
                        }
                    })
                } catch (error) {
                    if (error instanceof Error) {
                        toast.error('Nekaj je šlo narobe.', {
                            description: JSON.parse(error.message).message
                        })
                    }
                }
            }
        }
        loadData()
    }, [isOpen, id])

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger>
                {children}
            </SheetTrigger>
            <SheetContent className="w-full lg:!max-w-[420px] h-full bg-[#F1F1F1] p-0">
                <ScrollArea
                    className={cn(
                        'w-full h-full',
                        '[&>div>div]:min-h-full [&>div>div]:!flex [&>div>div]:flex-col'
                    )}
                >
                    <SheetHeader className="flex items-start w-full bg-primary-white shadow-sheet-section px-7 pt-10 pb-8 space-y-0 relative z-[100]">
                        <p className="text-h6 font-baskerville">ID{id} / Naročila stranke</p>
                        <span className="text-body-medium font-medium">
                            Vpis stranke: {new Date(createdAt).toLocaleDateString('sl')}
                        </span>
                    </SheetHeader>
                    <div className={cn('flex flex-auto flex-col')}>
                        <NarocilaRows id={id}/>
                        <SheetFooter className="flex items-center justify-center w-full bg-primary-white px-6 py-4 mt-auto">
                            <SheetClose asChild>
                                <Button className="w-full">Zapri</Button>
                            </SheetClose>
                        </SheetFooter>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}
