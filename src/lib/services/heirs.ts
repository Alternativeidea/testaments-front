import { apiInstance } from './config'

export const getHeirs = () => apiInstance.get('/heirs')

export const createHeir = (payload: object) => apiInstance.post('/heirs', payload)

export const updateHeir = (id: number, payload: object) => apiInstance.put(`/heirs/${id}`, payload)

export const deleteHeir = (id: number) => apiInstance.delete(`/heirs/${id}`)
