import { apiInstance } from './config'

export const getPaymentIntent = (membershipId: number) => apiInstance.post('/users/memberships/payment-intent', {
    membership_id: membershipId
})

export const payLater = () => apiInstance.put('/users/memberships/pay-later')
