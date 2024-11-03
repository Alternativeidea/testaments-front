'use client'
// React
import { useEffect, useState } from 'react'
// Components
import { Button, buttonVariants } from '@/components/ui/button'
// Utils
import { useFetch } from '@/lib/hooks/use-fetch'
import { getHeirs } from '@/lib/services/admin/users/heirs'
import { getUsersRequests, getUsersRequestsClaims } from '@/lib/services/admin/users/requests'
import { getWills } from '@/lib/services/admin/users/wills'
import { getCategories } from '@/lib/services/categories'
import { AdminNewHeirSheet, useAdminNewHeirState } from './admin-new-heir-sheet'
// import { AdminNewWillSheet } from './admin-new-will-sheet'
import { MobileMovementBlock, MobileMovementContent, MobileMovementFooter, MobileMovementItem, MobileMovementTrigger, MobileMovements, MovementIcon, MovementRow, MovementRowItem } from '@/components/dashboard/ui/movement-row'
import { Icons } from '@/components/ui/icons'
import { cn } from '@/lib/utils/style'
import { format } from 'date-fns'
import { sl } from 'date-fns/locale'
import Image from 'next/image'
import Link from 'next/link'
import WillsRows from '../../obvestila/wills/wills-rows'
import { AdminNewWillSheet, useAdminNewWillState } from './admin-new-will-sheet'
import HeirCard from './heir-card'
import { WillRowSkeleton } from './will-row-skeleton'

