import { apiInstance } from './config'

export const getTree = () => apiInstance.get('/tree')

export const getTreeByUser = (id: number) => apiInstance.get(`/admin/trees/${id}`)

export const getTreeById = (id : number) => apiInstance.get(`/tree/${id}`)
