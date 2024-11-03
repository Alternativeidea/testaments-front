import { apiInstance } from './config'

export const getBonuses = () => apiInstance.get('/bonuses')
export const getBonusesByUser = (id: number) => apiInstance.get(`/admin/users/${id}/bonuses`)

export const getBonusesById = (id: number) => apiInstance.get(`/bonuses/${id}`)

export const getMembershipBonuses = () => apiInstance.get('/bonuses/memberships')
export const getMembershipBonusesByUser = (id: number) => apiInstance.get(`/admin/users/${id}/bonuses/memberships`)

export const getMembershipBonusesById = (id: number) => apiInstance.get(`/bonuses/memberships/${id}`)

export const getBalance = () => apiInstance.get('/bonuses/data/balance')
export const getBalanceByUser = (id: number) => apiInstance.get(`/admin/users/${id}/bonuses/balance`)
