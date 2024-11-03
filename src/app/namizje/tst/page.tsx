// Next
import Link from 'next/link'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
// Components
import FinancialCards from '@/components/dashboard/home/financial-cards'
import FinancialCardsError from '@/components/dashboard/home/financial-cards-error'
import FinancialCardsSkeleton from '@/components/dashboard/home/financial-cards-skeleton'
import MessageCard from '@/components/dashboard/home/message-card'
import MessageCardError from '@/components/dashboard/home/message-card-error'
import MessageCardSkeleton from '@/components/dashboard/home/message-card-skeleton'
import TestamentButtons from '@/components/dashboard/testaments/testament-buttons'
import TransactionCards from '@/components/dashboard/testaments/transaction-cards'
import FaqsAccordion from '@/components/dashboard/ui/faqs-accordion'
import { Button } from '@/components/ui/button'
// Utils
import { PageHeader, PageHeaderName } from '@/components/dashboard/layout/page-header'
import ChartSection from '@/components/dashboard/testaments/chart-section'
import TestamentSendConfirmation from '@/components/dashboard/testaments/testament-send-confirmation'
import { TestimonialFaqs } from '@/lib/constants/faqs'
import { SECTION_TST } from '@/lib/constants/sections'
import { getProfile } from '@/lib/services/auth'
import { getFaqsBySectionId } from '@/lib/services/faqs'
import { getTransactions } from '@/lib/services/transactions'
import { addMonths, format } from 'date-fns'

interface TestamentSendProps {
    searchParams: { [key: string]: string }
}

export default async function TestamentPage({ searchParams } : TestamentSendProps) {
    const transactions = await getTransactions(true, format(addMonths(new Date(), -2), 'yyyy-MM-dd'), format(new Date(), 'yyyy-MM-dd'))
    const { balance, email }: ProfileProps = await getProfile()
    const faqs: FaqProps[] = await getFaqsBySectionId(3)

    return (
        <>
            <PageHeader>
                <PageHeaderName>Testamenti</PageHeaderName>
            </PageHeader>
            <section className='lg:!max-w-[calc(100vw-265px)]'>
                {/* Message */}
                <ErrorBoundary FallbackComponent={MessageCardError}>
                    <Suspense fallback={<MessageCardSkeleton/>}>
                        <MessageCard sectionId={SECTION_TST}/>
                    </Suspense>
                </ErrorBoundary>
                {/* Financial cards */}
                <ErrorBoundary FallbackComponent={FinancialCardsError}>
                    <Suspense fallback={<FinancialCardsSkeleton />}>
                        <FinancialCards balance={Number(balance)} />
                    </Suspense>
                </ErrorBoundary>
                {/* Buttons */}
                <div className='flex w-full justify-center'>
                    <TestamentButtons
                        email={email}
                        balance={balance}
                    />
                </div>
                {/* Confirm send sheet */}
                <TestamentSendConfirmation
                    code={searchParams.code}
                />
                <div className='flex flex-col items-start gap-y-6 py-6'>

                    {/* Transactions */}
                    <div className='flex w-full flex-col gap-y-2'>
                        {transactions.length > 0 &&
                            <div className='flex w-full items-center justify-between pb-4'>
                                <p className='text-h6'>Zadnje transakcije </p>
                                <Button variant='secondary'>
                                    <Link href='/namizje/tst/transactions' className='text-body-medium uppercase text-primary-medium-gray'>
                                        POGLEJ VSE
                                    </Link>
                                </Button>
                            </div>
                        }
                        <TransactionCards data={transactions} limit={3} />
                        {/* Exchange Chart */}
                        <div className='py-8'>
                            <ChartSection/>
                        </div>
                    </div>
                    {/* FAQs */}
                    <div className='flex flex-col items-center justify-start'>
                        <h4 className='text-h6'>Pogosto zastavljena vprašanja</h4>
                    </div>
                    <FaqsAccordion faqs={[...TestimonialFaqs, ...faqs]} />
                </div>
            </section>
        </>
    )
}
