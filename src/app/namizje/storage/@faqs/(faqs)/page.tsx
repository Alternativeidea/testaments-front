import FaqsAccordion from '@/components/dashboard/ui/faqs-accordion'
import { SHRAMBA_FAQS } from '@/lib/constants/faqs'
import { getFaqsBySectionId } from '@/lib/services/faqs'

export default async function FaqsPage() {
    const faqs: FaqProps[] = await getFaqsBySectionId(2)

    return (
        <FaqsAccordion faqs={[...SHRAMBA_FAQS, ...faqs]} />
    )
}
