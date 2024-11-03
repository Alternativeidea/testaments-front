import { PageHeader, PageHeaderName } from '@/components/dashboard/layout/page-header'
import { ProductCard } from '@/components/dashboard/marketplace/product-card'
import { buttonVariants } from '@/components/ui/button'
import { getOrders } from '@/lib/services/products'
import { cn } from '@/lib/utils/style'
import Link from 'next/link'

export default async function SubmittedPage() {
    const products: ProductProps[] = await getOrders()

    return (
        <>
            <PageHeader>
                <PageHeaderName>Vaša oddana zanimanja</PageHeaderName>
            </PageHeader>
            <section>
                {
                    products.length > 0
                        ? (
                            <div className='grid lg:grid-cols-3 gap-4 w-full'>
                                {products.map((item) =>
                                    <ProductCard
                                        key={item.id}
                                        product={item}
                                        membershipId=''
                                    />)}
                            </div>)
                        : (<div className='w-full'>
                            <p className='w-full text-h6'>
                                Trenutno nimate nobenih oddanih zanimanj.
                            </p>
                            <Link
                                href='/namizje/trznica'
                                className={cn(buttonVariants(), 'max-w-[504px] mt-14 mb-4')}
                            >
                                Pojdite na glavno stran tržnice
                            </Link>
                        </div>)
                }
            </section>
        </>
    )
}
