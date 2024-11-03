import { apiInstance } from './config'

export const getDocuments = (id: string, params : string) => apiInstance.get(`/admin/users/${id}/documents${params}`)

export const getUserDocuments = () => apiInstance.get('/users/data/documents')

export const createNewDocument = (id: string, payload: object) => apiInstance.post(`/admin/users/${id}/documents`, payload)

export const deleteDocument = (id: number, userId: number) => apiInstance.delete(`/admin/users/${userId}/documents/${id}`)
