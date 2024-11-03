import { Libre_Baskerville as Baskerville, DM_Sans as DMSans } from 'next/font/google'
import localFont from 'next/font/local'

export const dmSans = DMSans({
    subsets: ['latin'],
    variable: '--font-dm-sans',
    weight: ['400', '500', '700']
})

export const baskerville = Baskerville({
    subsets: ['latin'],
    variable: '--font-baskerville',
    weight: ['400', '700']
})

export const chapaza = localFont({
    src: [
        {
            path: '../../../public/fonts/Chapaza.ttf'
        }
    ],
    display: 'swap',
    variable: '--font-chapaza'
})
