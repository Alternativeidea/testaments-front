import TabComponentAmbassador from '@/components/dashboard/admin/ui/tab-component-ambassador'
import Accounts from '@/components/dashboard/ambassador/accounts'
import { AccountsLoading } from '@/components/dashboard/ambassador/accounts-loading'
import { AmbassadorInfo } from '@/components/dashboard/ambassador/info'
import { InfoError } from '@/components/dashboard/ambassador/info-error'
import { AmbassadorInfoLoading } from '@/components/dashboard/ambassador/info-loading'
import Izplacila from '@/components/dashboard/ambassador/izplacila'
import IzplaciloConfirm from '@/components/dashboard/ambassador/izplacilo-confirm'
import { MembershipsCards } from '@/components/dashboard/ambassador/memberships-cards'
import { MembershipsCardsLoading } from '@/components/dashboard/ambassador/memberships-cards-loading'
import { Provizije } from '@/components/dashboard/ambassador/provizije'
import { Structure } from '@/components/dashboard/ambassador/structure'
import { TreeCards } from '@/components/dashboard/ambassador/tree-cards'
import { TreeCardsLoading } from '@/components/dashboard/ambassador/tree-cards-loading'
import { TstPool } from '@/components/dashboard/ambassador/tst-pool'
import MessageCard from '@/components/dashboard/home/message-card'
import MessageCardError from '@/components/dashboard/home/message-card-error'
import MessageCardSkeleton from '@/components/dashboard/home/message-card-skeleton'
import { PageHeader, PageHeaderName } from '@/components/dashboard/layout/page-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import CopyButton from '@/components/ui/copy-button'
import { Icons } from '@/components/ui/icons'
import { SECTION_AMBASSADOR } from '@/lib/constants/sections'
import { cookies as cookieStore } from 'next/headers'
import Link from 'next/link'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

interface AmbassadorConfirmProps {
    searchParams: { [key: string]: string }
}

const TABS = [
    {
        title: 'Info',
        disable: false,
        value: 'info',
        content: <ErrorBoundary FallbackComponent={InfoError}>
            <Suspense fallback={<AmbassadorInfoLoading />}>
                <AmbassadorInfo />
            </Suspense>
        </ErrorBoundary>
    },
    {
        title: 'Struktura',
        disable: false,
        value: 'struktura',
        content: <ErrorBoundary FallbackComponent={InfoError}>
            <Suspense fallback={<AmbassadorInfoLoading />}>
                <Structure/>
            </Suspense>
        </ErrorBoundary>
    },
    {
        title: 'Provizije',
        disable: false,
        value: 'provizije',
        content: <ErrorBoundary FallbackComponent={InfoError}>
            <Suspense fallback={<AmbassadorInfoLoading />}>
                <Provizije/>
            </Suspense>
        </ErrorBoundary>
    },
    {
        title: 'Izplačila',
        disable: false,
        value: 'izplacila',
        content: <ErrorBoundary FallbackComponent={InfoError}>
            <Suspense fallback={<AmbassadorInfoLoading />}>
                <Izplacila/>
            </Suspense>
        </ErrorBoundary>
    },
    {
        title: 'TST Bazen',
        value: 'tst-bazen',
        disable: true,
        content: <TstPool />
    }
]

export default function AmbassadorPage({ searchParams } : AmbassadorConfirmProps) {
    const cookies = cookieStore()
    const user = cookies.get('user')?.value
    const { name, referralLink } = JSON.parse(user || '{}')
    return (
        <>
            <PageHeader>
                <PageHeaderName>Dobrodošli {name}!</PageHeaderName>
                <Link
                    href='/namizje/tst-svetovalec/kako-deluje'
                    className='hidden w-fit md:flex items-center gap-2'
                >
                    <Icons.Info className='w-5 h-5' />
                    <span className='font-bold text-body-small'>Kako deluje tržniški program TST svetovalcev?</span>
                </Link>
            </PageHeader>
            <section>
                <ErrorBoundary FallbackComponent={MessageCardError}>
                    <Suspense fallback={<MessageCardSkeleton/>}>
                        <MessageCard sectionId={SECTION_AMBASSADOR}/>
                    </Suspense>
                </ErrorBoundary>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <TabComponentAmbassador
                        tabs={TABS}
                        defaultValue={TABS[0].value}
                    />
                    <div className='space-y-4'>
                        <Card className='border-0 bg-primary-light-gray/30'>
                            <CardHeader >
                                <CardTitle className='font-baskerville text-h6 font-normal'>Moj referral link</CardTitle>
                            </CardHeader>
                            <CardContent className='space-y-4'>
                                <span className='font-bold'>Referral link</span>
                                <div className='border flex gap-2 justify-between items-center p-2'>
                                    <span className='flex flex-auto overflow-x-auto no-scrollbar'>{ process.env.NEXT_PUBLIC_ENV === 'dev' ? `https://d3dnvv4anrgb1h.cloudfront.net/registracija?referralId=${referralLink}` : `https://backoffice.testament.gold/registracija?referralId=${referralLink}`}</span>
                                    <CopyButton data={ process.env.NEXT_PUBLIC_ENV === 'dev' ? `https://d3dnvv4anrgb1h.cloudfront.net/registracija?referralId=${referralLink}` : `https://backoffice.testament.gold/registracija?referralId=${referralLink}`} className='border-0 w-5 h-5 bg-transparent hover:bg-transparent hover:opacity-80' />
                                </div>
                            </CardContent>
                        </Card>
                        <ErrorBoundary FallbackComponent={InfoError}>
                            <Suspense fallback={<AccountsLoading />}>
                                <Accounts/>
                            </Suspense>
                        </ErrorBoundary>
                    </div>
                </div>

                <ErrorBoundary FallbackComponent={InfoError}>
                    <Suspense fallback={<TreeCardsLoading />}>
                        <TreeCards />
                    </Suspense>
                </ErrorBoundary>

                <ErrorBoundary FallbackComponent={InfoError}>
                    <Suspense fallback={<MembershipsCardsLoading />}>
                        <MembershipsCards />
                    </Suspense>
                </ErrorBoundary>

                {/* Tree View */}
                {/* <TreeSheetView openSheet={!!searchParams.id && !searchParams.code} id={Number(searchParams.id)}/> */}
                {/* Izplacilo Mail Confirmation */}
                <IzplaciloConfirm id={searchParams.id} code={searchParams.code}/>
            </section>
        </>
    )
}
