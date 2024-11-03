import { apiInstance } from './config'

export const getFaqsBySectionId = (id: number) => apiInstance.get(`/faqs/${id}`)
