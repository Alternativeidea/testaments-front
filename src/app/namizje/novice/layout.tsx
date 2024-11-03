import { PageHeader, PageHeaderName } from '@/components/dashboard/layout/page-header'

interface NewsLayoutProps {
    children: React.ReactNode
}

export default function NewsLayout({ children }: NewsLayoutProps) {
    return (
        <>
            <PageHeader>
                <PageHeaderName>Novice</PageHeaderName>
            </PageHeader>
            <section>
                {children}
            </section>
        </>
    )
}
