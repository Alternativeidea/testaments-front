import { Card } from '@/components/ui/card'
import { DataTableV2 } from '@/components/ui/data-table-v2'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getAdminAmbassadors } from '@/lib/services/admin/ambassadors'
import { AmbassadorListColumns } from './ambassador-list-columns'

export default async function Svetolvalci() {
    const ambassadors = await getAdminAmbassadors('')
    const ambassadorsCount = await getAdminAmbassadors('?count=true')

    return (
        <div className="flex flex-col w-full pt-6">
            <div className='w-fit'>
                <h3 className='font-baskerville text-h6'>Pregled svetovalcev</h3>
            </div>
            <Card className='flex flex-col items-center justify-center border-none bg-primary-light-gray/20 py-16 lg:px-24 mt-4 w-full'>
                <div className='flex flex-col gap-y-2 items-start justify-center lg:w-[50%]'>
                    <Label>Vse skupaj svetovalcev</Label>
                    <Input className='w-full' placeholder={`${ambassadorsCount.count}`} readOnly/>
                </div>
            </Card>
            <DataTableV2
                title=''
                columns={AmbassadorListColumns}
                data={ambassadors}
                csvString='ambassadors'
            />
        </div>
    )
}
