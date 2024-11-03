import Image from 'next/image'
import Link from 'next/link'
import { Button } from './button'
import { Card, CardContent, CardFooter } from './card'
import { Icons } from './icons'
import { Separator } from './separator'

interface NewsCardProps {
    image: string
    category: string
    title: string
    content?: string
    resume?: string
}

export default function NewsCard({ image, title, content, category, resume }: NewsCardProps) {
    return (
        <Link href={content ?? '#'} target='_blank'>
            <Card className='group w-full max-w-[752px] border-none min-w-fit bg-primary-light-gray/20 p-2'>
                <CardContent className='relative px-0'>
                    {image
                        ? <Image
                            src={image}
                            alt='News image'
                            width={752}
                            height={392}
                            className='aspect-square lg:aspect-video grayscale group-hover:grayscale-0 transition-all object-cover'
                        />
                        : <div className='flex items-center justify-center w-full h-[225px] bg-primary-light-gray/20'>
                        No Image data
                        </div>
                    }
                    <Separator orientation='vertical' className='w-1 h-3/5 bg-gradient-gold absolute top-0 left-0 opacity-0 transition-opacity group-hover:opacity-100 ' />
                    <Separator orientation='vertical' className='w-1 h-3/5 bg-gradient-gold absolute bottom-6 right-0 opacity-0 transition-opacity group-hover:opacity-100 ' />
                </CardContent>
                <CardFooter className='p-0'>
                    <div className='flex flex-col gap-2'>
                        <span className='text-body-small font-medium uppercase'>{category}</span>
                        <span className='text-h6 font-baskerville'>{title}</span>
                        <div className='flex flex-col'>
                            {resume && <p className='text-body-small line-clamp-2'>{resume}</p>}
                            <Button variant='secondary' className='group/button mt-6'>
                                <span className='flex items-center gap-[10px] text-body-big-2'>
                                    Preberi več
                                    <Icons.ArrowRightGold className='w-[12px] h-[13px] hidden group-hover/button:block' />
                                    <Icons.ArrowRight className='w-[12px] h-[13px] text-primary-dark-gray group-hover/button:hidden' />
                                </span>
                            </Button>

                        </div>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    )
}
