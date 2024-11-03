import { apiInstance } from './config'

export const getRates = () => apiInstance.get('/rates')

export const getRatesToday = () => apiInstance.get('/rates/today')

export const getChartData = (period : string) => apiInstance.get(`/rates${period}`)
