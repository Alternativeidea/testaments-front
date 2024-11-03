'use client'

import { cn } from '@/lib/utils/style'
import { toast } from 'sonner'
import { Button } from './button'
import { Icons } from './icons'

export default function CopyButton({ data, className }: { data: string, className?: string }) {
    const handleClick = () => {
        navigator.clipboard.writeText(data)
            .then(() => {
                toast('Kopirano v odložišče', {
                    className: 'p-4',
                    duration: 2000
                })
            })
    }

    return (
        <Button
            size='icon'
            variant='light'
            className={cn('w-8 h-8', className)}
            onClick={handleClick}
        >
            <Icons.Copy className='w-4 text-muted-foreground mt-0' />
        </Button>
    )
}