export default function UsersOporoke({ userId, view }: { userId: number, view: string }) {
// export default function UsersOporoke({ view }: { userId: number, view: string }) {
    const [revalidator, setRevalidator] = useState('')
    const [willsRevalidator, setWillsRevalidator] = useState('')
    const isOpenWills = useAdminNewWillState(s => s.isOpen)
    const setIsOpenWills = useAdminNewWillState(s => s.setIsOpen)
    const setCurrentWill = useAdminNewWillState(s => s.setCurrentWill)
    const isOpen = useAdminNewHeirState(s => s.isOpen)
    const setIsOpen = useAdminNewHeirState(s => s.setIsOpen)
    const setCurrentStep = useAdminNewHeirState(s => s.setCurrentStep)
    const { data: heirs } = useFetch<HeirProps[]>(() => getHeirs(userId), [revalidator])
    const { data: willsRequestsClaims, isLoading: isLoadingWillsRequestClaims } = useFetch<WillRequestProps[]>(() => getUsersRequestsClaims(userId), [willsRevalidator])
    const { data: willsRequests, isLoading: isLoadingWillsRequest } = useFetch<WillRequestProps[]>(() => getUsersRequests(userId))
    const { data: wills, isLoading: isLoadingWills } = useFetch<WillProps[]>(() => getWills(userId), [willsRevalidator])
    const { data: categories } = useFetch<CategoryProps[]>(getCategories)

    function handleAddHeir() {
        setCurrentStep(1)
        setIsOpen(true)
    }

    function handleCreateWill() {
        setIsOpenWills(true)
    }

    function handleEditWill(will: WillProps) {
        setCurrentWill({
            id: will.id,
            description: will.description,
            categoryId: will.categoryId,
            heirs: will.heirs,
            date: new Date(will.updatedAt),
            url: will.document.url
        })
        setIsOpenWills(true)
    }

    useEffect(() => {
        if (!isOpen) {
            setRevalidator(Math.random().toString())
        }
    }, [isOpen])

    useEffect(() => {
        if (!isOpenWills) {
            setWillsRevalidator(Math.random().toString())
        }
    }, [isOpenWills])

    if (view === 'heirs') {
        return (
            <div className='grid lg:grid-cols-2 grid-flow-row gap-6 w-full'>
                {heirs?.map((heir, i) =>
                    <HeirCard key={heir.name} heir={heir} index={i + 1}/>
                )}
                <AdminNewHeirSheet heirs={heirs || []} />
                <div className='lg:col-span-2 flex justify-center pt-12'>
                    <Button onClick={handleAddHeir}>Dodaj novega dediča</Button>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full flex flex-col gap-y-6">
            <div className="flex flex-col">
                <h3 className="text-body-big font-baskerville font-normal py-4">
                    Oddani zahtevki - v obdelavi
                </h3>
                {/* <TransactionCards data={transactions} limit={3} /> */}
                {isLoadingWillsRequestClaims && [...Array(4)].map((_, i) => (
                    <WillRowSkeleton key={`i-${i}`} />
                ))}
                {
                    <WillsRows className='w-full' data={willsRequestsClaims ?? []}/>
                }
            </div>
            <div className="flex flex-col space-y-2">
                <h3 className="text-body-big font-baskerville font-normal py-4">
                    Oporoke
                </h3>
                {isLoadingWills && [...Array(4)].map((_, i) => (
                    <WillRowSkeleton key={`i-${i}`} />
                ))}
                {wills?.map((will) => (
                    <>
                        <MovementRow key={`i-${will.id}`}>
                            <MovementRowItem className='w-full justify-start items-center min-w-[200px] gap-x-6'>
                                <MovementIcon
                                    icon={
                                        <Image
                                            src={categories?.find(({ id }) => will.category.id === id)?.image ?? ''}
                                            alt={categories?.find(({ id }) => will.category.id === id)?.name ?? ''}
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
                                { will.document &&
                                    <Link href={will.document.url} target='_blank' className='flex items-start gap-4'>
                                        <span className='font-baskerville text-body-big-2 leading-none capitalize'>Prenesi dokument</span>
                                        <Icons.ArrowRight className='w-3 min-w-fit h-3 rotate-90' />
                                    </Link>
                                }
                            </MovementRowItem>
                            <MovementRowItem className='w-full'>
                                <Button onClick={() => handleEditWill(will)} className='w-full'>Uredi</Button>
                            </MovementRowItem>
                        </MovementRow >
                        <MobileMovements>
                            <MobileMovementItem value={'item' + 'id'} className='hover:!no-underline p-4 bg-primary-light-gray/20'>
                                <MobileMovementTrigger>
                                    <div className='flex items-center gap-x-6'>
                                        <MovementIcon
                                            icon={
                                                <Image
                                                    src={categories?.find(({ id }) => will.category.id === id)?.image ?? ''}
                                                    alt={categories?.find(({ id }) => will.category.id === id)?.name ?? ''}
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
                                        { will.document &&
                                            <Link
                                                href={will.document.url}
                                                target='_blank'
                                                className={cn(
                                                    buttonVariants({ variant: 'light', size: 'icon' }),
                                                    'min-w-10'
                                                )}
                                            >
                                                <Icons.ArrowRight className='w-5 h-5 rotate-90' />
                                            </Link>}
                                        <Button onClick={() => handleEditWill(will)} className='w-full'>Uredi</Button>
                                    </div>
                                </MobileMovementFooter>
                            </MobileMovementItem>
                        </MobileMovements>
                    </>
                ))}
                <div className='flex items-center justify-center w-full py-6'>
                    <Button onClick={handleCreateWill}>
                        <span className='flex items-center gap-4'>
                            <Icons.Plus />
                            <span className='leading-none '>Dodaj oporoko</span>
                        </span>
                    </Button>
                </div>
            </div>
            <div className="flex flex-col space-y-2">
                <h3 className="text-body-big font-baskerville font-normal py-4">
                    Zadnje spremembe v oporoki
                </h3>
                {isLoadingWillsRequest && [...Array(4)].map((_, i) => (
                    <WillRowSkeleton key={`i-${i}`} />
                ))}
                {
                    <WillsRows className='w-full' data={willsRequests ?? []}/>

                }
            </div>
            <AdminNewWillSheet heirs={heirs || []} categories={categories || []} />
        </div>
    )
}
