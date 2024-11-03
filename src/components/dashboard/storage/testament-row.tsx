import { buttonVariants } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { cn } from '@/lib/utils/style'
import { format } from 'date-fns'
import { sl } from 'date-fns/locale'
import Image from 'next/image'
import Link from 'next/link'
import { MobileMovementBlock, MobileMovementContent, MobileMovementFooter, MobileMovementItem, MobileMovementTrigger, MobileMovements, MovementIcon, MovementRow, MovementRowItem, MovementRows } from '../ui/movement-row'
import { UpdateWillSheet } from './update-will-sheet'

interface TestamentRowProps {
    will: WillProps
    categories: CategoryProps[]
}

export default function TestamentRow({ will, categories }:TestamentRowProps) {
    return (
        <>
            <MovementRows className='flex-col gap-2 bg-transparent p-0'>
                <MovementRow>
                    <MovementRowItem className='w-full justify-start items-center min-w-[200px] gap-x-6'>
                        <MovementIcon
                            icon={
                                <Image
                                    src={categories.find(({ id }) => will.category.id === id)?.image ?? ''}
                                    alt={categories.find(({ id }) => will.category.id === id)?.name ?? ''}
                                    width={24}
                                    height={24}
                                />
                            }
                        />
                        <div className='w-fit flex flex-col items-start justify-center'>
                            <span className='text-body-small uppercase'>{will.category.name}</span>
                            <span className='text-body-big-2 font-medium'>{will.description}</span>
                        </div>
                    </MovementRowItem>
                    <MovementRowItem className='w-full'>
                        <div className='w-fit flex flex-col items-start justify-center'>
                            <span className='text-body-small'>Datum zadnje spremembe</span>
                            <span className='text-body-big-2 font-medium'>{format(will.updatedAt, 'dd MMMM yyyy', { locale: sl })}</span>
                        </div>
                    </MovementRowItem>
                    <MovementRowItem className='w-full'>
                        <div className='w-fit flex flex-col items-start justify-center'>
                            <span className='text-body-small'>Dediči | Lasništvo</span>
                            {will.heirs.map(({ id, name, share }) => (
                                <span
                                    key={`i-${id}`}
                                    className='text-body-big-2 font-medium'
                                >
                                    {name}{' '}{share}%
                                </span>
                            ))}
                        </div>
                    </MovementRowItem>
                    <MovementRowItem className='w-full'>
                        <Link href={will.document.url} target='_blank' className='flex items-start gap-4'>
                            <span className='font-baskerville text-body-big-2 leading-none capitalize'>Prenesi dokument</span>
                            <Icons.ArrowRight className='w-3 min-w-fit h-3 rotate-90' />
                        </Link>
                    </MovementRowItem>
                    <MovementRowItem className='w-full'>
                        <UpdateWillSheet
                            triggerText='Uredi'
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
                            <MovementIcon
                                icon={
                                    <Image
                                        src={categories.find(({ id }) => will.category.id === id)?.image ?? ''}
                                        alt={categories.find(({ id }) => will.category.id === id)?.name ?? ''}
                                        width={24}
                                        height={24}
                                    />
                                }
                            />
                            <div className='w-fit flex flex-col items-start justify-center'>
                                <span className='text-body-small uppercase'>{will.category.name}</span>
                                <span className='text-body-big-2 font-medium'>{will.description}</span>
                            </div>
                        </div>
                    </MobileMovementTrigger>
                    <MobileMovementContent>
                        <MobileMovementBlock>
                            <div className='w-full flex flex-col items-start justify-center text-primary-dark-gray'>
                                <span className='text-body-small'>Datum zadnje spremembe</span>
                                <span className='text-body-big-2 font-medium'>{format(will.updatedAt, 'dd MMMM yyyy')}</span>
                            </div>
                        </MobileMovementBlock>
                        <MobileMovementBlock>
                            <div className='w-full flex flex-col items-start justify-center text-primary-dark-gray'>
                                <span className='text-body-small'>Dediči | Lasništvo</span>
                                {will.heirs.map(({ id, name, share }) => (
                                    <span
                                        key={`i-${id}`}
                                        className='text-body-big-2 font-medium'
                                    >
                                        {name}{' '}{share}%
                                    </span>
                                ))}
                            </div>
                        </MobileMovementBlock>
                    </MobileMovementContent>
                    <MobileMovementFooter>
                        <div className='flex items-center gap-4'>
                            <Link
                                href={will.document.url}
                                target='_blank'
                                className={cn(
                                    buttonVariants({ variant: 'light', size: 'icon' }),
                                    'min-w-10'
                                )}
                            >
                                <Icons.ArrowRight className='w-5 h-5 rotate-90' />
                            </Link>
                            <UpdateWillSheet
                                triggerText='Uredi'
                                will={will}
                                categories={categories}
                            />
                        </div>
                    </MobileMovementFooter>
                </MobileMovementItem>
            </MobileMovements>
        </>
    )
}
