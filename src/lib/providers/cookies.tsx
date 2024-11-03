'use client'

import { CookiesProvider as ClientCookiesProvider } from 'react-cookie'

interface CookiesProviderProps {
    children: React.ReactNode
}

export function CookiesProvider({ children }: CookiesProviderProps) {
    return (
        <ClientCookiesProvider defaultSetOptions={{ path: '/' }}>
            {children}
        </ClientCookiesProvider>
    )
}
