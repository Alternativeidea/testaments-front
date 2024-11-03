import { apiInstance } from '../../config'

export const getWills = (userId: number) => apiInstance.get(`/admin/users/${userId}/wills`)

export const getWill = (userId: number, id: number) => apiInstance.get(`admin/users/${userId}/wills/${id}`)

export const createWill = (userId: number, payload: object) => apiInstance.post(`/admin/users/${userId}/wills`, payload)

export const updateWill = (willId: number, payload: object) => apiInstance.put(`/admin/wills/${willId}`, payload)

export const deleteWill = (willId: number) => apiInstance.delete(`/admin/wills/${willId}`)
