'use client'
// Next
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
// Components
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import Modal from '@/components/ui/modal'
// Icons
import { X } from 'lucide-react'
import LogotypeWhite from './logotype-white'
// Utils
import { contactLinks, headerLinks } from '@/lib/constants/landing'

export default function LandingHeader() {
    const [openModal, setOpenModal] = useState(false)
    const pathname = usePathname()

    return (
        <header className="w-full lg:h-[72px] flex justify-between items-center bg-primary-dark-gray border-b border-primary-medium-gray px-4 lg:px-44 py-2 lg:py-5 fixed top-0 z-40">
            {/* Desktop Logo */}
            <Link href='/' className="flex items-center gap-4 justify-center py-4 lg:py-0">
                <LogotypeWhite />
            </Link>
            {/* Desktop Navigation */}
            <div className="gap-x-12 hidden lg:flex">
                {headerLinks.map((link) =>
                    <Link key={link.name} href={`${link.url}`} className='flex items-center justify-center h-[72px] relative'>
                        <h3 className={`${pathname === link.url ? 'text-primary-white' : 'text-primary-white/60'} hover:text-primary-white text-body-big-2 font-baskerville`}>
                            {link.name}
                        </h3>
                        {pathname === link.url &&
                        <span className='absolute w-[30px] h-[4px] bg-gradient-gold bottom-0'/>
                        }
                    </Link>
                )}
            </div>
            <div className="hidden lg:flex gap-x-6">
                {contactLinks.map((link) =>
                    <Link key={link.name} href={`${link.url}`} className='flex items-center justify-center h-[72px] relative'>
                        <p className={`${pathname === link.url ? 'text-primary-white' : 'text-primary-white/60'} hover:text-primary-white text-body-big-2 font-baskerville`}>
                            {link.name}
                        </p>
                        {pathname === link.url &&
                            <span className='absolute w-[30px] h-[4px] bg-gradient-gold bottom-0'/>
                        }
                    </Link>
                )}
            </div>
            {/* Mobile Menu Button */}
            <div className='lg:hidden'>
                <Icons.Menu onClick={() => setOpenModal(true)}/>
            </div>
            {/* Mobile Menu */}
            <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
                <div className='fixed flex flex-col bg-primary-dark-gray w-full h-full p-6 justify-between'>
                    <div className='flex justify-between items-center'>
                        <Link href='/' className="flex items-center gap-4 justify-center py-4 lg:py-0">
                            <LogotypeWhite />
                        </Link>
                        <Button className='flex w-fit border-none items-center justify-center !text-primary-white p-0' onClick={() => setOpenModal(false)}>
                            <X size={36}/>
                        </Button>
                    </div>
                    <div className='flex flex-col items-center gap-y-12 pb-16'>
                        {headerLinks.map((link) =>
                            <Link onClick={() => setOpenModal(false)} key={link.name} href={`${link.url}`}>
                                <h3 className={`${pathname === link.url ? 'text-primary-white' : 'text-primary-white/60'} hover:text-primary-white text-h6 font-baskerville`}>
                                    {link.name}
                                </h3>
                            </Link>
                        )}
                    </div>
                    <div className='flex justify-center gap-x-12'>
                        {contactLinks.map((link) =>
                            <Link onClick={() => setOpenModal(false)} key={link.name} href={`${link.url}`}>
                                <h3 className={`${pathname === link.url ? 'text-primary-white' : 'text-primary-white/60'} hover:text-primary-white text-h6 font-baskerville`}>
                                    {link.name}
                                </h3>
                            </Link>
                        )}
                    </div>
                </div>
            </Modal>
        </header>
    )
}
