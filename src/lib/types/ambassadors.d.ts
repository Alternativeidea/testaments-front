interface ProvizijeProps {
    tId: number
    total: number
    uId: number;
    createdAt: string
    updatedAt: string
    relativeLevel: number
    commission: number
    status?: number
    type: number
    rUserId: number
}

interface WithdrawsProps {
    id: number
    status: number
    quantity: string
    fee: string
    reason: string | null
    name: string
    number: string
    address: string
    swift: string
    company: string | null
    companyAddress: string | null
    companyTin: string | null
    type: number
    createdAt: string
    updatedAt: string
    userId: number
    user: {
      id: number
      name: string
      lastName: string
    }
  }

  interface AdminBonusProps {
    tId: number
    total: number
    uId: number
    rUserId: number
    createdAt: string
    updatedAt: string
    status: number
    type: number
    name: string
    upline: string
    relativeLevel: number
    commission: string
    total: string
  }
