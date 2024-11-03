import { apiInstance } from './config'

export const getCategories = () => apiInstance.get('/categories?type=1')
