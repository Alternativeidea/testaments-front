'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { buttonVariants } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { invalidateCacheByPath } from '@/lib/actions/cache'
import { SubPathProps } from '@/lib/constants/dashboard'
import { PLAN_FREE } from '@/lib/constants/plan'
import { useCookies } from '@/lib/hooks/use-cookies'
import { cn } from '@/lib/utils/style'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMobileMenuState } from './mobile-menu'

interface SidebarLinkProps {
    children: string
    className?: string
    href: string
    icon: React.ReactNode
    subpaths?: SubPathProps[]
    isAvailable: boolean
    isEnabledInFree?: boolean
}

export default function SidebarLink({ children, className, href, icon, subpaths, isAvailable, isEnabledInFree }: SidebarLinkProps) {
    const cookies = useCookies()
    const user = cookies.get('user')
    const { membershipId } = JSON.parse(user ?? '{}')
    const pathname = usePathname()
    const setIsOpen = useMobileMenuState(s => s.setIsOpen)

    function getVariant() {
        if (!isAvailable) {
            return 'sidebar-link-disabled'
        }
        if (membershipId === PLAN_FREE && !isEnabledInFree) {
            return 'sidebar-link-disabled'
        }
        if (pathname?.includes(href)) {
            return 'sidebar-link-active'
        }
        return 'sidebar-link'
    }

    async function handleClick() {
        await invalidateCacheByPath(href)
        setIsOpen(false)
    }

    if (subpaths) {
        return (
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value={'item' + children}>
                    <AccordionTrigger asChild className='[&[data-state=open]>svg]:rotate-180'>
                        <div
                            title={children[0].toUpperCase() + children.slice(1)}
                            className={cn(
                                buttonVariants({ variant: getVariant() }),
                                'justify-start !gap-0',
                                className
                            )}
                        >
                            <span className='mr-5'>{ icon }</span>
                            <Link
                                href={href}
                                onClick={handleClick}
                                className='transition-opacity text-body-small'
                            >
                                { children }
                            </Link>
                            <Icons.ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 ml-auto" />
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <ul className='list-none pl-[4.2rem] space-y-2 py-2'>
                            {
                                subpaths.map(({ name, path, isEnabledInFree }) => (
                                    <li key={path}>
                                        <Link
                                            href={path}
                                            title={name[0].toUpperCase() + name.slice(1)}
                                            onClick={handleClick}
                                            className={
                                                membershipId === PLAN_FREE && !isEnabledInFree
                                                    ? cn('sidebar-link-disabled pointer-events-none !text-body-small')
                                                    : cn(
                                                        'w-full justify-start text-primary-white/50 capitalize !text-body-small transition-opacity',
                                                        'hover:text-primary-white/70',
                                                        pathname === path && 'text-primary-white'
                                                    )}
                                        >{name}</Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        )
    }

    return (
        <Link
            href={href}
            title={children[0].toUpperCase() + children.slice(1)}
            onClick={handleClick}
            className={cn(
                buttonVariants({ variant: getVariant() }),
                'justify-start',
                className
            )}
        >
            <span className='mr-5'>{ icon }</span>
            <span className='text-body-small font-dm-sans capitalize transition-opacity'>{ children }</span>
        </Link>
    )
}
