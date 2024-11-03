import MessageCard from '@/components/dashboard/home/message-card'
import MessageCardError from '@/components/dashboard/home/message-card-error'
import MessageCardSkeleton from '@/components/dashboard/home/message-card-skeleton'
import NewsManager from '@/components/dashboard/news/news-manager'
import NewsCard from '@/components/ui/news-card'
import { SECTION_NEWS } from '@/lib/constants/sections'
import { getNews } from '@/lib/services/news'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

export default async function NewsPage() {
    const featuredNews: NewsProps[] = await getNews('?isFeatured=true')

    return (
        <>
            {/* Message */}
            <ErrorBoundary FallbackComponent={MessageCardError}>
                <Suspense fallback={<MessageCardSkeleton/>}>
                    <MessageCard sectionId={SECTION_NEWS}/>
                </Suspense>
            </ErrorBoundary>
            {/* Featured News */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(auto-fit,_minmax(300px,_48%))] gap-4'>
                {featuredNews.map(({ id, image, resume, category, title, content }) => (
                    <NewsCard
                        key={id}
                        image={image}
                        category={category.name}
                        title={title}
                        content={resume}
                        resume={content}
                    />
                ))}
            </div>
            {/* All news */}
            <NewsManager/>
        </>
    )
}
