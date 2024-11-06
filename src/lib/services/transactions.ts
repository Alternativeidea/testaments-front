import { apiInstance } from './config'

export const getTransactions = (orderBy: boolean, startAt: string, endAt: string) => apiInstance.get(`/transactions?startAt=${startAt}&endAt=${endAt}&orderBy=${orderBy ? '-' : ''}updatedAt,id`)

export const buyTransaction = (payload: object) => apiInstance.post('/transactions', payload)

export const sellTransaction = (payload: object) => apiInstance.post('/testaments/sell', payload)

export const verifySendTransaction = (payload: object) => apiInstance.post('/testaments/send', payload)

export const sendTransaction = (payload: object) => apiInstance.post('/testaments/start-sending-tst', payload)
