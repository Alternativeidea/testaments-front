import AmbassadorConfig from '@/components/dashboard/admin/config/ambassador-config'
import GeneralConfig from '@/components/dashboard/admin/config/general-config'
import MarketConfig from '@/components/dashboard/admin/config/market-config'
import NewsConfig from '@/components/dashboard/admin/config/news-config'
import StorageConfig from '@/components/dashboard/admin/config/storage-config'
import TstConfig from '@/components/dashboard/admin/config/tst-config'
import TabComponent from '@/components/dashboard/admin/ui/tab-component'
import { PageHeader, PageHeaderName } from '@/components/dashboard/layout/page-header'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from '@/components/ui/breadcrumb'

export default async function GlobalConfigPage() {
    const tabs = [
        {
            value: 'ambassadors',
            title: 'TST Svetovalec',
            content: <AmbassadorConfig />
        },
        {
            value: 'nadzorna',
            title: 'Nadzorna plošča',
            content: <GeneralConfig />
        },
        {
            value: 'shramba',
            title: 'Shramba',
            content: <StorageConfig />
        },
        {
            value: 'tst',
            title: 'TST',
            content: <TstConfig />
        },
        {
            value: 'trznica',
            title: 'Tržnica',
            content: <MarketConfig />
        },
        {
            value: 'novice',
            title: 'Novice',
            content: <NewsConfig />
        }
    ]

    return (
        <>
            <PageHeader>
                <PageHeaderName>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink className='text-body-medium font-dm-sans' href='/namizje/admin/config'>
                                    Globalni vnos / <b> Nadzorna plošča</b>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </PageHeaderName>
            </PageHeader>
            <section className='min-h-screen'>
                <TabComponent
                    defaultValue='nadzorna'
                    tabs={tabs}
                />
            </section>
        </>
    )
}
