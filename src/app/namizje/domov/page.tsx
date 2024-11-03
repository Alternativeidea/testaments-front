// import { BenefitBlock, BenefitBlockDescription, BenefitBlockFooter, BenefitBlockHeader, BenefitBlockSubTitle, BenefitBlockTitle } from '@/components/dashboard/home/benefit-block'
import FinancialCards from '@/components/dashboard/home/financial-cards'
import FinancialCardsError from '@/components/dashboard/home/financial-cards-error'
import FinancialCardsSkeleton from '@/components/dashboard/home/financial-cards-skeleton'
import MessageCard from '@/components/dashboard/home/message-card'
import MessageCardError from '@/components/dashboard/home/message-card-error'
import MessageCardSkeleton from '@/components/dashboard/home/message-card-skeleton'
// import LatestProducts from '@/components/dashboard/home/latest-products'
// import LatestWills from '@/components/dashboard/home/latest-wills'
// import LatestWillsError from '@/components/dashboard/home/latest-wills-error'
// import LatestWillsSkeleton from '@/components/dashboard/home/latest-wills-skeleton'
import TestamentButtons from '@/components/dashboard/testaments/testament-buttons'
import RemovableCard from '@/components/dashboard/ui/removable-card'
import { VerificationFlowResetter } from '@/components/dashboard/verification/verification-flow'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { DrawerDialog } from '@/components/ui/drawer-dialog'
import { Icons } from '@/components/ui/icons'
import { Ilustrations } from '@/components/ui/ilustrations'
import { Separator } from '@/components/ui/separator'
import { PREMIUM_DETAILS } from '@/lib/constants/membership'
import { PLAN_FREE } from '@/lib/constants/plan'
import { SECTION_HOME } from '@/lib/constants/sections'
import { getProfile } from '@/lib/services/auth'
import { timeLeft } from '@/lib/utils/date'
import { cn } from '@/lib/utils/style'
import { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'

import { ErrorBoundary } from 'react-error-boundary'

export const metadata: Metadata = {
    title: 'Nadzorna plošča'
}

export default async function HomePage() {
    const { membershipId, balance, isVerified, email, suspensionDate }: ProfileProps = await getProfile()

    return (
        <>
            <VerificationFlowResetter />
            {/* Free dashboard */}
            {!isVerified && (
                <Card className='border-accent-red hidden'>
                    <div className='h-fit flex flex-col md:flex-row justify-between p-4 md:p-3'>
                        <div className='flex flex-1 flex-col gap-4 md:p-3'>
                            <span className='w-fit text-accent-red text-h6 font-baskerville'>
                            Dokončajte verifikacijo
                            </span>
                            <p className='text-body-small text-accent-red'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
                            </p>
                        </div>
                        <div className='md:min-w-[273px] flex flex-col md:flex-row'>
                            <Separator className='md:hidden bg-accent-red my-4' />
                            <Separator orientation='vertical' className='hidden md:block bg-accent-red mx-3' />
                            <div className='w-full flex justify-center items-center md:px-6 md:py-3'>
                                <Link
                                    href='/namizje/verifikacija'
                                    className={cn(buttonVariants(), 'w-full px-10')}
                                >
                                    <span className='leading-none '>Verifikacija</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Card>
            )}

            {/* Hidden momentarily  */}
            <Card className={`hidden border-accent-red ${suspensionDate ? '' : 'hidden'}`}>
                <div className='h-fit min-h-[141px] flex flex-col md:flex-row p-4 md:p-3'>
                    <div className='flex flex-1 flex-col justify-center gap-4 md:p-3'>
                        <p className='text-body-small text-accent-red'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
                        </p>
                    </div>
                    <div className='md:min-w-[273px] flex flex-col md:flex-row'>
                        <Separator className='md:hidden bg-accent-red my-4' />
                        <Separator orientation='vertical' className='hidden md:block bg-accent-red mx-3' />
                        <div className='w-full flex justify-center items-center md:px-6 md:py-3'>
                            <span className='w-max font-baskerville text-h6 text-primary-dark-gray'>{timeLeft(suspensionDate ?? new Date())}</span>
                        </div>
                    </div>
                </div>
            </Card>

            {membershipId === PLAN_FREE && (
                <RemovableCard strict={false}>
                    <div className='h-fit flex flex-col md:flex-row'>
                        <div className='flex flex-1 flex-col md:p-3'>
                            <span className='w-fit text-gradient-gold text-h6 font-baskerville'>
                            Ustvarite Premium Račun
                            </span>
                            <p className='text-body-small text-primary-medium-gray/70 mt-4'>
                            S plačilom letne premium naročine pridobite vrsto prednosti, ki lahko obogatijo vašo izkušnjo. Zagotavljajo vam dodatno vrednost z dostopom do ekskluzivnih funkcij platforme.
                            </p>
                            <br></br>
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
                        <div className='md:min-w-[273px] flex flex-col md:flex-row'>
                            <Separator className='md:hidden my-4' />
                            <Separator orientation='vertical' className='hidden md:block mx-3' />
                            <div className='w-full flex justify-center items-center md:px-6 md:py-3'>
                                <Link
                                    href='/namizje/verification'
                                    className={cn(buttonVariants(), 'w-full px-10')}
                                >
                                    <span className='leading-none '>Ustvari</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </RemovableCard>
            )}

            {/* Premium dashboard */}
            <div className='md:grid-cols-2 gap-4 hidden'>
                <Card className='bg-primary-light-gray/20 p-6'>
                    <div className='flex flex-col gap-4'>
                        <div className='flex justify-between items-start'>
                            <span className='text-h6 font-baskerville'>Vaša verifikacija je v obdelavi</span>
                            <div className='w-8 h-8 flex justify-center items-center bg-primary-white shadow-dashboard-header'>
                                <Ilustrations.Clock className='w-6 h-6' />
                            </div>
                        </div>
                        <p className='text-body-small text-primary-medium-gray/70'>Naša ekipa trenutno preverja vaše podatke. Medtem ko traja postopek verifikacije, in dokler ne prejmemo vašega plačila, dostop do plačljivih vsebin ni mogoč. Ta proces običajno traja največ 48 ur. Ko bo verifikacija uspešno zaključena in plačilo prejeto, boste o tem obveščeni preko potrditvenega e-poštnega sporočila.</p>
                    </div>
                </Card>
                <Card className='bg-primary-light-gray/20 p-6'>
                    <div className='w-full h-full flex flex-col xl:flex-row justify-between xl:items-center gap-4'>
                        <div className='flex flex-col gap-4'>
                            <span className='text-h6 font-baskerville'>Niste še plačali?</span>
                            <p className='text-body-small text-primary-medium-gray/70'>Plačajte zdaj in izkoristite polni potencial naše platforme!</p>
                        </div>
                        <Button className='min-w-[200px]'>Plačaj</Button>
                    </div>
                </Card>
            </div>
            {/* Message */}
            <ErrorBoundary FallbackComponent={MessageCardError}>
                <Suspense fallback={<MessageCardSkeleton/>}>
                    <MessageCard sectionId={SECTION_HOME}/>
                </Suspense>
            </ErrorBoundary>

            <Card className='bg-primary-light-gray/20 p-6 hidden'>
                <div className='flex flex-col gap-4'>
                    <div className='flex justify-between items-start'>
                        <span className='text-h6 font-baskerville'>Vaša verifikacija je v obdelavi</span>
                        <div className='w-8 h-8 flex justify-center items-center bg-primary-white shadow-dashboard-header'>
                            <Ilustrations.Clock className='w-6 h-6' />
                        </div>
                    </div>
                    <p className='text-body-small text-primary-medium-gray/70'>Naša ekipa trenutno preverja vaše podatke. Medtem ko traja postopek verifikacije, in dokler ne prejmemo vašega plačila, dostop do plačljivih vsebin ni mogoč. Ta proces običajno traja največ 48 ur. Ko bo verifikacija uspešno zaključena in plačilo prejeto, boste o tem obveščeni preko potrditvenega e-poštnega sporočila.</p>
                </div>
            </Card>

            <Card className='hidden'>
                <div className='h-fit flex flex-col md:flex-row justify-between p-4 md:p-3'>
                    <div className='flex flex-1 flex-col justify-between gap-4 md:p-3'>
                        <span className='w-fit text-h6 font-baskerville'>
                            Niste še plačali?
                        </span>
                        <p className='text-body-small'>
                            Plačajte zdaj in odklenite Premium lorem
                        </p>
                    </div>
                    <div className='md:min-w-[273px] flex flex-col md:flex-row'>
                        <Separator className='md:hidden bg-primary-light-gray my-4' />
                        <Separator orientation='vertical' className='hidden md:block mx-3' />
                        <div className='w-full flex justify-center items-center md:px-6 md:py-3'>
                            <Button className='w-full px-10'>Plačaj zdaj!</Button>
                        </div>
                    </div>
                </div>
            </Card>

            <Card className='hidden'>
                <div className='h-fit flex flex-col md:flex-row justify-between p-4 md:p-3'>
                    <div className='flex flex-1 flex-col justify-between gap-4 md:p-3'>
                        <span className='w-fit text-h6 font-baskerville'>
                            Verifikacija končana!
                        </span>
                        <p className='text-body-small'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                    </div>
                    <div className='md:min-w-[273px] flex flex-col md:flex-row'>
                        <Separator className='md:hidden bg-primary-light-gray my-4' />
                        <Separator orientation='vertical' className='hidden md:block mx-3' />
                        <div className='w-full flex justify-center items-center md:px-6 md:py-3'>
                            <Button className='w-full px-10'>Dodaj dediča / kreiraj oporoko</Button>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Financial cards */}
            <ErrorBoundary FallbackComponent={FinancialCardsError}>
                <Suspense fallback={<FinancialCardsSkeleton />}>
                    <FinancialCards balance={Number(balance)} />
                </Suspense>
            </ErrorBoundary>

            {/* Centered buttons */}
            <div className='w-full xl:w-fit flex gap-4 mx-auto overflow-x-scroll no-scrollbar'>
                <TestamentButtons
                    email={email}
                    balance={balance}/>
            </div>
            {/* Latest wills and products blocks */}
            {/* <div className='grid md:grid-cols-2 gap-4'>
                {membershipId === PLAN_FREE
                    ? <>
                        <BenefitBlock>
                            <div className='w-12 h-12 flex justify-center items-center bg-primary-white shadow-dashboard-header absolute top-4 right-5'>
                                <Icons.Lock className='w-6 h-6' />
                            </div>
                            <BenefitBlockHeader>
                                <BenefitBlockTitle>Moja digitalna oporoka</BenefitBlockTitle>
                                <BenefitBlockSubTitle>Odklenite celoten potencial Vaše zapuščine</BenefitBlockSubTitle>
                                <BenefitBlockDescription>Vaša &apos;Digitalna Oporoka&apos; čaka na vas! Postanite premium član in dodajte vse od nepremičnin do poslovnih modelov in motornih vozil v vašo oporoko ali zapuščino. Ne omejujte svoje dediščine - razširite jo za svoje dediče.</BenefitBlockDescription>
                            </BenefitBlockHeader>
                            <BenefitBlockFooter>
                                <Link
                                    href='/namizje/become-a-member'
                                    className={cn(buttonVariants())}
                                >
                                    <span className='leading-none '>Postani član in odkleni</span>
                                </Link>
                                <Button className='w-full' disabled>
                                    <span className='flex items-center gap-4'>
                                        <span className='leading-none '>Postani član in odkleni</span>
                                    </span>
                                </Button>
                            </BenefitBlockFooter>
                        </BenefitBlock>
                        <BenefitBlock>
                            <div className='w-12 h-12 flex justify-center items-center bg-primary-white shadow-dashboard-header absolute top-4 right-5'>
                                <Icons.Lock className='w-6 h-6' />
                            </div>
                            <BenefitBlockHeader>
                                <BenefitBlockTitle>Ekskluzivna tržnica</BenefitBlockTitle>
                                <BenefitBlockSubTitle>Razširite svoje možnosti z dostopom do ekskluzivne tržnice</BenefitBlockSubTitle>
                                <BenefitBlockDescription>Članstvo vam omogoča dostop do ekskluzivnih informacij o nakupu artiklov iz zapuščine, vključno z motornimi vozili, nepremičninami, plovili, ter prevzemu projektov, poslovnih priložnosti in delovnih mest.</BenefitBlockDescription>
                            </BenefitBlockHeader>
                            <BenefitBlockFooter>
                                <Link
                                    href='/namizje/become-a-member'
                                    className={cn(buttonVariants())}
                                >
                                    <span className='leading-none '>Postani član in odkleni</span>
                                </Link>
                                <Button className='w-full' disabled>
                                    <span className='flex items-center gap-4'>
                                        <span className='leading-none '>Postani član in odkleni</span>
                                    </span>
                                </Button>
                            </BenefitBlockFooter>
                        </BenefitBlock>
                    </>
                    : <>
                        <ErrorBoundary FallbackComponent={LatestWillsError}>
                            <Suspense fallback={<LatestWillsSkeleton />}>
                                <LatestWills />
                            </Suspense>
                        </ErrorBoundary>
                        <ErrorBoundary FallbackComponent={LatestWillsError}>
                            <Suspense fallback={<LatestWillsSkeleton />}>
                                <LatestProducts />
                            </Suspense>
                        </ErrorBoundary>
                    </>
                }
            </div> */}
        </>
    )
}
