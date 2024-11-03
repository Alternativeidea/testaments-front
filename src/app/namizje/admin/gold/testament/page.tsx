import TstCourse from '@/components/dashboard/admin/testaments/tst-course'
import TstInfo from '@/components/dashboard/admin/testaments/tst-info'
import TabComponent from '@/components/dashboard/admin/ui/tab-component'
import { PageHeader, PageHeaderName } from '@/components/dashboard/layout/page-header'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from '@/components/ui/breadcrumb'
import { Suspense } from 'react'

export default function AdminTestamentsPage() {
    const tabs = [
        {
            value: 'info',
            title: 'Info',
            content: <TstInfo />
        },
        {
            value: 'tecaji',
            title: 'Tečaji',
            content: <TstCourse />
        }
    ]
    return (
        <>
            <PageHeader>
                <PageHeaderName>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink className='text-body-medium font-dm-sans' href='/namizje/admin/gold/testament'>
                                    TST / Info
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </PageHeaderName>
            </PageHeader>
            <section className='pb-32'>
                <Suspense>
                    <TabComponent
                        defaultValue='info'
                        tabs={tabs}
                    />
                </Suspense>
            </section>
        </>
    )
}
