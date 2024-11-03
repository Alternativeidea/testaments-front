import { apiInstance } from '../config'

export const getAllFaqs = () => apiInstance.get('/admin/faqs?section=1,2,3,4,5')

export const getFaq = (id : number) => apiInstance.get(`/admin/faqs/${id}`)

export const createFaq = (payload: object) => apiInstance.post('/admin/faqs', payload)

export const updateFaq = (payload: object, id: number) => apiInstance.post(`/admin/faqs/${id}`, payload)

export const patchFaq = (payload: object, id: number) => apiInstance.patch(`/admin/faqs/${id}`, payload)

export const deleteFaq = (id: number) => apiInstance.delete(`/admin/faqs/${id}`)
