interface DocumentProps {
    id: number
    name: string
    description: string
    url: string
    type: string
    processingDate: string
    createdAt: string
    updatedAt: string
    userId: number
    willId: number | null
  }

interface TransactionProps {
    id: string;
    quantity: string
    status: string
    rate: string
    reference: string
    total: string
    userId: number
    toUserId: number
    createdAt: Date
    updatedAt: Date
    type: string
    to: {
      id: number
      email: string
    }
    cuId: number
    user: {
      isVerified: boolean
      id: number
      name: string
      lastName: string,
      email: string
    }
}

interface TicketsProps {
    id: number
    name: string
    subject: string
    message: string
    status: number
    createdAt: string
    updatedAt: string
    userId: number
    user: {
      name: string
      membershipId: number
      email: string
    }
}

interface WillsProps {
  id: number
  description: string
  status: number
  constrains: string
  createdAt: string
  updatedAt: string
  userId: number
  categoryId: number
  category: {
      id: number
      name: string
  }
}
