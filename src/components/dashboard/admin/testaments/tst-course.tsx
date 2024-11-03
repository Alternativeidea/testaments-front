// Components
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import InvestmentCard from '../../ui/investment-card'
// Utils
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { getAdminRates } from '@/lib/services/admin/rates'
import UpdateRateForm from './update-rate-form'

export default async function TstCourse() {
    const { priceBuy, priceSell, rateBuy, rateSell, price } = await getAdminRates()
    const data = [
        { cena: 35.2 },
        { cena: 36.2 },
        { cena: 37.2 },
        { cena: 35.2 },
        { cena: 36.2 },
        { cena: 37.2 },
        { cena: 34.2 },
        { cena: 34.2 },
        { cena: 55.2 },
        { cena: 60.7 },
        { cena: 65.1 },
        { cena: 68.5 },
        { cena: 75.9 },
        { cena: 62.3 },
        { cena: 56.8 },
        { cena: 63.6 },
        { cena: 59.4 },
        { cena: 67.2 },
        { cena: 58.1 },
        { cena: 69.3 },
        { cena: 55.2 },
        { cena: 55.2 },
        { cena: 55.2 },
        { cena: 55.2 },
        { cena: 61.8 },
        { cena: 65.5 },
        { cena: 58.6 },
        { cena: 68.4 },
        { cena: 57.9 },
        { cena: 66.7 },
        { cena: 61.2 },
        { cena: 63.1 },
        { cena: 35.2 },
        { cena: 36.2 },
        { cena: 37.2 },
        { cena: 35.2 }
    ]

    return (
        <div className='flex flex-col w-full gap-6'>
            <div className='flex flex-col w-full items-center gap-4'>
                <h3 className="w-full font-baskerville text-primary-dark-gray text-h6 ">Tečaj danes</h3>
                <div className='grid md:grid-cols-2 gap-4 w-full'>
                    <Card className='border-none bg-primary-light-gray/20'>
                        <InvestmentCard
                            data={data}
                            amount={Number(priceBuy)}
                            amountLabelBlack='ODKUPNI TEČAJ TST / EUR'
                            amountLabelNormal='(danes)'
                        />
                        <div className='flex flex-col gap-4 w-full p-6'>
                            <div className='flex items-center justify-center gap-6'>
                                <p>Vezava: <b>Golden API</b></p>
                                <p>Koeficjent: <b>{rateBuy}%</b></p>
                            </div>
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button className='w-full'>
                                        Spremeni odkupni tečaj
                                    </Button>
                                </SheetTrigger>
                                <SheetContent className='flex flex-col w-full lg:!max-w-[420px] min-h-full !p-0 overflow-y-scroll no-scrollbar'>
                                    <UpdateRateForm
                                        price={price}
                                        updateBuy={true}
                                        priceBuy={priceBuy}
                                        priceSell={priceSell}
                                        rateBuy={rateBuy}
                                        rateSell={rateSell}
                                    />
                                </SheetContent>
                            </Sheet>
                        </div>
                    </Card>
                    <Card className='border-none bg-primary-light-gray/20'>
                        <InvestmentCard
                            data={data}
                            amount={Number(priceSell)}
                            amountLabelBlack='NAKUPNI TEČAJ TST / EUR'
                            amountLabelNormal='(danes)'
                        />
                        <div className='flex flex-col gap-4 w-full p-6'>
                            <div className='flex items-center justify-center gap-6'>
                                <p>Vezava: <b>Golden API</b></p>
                                <p>Koeficjent: <b>{rateSell}%</b></p>
                            </div>
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button className='w-full'>
                                Spremeni nakupni tečaj
                                    </Button>
                                </SheetTrigger>
                                <SheetContent className='flex flex-col w-full lg:!max-w-[420px] min-h-full !p-0 overflow-y-scroll no-scrollbar'>
                                    <UpdateRateForm
                                        price={price}
                                        updateBuy={false}
                                        priceBuy={priceBuy}
                                        priceSell={priceSell}
                                        rateBuy={rateBuy}
                                        rateSell={rateSell}
                                    />
                                </SheetContent>
                            </Sheet>
                        </div>
                    </Card>
                </div>
            </div>
            {/* Table */}
            {/* <div className='flex flex-col w-full gap-y-2'>
                <h3 className="text-h6 font-baskerville pr-4">Oddani zahtevki za spremembo TST tečaja</h3>
                <TransactionCards data={transactions} limit={4}/>
            </div> */}
            {/* Transactions */}
            {/* <div className='flex flex-col w-full gap-y-2'>
                <div className='flex justify-between max-w-full items-center'>
                    <h3 className="text-h6 font-baskerville pr-4 w-fit">Zgodovina TST tečaja</h3>
                    <div className='flex items-center justify-end gap-6 w-1/2'>
                        <Select>
                            <SelectTrigger className='min-w-fit'>
                                <SelectValue>Vrsta tečaja: Nakupni</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='nakupni'>Nakupni</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant='light' className='bg-primary-light-gray border-none'>
                            <Calendar/>
                        </Button>
                    </div>
                </div>
                    <TransactionCards data={transactions} />
            </div> */}
        </div>
    )
}
