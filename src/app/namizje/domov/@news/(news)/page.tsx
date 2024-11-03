import NewsCard from '@/components/ui/news-card'
import { getNews } from '@/lib/services/news'

export default async function News() {
    const news: NewsProps[] = await getNews('')
    return (
        <div className='grid md:grid-cols-3 gap-4'>
            {
                news.map(({ title, resume, category, image, content }, i) => (
                    <NewsCard
                        key={`i-${title}-${i}`}
                        image={image}
                        category={category.name}
                        title={title}
                        content={resume}
                        resume={content}
                    />
                ))
            }
        </div>
    )
}
