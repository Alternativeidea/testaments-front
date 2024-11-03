import AllNotifications from '@/components/dashboard/admin/obvestila/all-notifications'
import { PageHeader, PageHeaderName } from '@/components/dashboard/layout/page-header'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from '@/components/ui/breadcrumb'
import { cookies as cookieList } from 'next/headers'
import { Suspense } from 'react'

export default function AdminNotificationsPage() {
    const cookies = cookieList()
    const user = cookies.get('user')?.value
    const { roleId } = JSON.parse(user || '{}')
    return (
        <>
            <PageHeader>
                <PageHeaderName>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink className='text-body-medium font-dm-sans' href='/namizje/admin/gold/notifications'>
                                    Obvestila / Vsa obvestila
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </PageHeaderName>
            </PageHeader>
            <section className='min-h-screen'>
                <Suspense>
                    <AllNotifications roleId={roleId}/>
                </Suspense>
            </section>
        </>
    )
}
