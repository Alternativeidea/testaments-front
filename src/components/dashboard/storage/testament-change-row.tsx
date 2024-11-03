import { REQUEST_ACTIONS, REQUEST_STATUS } from '@/lib/constants/wills'
import { format } from 'date-fns'
import { sl } from 'date-fns/locale'
import { MobileMovementBlock, MobileMovementContent, MobileMovementFooter, MobileMovementItem, MobileMovementTrigger, MobileMovements, MovementIcon, MovementRow, MovementRowItem, MovementRows } from '../ui/movement-row'
import { UpdateWillSheet } from './update-will-sheet'

interface TestamentChangeRowProps {
    willRequest: WillRequestProps
    categories: CategoryProps[]
}

export default function TestamentChangeRow({ willRequest: { action, status, will, updatedAt }, categories }: TestamentChangeRowProps) {
    return (
        <>
            <MovementRows className='flex-col gap-2 bg-transparent p-0'>
                <MovementRow>
                    <MovementRowItem className='w-full justify-start items-center min-w-[280px] gap-x-6'>
                        <MovementIcon icon={REQUEST_STATUS[status].icon}/>
                        <div className='w-fit flex flex-col items-start justify-center'>
                            <span className='text-body-big-2 font-medium'>ID Oporoke: {will.id}</span>
                            <span className='text-body-small'>{format(updatedAt, 'dd MMM yyyy', { locale: sl })}</span>
                        </div>
                    </MovementRowItem>
                    <MovementRowItem className='w-full text-body-big-2 capitalize font-medium'>
                        {REQUEST_ACTIONS[action]}
                    </MovementRowItem>
                    <MovementRowItem className='w-full text-body-small uppercase'>
                        {will.category.name}
                    </MovementRowItem>
                    <MovementRowItem className='w-full text-body-big-2 capitalize font-bold'>
                        {REQUEST_STATUS[status].name}
                    </MovementRowItem>
                    <MovementRowItem className='w-full'><UpdateWillSheet
                        triggerText='Poglej več'
                        will={will}
                        categories={categories}
                    />
                    </MovementRowItem>
                </MovementRow >
            </MovementRows>
            <MobileMovements>
                <MobileMovementItem value={'item' + 'id'} className='hover:!no-underline p-4 bg-primary-light-gray/20'>
                    <MobileMovementTrigger>
                        <div className='flex items-center gap-x-6'>
                            <MovementIcon icon={REQUEST_STATUS[status].icon}/>
                            <p className='flex flex-col items-start w-fit text-primary-medium-gray min-w-[180px] text-body-medium text-left'>
                                <b className='text-primary-medium-gray'>
                                    ID transakcije: {will.id}
                                </b>
                                <span className='text-body-medium'>
                                    {format(updatedAt, 'dd MMM yyyy')}
                                </span>
                            </p>
                        </div>
                    </MobileMovementTrigger>
                    <MobileMovementContent>
                        <MobileMovementBlock>
                            <div className='flex justify-between w-full'>
                                <p className='w-fit capitalize text-primary-dark-gray'>
                                    {REQUEST_ACTIONS[action]}
                                </p>
                                <p className='w-fit font-bold text-primary-dark-gray'>
                                    {will.category.name}
                                </p>
                            </div>
                        </MobileMovementBlock>
                        <MobileMovementBlock>
                            <p className='w-fit font-bold text-primary-dark-gray'>
                                {REQUEST_STATUS[status].name}
                            </p>
                        </MobileMovementBlock>
                    </MobileMovementContent>
                    <MobileMovementFooter>
                        <UpdateWillSheet
                            triggerText='Poglej več'
                            will={will}
                            categories={categories}
                        />
                    </MobileMovementFooter>
                </MobileMovementItem>
            </MobileMovements>
        </>
    )
}
