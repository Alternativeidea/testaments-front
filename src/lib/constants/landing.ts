interface Link {
    name: string
    url: string
}

export const headerLinks: Link[] = [
    {
        name: 'Domov',
        url: '/'
    },
    {
        name: 'O nas',
        url: '/about'
    },
    {
        name: 'Naša pomoč',
        url: '/why-us'
    },
    {
        name: 'Zasebni arhiv',
        url: '/novice'
    }
]

export const footerLinks: Link[] = [
    {
        name: 'Testament.si © 2023',
        url: '#'
    },
    {
        name: 'Vse pravice pridržane',
        url: '#'
    },
    {
        name: 'Made by Alternative idea',
        url: '#'
    },
    {
        name: 'Politika zasebnosti',
        url: '#'
    },
    {
        name: 'Piškotki',
        url: '#'
    }
]

export const contactLinks: Link[] = [
    {
        name: 'Facebook',
        url: '#'
    },
    {
        name: 'Kontakt',
        url: '/contact'
    }
]
