import { apiInstance } from './config'

export const getBanner = (id: number) => apiInstance.get(`/banners/${id}`)

export const getMessage = (id: number) => apiInstance.get(`/messages/${id}`)

export const getMessages = () => apiInstance.get('/messages?section=1,2,3,4,5')
