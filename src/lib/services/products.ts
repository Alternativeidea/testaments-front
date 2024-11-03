import { apiInstance } from './config'

export const getProducts = (search?: string) => apiInstance.get(`/products?orderBy=updatedAt&${search}`)

export const getAdminProducts = () => apiInstance.get('/admin/products?orderBy=updatedAt')

export const getProductsByCategories = (categories?: string) => apiInstance.get(`/products?categories=${categories}`)

export const getWishlist = () => apiInstance.get('/users/wishlist')

export const addToWishlist = (id: number) => apiInstance.post(`/products/${id}/wishlist`)

export const getOrders = () => apiInstance.get('/orders')

export const createOrder = (payload: object) => apiInstance.post('/orders', payload)
