import { NextFetchEvent, NextMiddleware, NextResponse, type NextRequest } from 'next/server'
import { USER_DASHBOARD_MENU_ITEMS } from '../constants/dashboard'
import { PLAN_FREE } from '../constants/plan'

export function membershipMiddleware(middleware: NextMiddleware) {
    return async (request: NextRequest, event: NextFetchEvent) => {
        const cookies = request.cookies
        const user = cookies.get('user')?.value
        const { membershipId } = JSON.parse(user || '{}')
        const { pathname } = request.nextUrl
        const isCurrentPathEnabledInFree = USER_DASHBOARD_MENU_ITEMS.find(({ path }) => pathname === path)?.isEnabledInFree
        console.log('Membership MIDDLEWARE -- ', pathname)

        if (membershipId === PLAN_FREE && !isCurrentPathEnabledInFree) {
            return NextResponse.redirect(new URL('/namizje/domov', request.url))
        }

        // if (membershipId === PLAN_PREMIUM && pathname.startsWith('/namizje/verifikacija')) {
        //     return NextResponse.redirect(new URL('/namizje/domov', request.url))
        // }

        return middleware(request, event)
    }
}
