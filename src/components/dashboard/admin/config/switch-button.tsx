'use client'
import { Switch } from '@/components/ui/switch'
import { putAdminBanner, putAdminMessage } from '@/lib/services/admin/banners'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function SwitchButton({ active, id, banner }: { active: boolean, id: number, banner? : boolean }) {
    const router = useRouter()
    const handleSubmit = async (active : boolean) => {
        const payload = {
            active
        }
        if (banner) {
            await putAdminBanner(id, payload)
        } else {
            await putAdminMessage(id, payload)
        }
        router.refresh()
        try {
            toast.success('Urejeno!', {
                position: 'bottom-center'
            })
        } catch (error) {
            if (error instanceof Error) {
                toast.error('Nekaj je šlo narobe.', {
                    description: JSON.parse(error.message).message
                })
            }
        }
    }

    return (
        <div className='flex items-center gap-x-3 bg-primary-light-gray/20 p-3 h-[50px]'>
            <span className={`${active ? 'font-bold' : ''}`}>Aktivno</span>
            <Switch className='data-[state=unchecked]:bg-primary-dark-gray rotate-180' defaultChecked={active} onCheckedChange={() => handleSubmit(!active)} />
            <span className={`${!active ? 'font-bold' : ''}`}>Neaktivno</span>
        </div>
    )
}
