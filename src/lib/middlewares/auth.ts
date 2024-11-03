import { NextFetchEvent, NextMiddleware, NextResponse, type NextRequest } from 'next/server'
import { SESSION_EXPIRED } from '../constants/session'

export function authMiddleware(middleware: NextMiddleware) {
    return async (request: NextRequest, event: NextFetchEvent) => {
        const cookies = request.cookies
        const hasToken = cookies.has('token')
        const hasUser = cookies.has('user')
        const { searchParams, pathname } = request.nextUrl

        console.log('Auth MIDDLEWARE -- ', pathname)

        if (pathname.startsWith('/change-email')) {
            console.log('Execute middleware change-email')
            if (!hasToken) {
                const response = NextResponse.redirect(new URL('/prijava', request.url))
                response.cookies.delete('token')
                response.cookies.delete('hashStatus')
                response.cookies.delete('user')
                return response
            }

            if (pathname === '/change-email/verification') {
                console.log('Execute middleware /change-email/verification')
                const email = searchParams.get('email')
                if (!email) {
                    return NextResponse.redirect(new URL('/prijava', request.url))
                }
            }
        }

        if (pathname.startsWith('/resetiraj-geslo')) {
            console.log('Execute middleware /resetiraj-geslo')
            if (pathname === '/resetiraj-geslo/new-password') {
                console.log('Execute middleware /resetiraj-geslo/new-password')
                const email = searchParams.get('email')
                if (!email) {
                    return NextResponse.redirect(new URL('/prijava', request.url))
                }
            }
        }

        if (pathname.startsWith('/prijava')) {
            console.log('Execute middleware Execute middleware')
            const response = NextResponse.next()
            response.cookies.delete('token')
            response.cookies.delete('hashStatus')
            response.cookies.delete('user')
            return response
        }

        if (pathname === '/registracija/verifikacija') {
            console.log('Execute middleware /registracija/verifikacija')
            const email = searchParams.get('email')
            if (!email) {
                return NextResponse.redirect(new URL('/registracija', request.url))
            }
        }

        if (pathname === '/registracija/osnovne-informacije') {
            console.log('Execute middleware /registracija/osnovne-informacije')
            const code = searchParams.get('code')
            if (!code) {
                return NextResponse.redirect(new URL('/prijava', request.url))
            }
        }

        if (pathname.startsWith('/namizje')) {
            console.log('Execute middleware /namizje')
            if (!hasUser) {
                const response = NextResponse.redirect(new URL('/prijava?session=' + SESSION_EXPIRED + '&redirectBy=AuthMiddleware', request.url))
                response.cookies.delete('token')
                response.cookies.delete('hashStatus')
                response.cookies.delete('user')
                return response
            }

            if (!hasToken) {
                const response = NextResponse.redirect(new URL('/prijava', request.url))
                response.cookies.delete('token')
                response.cookies.delete('hashStatus')
                response.cookies.delete('user')
                return response
            }
            return middleware(request, event)
        }

        return NextResponse.next()
    }
}
