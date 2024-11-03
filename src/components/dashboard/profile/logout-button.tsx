'use client'

import { Button } from '@/components/ui/button'
import { useCookies } from '@/lib/hooks/use-cookies'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
    const { push } = useRouter()
    const cookies = useCookies()

    const handleClick = async () => {
        cookies.delete('token')
        cookies.delete('user')
        // call the logout API
        await fetch('/api/logout')
        localStorage.clear()
        push('/prijava')
    }

    return (
        <Button
            title='Odjava'
            onClick={handleClick}
            variant='destructive'
            className='w-full px-11 md:w-fit'
        >Odjavi se</Button>
    )
}
