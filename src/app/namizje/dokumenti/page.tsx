import DocumentCards from '@/components/dashboard/documents/document-cards'
import MessageCard from '@/components/dashboard/home/message-card'
import MessageCardError from '@/components/dashboard/home/message-card-error'
import MessageCardSkeleton from '@/components/dashboard/home/message-card-skeleton'
import { Card, CardContent } from '@/components/ui/card'
import { SECTION_DOKUMENTI } from '@/lib/constants/sections'
import { getUserDocuments } from '@/lib/services/documents'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

export default async function DocumentsPage() {
    const documents = await getUserDocuments()

    return (
        <>
            {/* Message */}
            <ErrorBoundary FallbackComponent={MessageCardError}>
                <Suspense fallback={<MessageCardSkeleton/>}>
                    <MessageCard sectionId={SECTION_DOKUMENTI}/>
                </Suspense>
            </ErrorBoundary>
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
