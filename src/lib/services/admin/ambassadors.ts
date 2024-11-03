import { apiInstance } from '../config'

export const getAdminAmbassadors = (params: string) => apiInstance.get(`/admin/ambassadors${params}`)

export const getAdminWithdraws = (params?: string) => apiInstance.get(`/admin/withdraws${params}`)

export const updateAdminWithdrawStatus = (id: number, payload: object) => apiInstance.put(`/admin/withdraws/${id}`, payload)

export const getAdminWithdrawsData = (params?: string) => apiInstance.get(`/admin/withdraws/data/generals${params}`)

export const getAdminBonusesGeneralData = (params?: string) => apiInstance.get(`/admin/bonuses/generals${params}`)

export const getAdminMembershipsData = (params?: string) => apiInstance.get(`/admin/bonuses/data${params}`)

export const getCurrentBonusesRates = () => apiInstance.get('/admin/bonuses-rates/current')

export const getBonusesRates = (params?: string) => apiInstance.get(`/admin/bonuses-rates${params}`)

export const updateBonusesRates = (payload : object) => apiInstance.post('/admin/bonuses-rates', payload)
