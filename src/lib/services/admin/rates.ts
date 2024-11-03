import { apiInstance } from '../config'

export const getAdminRates = () => apiInstance.get('/admin/rates')

export const updateAdminRates = (payload : object) => apiInstance.put('/admin/rates', payload)
