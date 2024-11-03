import { apiInstance } from '../config'

export const getAdminAllLaters = (params?: string) => apiInstance.get(`/admin/laters${params}`)

export const getAdminLater = (id: number) => apiInstance.get(`/admin/laters/${id}`)

export const acceptAdminLater = (id: string) => apiInstance.put(`/admin/laters/${id}`)
