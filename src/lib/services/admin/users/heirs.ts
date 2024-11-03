import { apiInstance } from '../../config'

export const getHeirs = (userId: number) => apiInstance.get(`/admin/users/${userId}/heirs`)

export const createHeir = (userId: number, payload: object) => apiInstance.post(`/admin/users/${userId}/heirs`, payload)

export const updateHeir = (userId: number, heirId: number, payload: object) => apiInstance.put(`/admin/users/${userId}/heirs/${heirId}`, payload)

export const deleteHeir = (userId: number, heirId: number) => apiInstance.delete(`/admin/users/${userId}/heirs/${heirId}`)
