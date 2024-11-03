// Next
import Link from 'next/link'
// Components
import UserTransactionsManager from '@/components/dashboard/admin/users/tst/user-transactions-manager'
import { PageHeader, PageHeaderName } from '@/components/dashboard/layout/page-header'
import { Icons } from '@/components/ui/icons'
// Utils
import { getProfile } from '@/lib/services/auth'

export default async function TransactionsPage() {
    const { id, roleId }: ProfileProps = await getProfile()
    return (
        <>
            <PageHeader>
                <div className='flex items-center gap-6'>
                    <Link href={'/namizje/tst'}>
                        <Icons.ArrowLeft />
                    </Link>
                    <PageHeaderName>Transakcije</PageHeaderName>
                </div>
            </PageHeader>
            <section>
                <UserTransactionsManager userId={id} roleId={roleId}/>
            </section>
        </>
    )
}
