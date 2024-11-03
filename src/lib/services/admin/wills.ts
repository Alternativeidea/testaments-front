import { apiInstance } from '../config'

export const getAdminWills = (params: string) => apiInstance.get(`/admin/requests${params}`)

export const updateAdminWill = (payload : object, id: number) => apiInstance.put(`/admin/requests/${id}`, payload)
