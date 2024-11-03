'use client'
import DocumentCards from '@/components/dashboard/documents/document-cards'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import Pagination from '@/components/ui/pagination'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Skeleton } from '@/components/ui/skeleton'
import { getDocuments } from '@/lib/services/documents'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import CalendarButton from '../../ui/calendar-button'
import OrderByButton from '../../ui/order-by-button'
import { NewDocumentForm } from './new-document-form'

export default function UserDocs({ userId }: { userId: string }) {
    const [loading, setLoading] = useState<boolean>()
    const [documents, setDocuments] = useState([])
    const [startDate, setStartDate] = useState<string>('2024-01-01')
    const [endDate, setEndDate] = useState<string>(new Date().toISOString().split('T')[0])
    const [orderBy, setOrderBy] = useState<boolean>(true)
    const rowsPerPage = 6
    const [startIndex, setStartIndex] = useState<number>(0)
    const [endIndex, setEndIndex] = useState<number>(rowsPerPage)
    const params = useParams<{ id: string }>()

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const data = await getDocuments(params?.id ?? '1',
                `?orderBy=${orderBy ? '-createdAt' : 'createdAt'}&startAt=${startDate}&endAt=${endDate}`)
            setDocuments(data)
            setLoading(false)
        }

        fetchData()
    }, [startDate, endDate, orderBy])

    const pages = Math.ceil(documents.length / rowsPerPage)

    return (
        <section className='w-full'>
            <Card className='border-none w-full'>
                <CardHeader className='flex flex-col lg:flex-row items-center justify-between h-fit'>
                    <div className='flex flex-col items-center lg:items-start'>
                        <h3 className='w-fit text-h6 font-baskerville'>Dokumenti</h3>
                        <div className='flex items-center justify-start gap-2 lg:pl-4 py-2'>
                            <span className='w-3 h-3 rounded-full bg-gradient-gold' />
                            Dokument je vezan na oporoko
                        </div>
                    </div>
                    <div className='flex flex-row w-fit h-fit items-center bg-primary-white justify-center lg:justify-end gap-x-2'>
                        <CalendarButton
                            changeStartDate={setStartDate}
                            changeEndDate={setEndDate}
                        />
                        <OrderByButton
                            orderBy={orderBy}
                            changeOrder={() => {
                                setOrderBy(c => !c)
                            }}
                        />
                    </div>
                </CardHeader>
                <CardContent className='flex flex-col gap-y-4 py-0'>
                    {loading
                        ? <Skeleton className='w-full h-[96px] bg-primary-light-gray/40' />
                        : <DocumentCards isAdmin={true} data={documents.slice(startIndex, endIndex)} />
                    }
                    {!loading &&
                        <Pagination
                            startIndex={startIndex}
                            endIndex={endIndex}
                            updateStartIndex={setStartIndex}
                            updateEndIndex={setEndIndex}
                            pages={pages}
                            rowsPerPage={rowsPerPage}
                        />
                    }
                </CardContent>
                <CardFooter className='flex w-full justify-center items-center py-6'>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button className='px-24'>
                                Novi dokument
                            </Button>
                        </SheetTrigger>
                        <SheetContent className='w-full lg:max-w-[420px] p-0'>
                            <NewDocumentForm id={userId} />
                        </SheetContent>
                    </Sheet>
                </CardFooter>
            </Card>
        </section>
    )
}
