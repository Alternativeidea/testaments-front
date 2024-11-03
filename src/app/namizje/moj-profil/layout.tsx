import { PageHeader, PageHeaderName } from '@/components/dashboard/layout/page-header'

interface ProfileLayoutProps {
    children: React.ReactNode
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
    return (
        <>
            <PageHeader>
                <PageHeaderName>Moj profil</PageHeaderName>
            </PageHeader>
            <section>
                {children}
            </section>
        </>
    )
}
