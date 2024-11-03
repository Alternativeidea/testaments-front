'use client'
import { useCookies } from '@/lib/hooks/use-cookies'
import { cn } from '@/lib/utils/style'
import { Trash2 } from 'lucide-react'
import { usePresignedUpload } from 'next-s3-upload'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from './button'
import { Card } from './card'
import { Ilustrations } from './ilustrations'
import { Progress } from './progress'

interface FileProps {
    title: string
    url?: string | null
    setUrl: (url: string | null) => void
}

export default function DocumentUploader({ title, url, setUrl }: FileProps) {
    const cookies = useCookies()
    const [isLoading, setIsLoading] = useState(false)
    const [value, setValue] = useState<number>(0)
    const { FileInput, openFileDialog, uploadToS3 } = usePresignedUpload()

    const user = JSON.parse(cookies.get('user') ?? '{}')

    const handleFileChange = async (file: File) => {
        try {
            if (file.size > 4000000) {
                throw new Error(JSON.stringify({
                    message: 'Omejitev velikosti datoteke je presežena'
                }))
            }

            setValue(0)
            setIsLoading(true)
            const { url } = await uploadToS3(file, {
                endpoint: {
                    request: {
                        url: '/api/s3-upload',
                        body: {
                            fileName: title,
                            userId: user.id
                        },
                        headers: {}
                    }
                }
            })
            await new Promise<void>(resolve => {
                let progress = 0
                const intervalId = setInterval(() => {
                    progress += Math.floor(Math.random() * 15)
                    setValue(progress >= 100 ? 100 : progress)
                    if (progress >= 100) {
                        clearInterval(intervalId)
                        resolve()
                    }
                }, 100)
            })
            setUrl(url)
            toast.success('Urejeno!', {
                position: 'bottom-center'
            })
        } catch (error) {
            if (error instanceof Error) {
                const err = JSON.parse(error.message)
                toast.error('Nekaj je šlo narobe.', {
                    description: err.message
                })
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card
            className={cn(
                'flex flex-col w-full h-full items-center justify-center border-none'
            )}
            onClick={isLoading ? undefined : openFileDialog}
            aria-disabled={isLoading}
        >
            {url || isLoading
                ? <div className={`flex items-center justify-between w-full ${isLoading ? 'bg-primary-medium-gray' : 'bg-primary-dark-gray'} relative h-12`}>
                    <div className='w-full flex justify-between items-center !text-primary-white z-10 p-2'>
                        <p className='max-w-3/4 line-clamp-1 text-ellipsis'>{title}</p>
                        {isLoading
                            ? <p className='!text-primary-white'>{`${value}%`}</p>
                            : <Button className='text-primary-white' onClick={() => setUrl(null)} variant={'link'}>
                                <Trash2/>
                            </Button>
                        }
                    </div>
                    {isLoading && <Progress value={value} className='z-0 absolute w-full h-full'/>}
                </div>
                : <Card
                    className={cn(
                        'flex h-[200px] overflow-hidden flex-col w-full items-center justify-center outline-dashed outline-2 outline-primary-medium-gray/70 border-none rounded-sm',
                        isLoading && 'hidden'
                    )}
                >
                    <FileInput
                        onChange={handleFileChange}
                        accept="image/png, image/jpeg, application/pdf,application/vnd.ms-excel" />
                    <p>Naloži datoteko</p>
                    <p>PNG, JPG, PDF, max 4MB</p>
                    <div className='py-4'>
                        <Ilustrations.Cloud/>
                    </div>
                </Card>
            }
        </Card>
    )
}
