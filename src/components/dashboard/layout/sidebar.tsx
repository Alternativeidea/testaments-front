'use client'

import LogotypeWhite from '@/components/landing/layout/logotype-white'
import { Icons } from '@/components/ui/icons'
import { Ilustrations } from '@/components/ui/ilustrations'
import { Separator } from '@/components/ui/separator'
import { ADMIN_DASHBOARD_MENU_ITEMS, USER_DASHBOARD_MENU_ITEMS } from '@/lib/constants/dashboard'
import { ADMIN_ROLE_ID, GOLD_ADMIN_ROLE_ID, USER_ROLE_ID } from '@/lib/constants/roles'
import { getProfile } from '@/lib/services/auth'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { useCookies } from 'react-cookie'
import { SidebarContentOrchestrator, SidebarContentOrchestratorDashboard, SidebarContentOrchestratorVerification } from './sidebar-content-orchestrator'
import SidebarLink from './sidebar-link'
import { SidebarVerificationSteps } from './sidebar-verification-steps'
import UserPlan from './user-plan'

export function MenuItems() {
    const [cookies] = useCookies(['user'])
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        if (cookies.user) {
            setIsReady(true)
        }
    }, [cookies.user])

    const userMenuItems = useMemo(() =>
        cookies.user?.isAmbassador
            ? USER_DASHBOARD_MENU_ITEMS
            : USER_DASHBOARD_MENU_ITEMS.filter(({ name }) => name !== 'TST Svetovalec')
    , [cookies.user?.isAmbassador])

    return isReady
        ? (
            <div className='inline-flex w-full flex-1 flex-col gap-3 overflow-x-hidden overflow-y-scroll no-scrollbar'>
                {cookies.user?.roleId === ADMIN_ROLE_ID && ADMIN_DASHBOARD_MENU_ITEMS.map(({ name, path, icon, subpaths, isShow, isAvailable, isEnabledInFree }) => {
                    if (!isShow) {
                        return null
                    }
                    return <SidebarLink
                        key={path}
                        href={path}
                        icon={icon}
                        subpaths={subpaths}
                        isAvailable={isAvailable}
                        isEnabledInFree={isEnabledInFree}
                    >{name}</SidebarLink>
                })}
                {cookies.user?.roleId === GOLD_ADMIN_ROLE_ID && ADMIN_DASHBOARD_MENU_ITEMS.map(({ name, path, icon, subpaths, isShow, isAvailable, isEnabledForGoldAdmin, isEnabledInFree }) => {
                    if (!isShow || !isEnabledForGoldAdmin) {
                        return null
                    }
                    return <SidebarLink
                        key={path}
                        href={path}
                        icon={icon}
                        subpaths={subpaths}
                        isAvailable={isAvailable}
                        isEnabledInFree={isEnabledInFree}
                    >{name}</SidebarLink>
                })}
                {cookies.user?.roleId === USER_ROLE_ID && userMenuItems.map(({ name, path, icon, subpaths, isShow, isAvailable, isEnabledInFree }) => {
                    if (!isShow) {
                        return null
                    }
                    return <SidebarLink
                        key={path}
                        href={path}
                        icon={icon}
                        subpaths={subpaths}
                        isAvailable={isAvailable}
                        isEnabledInFree={isEnabledInFree}
                    >{name}</SidebarLink>
                })}
            </div>
        )
        : <>
            <p>loading...</p>
        </>
}

export function Sidebar() {
    const [cookies, setCookies] = useCookies(['user'])
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        if (cookies.user) {
            setIsReady(true)
        }
    }, [cookies.user])

    const isAdmin = useMemo(() =>
        cookies.user?.roleId === ADMIN_ROLE_ID
    , [cookies.user?.roleId])

    useEffect(() => {
        const revalidateUserData = async () => {
            const revalidatedUser = await getProfile()
            if (revalidatedUser.isAmbassador !== cookies.user?.isAmbassador ||
                revalidatedUser.membershipId !== cookies.user?.membershipId ||
                revalidatedUser.nextRenewal !== cookies.user?.nextRenewal
            ) {
                setCookies('user', JSON.stringify(revalidatedUser))
            }
        }

        if (cookies.user?.roleId === USER_ROLE_ID) {
            const intervalId = setInterval(() => {
                revalidateUserData()
            }, 5000)
            return () => clearInterval(intervalId)
        } else {
            revalidateUserData()
        }
    }, [setCookies, cookies.user])

    if (!isReady) return <SidebarSkeleton />

    return (
        <aside className='hidden h-full min-w-[245px] flex-col px-3 py-4 duration-200 ease-out lg:flex'>
            <SidebarContentOrchestrator>
                <SidebarContentOrchestratorDashboard>
                    {/* Logo */}
                    <Link href={isAdmin ? '/namizje/admin/gold/users' : '/namizje/domov'} className="relative z-20 my-3 flex items-center">
                        <LogotypeWhite/>
                    </Link>
                    <MenuItems />
                    <UserPlan />
                </SidebarContentOrchestratorDashboard>
                <SidebarContentOrchestratorVerification>
                    {/* Logo */}
                    <Link href='/namizje/domov' className="relative z-20 my-6 flex items-center">
                        <Ilustrations.Imagotype className='w-[170px] text-primary-white' />
                    </Link>
                    <Separator className='bg-primary-medium-gray' />
                    <SidebarVerificationSteps />
                    {/* Docs links */}
                    <Separator className='bg-primary-medium-gray' />
                    <div className='space-y-6 pb-6 pt-2'>
                        <Link
                            href='https://www.testament.si/pravno-obvestilo'
                            target='_blank'
                            className='flex items-center gap-4 text-primary-white'
                        >
                            <Icons.Text />
                            <span className='text-body-medium'>Pogoji Poslovanja</span>
                        </Link>
                        <Link
                            href='https://www.testament.si/pravno-obvestilo'
                            target='_blank'
                            className='flex items-center gap-4 text-primary-white'
                        >
                            <Icons.Text />
                            <span className='text-body-medium'>Politika Zasebnosti</span>
                        </Link>
                    </div>
                </SidebarContentOrchestratorVerification>
            </SidebarContentOrchestrator>
        </aside>
    )
}

export function SidebarSkeleton({ items = 7 } : { items?: number }) {
    return (
        <div className="flex h-full min-w-[245px] animate-pulse flex-col space-y-4 bg-primary-dark-gray p-4">
            <Link href={'/'} className="relative z-20 my-3 flex items-center">
                <LogotypeWhite/>
            </Link>
            <div className='mt-6 flex flex-col gap-y-3'>
                {Array(items).fill(null).map((_, index) => (
                    <div key={index} className="h-[40px] rounded-md bg-primary-medium-gray"/>
                ))}
            </div>
        </div>
    )
}
