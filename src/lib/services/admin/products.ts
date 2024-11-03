import { apiInstance } from '../config'

export const getAdminProduct = (id: number) => apiInstance.get(`/admin/products/${id}`)

export const getAdminProducts = (params?: string) => apiInstance.get(`/admin/products${params}`)

export const updateProduct = (id: number, payload : object) => apiInstance.put(`/admin/products/${id}`, payload)

export const patchProduct = (payload: object, id: number) => apiInstance.patch(`/admin/products/${id}`, payload)

export const createProduct = (payload : object) => apiInstance.post('/admin/products', payload)

export const deleteProduct = (id: number) => apiInstance.delete(`/admin/products/${id}`)

export const getAdminOrders = (params?: string) => apiInstance.get(`/admin/orders${params}`)

export const updateAdminOrder = (id: number, payload: object) => apiInstance.put(`/admin/orders/${id}`, payload)
