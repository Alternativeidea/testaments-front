import { Icons } from '@/components/ui/icons'

export function TicketIcon({ status }: { status: string }) {
    return (
        <>
            {status === '0'
                ? <Icons.Clock className='text-accent-green'/>
                : <Icons.Gear/>
            }
        </>
    )
}
