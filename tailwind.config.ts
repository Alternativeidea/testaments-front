import type { Config } from 'tailwindcss'

import { fontFamily } from 'tailwindcss/defaultTheme'
import plugin from 'tailwindcss/plugin'

const config = {
    darkMode: ['class'],
    future: {
        hoverOnlyWhenSupported: true // 👈 enable hover only when supported
    },
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}'
    ],
    prefix: '',
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        fontFamily: {
            'dm-sans': ['var(--font-dm-sans)', ...fontFamily.sans],
            chapaza: ['var(--font-chapaza)', ...fontFamily.sans],
            baskerville: ['var(--font-baskerville)', ...fontFamily.sans]
        },
        fontSize: {
            h1: ['88px', { lineHeight: '1.3' }],
            h2: ['68px', { lineHeight: '1.3' }],
            h3: ['48px', { lineHeight: '1.3' }],
            h4: ['38px', { lineHeight: '1.3' }],
            h5: ['28px', { lineHeight: '1.25' }],
            h6: ['22px', { lineHeight: '31px' }],
            'body-big': ['20px', { lineHeight: '1.3' }],
            'body-big-2': ['18px', { lineHeight: '1.3' }],
            'body-medium': ['16px', { lineHeight: '1.3' }],
            'body-small': ['14px', { lineHeight: '1.2' }],
            'body-extra-small': ['12px', { lineHeight: '1.2' }]
            // h1: ['110px', { lineHeight: '137px' }],
            // h2: ['90px', { lineHeight: '112px' }],
            // h3: ['70px', { lineHeight: '87px' }],
            // h4: ['50px', { lineHeight: '62px' }],
            // h5: ['40px', { lineHeight: '50px' }],
            // h6: ['30px', { lineHeight: '37px' }],
            // 'body-big': ['24px', { lineHeight: '31px' }],
            // 'body-big-2': ['20px', { lineHeight: '26px' }],
            // 'body-medium': ['18px', { lineHeight: '26px' }],
            // 'body-small': ['16px', { lineHeight: '21px' }],
            // 'body-extra-small': ['14px', { lineHeight: '21px' }]
        },
        colors: {
            transparent: 'transparent',
            border: 'hsl(var(--border))',
            ring: 'hsl(var(--ring))',
            background: 'hsl(var(--background))',
            foreground: 'hsl(var(--foreground))',
            primary: {
                DEFAULT: 'hsl(var(--primary))',
                foreground: 'hsl(var(--primary-foreground))',
                'dark-gray': 'hsl(var(--primary-dark-gray))',
                'medium-gray': 'hsl(var(--primary-medium-gray))',
                'light-gray': 'hsl(var(--primary-light-gray))',
                white: 'hsl(var(--primary-white))'
            },
            muted: {
                DEFAULT: 'hsl(var(--muted))',
                foreground: 'hsl(var(--muted-foreground))'
            },
            accent: {
                DEFAULT: 'hsl(var(--accent))',
                foreground: 'hsl(var(--accent-foreground))',
                red: 'hsl(var(--accent-red))',
                yellow: 'hsl(var(--accent-yellow))',
                green: 'hsl(var(--accent-green))'
            },
            popover: {
                DEFAULT: 'hsl(var(--popover))',
                foreground: 'hsl(var(--popover-foreground))'
            }
        },
        boxShadow: {
            'dashboard-header': '0px 12px 40px -12px #0000000F',
            'sheet-section': '0px 0px 40px 0px #00000014',
            button: '0px 2px 4px 0px #0000001A',
            box: '0px 0px 40px 0px #00000014'
        },
        extend: {
            backgroundImage: {
                'gradient-hero': 'linear-gradient(270deg, #101112, rgba(16, 17, 18, 0.638345) 30.74%, transparent 50%), linear-gradient(0deg, #101112, transparent 34.68%), linear-gradient(90deg, #101112, rgba(16, 17, 18, 0.796225) 27.46%, transparent 50%), linear-gradient(180deg, #101112, transparent 37.5%)',
                'gradient-gold': 'linear-gradient(101deg, #733B0A 0%, #BF8034 32.81%, #D99E32 66.15%, #F2C744 100%)',
                'gold-card': 'linear-gradient(101.33deg, #442001 0%, #91540B 32.81%, #AC740C 66.15%, #F2C744 100%)',
                'sidebar-link-active': 'linear-gradient(101deg, #423B24D9 0%, #191B1D 100%)'
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' }
                },
                'open-menu': {
                    from: {
                        transform: 'translateY(0%)',
                        opacity: '1'
                    },
                    90: {
                        opacity: '0'
                    },
                    to: {
                        transform: 'translateY(-30%)',
                        opacity: '0'
                    }
                },
                'close-menu': {
                    from: {
                        transform: 'translateY(-30%)',
                        opacity: '0'
                    },
                    90: {
                        opacity: '0'
                    },
                    to: {
                        transform: 'translateY(0%)',
                        opacity: '1'
                    }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'open-menu': 'open-menu 0.3s ease-out forwards',
                'close-menu': 'close-menu 0.3s ease-out forwards'
            }
        }
    },
    plugins: [
        require('tailwindcss-animate'),
        require('@tailwindcss/container-queries'),
        plugin(({ addUtilities, theme }) => {
            addUtilities({
                '.no-scrollbar': {
                    '&::-webkit-scrollbar': {
                        display: 'none'
                    },
                    '-ms-overflow-style': 'none',
                    'scrollbar-width': 'none'
                },
                '.text-gradient-gold': {
                    'background-image': theme('backgroundImage.gradient-gold'),
                    'background-clip': 'text',
                    color: theme('colors.transparent')
                },
                '.ni-no-controls': {
                    '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                        '-webkit-appearance': 'none',
                        margin: '0'
                    },
                    '-moz-appearance': 'textfield'
                }
                // '.h5': {
                //     'font-family': theme('fontFamily.chapaza'),
                //     'font-size': theme('fontSize.h5')
                // },
            })
        })
    ]
} satisfies Config

export default config
