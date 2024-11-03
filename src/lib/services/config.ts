import { SESSION_EXPIRED } from '@/lib/constants/session'
import { getClientCookie } from '@/lib/utils/cookie'
import { redirect } from 'next/navigation'

export const apiInstance = {
    get: getRequest,
    post: postRequest,
    put: putRequest,
    patch: patchRequest,
    delete: deleteRequest
}

function getToken() {
    if (typeof window !== 'undefined') {
        return getClientCookie('token')
    }
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { cookies: cookieStore } = require('next/headers')
    return cookieStore().get('token')?.value
}

async function getRequest(url:string) {
    const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + url, {
        method: 'GET',
        cache: 'no-store',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getToken()
        }
    })

    if (!res.ok) {
        // console.log('Hash status in GET -> ', res.status)
        // console.log('Error -> ', await res.json())

        if (res.status === 401) {
            if (typeof window !== 'undefined') {
                window.location.replace('/prijava?session=' + SESSION_EXPIRED + '&redirectedBy=' + window.location.pathname)
            } else {
                redirect('/prijava?session=' + SESSION_EXPIRED + '&redirectedBy=configNoWindow')
            }
        }
        // if (res.status === 498) {
        //     if (typeof window !== 'undefined') {
        //         window.location.replace('/dashboard/account-in-review?redirectedBy=' + REDIRECT_BY_IN_REVIEW_HASH)
        //     } else {
        //         redirect('/dashboard/account-in-review?redirectedBy=' + REDIRECT_BY_IN_REVIEW_HASH)
        //     }
        // }
        // if (res.status === 499) {
        //     if (typeof window !== 'undefined') {
        //         window.location.replace('/dashboard/memberships?redirectedBy=' + REDIRECT_BY_NO_HASH)
        //     } else {
        //         redirect('/dashboard/memberships?redirectedBy=' + REDIRECT_BY_NO_HASH)
        //     }
        // }
        const error = await res.json()
        throw new Error(JSON.stringify(error))
    }

    return res.json()
}

async function postRequest(url:string, body?: object) {
    const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + url, {
        method: 'POST',
        cache: 'no-store',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getToken()
        },
        body: JSON.stringify(body)
    })

    if (!res.ok) {
        // console.log('Hash status in POST -> ', res.status)
        // console.log('Error -> ', await res.json())

        if (res.status === 401) {
            if (typeof window !== 'undefined') {
                window.location.replace('/prijava?session=' + SESSION_EXPIRED)
            } else {
                redirect('/prijava?session=' + SESSION_EXPIRED)
            }
        }
        // if (res.status === 498) {
        //     if (typeof window !== 'undefined') {
        //         window.location.replace('/dashboard/account-in-review?redirectedBy=' + REDIRECT_BY_IN_REVIEW_HASH)
        //     } else {
        //         redirect('/dashboard/account-in-review?redirectedBy=' + REDIRECT_BY_IN_REVIEW_HASH)
        //     }
        // }
        // if (res.status === 499) {
        //     if (typeof window !== 'undefined') {
        //         window.location.replace('/dashboard/memberships?redirectedBy=' + REDIRECT_BY_NO_HASH)
        //     } else {
        //         redirect('/dashboard/memberships?redirectedBy=' + REDIRECT_BY_NO_HASH)
        //     }
        // }
        const error = await res.json()
        throw new Error(JSON.stringify(error))
    }

    return res.json()
}

async function putRequest(url:string, body?: object) {
    const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + url, {
        method: 'PUT',
        cache: 'no-store',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getToken()
        },
        body: JSON.stringify(body)
    })

    if (!res.ok) {
        // console.log('Hash status in PUT -> ', res.status)
        // console.log('Error -> ', await res.json())

        if (res.status === 401) {
            if (typeof window !== 'undefined') {
                window.location.replace('/prijava?session=' + SESSION_EXPIRED)
            } else {
                redirect('/prijava?session=' + SESSION_EXPIRED)
            }
        }
        // if (res.status === 498) {
        //     if (typeof window !== 'undefined') {
        //         window.location.replace('/dashboard/account-in-review?redirectedBy=' + REDIRECT_BY_IN_REVIEW_HASH)
        //     } else {
        //         redirect('/dashboard/account-in-review?redirectedBy=' + REDIRECT_BY_IN_REVIEW_HASH)
        //     }
        // }
        // if (res.status === 499) {
        //     if (typeof window !== 'undefined') {
        //         window.location.replace('/dashboard/memberships?redirectedBy=' + REDIRECT_BY_NO_HASH)
        //     } else {
        //         redirect('/dashboard/memberships?redirectedBy=' + REDIRECT_BY_NO_HASH)
        //     }
        // }
        const error = await res.json()
        throw new Error(JSON.stringify(error))
    }

    return res.json()
}

async function patchRequest(url:string, body: object) {
    const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + url, {
        method: 'PATCH',
        cache: 'no-store',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getToken()
        },
        body: JSON.stringify(body)
    })

    if (!res.ok) {
        // console.log('Hash status in PUT -> ', res.status)
        // console.log('Error -> ', await res.json())

        if (res.status === 401) {
            if (typeof window !== 'undefined') {
                window.location.replace('/prijava?session=' + SESSION_EXPIRED)
            } else {
                redirect('/prijava?session=' + SESSION_EXPIRED)
            }
        }
        // if (res.status === 498) {
        //     if (typeof window !== 'undefined') {
        //         window.location.replace('/dashboard/account-in-review?redirectedBy=' + REDIRECT_BY_IN_REVIEW_HASH)
        //     } else {
        //         redirect('/dashboard/account-in-review?redirectedBy=' + REDIRECT_BY_IN_REVIEW_HASH)
        //     }
        // }
        // if (res.status === 499) {
        //     if (typeof window !== 'undefined') {
        //         window.location.replace('/dashboard/memberships?redirectedBy=' + REDIRECT_BY_NO_HASH)
        //     } else {
        //         redirect('/dashboard/memberships?redirectedBy=' + REDIRECT_BY_NO_HASH)
        //     }
        // }
        const error = await res.json()
        throw new Error(JSON.stringify(error))
    }

    return res.json()
}

async function deleteRequest(url:string) {
    const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + url, {
        method: 'DELETE',
        cache: 'no-store',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getToken()
        }
    })

    if (!res.ok) {
        if (res.status === 401) {
            if (typeof window !== 'undefined') {
                window.location.replace('/prijava?session=' + SESSION_EXPIRED)
            } else {
                redirect('/prijava?session=' + SESSION_EXPIRED)
            }
        }
        // if (res.status === 498) {
        //     if (typeof window !== 'undefined') {
        //         window.location.replace('/dashboard/account-in-review?redirectedBy=' + REDIRECT_BY_IN_REVIEW_HASH)
        //     } else {
        //         redirect('/dashboard/account-in-review?redirectedBy=' + REDIRECT_BY_IN_REVIEW_HASH)
        //     }
        // }
        // if (res.status === 499) {
        //     if (typeof window !== 'undefined') {
        //         window.location.replace('/dashboard/memberships?redirectedBy=' + REDIRECT_BY_NO_HASH)
        //     } else {
        //         redirect('/dashboard/memberships?redirectedBy=' + REDIRECT_BY_NO_HASH)
        //     }
        // }
        const error = await res.json()
        throw new Error(JSON.stringify(error))
    }

    return res.json()
}
