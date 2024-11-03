'use client'

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTrigger
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils/style'
import { MenuIcon, X } from 'lucide-react'
import { create } from 'zustand'

// State
interface MobileMenuStoreProps {
    isOpen: boolean
    setIsOpen: (v: boolean) => void
}
export const useMobileMenuState = create<MobileMenuStoreProps>()((set) => ({
    isOpen: false,
    setIsOpen: (v) => set(() => ({ isOpen: v }))
}))

// Main
interface MobileMenuProps {
    children: React.ReactNode
}
export default function MobileMenu({ children }: MobileMenuProps) {
    const isOpen = useMobileMenuState(s => s.isOpen)
    const setIsOpen = useMobileMenuState(s => s.setIsOpen)

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className='focus:outline-none focus:ring-0'>
                <MenuIcon
                    className={cn(
                        'text-primary-white',
                        isOpen && 'hidden'
                    )}
                />
                <X
                    className={cn(
                        'hidden text-primary-white',
                        isOpen && 'block'
                    )}
                />
            </SheetTrigger>
            <SheetContent
                side='top'
                className={cn(
                    'h-full bg-primary-dark-gray [&>button]:hidden z-[50] transition-all',
                    'data-[state=closed]:!animate-open-menu data-[state=open]:!animate-close-menu'
                )}
            >
                <SheetHeader className='content h-full justify-between pt-24'>
                    {children}
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}
