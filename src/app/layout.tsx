import type { Metadata } from 'next'

import { Toaster } from '@/components/ui/sonner'
import { baskerville, chapaza, dmSans } from '@/lib/constants/fonts'
import { cn } from '@/lib/utils/style'
import './globals.css'

export const metadata: Metadata = {
    title: {
        template: '%s | Testament',
        default: 'Spletna Pisarna Testament'
    },
    description: 'Vaš zanesljiv partner pri hrambi zlata in oporok v digitalnem svetu zapuščin.',
    metadataBase: new URL('https://d3dnvv4anrgb1h.cloudfront.net'),
    icons: {
        icon: [
            { url: '/android-chrome-512x512.png' }
            // new URL('/android-chrome-512x512.png', 'https://project-domain.com')
        ],
        shortcut: ['/android-chrome-192x192.png'],
        apple: [
            { url: '/apple-touch-icon.png' },
            { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
        ],
        other: [
            {
                rel: 'manifest',
                url: '/site.webmanifest'
            }
        ]
    },
    openGraph: {
        title: 'Spletna pisarna Testament.si',
        description: 'Vaš zanesljiv partner pri hrambi zlata in oporok v digitalnem svetu zapuščin.',
        siteName: 'Testament',
        images: [
            {
                url: '/og.png',
                width: 800,
                height: 600
            },
            {
                url: '/og-alt.png',
                width: 1800,
                height: 1600,
                alt: 'My custom alt'
            }
        ],
        type: 'website'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Spletna Pisarna Testament',
        description: 'Vaš zanesljiv partner pri hrambi zlata in oporok v digitalnem svetu zapuščin.',
        images: ['/og.png']
    },
    formatDetection: { telephone: false }
}

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="sl-SI">
            <body
                className={cn(
                    'font-dm-sans antialiased',
                    dmSans.variable,
                    chapaza.variable,
                    baskerville.variable
                )}
            >
                {/* <CookiesProvider> */}
                <div vaul-drawer-wrapper="">
                    {children}
                </div>
                <Toaster />
                {/* </CookiesProvider> */}
            </body>
        </html>
    )
}
