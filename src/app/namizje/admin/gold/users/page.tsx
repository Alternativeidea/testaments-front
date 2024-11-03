import { UserListColumns } from '@/components/dashboard/admin/users/user-list-columns'
import { PageHeader, PageHeaderName } from '@/components/dashboard/layout/page-header'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from '@/components/ui/breadcrumb'
import { DataTableV2 } from '@/components/ui/data-table-v2'
import { ambassadorOptions, membershipOptions, statusOptions } from '@/lib/constants/filters'
import { getUsers } from '@/lib/services/admin/users'

export default async function HomePage() {
    const users = await getUsers()
    const userFiltersOptions = [
        { name: 'Svetovalec', column: 'isAmbassador', options: ambassadorOptions },
        { name: 'Status', column: 'status', options: statusOptions },
        { name: 'Membership', column: 'membershipId', options: membershipOptions }
    ]

    return (
        <>
            <PageHeader>
                <PageHeaderName>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink className='text-body-medium font-dm-sans' href='/namizje/admin/gold/users'>
                                    Stiki
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </PageHeaderName>
            </PageHeader>
            <section>
                <DataTableV2
                    title='Zdravo Admin!'
                    columns={UserListColumns}
                    data={users}
                    filterOptions={userFiltersOptions}
                    csvString={'users'} />
            </section>
        </>
    )
}
