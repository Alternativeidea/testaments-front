import { PageHeader, PageHeaderName } from '@/components/dashboard/layout/page-header'
import { cookies as cookieStore } from 'next/headers'

interface HomeLayoutProps {
    children: React.ReactNode
    banner: React.ReactNode
    news: React.ReactNode
}

export default function HomeLayout({ children, banner }: HomeLayoutProps) {
    const cookies = cookieStore()
    const user = cookies.get('user')?.value
    const { name } = JSON.parse(user ?? '{}')
    return (
        <>
            <PageHeader>
                <PageHeaderName>Dobrodošli {name}!</PageHeaderName>
            </PageHeader>
            <section>
                { children }
                { banner }
                {/* {news} */}
            </section>
        </>
    )
}
