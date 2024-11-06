'use client'
// React
import { useEffect, useState } from 'react'
// Components
import UserSuspendForm from '@/components/dashboard/admin/users/user-suspend-form'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { UsersInfoBlockItem, UsersInfoCard, UsersInfoContent, UsersInfoTitle } from '../users-info-card'
import EditDate from './edit-date'
import EditUserInfo from './edit-user-info'
// Utils
import { Skeleton } from '@/components/ui/skeleton'
import { getUser } from '@/lib/services/admin/users'
import { getStatusLogs } from '@/lib/services/admin/users/logs'
import { getProfileTree } from '@/lib/services/auth'
import { formatDate } from '@/lib/utils/date'
import { formatData } from '@/lib/utils/format'
import { format } from 'date-fns'
import { sl } from 'date-fns/locale'
import Link from 'next/link'
import { AmbassadorSheet } from './ambassador-sheet'
import { PremiumSheet } from './premium-sheet'

interface ReferralProps {
    sums: {
        directs: number
        indirects: number
    }
    sponsor: string
    sponsorId: number
}

export default function UsersInfo({ userId }: { userId: number }) {
    const [userData, setUserData] = useState<Partial<ProfileProps>>({})
    const [loading, setLoading] = useState<boolean>(true)
    const [logs, setLogs] = useState<Partial<UserStatusLogs[]>>([])
    const [userTree, setUserTree] = useState<ReferralProps>()

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            const data = await getUser(userId)
            const statusLogs = await getStatusLogs(userId)
            const userTreeData = await getProfileTree(userId)
            console.log(data)
            setUserTree(userTreeData)
            setLogs(statusLogs)
            setUserData(data)
            setLoading(false)
        }
        fetchData()
    }, [userId])

    const { id, status, membershipId, isVerified, createdAt, emailVerifiedAt, city, name, lastName, birthdate, address, zipcode, emso, tin, career, phone, email, gender, areaCode, memPurchasedAt, country } = userData

    return (
        <div className='w-full flex flex-col justify-center items-center'>
            <div className='grid lg:grid-cols-2 gap-4 grid-flow-row w-full'>
                <div className='flex flex-col gap-4'>
                    <UsersInfoCard>
                        <UsersInfoTitle title='Osnovne informacije'/>
                        <UsersInfoContent>
                            <UsersInfoBlockItem loading={loading} label='ID uporabnika'>
                                {`#${id ? `${formatData(id)}` : ' - '}`}
                            </UsersInfoBlockItem>
                            <UsersInfoBlockItem loading={loading} label='Status uporabnika'>
                                {membershipId === 1 ? 'Free' : membershipId === 2 ? 'Premium' : '-'}
                            </UsersInfoBlockItem>
                            <UsersInfoBlockItem loading={loading} label='Strinjanje s pogoji poslovanja'>
                                <p className={`${isVerified ? 'text-gradient-gold' : ''}`}>{isVerified ? 'Yes' : 'No'}</p>
                            </UsersInfoBlockItem>
                            <UsersInfoBlockItem loading={loading} label='Datum vpisa'>
                                {createdAt ? format(createdAt, 'PP', { locale: sl }) : '-'}
                            </UsersInfoBlockItem>
                            <UsersInfoBlockItem loading={loading} label='Datum verifikacije'>
                                { emailVerifiedAt ? format(emailVerifiedAt, 'PP', { locale: sl }) : '-'}
                            </UsersInfoBlockItem>
                            <UsersInfoBlockItem loading={loading} label='Datum članstva'>
                                { memPurchasedAt ? format(memPurchasedAt, 'PP', { locale: sl }) : '-' }
                            </UsersInfoBlockItem>
                            <UsersInfoBlockItem loading={loading} label='Spol'>
                                { gender || '-'}
                            </UsersInfoBlockItem>
                            <UsersInfoBlockItem loading={loading} label='Status smrti' separator={false}>
                                {userId
                                    ? <Sheet>
                                        <SheetTrigger className='text-accent-yellow'>
                                            Uredi
                                        </SheetTrigger>
                                        <SheetContent className='w-full lg:!max-w-[420px] h-full p-0'>
                                            <EditDate id={userId}/>
                                        </SheetContent>
                                    </Sheet>
                                    : <p> - </p>}
                            </UsersInfoBlockItem>
                        </UsersInfoContent>
                    </UsersInfoCard>
                    <UsersInfoCard >
                        <UsersInfoTitle title='Splošne informacije' className='flex justify-between'>
                            {userId &&
                                <Sheet>
                                    <SheetTrigger className='text-body-medium text-accent-yellow font-dm-sans'>
                                        Uredi
                                    </SheetTrigger>
                                    <SheetContent className='w-full lg:!max-w-[420px] h-full p-0 overflow-y-scroll no-scrollbar'>
                                        {id && <EditUserInfo
                                            id={id}
                                        />}
                                    </SheetContent>
                                </Sheet>
                            }
                        </UsersInfoTitle>
                        <UsersInfoContent>
                            <UsersInfoBlockItem loading={loading} label='Ime'>
                                {name || '-'}
                            </UsersInfoBlockItem>
                            <UsersInfoBlockItem loading={loading} label='Priimek'>
                                {lastName || '-'}
                            </UsersInfoBlockItem>
                            <UsersInfoBlockItem loading={loading} label='Datum rojstva'>
                                {birthdate ? format(birthdate, 'PP', { locale: sl }) : '-'}
                            </UsersInfoBlockItem>
                            <UsersInfoBlockItem loading={loading} label='Država prebivališča'>
                                { country?.name || '-'}
                            </UsersInfoBlockItem>
                            <UsersInfoBlockItem loading={loading} label='Mesto bivališča'>
                                {city || '-'}
                            </UsersInfoBlockItem>
                            <UsersInfoBlockItem loading={loading} label='Poštna številka'>
                                {zipcode || '-'}
                            </UsersInfoBlockItem>
                            <UsersInfoBlockItem loading={loading} label='Stalni naslov'>
                                {address || '-'}
                            </UsersInfoBlockItem>
                            <UsersInfoBlockItem loading={loading} label='EMŠO'>
                                {emso || '-'}
                            </UsersInfoBlockItem>
                            <UsersInfoBlockItem loading={loading} label='Davčna številka'>
                                {tin || '-'}
                            </UsersInfoBlockItem>
                            <UsersInfoBlockItem loading={loading} label='Poklic' separator={false}>
                                {career || '-'}
                            </UsersInfoBlockItem>
                        </UsersInfoContent>
                    </UsersInfoCard>
                </div>
                <div className='flex flex-col gap-4'>
                    <UsersInfoCard>
                        <UsersInfoTitle title='Kontakt uporabnika'/>
                        <UsersInfoContent>
                            <UsersInfoBlockItem loading={loading} label='Telefonska številka'>
                                ({ areaCode }) {phone || '-'}
                            </UsersInfoBlockItem>
                            <UsersInfoBlockItem loading={loading} label='E-pošta' separator={false}>
                                {email || '-'}
                            </UsersInfoBlockItem>
                        </UsersInfoContent>
                    </UsersInfoCard>
                    {logs &&
                    <UsersInfoCard>
                        <UsersInfoTitle title='Razlog suspenza, reaktivacije ali izbrisa'/>
                        <UsersInfoContent>
                            {loading
                                ? <div className='flex w-full justify-between py-4'>
                                    <Skeleton className='my-auto w-[160px] h-6'/>
                                </div>
                                : logs.length >= 1
                                    ? logs.map((log) =>
                                        <UsersInfoBlockItem
                                            key={log?.id}
                                            label={log ? `${format(log?.createdAt, 'PP', { locale: sl })} ${getActionString(log.action)}` : '-'}
                                            separator={false}
                                            loading={loading}
                                        >
                                            <p className='max-w-[160px] lg:max-w-sm text-right'>
                                                {log?.message || '-'}
                                            </p>
                                        </UsersInfoBlockItem>
                                    )
                                    : <p>Ni podatkov o prekinitvi</p>
                            }
                        </UsersInfoContent>
                    </UsersInfoCard>
                    }
                    <UsersInfoCard>
                        <UsersInfoTitle title='Referral'/>
                        <UsersInfoContent>
                            <UsersInfoBlockItem loading={loading} label='Sponzor'>
                                <Link
                                    className='text-accent-yellow'
                                    href={`/namizje/admin/gold/users/${userTree?.sponsorId}`}
                                >
                                    {userTree?.sponsor === 'none' ? '-' : userTree?.sponsor}
                                </Link>
                            </UsersInfoBlockItem>
                            <UsersInfoBlockItem loading={loading} label='1. Nivo'>
                                {userTree?.sums.directs || '0'}
                            </UsersInfoBlockItem>
                            <UsersInfoBlockItem loading={loading} label='2. Nivo'>
                                {userTree?.sums.indirects || '0'}
                            </UsersInfoBlockItem>
                            <UsersInfoBlockItem loading={loading} label='Svetovalec'>
                                <div className='h-[50px]'>
                                    {
                                        membershipId === 2 ? <AmbassadorSheet userId={userId} /> : 'Uporabnik mora biti premium'
                                    }
                                </div>
                            </UsersInfoBlockItem>
                            <UsersInfoBlockItem loading={loading} label='Strinjanje s pogoji' separator={false}>
                                {userData.agreeAmbassador ? formatDate(userData.agreeAmbassador) : '-'}
                            </UsersInfoBlockItem>
                        </UsersInfoContent>
                    </UsersInfoCard>
                    <UsersInfoCard>
                        <UsersInfoTitle title='Status Premium'/>
                        <UsersInfoBlockItem loading={loading} label='Premium' separator={false}>
                            <div className='h-[50px]'>
                                {
                                    membershipId === 1 ? <PremiumSheet userId={userId} /> : 'Da'
                                }
                            </div>
                        </UsersInfoBlockItem>
                    </UsersInfoCard>
                </div>
            </div>
            <Sheet>
                <SheetTrigger asChild>
                    <Button className='flex mx-auto lg:px-12 my-12'>
                        {status === -1 ? 'Reaktiviraj ali izbriši' : 'Suspendiraj ali izbriši'}
                    </Button>
                </SheetTrigger>
                <SheetContent className='w-full lg:!max-w-[420px] h-full p-0 overflow-y-scroll no-scrollbar'>
                    <UserSuspendForm />
                </SheetContent>
            </Sheet>
        </div>
    )
}
// make a function that gets a string and returns a string comparing the nexts words:
// Suspend
// Reactivate
// Delete
// Pokojni
// Suspendiraj
// Reaktiviraj
// Izbriši
// Pokojni
function getActionString(input: string): string {
    let result
    switch (input.toLowerCase()) {
    case 'suspend':
        result = '(S)'
        break
    case 'reactivate':
        result = '(R)'
        break
    case 'delete':
        result = '(I)'
        break
    case 'deceased':
        result = '(Pok)'
        break
    case 'suspendiraj':
        result = '(S)'
        break
    case 'reaktiviraj':
        result = '(R)'
        break
    case 'izbriši':
        result = '(I)'
        break
    case 'pokojni':
        result = '(Pok)'
        break
    default:
        result = 'Unknown word'
    }

    return result
}
