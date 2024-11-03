import { Ilustrations } from '@/components/ui/ilustrations'
import { ScrollArea } from '@/components/ui/scroll-area'
import Link from 'next/link'
import { HeaderContentOrchestrator, HeaderContentOrchestratorDashboard, HeaderContentOrchestratorVerification } from './header-content-orchestrator'
import MobileMenu from './mobile-menu'
import { MenuItems } from './sidebar'
import { SidebarVerificationSteps } from './sidebar-verification-steps'
import UserPlan from './user-plan'

export default function Header() {
    return (
        <header className="w-full lg:min-h-[72px] flex lg:hidden justify-between items-center bg-primary-dark-gray px-4 lg:px-8 py-2 lg:py-5 sticky top-0 left-0 z-[60] pointer-events-auto">
            <HeaderContentOrchestrator>
                <HeaderContentOrchestratorDashboard>
                    {/* Logo */}
                    <Link href='/namizje/domov' className="relative z-20 flex lg:hidden items-center gap-4 justify-center">
                        <Ilustrations.Imagotype className='w-40 text-primary-white' />
                    </Link>
                    <MobileMenu>
                        <ScrollArea className='w-full h-full'>
                            <MenuItems />
                        </ScrollArea>
                        <div className='flex flex-col'>
                            <UserPlan />
                        </div>
                    </MobileMenu>
                </HeaderContentOrchestratorDashboard>
                <HeaderContentOrchestratorVerification>
                    <div className='w-full flex flex-col'>
                        {/* Logo */}
                        <Link href='/namizje/domov' className="relative z-20 flex lg:hidden items-center gap-4">
                            <Ilustrations.Imagotype className='w-40 text-primary-white' />
                        </Link>
                        <SidebarVerificationSteps />
                    </div>
                </HeaderContentOrchestratorVerification>
            </HeaderContentOrchestrator>
        </header>
    )
}
