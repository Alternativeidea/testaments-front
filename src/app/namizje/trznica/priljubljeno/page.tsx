import { PageHeader, PageHeaderName } from '@/components/dashboard/layout/page-header'
import { ProductCard } from '@/components/dashboard/marketplace/product-card'
import { buttonVariants } from '@/components/ui/button'
import { getWishlist } from '@/lib/services/products'
import { cn } from '@/lib/utils/style'
import Link from 'next/link'
export default async function FavoritesPage() {
    const products: ProductProps[] = await getWishlist()

    return (
        <>
            <PageHeader>
                <PageHeaderName className='normal-case'>
                    Vaši priljubljeni izdelki
                </PageHeaderName>
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
                                        isPFeatured={false}
                                    />)}
                            </div>)
                        : (<div className='w-full'>
                            <p className='w-full text-h6'>Trenutno nimate nobenih priljubljenih izdelkov.
                            </p>
                            <Link
                                href='/namizje/trznica'
                                className={cn(buttonVariants(), 'text-wrap py-12 md:py-0 text-center max-w-full lg:max-w-[504px] mt-14 mb-4')}
                            >
                                Odkrijte zanimive izdelke na tržnici zdaj!
                            </Link>
                        </div>)
                }
            </section>
        </>
    )
}
