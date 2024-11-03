import { Icons } from '@/components/ui/icons'

/* ---------------------------------------------------------------------------------------------
 * Menu items
 * ------------------------------------------------------------------------------------------- */

export type MenuItems = 'nadzorna plošča' | 'shramba' | 'testamenti' | 'tržnica' |'novice' | 'dokumenti' | 'pomoč' | 'stranke' | 'obvestila' | 'globalni vnos' | 'podpora' | 'profil' | 'preverite' | 'TST Svetovalec'

export interface SubPathProps {
    name: string
    path: string
    isEnabledInFree: boolean
}

interface DashboardMenuItemProps {
    name: MenuItems
    path: string
    subpaths?: SubPathProps[]
    isAvailable: boolean
    isEnabledInFree?: boolean
    isEnabledForGoldAdmin?: boolean
    isShow: boolean
    icon: React.ReactNode
}

export const ADMIN_DASHBOARD_MENU_ITEMS: DashboardMenuItemProps[] = [
    {
        name: 'stranke',
        path: '/namizje/admin/gold/users',
        isShow: true,
        isAvailable: true,
        isEnabledInFree: true,
        isEnabledForGoldAdmin: true,
        icon: <Icons.Customers className='w-5 h-5' />
    },
    {
        name: 'obvestila',
        path: '/namizje/admin/gold/notifications',
        isShow: true,
        isAvailable: true,
        isEnabledInFree: true,
        isEnabledForGoldAdmin: true,
        icon: <Icons.Notifications className='w-5 h-5' />
    },
    {
        name: 'testamenti',
        path: '/namizje/admin/gold/testament',
        isShow: true,
        isAvailable: true,
        isEnabledInFree: true,
        isEnabledForGoldAdmin: true,
        icon: <Icons.Testament className='w-5 h-5' />
    },
    {
        name: 'tržnica',
        path: '/namizje/admin/trznica',
        isShow: true,
        isAvailable: true,
        isEnabledInFree: true,
        isEnabledForGoldAdmin: false,
        icon: <Icons.Bag className='w-5 h-5' />
    },
    {
        name: 'novice',
        path: '/namizje/admin/novice',
        isShow: true,
        isAvailable: true,
        isEnabledInFree: true,
        isEnabledForGoldAdmin: false,
        icon: <Icons.News className='w-5 h-5' />
    },
    {
        name: 'globalni vnos',
        path: '/namizje/admin/config',
        isShow: true,
        isAvailable: true,
        isEnabledInFree: true,
        isEnabledForGoldAdmin: false,
        icon: <Icons.Config className='w-5 h-5' />
    },
    {
        name: 'podpora',
        path: '/namizje/admin/faqs',
        isShow: false,
        isAvailable: false,
        isEnabledInFree: false,
        isEnabledForGoldAdmin: false,
        icon: <Icons.Help className='w-5 h-5 !text-primary-white border rounded-full' />
    },
    {
        name: 'TST Svetovalec',
        path: '/namizje/admin/tst-svetovalec',
        isEnabledInFree: true,
        isShow: true,
        isAvailable: true,
        icon: <Icons.Ambassador className='w-5 h-5' />
    }
]

