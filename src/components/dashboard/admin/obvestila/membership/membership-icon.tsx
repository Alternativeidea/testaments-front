import { Icons } from '@/components/ui/icons'

export function MembershipIcon({ membershipId }: { membershipId: string }) {
    return (
        <>
            {membershipId === '2'
                ? <Icons.Crown />
                : <Icons.Clock className='text-accent-green'/>
            }
        </>
    )
}
