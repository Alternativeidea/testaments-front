export function getClientCookie(cookieName: string): string | undefined {
    const cookies = document.cookie.split(';') // Split the cookies into an array

    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=')

        if (name === cookieName) {
            return decodeURIComponent(value) // Decode the cookie value
        }
    }

    return undefined // Return undefined if the cookie doesn't exist
}
