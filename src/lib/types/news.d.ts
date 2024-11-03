interface NewsProps {
    id: number
    status: number
    title: string
    image: string
    slug: string | null
    resume: string
    isFeatured: boolean
    categoryId: number
    publishedAt: string
    content: string
    category: CategoryProps
}
