/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Button } from '@/components/ui/button'
import { Card, CardHeader } from '@/components/ui/card'
import { Icons } from '@/components/ui/icons'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from '@/components/ui/sheet'
import { Skeleton } from '@/components/ui/skeleton'
import { getTreeByUser } from '@/lib/services/tree'
import { cn } from '@/lib/utils/style'
import { useEffect, useState } from 'react'
import { ReferralDetailsSheet } from './referral-details-sheet'

export function AmbassadorStructureAdmin({ userId }: {userId: number}) {
    const [tree, setTree] = useState<TreeProps>()
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            try {
                const treeData = await getTreeByUser(userId)
                setTree(treeData)
            } catch (error) {
                console.error('Error fetching tree data:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const firstLevels = tree?.tree?.filter(user => user.relativeLevel === 1) || []

    for (const f of firstLevels) {
        for (const t of tree?.tree || []) {
            if (t.relativeArray.includes(f.id.toString())) {
                if (f.relativeArray.length < t.relativeArray.length) {
                    f.relativeArray = t.relativeArray
                }
            }
        }
    }

    for (const f of firstLevels) {
        if (f.relativeArray.length > 1) {
            const index = f.relativeArray.indexOf(f.id.toString())
            if (index > -1) {
                f.relativeArray.splice(index, 1)
            }
        }
    }

    if (loading) {
        return (
            <div className="flex h-full flex-col flex-auto gap-4 pt-2">
                <div className="w-full grid grid-cols-2 @lg:grid-cols-3 gap-2 lg:gap-4">
                    <Skeleton className='w-full min-h-40'/>
                    <Skeleton className='w-full min-h-40'/>
                </div>
            </div>
        )
    }
    return (
        <div className="flex h-full flex-col flex-auto gap-4 pt-2">
            <div className="w-full grid grid-cols-2 @lg:grid-cols-3 gap-2 lg:gap-4">
                {firstLevels.length === 0
                    ? <div className='px-6 py-9 bg-primary-light-gray/20 col-span-2 @lg:col-span-3'>
                        <span className='text-h6 font-baskerville'>Nimate uporabnikov</span>
                    </div>
                    : firstLevels.map(({ id, relativeArray, createdAt }) => {
                        return (
                            <TreeSheet
                                key={`i-${id}`}
                                id={id}
                                createdAt={createdAt}
                                relativeArray={relativeArray}
                            >
                                <Card className='border-0 min-h-40'>
                                    <CardHeader className='space-y-0 p-2 gap-2'>
                                        {/* <ReferralDetailsSheet id={id} createdAt={createdAt} /> */}
                                        <div className="flex gap-2 lg:gap-4 items-center">
                                            <div className="bg-primary-white p-1 lg:p-2">
                                                <div className="bg-[#FFFFFF] lg:p-1 rounded-full">
                                                    <Icons.PeopleGold className="w-4 h-4" />
                                                </div>
                                            </div>
                                            <span className="font-medium text-body-medium">ID{id}</span>
                                        </div>
                                        <div className='pl-3 lg:pl-5'>
                                            {relativeArray.slice(0, 6).map(subId => (
                                                subId !== id.toString() && <div key={`i-${subId}`} className='flex items-center relative [&>.bl]:last:h-1/2'>
                                                    <Separator orientation='vertical' className='bl top-0 absolute bg-primary-light-gray' />
                                                    <Separator className='w-full max-w-6 lg:max-w-8 mr-2 bg-primary-light-gray' />
                                                    <div className='bg-[#FFFFFF] p-1 rounded-full mr-2 '>
                                                        <Icons.People className='w-4 h-4' />
                                                    </div>
                                                    <span className='font-medium text-body-medium'>ID {subId}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </CardHeader>
                                </Card>
                            </TreeSheet>
                        )
                    })}
            </div>
        </div>
    )
}

interface TreeSheetProps {
    id: number
    createdAt: Date
    relativeArray: string[]
    children: React.ReactNode
}

function TreeSheet({ id, createdAt, relativeArray, children }: TreeSheetProps) {
    return (
        <Sheet>
            <SheetTrigger className='text-primary-dark-gray text-h5'>
                <Card className='bg-primary-light-gray/20 border-0 h-full'>
                    {children}
                </Card>
            </SheetTrigger>
            <SheetContent className='w-full lg:!max-w-[420px] h-full bg-[#F1F1F1] p-0'>
                <ScrollArea
                    className={cn(
                        'w-full h-full',
                        '[&>div>div]:min-h-full [&>div>div]:!flex [&>div>div]:flex-col'
                    )}
                >
                    <SheetHeader className='flex items-start w-full bg-primary-white shadow-sheet-section px-7 pt-10 pb-8 space-y-0 relative z-[100]'>
                        <p className="text-h6 font-baskerville">Struktura ID{id}</p>
                        {/* <span className="text-body-medium font-medium">Vpis stranke: {new Date(createdAt).toLocaleDateString('sl')}</span> */}
                    </SheetHeader>
                    <div className={cn('flex flex-auto flex-col')}>
                        <SheetHeader className='flex flex-auto w-full px-7 pt-10 pb-8 space-y-0 relative z-[100]'>
                            <ReferralDetailsSheet createdAt={createdAt} id={id}>
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
                                {relativeArray.map(subId => (
                                    subId !== id.toString() && <div key={`i-${subId}`} className='flex items-center relative [&>.bl]:last:h-1/2'>
                                        <Separator orientation='vertical' className='bl top-0 absolute bg-primary-light-gray' />
                                        <Separator className='w-full max-w-6 lg:max-w-8 mr-2 bg-primary-light-gray' />
                                        <ReferralDetailsSheet id={Number(subId)} createdAt={createdAt}>
                                            <div className='flex py-2'>
                                                <div className='flex items-center justify-center bg-[#FFFFFF] p-1 rounded-full mr-2 '>
                                                    <Icons.People className='w-4 h-4' />
                                                </div>
                                                <span className='font-medium text-body-medium'>ID{subId}</span>
                                            </div>
                                        </ReferralDetailsSheet>
                                    </div>
                                ))}
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
