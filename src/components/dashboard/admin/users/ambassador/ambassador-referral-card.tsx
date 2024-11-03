'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import CopyButton from '@/components/ui/copy-button'
import { getUser } from '@/lib/services/admin/users'
import { useEffect, useState } from 'react'

export default function AmbassadorReferralCard({ userId } : {userId: number}) {
    const [user, setUser] = useState<UserAuthProps>()

    useEffect(() => {
        const fetch = async () => {
            const user = await getUser(userId)
            setUser(user)
        }
        fetch()
    }, [])

    return (
        <Card className='border-0 bg-primary-light-gray/30'>
            <CardHeader >
                <CardTitle className='font-baskerville text-h6 font-normal'>Moj referral link</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
                <span className='font-bold'>Referral link</span>
                <div className='border flex gap-2 justify-between items-center p-2'>
                    <span className='flex flex-auto overflow-x-auto no-scrollbar'>{ process.env.NEXT_PUBLIC_ENV === 'dev' ? `https://d3dnvv4anrgb1h.cloudfront.net/registracija?referralId=${user?.referralLink}` : `https://backoffice.testament.gold/registracija?referralId=${user?.referralLink}`}</span>
                    <CopyButton data={ process.env.NEXT_PUBLIC_ENV === 'dev' ? `https://d3dnvv4anrgb1h.cloudfront.net/registracija?referralId=${user?.referralLink}` : `https://backoffice.testament.gold/registracija?referralId=${user?.referralLink}`} className='border-0 w-5 h-5 bg-transparent hover:bg-transparent hover:opacity-80' />
                </div>
            </CardContent>
        </Card>
    )
}