export const USER_DASHBOARD_MENU_ITEMS: DashboardMenuItemProps[] = [
    {
        name: 'nadzorna plošča',
        path: '/namizje/domov',
        isEnabledInFree: true,
        isShow: true,
        isAvailable: true,
        icon: <Icons.Dashboard className='w-5 h-5' />
    },
    {
        name: 'testamenti',
        path: '/namizje/tst',
        isEnabledInFree: true,
        isShow: true,
        isAvailable: true,
        icon: <Icons.Testament className='w-5 h-5' />
    },
    {
        name: 'testamenti',
        path: '/namizje/tst/transactions',
        isEnabledInFree: true,
        isShow: false,
        isAvailable: true,
        icon: <Icons.Testament className='w-5 h-5' />
    },
    {
        name: 'shramba',
        path: '/namizje/storage',
        isEnabledInFree: false,
        isShow: true,
        isAvailable: true,
        icon: <Icons.Database className='w-5 h-5' />
    },
    {
        name: 'tržnica',
        path: '/namizje/trznica',
        subpaths: [
            {
                name: 'Glavna Stran Tržnice',
                path: '/namizje/trznica',
                isEnabledInFree: true
            },
            {
                name: 'Priljubljeno',
                path: '/namizje/trznica/priljubljeno',
                isEnabledInFree: false
            },
            {
                name: 'Oddano zanimanje',
                path: '/namizje/trznica/oddano-zanimanje',
                isEnabledInFree: false
            }
        ],
        isEnabledInFree: true,
        isShow: true,
        isAvailable: true,
        icon: <Icons.Bag className='w-5 h-5' />
    },
    {
        name: 'novice',
        path: '/namizje/novice',
        isEnabledInFree: true,
        isShow: true,
        isAvailable: true,
        icon: <Icons.News className='w-5 h-5' />
    },
    {
        name: 'dokumenti',
        path: '/namizje/dokumenti',
        isEnabledInFree: true,
        isShow: true,
        isAvailable: true,
        icon: <Icons.Doc className='w-5 h-5' />
    },
    {
        name: 'pomoč',
        path: '/namizje/pomoc',
        isEnabledInFree: true,
        isShow: true,
        isAvailable: true,
        icon: <Icons.Help className='w-5 h-5 !text-primary-white border rounded-full' />
    },
    {
        name: 'TST Svetovalec',
        path: '/namizje/tst-svetovalec',
        isEnabledInFree: true,
        isShow: true,
        isAvailable: true,
        icon: <Icons.Ambassador className='w-5 h-5' />
    },
    {
        name: 'profil',
        path: '/namizje/moj-profil',
        isEnabledInFree: true,
        isShow: false,
        isAvailable: true,
        icon: <Icons.Help className='w-5 h-5' />
    },
    {
        name: 'preverite',
        path: '/namizje/verification',
        isEnabledInFree: true,
        isShow: false,
        isAvailable: true,
        icon: <Icons.Help className='w-5 h-5' />
    }
]

/* ---------------------------------------------------------------------------------------------
 * Steps
 * ------------------------------------------------------------------------------------------- */

type StepNames = 'Začetek' | 'Osebni podatki' | 'Premium' | 'Potrditev'

type PageNames = 'Verificiraj se in pridobi vse napredne možnosti' |
                'Potrditev pogojev poslovanja in politike zasebnosti' |
                'Moji osebni podatki' |
                'Moje prebivališče' |
                'Premium'

interface AvailableStep {
    step: number
    pageName?: PageNames
}
interface DashboardVerificationStepsProps {
    name: StepNames
    availableSteps: AvailableStep[]
}

export const DASHBOARD_VERIFICATION_STEPS: DashboardVerificationStepsProps[] = [
    {
        name: 'Začetek',
        availableSteps: [
            {
                step: 0,
                pageName: 'Verificiraj se in pridobi vse napredne možnosti'
            },
            {
                step: 1,
                pageName: 'Potrditev pogojev poslovanja in politike zasebnosti'
            }
        ]
    },
    {
        name: 'Osebni podatki',
        availableSteps: [
            {
                step: 2,
                pageName: 'Moji osebni podatki'
            },
            {
                step: 3,
                pageName: 'Moje prebivališče'
            },
            {
                step: 4,
                pageName: 'Moji osebni podatki'
            }
        ]
    },
    {
        name: 'Premium',
        availableSteps: [
            {
                step: 5,
                pageName: 'Premium'
            },
            {
                step: 6,
                pageName: 'Premium'
            }
        ]
    },
    {
        name: 'Potrditev',
        availableSteps: [
            {
                step: 7
            }
        ]
    }
]
