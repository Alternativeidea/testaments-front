import { PageHeader, PageHeaderName } from '@/components/dashboard/layout/page-header'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { Skeleton } from '@/components/ui/skeleton'
import { cookies as cookieList } from 'next/headers'
import Link from 'next/link'

export default async function LoadingAllNotifications() {
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
            <section>
                <div className='w-full flex items-end gap-2 justify-end'>
                    <Skeleton className='w-[160px] h-12'/>
                    <Skeleton className='w-[160px] h-12'/>
                    {roleId !== 4 && <Skeleton className='w-[160px] h-12'/>}
                </div>
                <div className="w-full flex flex-col gap-y-6 items-center justify-center">
                    {roleId !== 4 && <div className="flex flex-col gap-y-4 w-full items-start justify-center">
                        <h3 className="font-baskerville text-h6">Članstvo / Verifikacija (Oddani zahtevki - v obdelavi)</h3>
                        <Skeleton className='w-full h-[96px] bg-primary-light-gray/20'/>
                        <Button className='flex mx-auto justify-center items-center gap-x-6'>
                            <Icons.Plus/>
                            <p className=''>Poglej več</p>
                        </Button>
                    </div>}
                    <div className="flex flex-col gap-y-4 w-full items-start justify-center">
                        <h3 className="font-baskerville text-h6">TST (Oddani zahtevki - v obdelavi)</h3>
                        <Skeleton className='w-full h-[96px] bg-primary-light-gray/20'/>
                        <div className='flex w-full justify-center items-center'>
                            <Button asChild className='flex mx-auto justify-center items-center gap-x-6'>
                                <Link href={''}>
                                    <Icons.Plus/>
                                    <p className=''>Poglej več</p>
                                </Link>
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-4 w-full items-start justify-center">
                        <h3 className="font-baskerville text-h6">Podpora (Oddani zahtevki - v obdelavi)</h3>
                        <Skeleton className='w-full h-[96px] bg-primary-light-gray/20'/>
                        <Button className='flex mx-auto justify-center items-center gap-x-6'>
                            <Icons.Plus/>
                            <p className=''>Poglej več</p>
                        </Button>
                    </div>
                </div>
            </section>
        </>
    )
}
