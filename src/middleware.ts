import { ambassadorMiddleware } from './lib/middlewares/ambassador'
import { authMiddleware } from './lib/middlewares/auth'
import { chain } from './lib/middlewares/chain'
import { membershipMiddleware } from './lib/middlewares/membership'
import { roleMiddleware } from './lib/middlewares/role'

export default chain([
    authMiddleware,
    roleMiddleware,
    membershipMiddleware,
    ambassadorMiddleware
])

export const config = {
    // Matcher ignoring `/_next/` and `/api/`
    matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)']
}
