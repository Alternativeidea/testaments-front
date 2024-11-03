import { NextFetchEvent, NextMiddleware, NextResponse, type NextRequest } from 'next/server'

export function ambassadorMiddleware(middleware: NextMiddleware) {
    return async (request: NextRequest, event: NextFetchEvent) => {
        const cookies = request.cookies
        const user = cookies.get('user')?.value
        const { isAmbassador, agreeAmbassador } = JSON.parse(user ?? '{}')
        const { pathname } = request.nextUrl
        console.log('Ambassador MIDDLEWARE -- ', pathname)

        /* ---------------------------------------------------------------------------------------------
         * User redirects logic
         * ------------------------------------------------------------------------------------------- */
        if (!isAmbassador && pathname.startsWith('/namizje/tst-svetovalec')) {
            return NextResponse.redirect(new URL('/namizje/domov', request.url))
        }

        if (isAmbassador && agreeAmbassador === null && pathname === '/namizje/tst-svetovalec') {
            return NextResponse.redirect(new URL('/namizje/tst-svetovalec/become', request.url))
        }

        return middleware(request, event)
    }
}
