'use client'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
// Components
import { AmbassadorUser } from '@/components/dashboard/admin/users/ambassador/ambassador-user'
import UserDocs from '@/components/dashboard/admin/users/docs/users-docs'
import UsersInfo from '@/components/dashboard/admin/users/info/users-info'
import UsersOporoke from '@/components/dashboard/admin/users/oporoke/users-oporoke'
import UsersTst from '@/components/dashboard/admin/users/tst/users-tst'
import { Button } from '@/components/ui/button'
import { getUser } from '@/lib/services/admin/users'
import TabComponent from '../ui/tab-component'

export default function UserDetailsTabs() {
    // Hooks
    const searchParams = useSearchParams()
    const { replace } = useRouter()
    const pathname = usePathname()
    // Params usage
    const params = useParams<{id: string, tab: string}>()
    const viewParam = searchParams ? searchParams.get('tab') : null
    // UserData
    const [user, setUser] = useState<UserAuthProps>()
    const [heirsView, setHeirsView] = useState<boolean>(false)

    const TABS = [
        {
            value: 'info',
            title: 'Info',
            content: <UsersInfo userId={Number(params?.id)}/>,
            disabled: false
        },
        {
            value: 'tst',
            title: 'TST',
            content: <UsersTst userId={Number(params?.id)}/>,
            disabled: false
        },
        {
            value: 'oporoke',
            title: 'Oporoke',
            content: <UsersOporoke userId={Number(params?.id)} view={viewParam ? viewParam.toString() : ''}/>,
            disabled: false
        },
        {
            value: 'dokumenti',
            title: 'Dokumenti',
            content: <UserDocs userId={params ? params.id : ''}/>,
            disabled: false
        },
        {
            value: 'svetovalec',
            title: 'Svetovalec',
            content: <AmbassadorUser userId={params ? Number(params.id) : 1}/>,
            disabled: !user?.isAmbassador
        }
    ]

    function handleTab(value : string) {
        setHeirsView(false)
        const params = new URLSearchParams()
        params.delete('tab')
        params.set('tab', value)
        replace(`${pathname}?${params.toString()}`)
    }

    function handleHeirs(value : string) {
        handleTab(value)
        setHeirsView(true)
    }

    useEffect(() => {
        async function fetchData() {
            const result = await getUser(Number(params?.id) || 0)
            setUser(result)
        }
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function TitleComponent() {
        return (
            <div className='flex flex-col items-center pb-6 md:flex-row md:justify-between'>
                <div className='flex items-end gap-4 py-6'>
                    <h3 className="font-baskerville text-h5 text-primary-dark-gray">Zdravo Admin!</h3>
                    {(viewParam === 'oporoke' || viewParam === 'heirs') &&
                        <Button
                            variant={heirsView ? 'default' : 'light'}
                            onClick={() => handleHeirs('heirs')}
                            className='h-full'
                        >
                            Dediči
                        </Button>
                    }
                </div>
            </div>)
    }

    return (
        <>
            <TabComponent
                titleComponent={<TitleComponent/>}
                defaultValue='info'
                customHandle={handleTab}
                tabs={TABS}
            />
        </>
    )
}
