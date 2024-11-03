interface WillCategoryProps {
    id: number
    name: string
}

interface WillHeirProps {
    id: number
    name: string
    relationship: string
    address: string
    share: number
    constrains: string
}

interface WillRequestActionProps {
    date: Date
    admin: null
    action: string
}

interface WillDocumentProps {
    id: number
    url: string
}

interface WillProps {
    id: number
    description: string
    status: number
    constrains: string
    createdAt: string
    updatedAt: string
    userId: number
    categoryId: number
    category: WillCategoryProps
    heirs: WillHeirProps[]
    document: WillDocumentProps
}

interface WillRequestProps {
    id: number
    action: number
    status: number
    history: WillRequestActionProps[],
    willId: number
    userId: number
    user: {
        email: string
    }
    will: WillProps
    updatedAt: Date
    heirs?: HeirProps[]
}
