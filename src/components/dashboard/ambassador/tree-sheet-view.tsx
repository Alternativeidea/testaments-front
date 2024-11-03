'use client'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader } from '@/components/ui/sheet'
import { getTreeById } from '@/lib/services/tree'
import { cn } from '@/lib/utils/style'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { ReferralDetailsSheet } from './referral-details-sheet'

interface TreeSheetProps {
    id: number
    openSheet: boolean
}

interface TreeData {
    createdAt: Date
    relativeArray?: string[]
}

export function TreeSheetView({ id, openSheet }: TreeSheetProps) {
    const [isOpen, setIsOpen] = useState<boolean>(openSheet)
    const [treeData, setTreeData] = useState<TreeData>()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTreeById(id)
                setTreeData(data)
            } catch (error) {
                if (error instanceof Error) {
                    setIsOpen(false)
                    const err = JSON.parse(error.message)
                    toast.error('Nekaj je šlo narobe.', {
                        description: err.message
                    })
                }
            }
        }
        if (id) {
            fetchData()
        }
    }, [id, treeData])

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetContent className='w-full lg:!max-w-[420px] h-full bg-[#F1F1F1] p-0'>
                <ScrollArea
                    className={cn(
                        'w-full h-full',
                        '[&>div>div]:min-h-full [&>div>div]:!flex [&>div>div]:flex-col'
                    )}
                >
                    <SheetHeader className='flex items-start w-full bg-primary-white shadow-sheet-section px-7 pt-10 pb-8 space-y-0 relative z-[100]'>
                        <p className="text-h6 font-baskerville">ID{id}</p>
                        <span className="text-body-medium font-medium">Vpis stranke: {treeData ? new Date(treeData.createdAt).toLocaleDateString('sl') : '-'}</span>
                    </SheetHeader>
                    <div className={cn('flex flex-auto flex-col')}>
                        <SheetHeader className='flex flex-auto w-full px-7 pt-10 pb-8 space-y-0 relative z-[100]'>
                            <ReferralDetailsSheet createdAt={treeData ? treeData.createdAt : new Date()} id={id}>
                                <div className='flex gap-2 lg:gap-4 items-center'>
                                    <div className='bg-primary-white p-1 lg:p-2'>
                                        <div className='bg-[#FFFFFF] lg:p-1 rounded-full'>
                                            <Icons.PeopleGold className='w-4 h-4' />
                                        </div>
                                    </div>
                                    <span className='font-medium text-body-medium'>ID{id}</span>
                                </div>
                            </ReferralDetailsSheet>
                            <div className='pl-3 lg:pl-5 pt-2'>
                                {treeData?.relativeArray
                                    ? treeData.relativeArray.map(subId => (
                                        subId !== id.toString() && <div key={`i-${subId}`} className='flex items-center relative [&>.bl]:last:h-1/2'>
                                            <Separator orientation='vertical' className='bl top-0 absolute bg-primary-light-gray' />
                                            <Separator className='w-full max-w-6 lg:max-w-8 mr-2 bg-primary-light-gray' />
                                            <ReferralDetailsSheet id={Number(subId)} createdAt={treeData.createdAt}>
                                                <div className='flex py-2'>
                                                    <div className='flex items-center justify-center bg-[#FFFFFF] p-1 rounded-full mr-2 '>
                                                        <Icons.People className='w-4 h-4' />
                                                    </div>
                                                    <span className='font-medium text-body-medium'>ID{subId}</span>
                                                </div>
                                            </ReferralDetailsSheet>
                                        </div>
                                    ))
                                    : null}
                            </div>
                        </SheetHeader>
                        <SheetFooter className='flex items-center justify-center w-full bg-primary-white px-6 py-4 mt-auto'>
                            <SheetClose asChild>
                                <Button
                                    className='w-full'
                                >
                                    Zapri
                                </Button>
                            </SheetClose>
                        </SheetFooter>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}
