'use client'
import { useCookies } from '@/lib/hooks/use-cookies'
import { cn } from '@/lib/utils/style'
import { usePresignedUpload } from 'next-s3-upload'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from './button'
import { Card } from './card'
import { Icons } from './icons'
import { Ilustrations } from './ilustrations'

interface FileProps {
    title: string
    url?: string | null
    setUrl: (url: string | null) => void
    featuredImage?: string | null
    position?: number
    setNewFeatured?: (url: string, position: number) => void
}

export default function ImageUploader({ title, url, setUrl, featuredImage, setNewFeatured, position }: FileProps) {
    const cookies = useCookies()
    const [isLoading, setIsLoading] = useState(false)
    const [deleteImage, setDeleteImage] = useState(false)
    const { FileInput, openFileDialog, uploadToS3 } = usePresignedUpload()

    const user = JSON.parse(cookies.get('user') ?? '{}')

    const handleFileChange = async (file: File) => {
        try {
            if (file.size > 4000000) {
                toast.error('Omejitev velikosti datoteke je presežena', {
                    position: 'bottom-center'
                })
                return
            }

            setIsLoading(true)
            setDeleteImage(false)
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
            setUrl(url)
            toast.success('Urejeno!', {
                position: 'bottom-center'
            })
        } catch (error) {
            console.log('error')
            console.log(error)
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

    const handleDeleteImage = () => {
        setDeleteImage(true)
        setUrl(null)
        toast.success('Slika je bila izbrisana.', {
            position: 'bottom-center'
        })
    }

    return (
        <Card
            className={cn(
                'flex flex-col w-full h-[340px] items-center justify-center border-none'
            )}
            onClick={url ? undefined : openFileDialog}
            aria-disabled={isLoading}
        >
            <div className='relative h-full w-full'>
                {(featuredImage && url) &&
                <Button
                    type='button'
                    onClick={() => {
                        if (setNewFeatured && position) {
                            setNewFeatured(url, position)
                        }
                    }}
                    className={`absolute top-2 left-2 z-20 rounded-full border-none ${featuredImage === url ? 'bg-gradient-gold' : 'bg-primary-medium-gray'} !text-body-medium text-primary-white`}
                >
                            Prikazna slika
                </Button>
                }
                {url && !deleteImage
                    ? <Image alt={url || ''} src={url || ''} fill className='top-0 object-contain'/>
                    : <Card
                        className={cn(
                            'flex overflow-hidden flex-col h-full w-full items-center justify-center outline-dashed outline-2 outline-primary-medium-gray/70 border-none rounded-sm'
                        )}
                    >
                        {isLoading
                            ? <Icons.Spinner className="h-12 w-12 animate-spin"/>
                            : < div className='relative flex flex-col items-center justify-center'>
                                <FileInput
                                    onChange={handleFileChange}
                                    accept="image/png, image/jpeg, image/webp" />
                                <p>Naloži sliko</p>
                                <p>PNG, JPG, PDF, max 4MB</p>
                                <div className='py-4'>
                                    <Ilustrations.Cloud/>
                                </div>
                            </div>
                        }
                    </Card>
                }
            </div>
            {url &&
            <div className='flex w-full flex-col p-1 lg:flex-row lg:gap-4'>
                <Button
                    type='button'
                    onClick={isLoading ? undefined : openFileDialog}
                    className='w-full cursor-pointer lg:mt-4'>
                    <p className=''>Spremeni sliko predmeta</p>
                    <FileInput
                        onChange={handleFileChange}
                        accept="image/png, image/jpeg, image/webp" />
                </Button>
                <Button
                    type='button'
                    variant={'destructive'}
                    onClick={handleDeleteImage}
                    className='w-full cursor-pointer lg:mt-4'>
                    <p className=''>Izbriši sliko</p>
                </Button>
            </div>
            }
        </Card>
    )
}
