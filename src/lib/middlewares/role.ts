import { NextFetchEvent, NextMiddleware, NextResponse, type NextRequest } from 'next/server'
import { ADMIN_ROLE_ID, GOLD_ADMIN_ROLE_ID, USER_ROLE_ID } from '../constants/roles'

export function roleMiddleware(middleware: NextMiddleware) {
    return async (request: NextRequest, event: NextFetchEvent) => {
        const cookies = request.cookies
        const user = cookies.get('user')?.value
        const { roleId } = JSON.parse(user ?? '{}')
        const { pathname } = request.nextUrl
        const isAdmin = roleId === ADMIN_ROLE_ID
        const isGoldAdmin = roleId === GOLD_ADMIN_ROLE_ID
        const isUser = roleId === USER_ROLE_ID
        console.log('Role MIDDLEWARE -- ', pathname)

        /* ---------------------------------------------------------------------------------------------
         * Admins redirects logic
         * ------------------------------------------------------------------------------------------- */
        if (isAdmin && !pathname.startsWith('/namizje/admin')) {
            return NextResponse.redirect(new URL('/namizje/admin/gold/users', request.url))
        }

        if (isGoldAdmin && !pathname.startsWith('/namizje/admin/gold')) {
            return NextResponse.redirect(new URL('/namizje/admin/gold/users', request.url))
        }

        if (isAdmin || isGoldAdmin) {
            return NextResponse.next()
        }

        /* ---------------------------------------------------------------------------------------------
         * User redirects logic
         * ------------------------------------------------------------------------------------------- */
        if (isUser && pathname.startsWith('/namizje/admin')) {
            return NextResponse.redirect(new URL('/namizje/domov', request.url))
        }

        return middleware(request, event)
    }
}
