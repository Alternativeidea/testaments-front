import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface TstSummaryCardProps {
    total: number
    quantity: number
    average: number
    feeCost?: number
    loading?: boolean
}

export default function TstSummaryCard({ quantity, average, total, feeCost = 0, loading } : TstSummaryCardProps) {
    return (
        <Card className="grid grid-cols-1 lg:grid-cols-2 p-6 gap-4 bg-primary-light-gray/20 border-none my-4 w-full">
            <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                    <Label>Število Testamentov / Določeno obdobje</Label>
                    <div className='grid grid-cols-2 gap-4'>
                        {/* Number of wills */}
                        <Input
                            disabled
                            readOnly
                            value={loading
                                ? '-'
                                : `${Number(total).toLocaleString('sl-SI', {
                                    minimumFractionDigits: 4,
                                    maximumFractionDigits: 4
                                })} TST`}
                        />
                        {/* Gold Price */}
                        <Input
                            disabled
                            readOnly
                            value={loading
                                ? '-'
                                : `${Number((total * average)).toLocaleString('sl-SI', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })} EUR`}
                        />
                    </div>
                </div>
                {/* Gold buying rate / Average price / Specific period */}
                <div className='flex flex-col gap-2'>
                    <Label className='text-ellipsis overflow-hidden line-clamp-1'>Nakupni tečaj zlata / Povprečna cena / Določeno obdobje</Label>
                    <Input
                        disabled
                        readOnly
                        value={loading
                            ? '-'
                            : `${Number(average).toLocaleString('sl-SI', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })} EUR`}
                    />
                </div>
            </div>
            <div className='flex flex-col gap-4'>
                {/* Successful Claims / Quantity */}
                <div className='flex flex-col gap-2'>
                    <Label>Uspešni zahtevki / Količina</Label>
                    <Input
                        disabled
                        readOnly
                        value={loading ? '-' : `${Number(quantity.toFixed(2)).toLocaleString('sl-SI')}`}
                    />
                </div>
                {/* Processing costs */}
                <div className='flex flex-col gap-2'>
                    <Label>Stroški obdelave</Label>
                    <Input
                        disabled
                        readOnly
                        value={loading
                            ? '-'
                            : ` ${Number(feeCost).toLocaleString('sl-SI', {
                                maximumFractionDigits: 4,
                                minimumFractionDigits: 4
                            })} TST`}
                    />
                </div>
            </div>
        </Card>
    )
}
