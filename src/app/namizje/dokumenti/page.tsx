import DocumentCards from '@/components/dashboard/documents/document-cards'
import { Card, CardContent } from '@/components/ui/card'
import { getUserDocuments } from '@/lib/services/documents'

export default async function DocumentsPage() {
    const documents = await getUserDocuments()

    return (
        <>
            <Card className='border-none w-full'>
                <CardContent className='flex flex-col gap-y-4 !p-0'>
                    <div className='flex items-center justify-start gap-2 lg:pl-4 py-2'>
                        <span className='w-3 h-3 rounded-full bg-gradient-gold' />
                            Dokument je vezan na oporoko
                    </div>
                    <DocumentCards data={documents}/>
                </CardContent>
            </Card>
        </>
    )
}
