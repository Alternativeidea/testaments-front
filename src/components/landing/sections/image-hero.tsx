import Image from 'next/image'
import React from 'react'

interface ImageHeroProps {
    image: string
    title: string
    content: string
    className?: string
    children?: React.ReactNode
}

export default function ImageHero({ image, title, content, className, children } : ImageHeroProps) {
    return (
        <section className={`flex flex-col w-screen lg:h-[calc(100vh/1.4)] ${className}`}>
            <div className='flex flex-col lg:flex-row items-center w-full h-full relative px-4 lg:px-44'>
                <Image src={image} alt='banner' fill className='absolute -z-10 object-cover' />
                <div className='flex flex-col w-full lg:w-1/2 pt-24'>
                    <h1 className='text-h3 lg:text-h1 text-primary-white font-baskerville'>{title}</h1>
                    <div className='flex flex-col gap-6 pl-6 lg:pl-12 max-w-[550px] border-l-2 border-primary-medium-gray pb-24 lg:pb-44'>
                        <p className='text-primary-white text-h6'>{content}</p>
                    </div>
                </div>
                <div className='flex items-end justify-end flex-col w-full lg:w-1/2 lg:h-full pb-20'>
                    {children}
                </div>
            </div>
        </section>
    )
}
