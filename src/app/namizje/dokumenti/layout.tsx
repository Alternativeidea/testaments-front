import { PageHeader, PageHeaderName } from '@/components/dashboard/layout/page-header'

interface DocumentsLayoutProps {
    children: React.ReactNode
}

export default function DocumentsLayout({ children }: DocumentsLayoutProps) {
    return (
        <>
            <PageHeader>
                <PageHeaderName>Dokumenti</PageHeaderName>
            </PageHeader>
            <section>
                {children}
            </section>
        </>
    )
}
