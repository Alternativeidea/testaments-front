import { Card } from '@/components/ui/card'
import { formatDateWithNumbers } from '@/lib/utils/date'
import { MobileMovementBlock, MobileMovementContent, MobileMovementItem, MobileMovementTrigger, MobileMovements, MovementRow, MovementRowItem, MovementRows } from '../../ui/movement-row'

interface AdminBonusRatesRowsProps {
    data: BonusRatesProps[]
    limit?: number
    className?: string
    type?: 'tst' | 'premium'
}

interface BonusRateMobileCardProps extends BonusRatesProps {
    id: number
}

export default function BonusRatesCards({ data, className, limit }: AdminBonusRatesRowsProps) {
    const limitedData: BonusRatesProps[] = data.slice(0, limit)
    return (
        <div className={className}>
            <MovementRow className='flex w-full bg-transparent px-12'>
                <MovementRowItem className='w-[100px] justify-start font-bold'>
                    Datum
                </MovementRowItem>
                <MovementRowItem className='w-[100px] justify-start font-bold'>
                    Provizija
                </MovementRowItem>
                <MovementRowItem className='w-[120px] items-center justify-center text-center font-bold'>
                    Koeficijent 1. Nivoja
                </MovementRowItem>
                <MovementRowItem className='w-[120px] items-center justify-center text-center font-bold'>
                    Koeficijent <br/> 2. Nivoja
                </MovementRowItem>
            </MovementRow >
            {data.length > 0
                ? <>
                    <MovementRows className='hidden w-full flex-col gap-y-2 lg:flex'>
                        {limitedData.map((props, index) =>
                            <DesktopRow key={index} {...props} />
                        )}
                    </MovementRows>
                    <MobileMovements>
                        {limitedData.map((props, index) =>
                            <MobileRow key={index} id={index} {...props} />
                        )}
                    </MobileMovements>
                </>
                : <Card className='h-fit w-full border-none bg-primary-light-gray/20 px-6 py-6'>
                    <p className='text-h5'>Ni rezultata</p>
                </Card>
            }
        </div>
    )
}

function MobileRow({ createdAt, direct, indirect, type, id }: BonusRateMobileCardProps) {
    return (
        <MobileMovementItem value={`item+${id}`} className='bg-primary-light-gray/20 hover:!no-underline'>
            <MobileMovementTrigger>
                <span>Datum: <b>{formatDateWithNumbers(createdAt, '.')}</b></span>
            </MobileMovementTrigger>
            <MobileMovementContent>
                <MobileMovementBlock>
                    <div className='flex w-full flex-col items-center justify-between gap-y-4 py-8 lg:flex-row'>
                        <p>Provizija: <b>{type === 'premium' ? 'Premium' : 'Dodaj TST'}</b></p>
                        <div className='flex flex-col justify-end'>
                            <p className='flex gap-x-2'>Koeficient provizije <span className='font-semibold text-primary-medium-gray/60'>1. Nivoja</span><b>+{direct * 100}%</b></p>
                            <p className='flex gap-x-2'>Koeficient provizije <span className='font-semibold text-primary-medium-gray/60'>2. Nivoja</span><b>+{indirect * 100}%</b></p>
                        </div>
                    </div>
                </MobileMovementBlock>
            </MobileMovementContent>
        </MobileMovementItem>
    )
}

function DesktopRow({ createdAt, direct, indirect, type }: BonusRatesProps) {
    return (
        <MovementRow className='flex w-full justify-between p-12'>
            <MovementRowItem className='w-[100px] justify-start'>
                {formatDateWithNumbers(createdAt, '.')}
            </MovementRowItem>
            <MovementRowItem className='w-[100px] justify-start'>
                {type === 'premium' ? 'Premium' : 'Dodaj TST'}
            </MovementRowItem>
            <MovementRowItem className='w-[120px] items-center justify-center font-bold'>
                +{direct * 100}%
            </MovementRowItem>
            <MovementRowItem className='w-[120px] items-center justify-center font-bold'>
                +{indirect * 100}%
            </MovementRowItem>
        </MovementRow >
    )
}
