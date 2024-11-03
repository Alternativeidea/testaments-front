import { FaqListColumns } from '@/components/dashboard/admin/faqs/faq-list-columns'
import NewFaqSheet from '@/components/dashboard/admin/faqs/new-faq-sheet'
import { PageHeader, PageHeaderName } from '@/components/dashboard/layout/page-header'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { DataTableV2 } from '@/components/ui/data-table-v2'
import { Icons } from '@/components/ui/icons'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { getAllFaqs } from '@/lib/services/admin/faqs'

export default async function HelpPage() {
    const faqs = await getAllFaqs()

    return (
        <>
            <PageHeader>
                <PageHeaderName>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink className='text-body-medium font-dm-sans' href='/namizje/admin/novice'>
                                    Pomoč
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </PageHeaderName>
            </PageHeader>
            <section className='flex items-center justify-center min-h-[85vh]'>
                <DataTableV2
                    title='Zdravo Admin!'
                    columns={FaqListColumns}
                    data={faqs}
                >
                    <div>
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button className='flex gap-x-4 items-center'>
                                    <Icons.Plus />
                                    <p className=''>Dodaj pomoč</p>
                                </Button>
                            </SheetTrigger>
                            <SheetContent className='w-full lg:!max-w-[420px] h-full p-0'>
                                <NewFaqSheet/>
                            </SheetContent>
                        </Sheet>
                    </div>
                </DataTableV2>
            </section>
        </>
    )
}
