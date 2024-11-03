import { apiInstance } from './config'

export const convertToAmbassador = () => apiInstance.post('/ambassadors')

export const convertToAmbassadorId = (userId: number) => apiInstance.post(`/ambassadors/${userId}`)

export const convertToPremiumId = (userId: number) => apiInstance.put(`/ambassadors/${userId}`)

export const getMembershipsData = (params?: string) => apiInstance.get(`/bonuses/data/memberships${params}`)
export const getMembershipsDataByUser = (id: number, params?: string) => apiInstance.get(`/admin/users/${id}/bonuses/data/memberships${params}`)

export const getMembershipsDataById = (userId: number) => apiInstance.get(`/bonuses/data/memberships/${userId}`)

export const getMembershipDetails = (id: string) => apiInstance.get(`/bonuses/data/memberships/${id}`)

export const getWithdraws = (params?: string) => apiInstance.get(`/withdraws${params}`)
export const getWithdrawsByUser = (id: number, params?: string) => apiInstance.get(`/admin/users/${id}/withdraws${params}`)

export const createWithdraws = (payload: object) => apiInstance.post('/withdraws', payload)

export const withdrawConfirm = (id: string, payload: object) => apiInstance.post(`/withdraws/confirm/${id}`, payload)
