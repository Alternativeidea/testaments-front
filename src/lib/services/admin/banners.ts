import { apiInstance } from '../config'

export const getAdminMessages = (params: string) => apiInstance.get(`/admin/messages${params}`)

export const getAdminMessage = (id : number) => apiInstance.get(`/admin/messages${id}`)

export const putAdminMessage = (id : number, payload : object) => apiInstance.put(`/admin/messages/${id}`, payload)

export const getAdminBanners = (params: string) => apiInstance.get(`/admin/banners${params}`)

export const getAdminBanner = (id : number) => apiInstance.get(`/admin/banners/${id}`)

export const putAdminBanner = (id : number, payload : object) => apiInstance.put(`/admin/banners/${id}`, payload)
