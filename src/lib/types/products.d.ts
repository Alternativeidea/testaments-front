interface ProductCharacteristic {
    icon: string
    name: string
    text: string
    order: number
    charId: string
}

interface Characteristic {
    icon: string
    name: string
    text: string
    charId: string
}

interface ProductProps {
    id: number
    name: string
    isFeatured: true
    description: string
    sku: string
    price: number
    picture: string
    picture2: string
    picture3: string
    picture4: string
    stock: number
    characteristics: ProductCharacteristic[]
    categoryId: number
    category: CategoryProps
    categoryName: string
    wishlist: boolean
    status: string
    interest: boolean
    publishedAt: Date
}

interface OrderHistoryItemProps {
    date: Date
    event: string
    order: number
}

interface OrderDetailProps {
    id: number
    quantity: string
    unitPrice: number
    subtotal: string
    createdAt: Date
    updatedAt: Date
    productId: number
    orderId: number
    product: {
        id: number
        name: string
        description: string
        sku: string
        price: number
        picture: string
        stock: number
        status: number
        isFeatured: boolean,
        characteristics: ProductCharacteristic[]
        publishedAt: Date
        createdAt: Date
        updatedAt: Date
        categoryId: number
        category: CategoryProps
    }
}

interface OrderProps {
    id: number
    total: number
    shipmentDate: null
    status: number
    shippingAddress: null
    tracking: null
    notes: null
    history: OrderHistoryItemProps[]
    createdAt: Date
    updatedAt: Date
    userId: number
    user: {
      isVerified: boolean
      id: number
      name: string
      lastName: string
      email: string
    }
    details: OrderDetailProps[]
}
