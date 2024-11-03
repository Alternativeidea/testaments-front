import { apiInstance } from '../../config'

export const getStatusLogs = (id: number) => apiInstance.get(`/admin/users/${id}/logs`)
