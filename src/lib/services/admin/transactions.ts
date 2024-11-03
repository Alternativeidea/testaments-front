import { apiInstance } from '../config'

export const getAdminTransaction = (id: number) => apiInstance.get(`/admin/transactions/${id}`)

export const getAdminAllTransactions = (status: string, orderBy: boolean, startAt?: string, endAt?: string) => apiInstance.get(`/admin/transactions?startAt=${startAt}&endAt=${endAt}&status=${status}&orderBy=${orderBy ? '-' : ''}updatedAt,id`)

export const getAdminUserTransactions = (userId: number, status: string, orderBy: boolean, startAt: string, endAt: string) => apiInstance.get(`/admin/transactions?userId=${userId}&startAt=${startAt}&endAt=${endAt}&status=${status}&orderBy=${orderBy ? '-' : ''}updatedAt,id`)

export const updateAdminTransaction = (payload : object, id: number) => apiInstance.put(`/admin/transactions/${id}`, payload)

export const addTstManually = (id: number, payload : object) => apiInstance.post(`/admin/users/${id}/transactions/add`, payload)

export const removeTstManually = (id: number, payload : object) => apiInstance.post(`/admin/users/${id}/transactions/remove`, payload)

export const getAllTstSummary = () => apiInstance.get('/admin/testaments')

export const getTstSummary = (startAt: string, endAt: string) => apiInstance.get(`/admin/testaments?startAt=${startAt}&endAt=${endAt}`)
