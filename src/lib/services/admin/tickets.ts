import { apiInstance } from '../config'

export const getAdminLater = (id: number) => apiInstance.get(`/admin/tickets/${id}`)

export const getAdminAllTickets = (params?: string) => apiInstance.get(`/admin/tickets${params}`)

export const updateAdminTicket = (payload : object, id: number) => apiInstance.put(`/admin/tickets/${id}`, payload)
