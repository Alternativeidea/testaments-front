'use client'
import React from 'react'
import { useMobileMenuState } from './mobile-menu'

export default function CloseMenuButton({ children, className } : {children : React.ReactNode, className? : string}) {
    const setIsOpen = useMobileMenuState(s => s.setIsOpen)
    function handleClick() {
        setIsOpen(false)
    }

    return (
        <div className={className} onClick={handleClick}>
            {children}
        </div>
    )
}
