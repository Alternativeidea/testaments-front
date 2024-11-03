import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils/style'

interface UserInfoBlockProps {
    className?: string
    children: React.ReactNode
}

interface UserInfoTitleProps {
    title: string
    className?: string
    children?: React.ReactNode
}

interface UserInfoBlockItemProps {
    separator?: boolean
    label: string
    className?: string
    children?: React.ReactNode
    value?: string | null
    loading?: boolean
}

export function UsersInfoCard({ children, className } : UserInfoBlockProps) {
    return (
        <Card className={cn(
            'flex flex-col w-full border-none bg-primary-light-gray/20 p-4 h-fit ',
            className)}>
            {children}
        </Card>
    )
}

export function UsersInfoTitle({ title, children, className } : UserInfoTitleProps) {
    return (
        <CardTitle className={cn(
            'font-baskerville font-[400] text-h6',
            className)}>
            <p className='font-baskerville font-[400] text-h6'>{title}</p>
            {children}
        </CardTitle>
    )
}

export function UsersInfoContent({ className, children } : UserInfoBlockProps) {
    return (
        <CardContent className={cn(
            'flex flex-col !pt-6 p-0',
            className
        )}>
            {children}
        </CardContent>
    )
}

export function UsersInfoBlockItem({ label, children, loading, separator = true }: UserInfoBlockItemProps) {
    return (
        <>
            <div className='flex w-full justify-between py-4'>
                <p>{label}</p>
                {loading
                    ? <Skeleton className='my-auto w-[160px] h-6'/>
                    : children}
            </div>
            {separator &&
                <Separator className='w-full h-[1px] bg-primary-light-gray' />
            }
        </>
    )
}
