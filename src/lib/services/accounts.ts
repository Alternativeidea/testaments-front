import { apiInstance } from './config'

export const getAccounts = () => apiInstance.get('/accounts')

export const createAccount = (payload: object) => apiInstance.post('/accounts', payload)

export const updateAccount = (id: number, payload: object) => apiInstance.put(`/accounts/${id}`, payload)

export const deleteAccount = (id: number) => apiInstance.delete(`/accounts/${id}`)
