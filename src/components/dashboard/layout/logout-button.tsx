'use client'

import { useCookies } from '@/lib/hooks/use-cookies'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
    const { push } = useRouter()
    const cookies = useCookies()

    const handleClick = async() => {
        cookies.delete('token')
        cookies.delete('user')
        // call the logout API
        await fetch('/api/logout')
        localStorage.clear()
        push('/prijava')
    }

    return (
        <button
            title='Odjava'
            onClick={handleClick}
            className='h-fit w-fit'
        >
            <LogOut className='h-5 w-5'/>
        </button>
    )
}
