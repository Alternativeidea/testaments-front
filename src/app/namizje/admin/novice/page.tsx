import { NewsListColumns } from '@/components/dashboard/admin/news/news-list-columns'
import { PageHeader, PageHeaderName } from '@/components/dashboard/layout/page-header'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { DataTableV2 } from '@/components/ui/data-table-v2'
import { Icons } from '@/components/ui/icons'
import { getAllPosts } from '@/lib/services/admin/post'
import Link from 'next/link'

export default async function AdminNewsPage() {
    let news = await getAllPosts()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    news = news.sort((b: any, a: any) => a.isFeatured - b.isFeatured)
    return (
        <>
            <PageHeader>
                <PageHeaderName>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink className='text-body-medium font-dm-sans' href='/namizje/admin/novice'>
                                    Novice / <b>Vse</b>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </PageHeaderName>
            </PageHeader>
            <section className='flex items-center justify-center min-h-[85vh]'>
                <DataTableV2
                    title='Zdravo Admin!'
                    columns={NewsListColumns}
                    data={news}
                >
                    <Link href='/namizje/admin/novice/create-new'>
                        <Button className='flex gap-x-4'>
                            <Icons.Plus/>
                            <p className=''>Dodaj novico</p>
                        </Button>
                    </Link>
                </DataTableV2>
            </section>
        </>
    )
}
