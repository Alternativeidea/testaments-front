import { apiInstance } from '../../config'

export const getUsersRequestsClaims = (userId: number) => apiInstance.get(`/admin/users/${userId}/wills/requests?status=3`)

export const getUsersRequests = (userId: number) => apiInstance.get(`/admin/users/${userId}/wills/requests?status=0,1,2`)

export const patchUserRequestsStatus = (payload : object, userId: number, id: number) => apiInstance.patch(`/admin/users/${userId}/wills/requests/${id}`, payload)
