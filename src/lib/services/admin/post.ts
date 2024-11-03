import { apiInstance } from '../config'

export const getAllPosts = () => apiInstance.get('/admin/posts?orderBy=-updatedAt')

export const getPost = (id : number) => apiInstance.get(`/admin/posts/${id}`)

export const createPost = (payload: object) => apiInstance.post('/admin/posts', payload)

export const updatePost = (payload: object, id: number) => apiInstance.put(`/admin/posts/${id}`, payload)

export const patchPost = (payload: object, id: number) => apiInstance.patch(`/admin/posts/${id}`, payload)

export const deletePost = (id: number) => apiInstance.delete(`/admin/posts/${id}`)
