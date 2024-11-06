import { PLAN_FREE } from '@/lib/constants/plan'
import { getProducts, getProductsByCategories } from '@/lib/services/products'
import { cookies as cookieStore } from 'next/headers'
import { ProductCard } from './product-card'
import ProductCardModal from './product-card-modal'

interface ProductsProps {
    categoryId?: string
    searchProduct?: string
}

export async function Products({ categoryId, searchProduct }: ProductsProps) {
    const products: ProductProps[] = categoryId ? await getProductsByCategories(categoryId) : await getProducts(searchProduct)

    const cookies = cookieStore()
    const user = cookies.get('user')?.value
    const { membershipId } = JSON.parse(user || '{}')

    const featuredProducts = products.filter(({ isFeatured }) => isFeatured)
    const unfeaturedProducts = products.filter(({ isFeatured }) => !isFeatured)

    return (
        <div className='relative max-h-fit overflow-hidden'>
            <div className='grid lg:grid-cols-2 gap-6 w-full mb-12'>
                {featuredProducts.map((item) =>
                    <>
                        {membershipId === PLAN_FREE
                            ? <ProductCardModal key={`i-${item.id}`}>
                                <ProductCard
                                    membershipId='PLAN_FREE'
                                    product={item}
                                    isPFeatured={true}
                                />
                            </ProductCardModal>
                            : <ProductCard key={`i-${item.id}`} product={item} membershipId='PLAN_PREMIUM' isPFeatured={true}/>
                        }
                    </>
                )}
            </div>
            <p className='flex w-full justify-start font-baskerville text-h5 my-4'>
                { unfeaturedProducts.length > 0 ? 'Vsi produkti' : 'V tej kategoriji trenutno ni na voljo izdelkov.' }
            </p>
            <div className={'grid lg:grid-cols-3 gap-4 w-full overflow-hidden'}>
                { membershipId === PLAN_FREE && <span className='absolute bg-primary-white/20 w-screen h-full z-40 backdrop-blur lg:-ml-[20vw]'/>}
                {unfeaturedProducts.map((item) =>
                    <>
                        {membershipId === PLAN_FREE
                            ? <ProductCardModal key={`i-${item.id}`}>
                                <ProductCard
                                    membershipId='PLAN_FREE'
                                    product={item}
                                    isPFeatured={false}
                                />
                            </ProductCardModal>
                            : <ProductCard key={`i-${item.id}`} product={item} membershipId='PLAN_PREMIUM' isPFeatured={false}/>
                        }
                    </>
                )}
            </div>
        </div>
    )
}
