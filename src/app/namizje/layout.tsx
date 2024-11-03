import Footer from '@/components/dashboard/layout/footer'
import Header from '@/components/dashboard/layout/header'
import { Sidebar } from '@/components/dashboard/layout/sidebar'
import { cn } from '@/lib/utils/style'

interface DashboardLayoutProps {
    children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className='flex min-h-dvh w-full bg-primary-dark-gray lg:h-dvh'>
            <Sidebar />
            <div className='scrollbar-none flex w-full flex-auto flex-col overflow-clip px-2 pb-4 lg:max-w-[calc(100vw-245px)] lg:pl-0 lg:pr-4 lg:pt-4'>
                <Header />
                <div className='relative flex flex-auto flex-col overflow-x-hidden rounded-[15px] bg-primary-white no-scrollbar'>

                    <main
                        className={cn(
                            'flex flex-auto',
                            '[&>.template>section]:w-full [&>.template>section]:max-w-7xl [&>.template>section]:h-fit [&>.template>section]:mx-auto [&>.template>section]:space-y-6  [&>.template>section]:p-4 [&>.template>section]:lg:px-6 [&>.template>section]:lg:py-5',
                            '[&_h1]:text-2xl lg:[&_h1]:text-3xl [&_h1]:font-medium [&_h1]:mb-3',
                            '[&_h2]:w-full [&_h2]:max-w-[538px] [&_h2]:text-sm [&_h2]:font-light [&_h2]:opacity-60 [&_h2]:leading-normal [&_h2]:mb-6'
                        )}
                    >
                        {children}
                    </main>
                </div>
                <Footer />
            </div>
        </div>
    )
}
