import { Button } from '@/components/ui/button'
import { getProducts } from '@/lib/services/products'
import { BenefitBlock, BenefitBlockDescription, BenefitBlockFooter, BenefitBlockHeader, BenefitBlockItem, BenefitBlockItems, BenefitBlockTitle } from './benefit-block'

export default async function LatestProducts() {
    const products: ProductProps[] = await getProducts()

    return (
        <BenefitBlock>
            <BenefitBlockHeader>
                <BenefitBlockTitle>Novo na tržnici</BenefitBlockTitle>
                <BenefitBlockDescription>Vstopite v našo Tržnico, kjer vam nudimo ekskluzivne informacije o nakupu artiklov iz zapuščine.</BenefitBlockDescription>
            </BenefitBlockHeader>
            <BenefitBlockFooter>
                <BenefitBlockItems>
                    {products.slice(0, 6).map(({ id, name, category }, i) => (
                        <BenefitBlockItem
                            key={`i-${id}-${i}`}
                            image={category.image ?? ''}
                            text={name}
                        />
                    ))}
                </BenefitBlockItems>
                <Button>Na tržnico</Button>
            </BenefitBlockFooter>
        </BenefitBlock>
    )
}
