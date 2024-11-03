'use client'

import { UpdateWillSheet } from '@/components/dashboard/storage/update-will-sheet'
import { MobileMovementBlock, MobileMovementContent, MobileMovementFooter, MobileMovementItem, MobileMovementTrigger, MobileMovements, MovementIcon, MovementRow, MovementRowItem, MovementRows } from '@/components/dashboard/ui/movement-row'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { REQUEST_ACTIONS, REQUEST_STATUS } from '@/lib/constants/wills'
import { useFetch } from '@/lib/hooks/use-fetch'
import { getCategories } from '@/lib/services/categories'
import { format } from 'date-fns'
import { sl } from 'date-fns/locale'
import { useState } from 'react'
import { AdminDeleteWillSheet, useAdminDeleteWillState } from '../../users/oporoke/admin-delete-will-sheet'
import { AdminNewWillSheet, useAdminNewWillState } from '../../users/oporoke/admin-new-will-sheet'
import CreateAppointmentForm from './create-appointment-form'

interface WillsRowsProps {
    data: WillRequestProps[]
    limit?: number
    className?: string
}

export default function WillsRows({ data, className, limit }: WillsRowsProps) {
    const [heirs, setHeirs] = useState<HeirProps[]>([])
    const { data: categories } = useFetch<CategoryProps[]>(getCategories)
    const setIsOpenWills = useAdminNewWillState(s => s.setIsOpen)
    const setCurrentWill = useAdminNewWillState(s => s.setCurrentWill)
    const setIsOpenDeleteWill = useAdminDeleteWillState(s => s.setIsOpen)
    const setCurrentWillId = useAdminDeleteWillState(s => s.setCurrentWillId)
    const limitedData: WillRequestProps[] = data.slice(0, limit)

    function handleEdit(will: WillRequestProps) {
        setHeirs(will.heirs || [])
        setCurrentWill({
            id: will.will.id,
            description: will.will.description,
            categoryId: will.will.categoryId,
            heirs: will.will.heirs,
            date: new Date(will.will.updatedAt),
            url: ''
        })
        setIsOpenWills(true)
    }

    function handleDelete(willId: number) {
        setCurrentWillId(willId)
        setIsOpenDeleteWill(true)
    }

    return (
        <div className={`flex flex-col w-full gap-y-2 ${className}`}>
            {data.length > 0
                ? limitedData.map((will) => (
                    <>
                        <MovementRows className='flex-col gap-2 bg-transparent p-0'>
                            <MovementRow>
                                <MovementRowItem className='justify-start items-center w-[230px] gap-x-6'>
                                    <MovementIcon icon={REQUEST_STATUS[will.status].icon} />
                                    <div className='w-fit flex flex-col items-start justify-center'>
                                        <span className='text-body-big-2 font-medium'>ID Oporoke: {will.will.id}</span>
                                        <span className='text-body-small'>{format(will.updatedAt, 'dd MMM yyyy', { locale: sl })}</span>
                                    </div>
                                </MovementRowItem>
                                <MovementRowItem className='justify-start items-center w-[110px] overflow-hidden text-ellipsis line-clamp-1 text-body-big-2 capitalize font-medium'>
                                    {REQUEST_ACTIONS[will.action]}
                                </MovementRowItem>
                                <MovementRowItem className='justify-start items-center w-[220px] overflow-hidden text-ellipsis line-clamp-1'>
                                    {will.user?.email ? will.user.email : '-'}
                                </MovementRowItem>
                                <MovementRowItem className='w-[130px] text-body-small uppercase'>
                                    {will.will.category.name}
                                </MovementRowItem>
                                <MovementRowItem className='text-body-medium capitalize font-bold line-clamp-1 text-ellipsis'>
                                    {REQUEST_STATUS[will.status].name}
                                </MovementRowItem>
                                <MovementRowItem className=''>
                                    {will.status === 0 &&
                            <Sheet>
                                <SheetTrigger asChild >
                                    <Button className='w-[140px]'>
                                        Poglej več
                                    </Button>
                                </SheetTrigger>
                                <SheetContent className={'flex flex-col w-full lg:!max-w-[420px] p-0 min-h-full overflow-y-scroll no-scrollbar\'}'}>
                                    <CreateAppointmentForm id={will.id} userId={will.userId} willId={will.id} request={will.will}/>
                                </SheetContent>
                            </Sheet>
                                    }
                                    {(will.status === 1 || will.status === 2) &&
                                        <UpdateWillSheet
                                            triggerText='Poglej več'
                                            will={will.will}
                                            categories={[]}
                                        />
                                    }
                                    {will.status === 3 && (
                                        <>
                                            <Button
                                                className='w-full'
                                                onClick={will.action === 0 || will.action === 1
                                                    ? () => handleEdit(will)
                                                    : () => handleDelete(will.will.id)
                                                }
                                            >
                                                <p className=''>
                                                    {will.action === 0 && 'Dodaj Oporoko'}
                                                    {will.action === 1 && 'Uredi Oporoko'}
                                                    {will.action === 2 && 'Izbriši Oproko'}
                                                </p>
                                            </Button>
                                            <AdminNewWillSheet heirs={heirs} categories={categories || []} />
                                        </>
                                    )}
                                </MovementRowItem>
                            </MovementRow >
                        </MovementRows>
                        <MobileMovements>
                            <MobileMovementItem value={'item' + 'id'} className='hover:!no-underline p-4 bg-primary-light-gray/20'>
                                <MobileMovementTrigger>
                                    <div className='flex items-center gap-x-6'>
                                        <MovementIcon icon={REQUEST_STATUS[will.status].icon} />
                                        <p className='flex flex-col items-start w-fit text-primary-medium-gray min-w-[180px] text-body-medium text-left'>
                                            <b className='text-primary-medium-gray'>
                                    ID Oporoke: {will.will.id}
                                            </b>
                                            <span className='text-body-medium'>
                                                {format(will.updatedAt, 'dd MMM yyyy')}
                                            </span>
                                        </p>
                                    </div>
                                </MobileMovementTrigger>
                                <MobileMovementContent>
                                    <MobileMovementBlock>
                                        <div className='flex flex-col w-full gap-4'>
                                            <div className='flex justify-between w-full'>
                                                <p className='w-fit capitalize text-primary-dark-gray'>
                                                    {REQUEST_ACTIONS[will.action]}
                                                </p>
                                                <p className='w-fit font-bold text-primary-dark-gray'>
                                                    {will.will.category.name}
                                                </p>
                                            </div>
                                            <p className='w-fit capitalize text-primary-dark-gray/60'>
                                                {will.user?.email ? will.user.email : '-'}
                                            </p>
                                        </div>
                                    </MobileMovementBlock>
                                    <MobileMovementBlock>
                                        <p className='w-fit font-bold text-primary-dark-gray'>
                                            {REQUEST_STATUS[will.status].name}
                                        </p>
                                    </MobileMovementBlock>
                                </MobileMovementContent>
                                <MobileMovementFooter>
                                    {will.status === 0 &&
                            <Sheet>
                                <SheetTrigger className='w-full' >
                                    <Button className='w-full'>
                                        Poglej več
                                    </Button>
                                </SheetTrigger>
                                <SheetContent className={'flex flex-col w-full lg:!max-w-[420px] p-0 min-h-full overflow-y-scroll no-scrollbar\'}'}>
                                    <CreateAppointmentForm id={will.id} userId={will.userId} willId={will.id} request={will.will} />
                                </SheetContent>
                            </Sheet>
                                    }
                                    {(will.status === 1) &&
                            <UpdateWillSheet
                                triggerText='Poglej več'
                                will={will.will}
                                categories={[]}
                            />}
                                    {(will.status === 1 || will.status === 2) &&
                            <UpdateWillSheet
                                triggerText='Poglej več'
                                will={will.will}
                                categories={[]}
                            />
                                    }
                                    {will.status === 3 && (
                                        <>
                                            <Button
                                                className='w-full'
                                                onClick={will.action === 0 || will.action === 1
                                                    ? () => handleEdit(will)
                                                    : () => handleDelete(will.id)
                                                }
                                            >
                                                <p className=''>
                                                    {will.action === 0 && 'Dodaj Oporoko'}
                                                    {will.action === 1 && 'Uredi Oporoko'}
                                                    {will.action === 2 && 'Izbriši Oproko'}
                                                </p>
                                            </Button>
                                        </>
                                    )}
                                </MobileMovementFooter>
                            </MobileMovementItem>
                        </MobileMovements>
                        <AdminDeleteWillSheet />
                    </>
                ))
                : <Card className='border-none p-6 bg-primary-light-gray/20 w-full text-h5'>
                    Nimate oporok
                </Card>
            }
        </div>
    )
}

// function WillsRowComponent({ id, action, status, will, updatedAt }: WillRequestProps) {
//     return (
//     )
// }
