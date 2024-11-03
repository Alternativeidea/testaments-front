interface FaqProps {
    id: number
    question: string
    answers?: string[]
    response: string
    active: boolean
    isFeatured: boolean
    section: number
    createdAt: string
}

interface NewFaqProps {
    question: string
    response: string
    active: boolean
    section: string
    isFeatured: boolean
}
