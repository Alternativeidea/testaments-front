import { getMessage } from '@/lib/services/banners'
import RemovableCard from '../ui/removable-card'

export default async function MessageCard({ sectionId }: { sectionId: number }) {
    const { title, content, active } = await getMessage(sectionId)

    return (<>
        {active
            ? <RemovableCard className='border-none'>
                <div className='flex flex-1 flex-col gap-4 p-4'>
                    <span className='text-h6 font-baskerville'>{title}</span>
                    <p className='text-body-small text-primary-medium-gray/70'>
                        {content}
                    </p>
                </div>
            </RemovableCard>
            : null}
    </>
    )
}
