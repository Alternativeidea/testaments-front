'use client'
import UserDetailsTabs from '@/components/dashboard/admin/users/user-details-tabs'
import { PageHeader, PageHeaderName } from '@/components/dashboard/layout/page-header'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from '@/components/ui/breadcrumb'
import { Skeleton } from '@/components/ui/skeleton'
import { useFetch } from '@/lib/hooks/use-fetch'
import { getUser } from '@/lib/services/admin/users'
import { format } from 'date-fns'
import { sl } from 'date-fns/locale'
import { useParams } from 'next/navigation'

export default function UserDetailsPage() {
    const params = useParams<{ id: string }>()
    const userId = params?.id ? parseInt(params.id) : 0
    const { data, isLoading } = useFetch<ProfileProps>(() => getUser(userId))

    return (
        <>
            <PageHeader>
                <PageHeaderName>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink className='text-body-medium font-dm-sans' href='/namizje/admin/gold/users'>
                                    Stiki /
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <BreadcrumbLink className='flex items-center justify-center !text-body-medium font-dm-sans' href={`/namizje/admin/gold/users/${params?.id}`}>
                                Podrobnosti stika /
                                    {isLoading
                                        ? <Skeleton className='w-[200px] h-[16px] ml-1'/>
                                        : <span className='text-primary-dark-gray pl-1'>
                                            #UI{ data?.id.toString().padStart(3, '0') }
                                        </span>
                                    }
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </PageHeaderName>
            </PageHeader>
            <section className='w-full justify-center items-start min-h-screen'>
                {
                    data?.status === 5
                        ? <div>
                            <h3 className='font-baskerville text-h6'>Uporabnik #U{data.id} je izbrisan</h3>
                            Datum izbrisa: {format(data.updatedAt, 'dd.MM.yyyy', { locale: sl })}
                        </div>
                        : <UserDetailsTabs />
                }
            </section>
        </>
    )
}
