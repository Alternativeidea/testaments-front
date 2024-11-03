'use client'
// Next
import Link from 'next/link'
// Components
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { deleteDocument } from '@/lib/services/documents'
import { formatDate } from '@/lib/utils/date'
import { Trash2Icon } from 'lucide-react'
import { toast } from 'sonner'
import { MobileMovementBlock, MobileMovementContent, MobileMovementFooter, MobileMovementItem, MobileMovementTrigger, MobileMovements, MovementIcon, MovementRow, MovementRowItem, MovementRows } from '../ui/movement-row'
interface DocumentCardsProps {
    data: DocumentProps[]
    limit?: number
    className?: string
    isAdmin?: boolean
}
type CardProps = DocumentProps & { isAdmin: boolean }

export default function DocumentCards({ data, className, isAdmin = false }: DocumentCardsProps) {
    return (
        <div className={className}>
            {data.length > 0
                ? <>
                    <MovementRows>
                        {data.map((props) =>
                            <DesktopCard key={props.id} isAdmin={isAdmin} {...props} />
                        )}
                    </MovementRows>
                    <MobileMovements >
                        {data.map((props) =>
                            <MobileRow key={props.id} isAdmin={isAdmin} {...props} />
                        )}
                    </MobileMovements>
                </>
                : <Card className='w-full h-fit bg-primary-light-gray/20 border-none px-6 py-6'>
                    <p className='text-h5'>Nimate nobenega dokumenta</p>
                </Card>
            }
        </div>
    )
}

function DesktopCard({ userId, name, id, createdAt, description, url, type, willId, isAdmin }: CardProps) {
    return (
        <MovementRow>
            <MovementRowItem className='justify-start items-center min-w-[280px] gap-x-6'>
                <MovementIcon icon={type} oporoke={willId !== null}/>
                <p className='font-bold capitalize'>{name}</p>
            </MovementRowItem>
            <MovementRowItem className='flex-col min-w-[160px] justify-start'>
                <b>ID {id}</b>
                <span className='text-body-medium'>
                    {formatDate(createdAt)}
                </span>
            </MovementRowItem>
            <MovementRowItem className='text-primary-dark-gray w-[340px] overflow-ellipsis line-clamp-2'>
                {description}
            </MovementRowItem>
            <MovementRowItem>
                <Button className='h-fit'>
                    <Link className='' href={url} target='_blank'>
                        Prenesi
                    </Link>
                </Button>
                {isAdmin
                    ? <DeleteButton id={id} userId={userId}/>
                    : <span className='w-[56px]'/>
                }
            </MovementRowItem>
        </MovementRow>
    )
}

function MobileRow({ userId, name, id, createdAt, description, url, type, willId, isAdmin }: CardProps) {
    return (
        <MobileMovementItem value={'item' + id}>
            <MobileMovementTrigger>
                <div className='flex items-center gap-x-6'>
                    <MovementIcon oporoke={willId !== null} icon={type} />
                    <p className='flex flex-col items-start w-fit text-primary-medium-gray min-w-[180px] text-body-medium md:text-body-big-2 text-left'>
                        <b className='!no-underline capitalize'>
                            {name}
                        </b>
                        <span className='text-body-small md:text-body-medium'>
                            {formatDate(createdAt)}
                        </span>
                    </p>
                </div>
            </MobileMovementTrigger>
            <MobileMovementContent>
                <MobileMovementBlock>
                    <b className='text-primary-medium-gray'>
                        ID {id}
                    </b>
                </MobileMovementBlock>
                <MobileMovementBlock>
                    <p className='w-fit text-primary-dark-gray min-w-[80px] overflow-ellipsis line-clamp-3'>
                        {description}
                    </p>
                </MobileMovementBlock>
            </MobileMovementContent>
            <MobileMovementFooter>
                <div className='flex gap-2'>
                    <Button className='w-full'>
                        <Link href={url} target='_blank'>
                        Prenesi
                        </Link>
                    </Button>
                    {isAdmin &&
                        willId !== null
                        ? <DeleteButton id={id} userId={userId}/>
                        : <span className='w-[56px]'/>
                    }
                </div>
            </MobileMovementFooter>
        </MobileMovementItem>
    )
}

export function DeleteButton({ id, userId } : {id : number, userId : number}) {
    async function handleDelete() {
        await deleteDocument(id, userId)
        try {
            toast.success('Urejeno!', {
                position: 'bottom-center'
            })
        } catch (error) {
            if (error instanceof Error) {
                const err = JSON.parse(error.message)
                toast.error('Nekaj je šlo narobe.', {
                    description: err.message
                })
            }
        }
        location.reload()
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant={'link'}>
                    <Trash2Icon className='text-accent-red' />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className='p-6'>
                <AlertDialogHeader>
                    <AlertDialogTitle className='text-h6'>
                                Izbris dokumenta
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                                Si prepričan da želiš izbrisati dokument?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className='pt-4'>
                    <Button
                        onClick={handleDelete}
                        className='w-full'
                        variant='destructive'>
                            DA, IZBRIŠI
                    </Button>
                    <AlertDialogCancel
                        className='w-full'>
                        <p className=''>NE</p>
                    </AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
