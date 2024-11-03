import { PageHeader, PageHeaderName } from '@/components/dashboard/layout/page-header'

interface HelpLayoutProps {
    children: React.ReactNode
}

export default function HelpLayout({ children }: HelpLayoutProps) {
    return (
        <>
            <PageHeader>
                <PageHeaderName>Pomoč</PageHeaderName>
            </PageHeader>
            <section className="flex flex-col lg:items-center items-start justify-center w-full">
                {children}
            </section>
        </>
    )
}
