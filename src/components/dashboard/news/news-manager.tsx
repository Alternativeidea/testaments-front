/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
// React
import { useEffect, useState } from 'react'
// Components
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import NewsCard from '@/components/ui/news-card'
import Pagination from '@/components/ui/pagination'
import { Skeleton } from '@/components/ui/skeleton'
// Utils
import { getNews } from '@/lib/services/news'

const categoriesData = [
    { value: '9', name: 'Oporoke' },
    { value: '10', name: 'Davek' },
    { value: '11', name: 'Dedovanje' },
    { value: '12', name: 'Premoženje' },
    { value: '13', name: 'Novice TST' }
]
export default function NewsManager() {
    const [loading, setLoading] = useState<boolean>()
    const allCategories = categoriesData.map(category => category.value)
    const [categories, setCategories] = useState(allCategories)
    const [news, setNews] = useState<NewsProps[]>([])
    const rowsPerPage = 6
    const [startIndex, setStartIndex] = useState<number>(0)
    const [endIndex, setEndIndex] = useState<number>(rowsPerPage)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const selectedCategories = categories.join(',')
            setStartIndex(0)
            setEndIndex(rowsPerPage)
            const data = await getNews(`?categories=${selectedCategories}&orderBy=-updatedAt`)
            setNews(data)
            setLoading(false)
        }
        fetchData()
    }, [categories])

    const handleCategory = (value : string) => {
        if (categories.length === allCategories.length) {
            setCategories([value])
        } else if (categories.includes(value)) {
            const newCategories = categories.filter(category => category !== value)
            setCategories(newCategories.length > 0 ? newCategories : allCategories)
        } else {
            const newCategories = [...categories, value]
            setCategories(newCategories.length === allCategories.length ? allCategories : newCategories)
        }
    }

    const pages = Math.ceil(news.length / rowsPerPage)

    return (
        <div className='flex flex-col w-full gap-y-2'>
            <div className='flex flex-wrap gap-2 overflow-x-scroll'>
                <Button
                    className='!text-body-medium'
                    onClick={() => setCategories(allCategories)}
                    variant={categories.length === 8 ? 'default' : 'light'}
                >
                    Vse
                </Button>
                {categoriesData.map(item => (
                    <Button
                        className='!text-body-medium'
                        key={item.value}
                        variant={categories.includes(item.value) && categories.length < 8 ? 'default' : 'light'}
                        onClick={() => handleCategory(item.value)}>
                        {item.name}
                    </Button>
                ))}
            </div>
            <div className="flex gap-x-2">
                <h4 className='text-h6'>{
                    news.length > 0 ? 'Vse novice' : 'V tej kategoriji trenutno ni nobene novice.' }</h4>
                {/* Search Bar */}
                {/* <Button variant='light' className='bg-primary-light-gray border-none'>
                        <Search/>
                    </Button> */}
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(auto-fit,_minmax(200px,_32%))] gap-5'>
                {loading
                    ? Array(6).fill(0).map((_, i) => (
                        <Card key={i} className='group w-full max-w-[752px] border-none min-w-fit'>
                            <CardContent className='relative px-0'>
                                <Skeleton className='w-full aspect-square lg:aspect-video' />
                            </CardContent>
                            <CardFooter className='p-0'>
                                <div className='w-full flex flex-col gap-2'>
                                    <Skeleton className='w-16 h-5' />
                                    <Skeleton className='w-11/12 h-7' />
                                    <div className='flex flex-col gap-1 mt-2'>
                                        <Skeleton className='w-full h-4' />
                                        <Skeleton className='w-full h-4' />
                                        <Skeleton className='w-[116px] h-[26px] mt-4' />
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>))
                    : news.slice(startIndex, endIndex).map(({ id, image, resume, category, title }) => (
                        <NewsCard
                            key={id}
                            image={image}
                            category={category.name}
                            title={title}
                            content={resume}
                        />
                    ))}
            </div>
            {!loading &&
            <Pagination
                startIndex={startIndex}
                endIndex={endIndex}
                updateStartIndex={setStartIndex}
                updateEndIndex={setEndIndex}
                pages={pages}
                rowsPerPage={rowsPerPage}
            />
            }
        </div>
    )
}
