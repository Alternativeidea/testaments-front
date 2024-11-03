'use client'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import Modal from '@/components/ui/modal'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface ProductCardModalProps {
    children: React.ReactNode
}

const ProductCardModal = ({ children }: ProductCardModalProps) => {
    const [openModal, setOpenModal] = useState(false)
    return (
        <>
            <div onClick={() => setOpenModal(true)}>
                {children}
            </div>
            <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
                <div className='flex flex-col max-w-full w-[750px] h-full md:h-fit bg-primary-white rounded-md relative px-4 pt-12 md:p-12'>
                    <Icons.Close className='absolute right-4 top-4' onClick={() => setOpenModal(false)} />
                    <h1 className='text-h6 max-w-md'>
                            Postanite Premium in začnite brskati po E-tržnici zapuščin.
                    </h1>
                    <p className='my-4 max-w-lg text-body-medium'>
                            Z nadgradnjo na Premium boste odklenili celoten dostop do E-tržnice zapuščin. Spodaj si poglejte, kaj vse nudi nadgradnja:
                    </p>
                    <div className='flex flex-col gap-y-6 max-w-lg'>
                        <div className='flex w-full justify-around h-full'>
                            <span className=' min-w-12 text-h5 font-baskerville text-gradient-gold'>
                                    1.
                            </span>
                            <p>
                                <b>Dostop do Ekskluzivne Tržnice:</b> Premium vam omogoča dostop do ekskluzivnih informacij o
                                    nakupu artiklov iz zapuščine, vključno z motornimi vozili, nepremičninami, plovili, ter prevzemu
                                    projektov, poslovnih priložnosti in delovnih mest.
                            </p>
                        </div>
                        <div className='flex w-full justify-around h-full'>
                            <span className=' min-w-12 text-h5 font-baskerville text-gradient-gold'>
                                    2.
                            </span>
                            <p>
                                <b>Digitalna Shramba:</b> Zagotovljen vam je varen shranjen prostor za vaše TST digitalne zlatnike
                                    (testamente), kjer jih lahko hranite in upravljate in urejate, ter pregleda vaših oporok.
                            </p>
                        </div>
                        <div className='flex w-full justify-around h-full'>
                            <span className=' min-w-12 text-h5 font-baskerville text-gradient-gold'>
                                    3.
                            </span>
                            <p>
                                <b>Redne Posodobitve in Novice:</b> Prejemanje redne posodobitve in novic o novostih na e-tržnici zapuščin.
                            </p>
                        </div>
                        <div className='flex w-full justify-around h-full'>
                            <span className=' min-w-12 text-h5 font-baskerville text-gradient-gold'>
                                    4.
                            </span>
                            <p>
                                <b>Prednostna Podpora:</b> Kot Premium imate možnost prednostne podpore in hitrejšega odziva na vaša vprašanja ali težave.
                            </p>
                        </div>
                    </div>
                    <p className='my-4 max-w-lg text-body-medium font-bold'>
                        Postanite Premium še danes, da odklenete vse te izjemne funkcionalnosti.
                    </p>
                    <Link
                        href={'/namizje/verification'}
                    >
                        <Button className='w-fit'>
                            Postanite Premium
                        </Button>
                    </Link>
                    <Image width={160} height={160} alt='image1' src={'/img/market-modal-2.png'} className='hidden md:block md:absolute right-0 bottom-0 md:top-[38%] rounded-2xl'/>
                    <Image width={130} height={130} alt='image1' src={'/img/market-modal-1.png'} className='hidden md:block md:absolute right-0 bottom-0 md:top-[25%] rounded-l-2xl'/>
                    <Image width={130} height={130} alt='image1' src={'/img/market-modal-3.png'} className='hidden md:block md:absolute right-0 bottom-0 md:top-[55%] rounded-l-2xl'/>
                    <Image width={600} height={320} alt='image1' src={'/img/market-modal-4.png'} className='md:hidden left-0 bottom-0 mt-12 object-contain'/>
                </div>
            </Modal >
        </>
    )
}

export default ProductCardModal
