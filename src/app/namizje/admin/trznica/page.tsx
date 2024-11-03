import { MarketListColumns } from '@/components/dashboard/admin/marketplace/market-list-columns'
import { PageHeader, PageHeaderName } from '@/components/dashboard/layout/page-header'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { DataTableV2 } from '@/components/ui/data-table-v2'
import { Icons } from '@/components/ui/icons'
import { getAdminProducts } from '@/lib/services/admin/products'
import Link from 'next/link'

export default async function AdminMarketPage() {
    let products = await getAdminProducts('?orderBy=-updatedAt,isFeatured')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    products = products.sort((b: any, a: any) => a.isFeatured - b.isFeatured)
    return (
        <>
            <PageHeader>
                <PageHeaderName>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink className='text-body-medium font-dm-sans' href='/namizje/admin/trznica'>
                                    Tržnica / <b>Vse</b>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </PageHeaderName>
            </PageHeader>
            <section className='flex items-center justify-center min-h-[85vh]'>
                <DataTableV2
                    title='Zdravo Admin!'
                    columns={MarketListColumns}
                    data={products}
                >
                    <Button asChild>
                        <Link href='/namizje/admin/trznica/create'className='flex gap-x-4 items-center' >
                            <Icons.Plus />
                            <p className=''>
                                    Nov predmet
                            </p>
                        </Link>
                    </Button>
                </DataTableV2>
            </section>
        </>
    )
}
