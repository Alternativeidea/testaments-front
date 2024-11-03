import { NewWillContactDialog } from '@/components/dashboard/storage/new-will-contact-dialog'
import TestamentChangeRow from '@/components/dashboard/storage/testament-change-row'
import TestamentRow from '@/components/dashboard/storage/testament-row'
import UpdateWillConfirmationSheet from '@/components/dashboard/storage/update-will-confirmation-sheet'
import { Card, CardHeader } from '@/components/ui/card'
import { getCategories } from '@/lib/services/categories'
import { getHeirs } from '@/lib/services/heirs'
import { getWills, getWillsRequests } from '@/lib/services/wills'

export default async function WillsPage() {
    const willsRequests: WillRequestProps[] = await getWillsRequests()
    const wills: WillProps[] = await getWills()
    const heirs = await getHeirs()
    const categories: CategoryProps[] = await getCategories()

    return (
        <>
            {wills.length === 0 && (
                <>
                    <Card className='bg-primary-light-gray/20 border-none'>
                        <CardHeader>
                            <div className='flex flex-col md:flex-row justify-between items-center gap-8'>
                                <span className='text-h6 font-baskerville leading-none translate-y-1'>Moje oporoke</span>
                                <NewWillContactDialog />
                                {/* <NewWillSheet heirs={heirs} categories={categories} /> */}
                            </div>
                        </CardHeader>
                    </Card>
                    {heirs.length === 0
                        ? <Card className='bg-primary-light-gray/20 border-none'>
                            <CardHeader>
                                <div className='flex flex-col md:flex-row justify-between items-center gap-8'>
                                    <span className='text-h6 font-baskerville leading-none translate-y-1'>Moji Dediči</span>
                                    <NewWillContactDialog text='Dodaj novega dediča' />
                                    {/* <NewHeirSheet heirs={heirs} /> */}
                                </div>
                            </CardHeader>
                        </Card>
                        : <div className='flex justify-center'>
                            <NewWillContactDialog text='Dodaj novega dediča' />
                            {/* <NewHeirSheet heirs={heirs} /> */}
                        </div>
                    }
                </>
            )}
            {wills.length > 0 && (
                <>
                    <div>
                        <span className='font-baskerville text-body-big'>Moje oporoke</span>
                    </div>
                    {wills.map((will) => (
                        <TestamentRow
                            key={`i-${will.id}`}
                            will={will}
                            categories={categories}
                        />
                    ))}
                    <div className='flex justify-center'>
                        <NewWillContactDialog />
                        <NewWillContactDialog text='Dodaj novega dediča' />
                        {/* <NewWillSheet heirs={heirs} categories={categories} />
                        <NewHeirSheet heirs={heirs} /> */}
                    </div>
                </>
            )}
            {willsRequests.length > 0 && (
                <>
                    <div>
                        <span className='font-baskerville text-body-big'>Zadnje spremembe v oporoki</span>
                    </div>
                    {willsRequests.map((willRequest) => (
                        <TestamentChangeRow
                            key={`i-${willRequest.id}`}
                            willRequest={willRequest}
                            categories={categories}
                        />
                    ))}
                </>
            )}
            <UpdateWillConfirmationSheet />
        </>
    )
}
