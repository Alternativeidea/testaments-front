'use client'

import { Trash2Icon } from 'lucide-react'
import { UsersInfoBlockItem, UsersInfoCard, UsersInfoContent, UsersInfoTitle } from '../users-info-card'
import { useAdminNewHeirState } from './admin-new-heir-sheet'

interface HeirCardProps {
    heir: HeirProps
    index: number
}
export default function HeirCard({ heir, index } : HeirCardProps) {
    const setIsOpen = useAdminNewHeirState(s => s.setIsOpen)
    const setCurrentStep = useAdminNewHeirState(s => s.setCurrentStep)
    const setCurrentHeir = useAdminNewHeirState(s => s.setCurrentHeir)

    function handleEdit() {
        setCurrentHeir(heir)
        setCurrentStep(3)
        setIsOpen(true)
    }

    function handleDelete() {
        setCurrentHeir(heir)
        setCurrentStep(5)
        setIsOpen(true)
    }

    return (
        <UsersInfoCard>
            <UsersInfoTitle title={`Dedič ${index}`} className='flex justify-between'>
                <div className='flex gap-4 items-center'>
                    <button
                        onClick={handleEdit}
                        className='text-body-big-2 font-medium text-accent-yellow font-dm-sans'
                    >Uredi</button>
                    <Trash2Icon
                        onClick={handleDelete}
                        className='text-accent-red cursor-pointer'
                    />
                </div>
            </UsersInfoTitle>
            <UsersInfoContent>
                <UsersInfoBlockItem label='Ime' loading={false}>
                    {heir.name}
                </UsersInfoBlockItem>
                <UsersInfoBlockItem label='Stalni naslov' loading={false}>
                    {heir.address}
                </UsersInfoBlockItem>
                <UsersInfoBlockItem label='Odnos' loading={false}>
                    {heir.relationship}
                </UsersInfoBlockItem>
                <UsersInfoBlockItem label='Tel številka' loading={false}>
                    {`+${heir.areaCode} ${heir.phone}`}
                </UsersInfoBlockItem>
                <UsersInfoBlockItem label='E pošta' loading={false}>
                    {heir.email}
                </UsersInfoBlockItem>
                <UsersInfoBlockItem separator={false} label='Vezane oporoke' loading={false}>
                    <div className='flex flex-col italic text-body-big-2 font-light text-right text-primary-medium-gray'>
                        {
                            heir.wills?.map(e => <p key={e.id}>Oporoke #{e.id}</p>)
                        }
                    </div>
                </UsersInfoBlockItem>
            </UsersInfoContent>
        </UsersInfoCard>
    )
}
