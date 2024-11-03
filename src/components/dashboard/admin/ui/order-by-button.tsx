import { Button } from '@/components/ui/button'
import { ListFilter } from 'lucide-react'

interface OrderByButtonProps {
    changeOrder: (value: boolean) => void
    orderBy: boolean
}

export default function OrderByButton({ orderBy, changeOrder } : OrderByButtonProps) {
    return (
        <Button
            onClick={() => changeOrder(!orderBy)}
            variant='light'
            className='bg-primary-light-gray border-none'>
            <ListFilter className={`${orderBy ? 'rotate-0' : 'rotate-180'}`}/>
        </Button>
    )
}
