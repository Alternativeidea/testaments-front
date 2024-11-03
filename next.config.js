/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cloudflare-ipfs.com'
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com'
            },
            {
                protocol: 'https',
                hostname: 'testaments-dev-assets.s3.eu-central-1.amazonaws.com'
            }
        ]
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/prijava',
                permanent: true
            },
            {
                source: '/namizje',
                destination: '/namizje/domov',
                permanent: true
            },
            {
                source: '/namizje/admin',
                destination: '/namizje/admin/gold/users',
                permanent: true
            },
            {
                source: '/namizje/admin/gold',
                destination: '/namizje/admin/gold/users',
                permanent: true
            }
        ]
    }
}

module.exports = nextConfig
