'use client'

import { buttonVariants } from '@/components/ui/button'
import { useFetch } from '@/lib/hooks/use-fetch'
import { getCategories } from '@/lib/services/categories'
import { cn } from '@/lib/utils/style'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { CategoriesSkeleton } from './categories-skeleton'

interface CategoriesProps {
    categoryId?: string
}

export function Categories({ categoryId }: CategoriesProps) {
    const { data, isLoading } = useFetch<CategoryProps[]>(getCategories)
    const pathname = usePathname()

    const categories = useMemo(() => {
        data?.unshift({
            id: 0,
            name: 'Vse',
            description: null,
            image: null,
            translations: null,
            type: 0,
            parentId: null
        })
        return data
    }, [data])

    return (
        <div className='flex flex-wrap justify-center lg:justify-end gap-2 overflow-x-scroll no-scrollbar'>
            {isLoading
                ? <CategoriesSkeleton />
                : categories?.map(({ id, name }) => (
                    <Link
                        key={`i-${id}`}
                        href={id > 0 ? `${pathname}?category=${id}` : `${pathname}`}
                        className={cn(
                            buttonVariants({ variant: categoryId === id.toString() || (id === 0 && !categoryId) ? 'light' : 'default' }),
                            '!text-body-small'
                        )}
                    >
                        {name}
                    </Link>
                ))
            }
        </div>
    )
}
