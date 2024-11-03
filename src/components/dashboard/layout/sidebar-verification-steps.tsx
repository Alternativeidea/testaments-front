'use client'

import { Icons } from '@/components/ui/icons'
import { Separator } from '@/components/ui/separator'
import { DASHBOARD_VERIFICATION_STEPS } from '@/lib/constants/dashboard'
import { useVerificationState } from '../verification/verification-flow'

export function SidebarVerificationSteps() {
    const currentStep = useVerificationState(s => s.currentStep)
    return (
        <div className='w-full inline-flex flex-1 flex-col overflow-x-scroll lg:overflow-x-hidden lg:overflow-y-scroll no-scrollbar gap-3'>
            <div className='flex lg:flex-col lg:justify-center gap-6 relative'>
                <Separator orientation='vertical' className='h-[90%] hidden lg:block bg-primary-medium-gray absolute top-1.5 left-[5.5px]'/>
                {DASHBOARD_VERIFICATION_STEPS.map(({ name, availableSteps }) => (
                    <div
                        key={`i-${name}`}
                        className='min-w-fit flex items-center gap-2 lg:gap-6 relative'
                    >
                        {availableSteps.some(({ step }) => step === currentStep) || currentStep > availableSteps[availableSteps.length - 1].step
                            ? <>
                                <Icons.DotGold className='w-3 h-3'/>
                                <span className='font-medium text-primary-white'>{name}</span>
                            </>
                            : <>
                                <Icons.Dot className='w-2 h-2 ml-0.5'/>
                                <span className=''>{name}</span>
                            </>
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}
