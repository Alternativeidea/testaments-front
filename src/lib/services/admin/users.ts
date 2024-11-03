import { apiInstance } from '../config'

// TODO: make this filters working on users
export const getUsers = () => apiInstance.get('/admin/users?orderBy=-createdAt')

export const getUsersCSV = () => apiInstance.get('/admin/users?csv=true')

export const getUser = (id: number) => apiInstance.get(`/admin/users/${id}`)

export const createUser = (payload : object) => apiInstance.post('/admin/users', payload)

export const updateUser = (payload : object, id: number) => apiInstance.put(`/admin/users/${id}`, payload)

export const patchUser = (payload : object, id: number) => apiInstance.patch(`/admin/users/${id}`, payload)

export const deleteUser = (id: number) => apiInstance.delete(`/admin/users/${id}`)
