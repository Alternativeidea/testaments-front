'use client'

import { PageHeader, PageHeaderName } from '@/components/dashboard/layout/page-header'
import { VerificationFlow, useVerificationState } from '@/components/dashboard/verification/verification-flow'
import { DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { DrawerDialog } from '@/components/ui/drawer-dialog'
import { Icons } from '@/components/ui/icons'
import { DASHBOARD_VERIFICATION_STEPS } from '@/lib/constants/dashboard'
import { PREMIUM_DETAILS } from '@/lib/constants/membership'
import { cn } from '@/lib/utils/style'

export default function VerificationPage() {
    const currentStep = useVerificationState(s => s.currentStep)
    const currentPageName = DASHBOARD_VERIFICATION_STEPS.find(({ availableSteps }) => availableSteps.some(({ step }) => step === currentStep))?.availableSteps.find(({ step }) => step === currentStep)?.pageName
    return (
        <>
            <PageHeader
                className={cn(
                    '',
                    currentStep === 7 && 'hidden'
                )}
            >
                <div className='w-5 md:w-[199px]' />
                <PageHeaderName className='text-center normal-case'>
                    {currentPageName}
                </PageHeaderName>
                <div
                    className={cn(
                        'opacity-0 flex justify-end items-center',
                        currentStep >= 5 && 'opacity-100'
                    )}
                >
                    <DrawerDialog
                        trigger={
                            <div className='w-fit flex items-center gap-2 cursor-pointer'>
                                <Icons.Info className='w-5 h-5' />
                                <span className='hidden md:block font-bold text-body-small'>Kaj pridobim s premium?</span>
                            </div>
                        }
                        title={
                            <DialogTitle className='text-h6 font-baskerville font-normal text-center mb-6'>
                                Kaj pridobim s premium?
                            </DialogTitle>
                        }
                        content={
                            <DialogDescription>
                                <ul className='flex flex-col items-start justify-center space-y-2 gap-2'>
                                    {
                                        PREMIUM_DETAILS.map(({ name, description }, i) => (
                                            <li key={name}>
                                                <div className='flex items-start gap-4'>
                                                    <span className='text-gradient-gold text-h6 font-baskerville min-w-6'>
                                                        {i + 1}.{' '}
                                                    </span>
                                                    <span className='text-body-small'>
                                                        <span className='font-semibold'>{name}:{' '}</span>
                                                        <div contentEditable='true' dangerouslySetInnerHTML={{ __html: description }}></div>
                                                    </span>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </DialogDescription>
                        }
                    />
                </div>
            </PageHeader>
            <section className='flex flex-col flex-auto justify-center items-center !p-0'>
                <VerificationFlow />
            </section>
        </>
    )
}
