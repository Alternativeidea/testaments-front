import { apiInstance } from './config'

export const getWillsRequests = () => apiInstance.get('/wills/requests')

export const getWills = () => apiInstance.get('/wills')

export const createWill = (payload: object) => apiInstance.post('/wills', payload)

export const updateWillRequest = (id: number) => apiInstance.put(`/wills/${id}`)

export const deleteWillRequest = (id: number) => apiInstance.delete(`/wills/${id}`)

export const updateDeleteWill = (id: number, payload: object) => apiInstance.patch(`/wills/${id}`, payload)
