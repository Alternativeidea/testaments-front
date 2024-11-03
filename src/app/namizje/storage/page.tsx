import MessageCard from '@/components/dashboard/home/message-card'
import MessageCardError from '@/components/dashboard/home/message-card-error'
import MessageCardSkeleton from '@/components/dashboard/home/message-card-skeleton'
import { GuideRemovableCard } from '@/components/dashboard/storage/guide-removable-card'
import { SECTION_STORAGE } from '@/lib/constants/sections'
import { Metadata } from 'next'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

export const metadata: Metadata = {
    title: 'Shramba'
}

export default function StoragePage() {
    return (
        <>
            {/* Message */}
            <ErrorBoundary FallbackComponent={MessageCardError}>
                <Suspense fallback={<MessageCardSkeleton/>}>
                    <MessageCard sectionId={SECTION_STORAGE}/>
                </Suspense>
            </ErrorBoundary>
            <GuideRemovableCard />
        </>
    )
}
