import SearchButton from '@/components/dashboard/admin/ui/search-button'
import MessageCard from '@/components/dashboard/home/message-card'
import MessageCardError from '@/components/dashboard/home/message-card-error'
import MessageCardSkeleton from '@/components/dashboard/home/message-card-skeleton'
import { PageHeader, PageHeaderName } from '@/components/dashboard/layout/page-header'
import { Categories } from '@/components/dashboard/marketplace/categories'
import { Products } from '@/components/dashboard/marketplace/products'
import { ProductsSkeleton } from '@/components/dashboard/marketplace/products-skeleton'
import { SECTION_MARKET } from '@/lib/constants/sections'
import { cookies as cookieStore } from 'next/headers'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

interface MarketplacePageProps {
    searchParams?: {
        category?: string
        search?: string
    }
}

export default function MarketplacePage({ searchParams }: MarketplacePageProps) {
    const cookies = cookieStore()
    const user = cookies.get('user')?.value
    const { membershipId } = JSON.parse(user || '{}')
    const category = searchParams?.category || ''
    const searchQuery = searchParams?.search || ''

    return (
        <>
            <PageHeader>
                <PageHeaderName>Tržnica zapuščin</PageHeaderName>
            </PageHeader>
            <section>
                {/* Message */}
                <ErrorBoundary FallbackComponent={MessageCardError}>
                    <Suspense fallback={<MessageCardSkeleton/>}>
                        <MessageCard sectionId={SECTION_MARKET}/>
                    </Suspense>
                </ErrorBoundary>
                {/* Filters */}
                {
                    membershipId === 2 &&
                    <div className='w-full flex flex-col lg:flex-row items-start justify-between gap-4'>
                        <div className='flex w-full lg:w-[200px] gap-x-2 items-center justify-start'>
                            <SearchButton/>
                        </div>
                        <Categories categoryId={category} />
                    </div>
                }
                {/* Products */}
                <ErrorBoundary FallbackComponent={MessageCardError}>
                    <Suspense key={`category=${category}`} fallback={<ProductsSkeleton/>}>
                        <Products categoryId={category} searchProduct={`search=${searchQuery}`}/>
                    </Suspense>
                </ErrorBoundary>
            </section>
        </>
    )
}
