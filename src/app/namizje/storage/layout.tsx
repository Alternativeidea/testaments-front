import { PageHeader, PageHeaderName } from '@/components/dashboard/layout/page-header'
import { GuideRemovableCardTrigger } from '@/components/dashboard/storage/guide-removable-card'

interface StorageLayoutProps {
    children: React.ReactNode
    wills: React.ReactNode
    faqs: React.ReactNode
}

export default function StorageLayout({ children, wills, faqs }: StorageLayoutProps) {
    return (
        <>
            <PageHeader>
                <PageHeaderName>Moja shramba</PageHeaderName>
                <GuideRemovableCardTrigger />
            </PageHeader>
            <section>
                {children}
                {wills}

                <div>
                    <span className='font-baskerville text-body-big'>Pogosto zastavljena vprašanja</span>
                </div>
                {faqs}
            </section>
        </>
    )
}
