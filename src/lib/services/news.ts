import { apiInstance } from './config'

export const getNews = (params : string) => apiInstance.get(`/news${params}`)

export const getSingleNew = (id: string | undefined) => apiInstance.get(`/news/${id}`)
