'use client'

import { Button } from '@/components/ui/button'
import { useCookies } from '@/lib/hooks/use-cookies'
import { toast } from 'sonner'

export default function CopyReferralLinkButton() {
    const cookies = useCookies()
    const user = cookies.get('user')
    const { referralLink, membershipId } = JSON.parse(user ?? '{}')

    function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault()
        navigator.clipboard.writeText(`${window.location.origin}/registracija?referralId=${referralLink}`)
            .then(() => {
                toast('Kopirano v odložišče', {
                    className: 'p-4',
                    duration: 2000
                })
            })
    }
    return (
        <Button
            onClick={handleClick}
            disabled={membershipId === 1}
            className={`w-full h-[40px] ${membershipId === 2 ? 'bg-gradient-gold' : 'bg-gradient-grey'} !text-body-medium border-none`}
        >Priporočaj</Button>
    )
}
