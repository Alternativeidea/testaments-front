import { apiInstance } from './config'

export const signIn = (payload: object) => apiInstance.post('/auth/login', payload)

export const registerFirstStep = (payload: object, reference: string | undefined | null) => apiInstance.post(`/auth/register-first-step?${reference ? `referralLink=${reference}` : ''}`, payload)

export const registerSecondStep = (payload: object) => apiInstance.post('/auth/register', payload)

export const sendVerificationCode = (payload: object) => apiInstance.post('/auth/send-verification-code', payload)

export const changeEmail = (payload: object) => apiInstance.patch('/auth/change-email', payload)

export const getProfile = () => apiInstance.get('/auth/profile')

export const updateProfile = (payload: object) => apiInstance.put('/users', payload)

export const contact = (payload: object) => apiInstance.post('/users/contact', payload)

export const sendResetPasswordCode = (payload: object) => apiInstance.post('/auth/reset-password-send-code', payload)

export const resetPassword = (payload: object) => apiInstance.patch('/auth/reset-password', payload)

export const verifyUser = (payload: object) => apiInstance.put('/users/verify', payload)

export const getProfileTree = (userId: number) => apiInstance.get(`/tree/tree-profile/${userId}`)
