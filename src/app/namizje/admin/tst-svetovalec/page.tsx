import Izplacila from '@/components/dashboard/admin/ambassador/izplacila'
import KonfigProviziji from '@/components/dashboard/admin/ambassador/konfig-proviziji'
import Promet from '@/components/dashboard/admin/ambassador/promet'
import Svetolvalci from '@/components/dashboard/admin/ambassador/svetolvalci'
import TabComponent from '@/components/dashboard/admin/ui/tab-component'
import { PageHeader, PageHeaderName } from '@/components/dashboard/layout/page-header'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from '@/components/ui/breadcrumb'
import { Suspense } from 'react'
import LoadingAdminAmbassadorPage from './loading'

export default async function AdminAmbassadorPage() {
    const TABS = [
        {
            value: 'Svetovalci',
            title: 'Svetovalci',
            content: <Svetolvalci/>
        },
        {
            value: 'promet',
            title: 'Promet',
            content: <Promet/>
        },
        {
            value: 'izplacila',
            title: 'Izplačila',
            content: <Izplacila/>
        },
        {
            value: 'konfigurator',
            title: 'Konfigurator provizij',
            content: <KonfigProviziji/>
        }
        // {
        //     value: 'bazen',
        //     title: 'Bazen TST',
        //     content: <></>
        // }
    ]

    return (
        <>
            <PageHeader>
                <PageHeaderName>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink className='font-dm-sans text-body-medium font-bold' href='/namizje/admin/tst-svetovalec'>
                                TST Svetovalec
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </PageHeaderName>
            </PageHeader>
            <section>
                <div className='w-full'>
                    <Suspense fallback={LoadingAdminAmbassadorPage()}>
                        <TabComponent
                            defaultValue='Svetovalci'
                            tabs={TABS}
                        />
                    </Suspense>
                </div>
            </section>
        </>
    )
}
