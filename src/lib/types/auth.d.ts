interface ProfileProps {
    id: number
    name: string | null
    lastName: string | null
    secondLastName: string | null
    email: string
    phone: string | null
    mobilephone: string | null
    isReferred: boolean
    referralId: string | null
    referralLink: string
    picture: string | null
    city: string | null
    address: string | null
    state: string | null
    zipcode: string | null
    street: string | null
    suburb: string | null
    status: number
    birthdate: null
    birthplace: null
    emailVerifiedAt: string
    gender: string
    balance: string
    nextRenewal: string | null
    emso: string | null
    tin: null
    career: string | null
    isVerified: boolean
    isAmbassador: boolean
    agreeAmbassador: Date
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null,
    suspensionDate: Date | null
    roleId: number
    membershipId: number
    memPurchasedAt: Date
    countryId: number | null
    areaCode: string,
    country: {
        name: string
    }
}

interface UserAuthProps extends ProfileProps {
    password: null
    lastLogin: string | null
    token: string
    session?: {
        id: number
        agent: string
        remoteIp: string
        lastLogin: Date
        expiresAt: Date
        userId: number
    }
}

interface UserRegisterProps extends ProfileProps {
    code: string
    token: string
}

interface VerificationCodeProps {
    id: number
    code: string
    email: string
    type: number
    updatedAt: Date
    createdAt: Date
}

interface UserStatusLogs {
    action: string
    adminId: number
    createdAt: Date
    id: number
    message: string
    userId: number
}
