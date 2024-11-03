'use client'

import { useEffect, useState } from 'react'

type CookieOptions = {
  path?: string
  expires?: number | Date
  domain?: string
  secure?: boolean
  sameSite?: 'strict' | 'lax' | 'none'
}

export function useCookies() {
    const [cookies, setCookies] = useState<{ [key: string]: string }>({})

    useEffect(() => {
        const getAllCookies = () => {
            const cookieObj: { [key: string]: string } = {}
            document.cookie.split(';').forEach((cookie) => {
                const [key, value] = cookie.split('=').map((c) => c.trim())
                cookieObj[key] = decodeURIComponent(value)
            })
            setCookies(cookieObj)
        }

        getAllCookies()
    }, [])

    const getCookie = (name: string): string | undefined => {
        return cookies[name]
    }

    const hasCookie = (name: string): boolean => {
        return Object.prototype.hasOwnProperty.call(cookies, name)
    }

    const setCookie = (
        name: string,
        value: string,
        options?: CookieOptions
    ): void => {
        let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`

        if (options) {
            const { path, expires, domain, secure, sameSite } = options
            if (expires) {
                let expiryDate: string
                if (typeof expires === 'number') {
                    const date = new Date()
                    date.setTime(date.getTime() + expires * 24 * 60 * 60 * 1000)
                    expiryDate = date.toUTCString()
                } else {
                    expiryDate = expires.toUTCString()
                }
                cookieString += `;expires=${expiryDate}`
            }
            if (path) cookieString += `;path=${path}`
            if (domain) cookieString += `;domain=${domain}`
            if (secure) cookieString += ';secure'
            if (sameSite) cookieString += `;SameSite=${sameSite}`
        }

        document.cookie = cookieString
        setCookies({ ...cookies, [name]: value })
    }

    const deleteCookie = (name: string): void => {
        document.cookie = `${encodeURIComponent(name)}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
        const updatedCookies = { ...cookies }
        delete updatedCookies[name]
        setCookies(updatedCookies)
    }

    return {
        get: getCookie,
        has: hasCookie,
        set: setCookie,
        delete: deleteCookie
    }
}
