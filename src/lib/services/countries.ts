import { apiInstance } from './config'

export const getCountries = () => apiInstance.get('/countries')
export const getPhoneCodes = () => apiInstance.get('/countries?orderBy=phonecode')
