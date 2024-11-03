'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { PLAN_FREE } from '@/lib/constants/plan'
import { ADMIN_ROLE_ID, GOLD_ADMIN_ROLE_ID } from '@/lib/constants/roles'
import { cn } from '@/lib/utils/style'
import Link from 'next/link'
import { useCookies } from 'react-cookie'
import LogoutButton from '../profile/logout-button'
import CloseMenuButton from './close-menu-button'
import CopyReferralLinkButton from './copy-referral-link-button'

export default function UserPlan() {
    const [cookies] = useCookies(['user'])

    return (
        <>
            {cookies.user?.roleId === ADMIN_ROLE_ID || cookies.user?.roleId === GOLD_ADMIN_ROLE_ID
                ? <div className='flex w-full justify-center py-4'>
                    <LogoutButton/>
                </div>
                : <CloseMenuButton className='rounded-2xl bg-[#191B1D] px-2.5 py-5'>
                    <Link
                        href='/namizje/moj-profil'
                    >
                        <div className='mb-4 flex justify-between'>
                            <div className='flex flex-auto items-center gap-2'>
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={cookies.user?.picture} alt={cookies.user?.name + ' ' + cookies.user?.lastName} />
                                    <AvatarFallback>{cookies.user?.name?.[0]}{cookies.user?.lastName?.[0]}</AvatarFallback>
                                </Avatar>
                                <div className='flex flex-col text-primary-white'>
                                    <span className='lg:max-w-[10ch] max-w-[260px] truncate text-body-small font-bold leading-normal'>{cookies.user?.name} {cookies.user?.lastName}</span>
                                    <span className='lg:max-w-[13ch] max-w-[260px] truncate text-body-extra-small'>{cookies.user?.email}</span>
                                </div>
                            </div>
                            <Badge variant={cookies.user?.membershipId === PLAN_FREE ? 'default' : 'premium'}>
                                {cookies.user?.membershipId === PLAN_FREE
                                    ? 'free'
                                    : 'premium'
                                }
                            </Badge>
                        </div>
                    </Link>

                    <div className='grid gap-2'>
                        {cookies.user?.membershipId === PLAN_FREE &&
                                <CloseMenuButton>
                                    <Link
                                        href='/namizje/verification'
                                        className={cn(
                                            buttonVariants(),
                                            'w-full h-[40px] bg-transparent !text-body-medium border-2 border-primary-medium-gray'
                                        )}
                                    >
                                        Postani Premium
                                    </Link>
                                </CloseMenuButton>
                        }
                        <CopyReferralLinkButton />
                    </div>
                </CloseMenuButton>
            }
        </>)
}
