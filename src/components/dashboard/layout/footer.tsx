'use client'

import { Icons } from '@/components/ui/icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Footer() {
    const pathname = usePathname()

    if (!pathname?.startsWith('/namizje/verifikacija')) {
        return null
    }

    return (
        <footer className='flex lg:hidden justify-center'>
            <div className='space-y-6 p-6'>
                <Link
                    href='https://www.testament.si/pravno-obvestilo'
                    target='_blank'
                    className='flex items-center gap-4 text-primary-white'
                >
                    <Icons.Text />
                    <span className='text-body-medium font-medium'>Pogoji poslovanja</span>
                </Link>
                <Link
                    href='https://www.testament.si/pravno-obvestilo'
                    target='_blank'
                    className='flex items-center gap-4 text-primary-white'
                >
                    <Icons.Text />
                    <span className='text-body-medium font-medium'>Politika Zasebnosti</span>
                </Link>
            </div>
        </footer>
    )
}
