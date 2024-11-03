import Hero from '@/components/landing/sections/hero'
import HowToStart from '@/components/landing/sections/how-to-start'
import Join from '@/components/landing/sections/join'
import OurClients from '@/components/landing/sections/our-clients'
import OurNews from '@/components/landing/sections/our-news'
import Plain from '@/components/landing/sections/plain'
import Testament from '@/components/landing/sections/testament'

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between px-4 lg:px-44 overflow-hidden !no-scrollbar">
            <Hero />
            <Plain/>
            <Testament/>
            <Join/>
            <OurClients/>
            <HowToStart/>
            <OurNews/>
        </main>
    )
}
