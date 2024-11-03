import LandingFooter from '@/components/landing/layout/landing-footer'
import LandingHeader from '@/components/landing/layout/landing-header'
import ForConsideration from '@/components/landing/sections/for-consideration'
import React from 'react'

interface LandingLayoutProps {
    children: React.ReactNode
}

export default function LandingLayout({ children }: LandingLayoutProps) {
    return (
        <div className='overflow-hidden'>
            <LandingHeader />
            <main>
                {children}
            </main>
            <ForConsideration/>
            <LandingFooter />
        </div>
    )
}
