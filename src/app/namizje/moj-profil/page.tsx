import LogoutButton from '@/components/dashboard/profile/logout-button'
import ProfileForm from '@/components/dashboard/profile/profile-form'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Icons } from '@/components/ui/icons'
import { Separator } from '@/components/ui/separator'
import { MEMBERSHIP_BENEFITS } from '@/lib/constants/membership'
import { PLAN_FREE, PLAN_PREMIUM } from '@/lib/constants/plan'
// import { getHeirs } from '@/lib/services/heirs'
import { cn } from '@/lib/utils/style'
import { format } from 'date-fns'
import { sl } from 'date-fns/locale'
import { Metadata } from 'next'
import { cookies as cookieStore } from 'next/headers'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Profil'
}

export default async function ProfilePage() {
    const cookies = cookieStore()
    const user = cookies.get('user')?.value
    const { membershipId, address, areaCode, phone, career, nextRenewal } = JSON.parse(user || '{}')
    // const heirs = await getHeirs()

    return (
        <>
            <div className='grid md:grid-cols-2 gap-4'>
                <Card className='order-last md:order-first bg-[#D9D9D933] border-none'>
                    <div className='flex flex-col xl:flex-row justify-between'>
                        <CardHeader>
                            <span
                                className={cn(
                                    'font-baskerville !text-h4 text-primary-dark-gray capitalize',
                                    membershipId === PLAN_PREMIUM && 'text-gradient-gold'
                                )}
                            >
                                {membershipId === PLAN_FREE && 'Free'}
                                {membershipId === PLAN_PREMIUM && 'Premium'}
                            </span>
                            <span className='text-body-medium'>
                                {membershipId === PLAN_FREE
                                    ? 'Osnovna funkcionalnost'
                                    : 'Premium funkcionalnost'
                                }
                            </span>
                            <Separator className='bg-primary-light-gray !mt-6 !mb-9' />
                            {membershipId === PLAN_FREE && MEMBERSHIP_BENEFITS.map(({ name, isAvailableInFree }) => (
                                <div key={name} className='flex items-center gap-4'>
                                    <Icons.CheckCircle
                                        className={cn(
                                            'w-5 h-5 min-w-fit text-primary-dark-gray',
                                            !isAvailableInFree && 'text-primary-light-gray'
                                        )}
                                    />
                                    <span className='text-body-medium'>{name}</span>
                                </div>
                            ))}
                            {membershipId === PLAN_PREMIUM && MEMBERSHIP_BENEFITS.map(({ name }) => (
                                <div key={name} className='flex items-center gap-4'>
                                    <Icons.CheckCircleGold className='w-5 h-5 min-w-fit' />
                                    <span className='text-body-medium'>{name}</span>
                                </div>
                            ))}
                        </CardHeader>
                        <CardHeader className='space-y-4'>
                            <div
                                className={cn(
                                    'flex justify-between items-center bg-primary-white shadow-sheet-section px-4 py-1.5',
                                    'lg:flex-col lg:justify-center lg:px-11 lg:py-5'
                                )}
                            >
                                <span className='font-baskerville text-h4 capitalize'>
                                    {membershipId === PLAN_FREE ? '0' : '75,00'} <span className='text-body-big-2'>EUR</span>
                                </span>
                                <span className='text-body-extra-small text-center'>
                                    {membershipId === PLAN_FREE
                                        ? 'Brezplačna naročnina'
                                        : 'Enoletna naročnina'
                                    }
                                </span>
                            </div>
                            {membershipId === PLAN_FREE && (
                                <Link
                                    href='/namizje/verification'
                                    className={cn(buttonVariants())}
                                >
                                    Postani Premium
                                </Link>
                            )}
                        </CardHeader>
                    </div>
                </Card>
                <Card className='md:bg-[#D9D9D933] border-none'>
                    <CardHeader>
                        <span className='font-baskerville text-body-big text-primary-dark-gray capitalize'>Moji podatki</span>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                        <ProfileForm
                            address={address}
                            areaCode={areaCode}
                            phone={phone}
                            career={career}
                        />
                    </CardContent>
                </Card>
            </div>
            <div className='grid md:grid-cols-2 gap-4'>
                <div className="py-4">
                    { membershipId === PLAN_PREMIUM && 'Premium naročnina poteče: ' }
                    { membershipId === PLAN_PREMIUM &&
                        <b>
                            { nextRenewal
                                ? format(nextRenewal, 'PPP', {
                                    locale: sl
                                })
                                : '-'
                            }
                        </b>
                    }
                </div>
            </div>
            {/* <div>
                <span className='font-baskerville text-body-big'>Moji dediči</span>
            </div>
            <div className='flex flex-wrap flex-col w-full md:flex-row gap-2 md:gap-4'>
                {(heirs.length > 0)
                    ? heirs.map(({ relationship, name, address }: { relationship: string, name: string, address: string }, i: number) =>
                        <Card className='min-w-[280px] lg:w-[45%] bg-primary-light-gray/20 border-none' key={i}>
                            <CardHeader>
                                <div className='flex flex-col md:flex-row justify-between items-center'>
                                    <div className='flex flex-col items-start justify-start w-full'>
                                        <span className='text-body-small'>{relationship}</span>
                                        <span className='text-body-big-2 font-medium'>{name}</span>
                                        <span className='text-body-small'>{address}</span>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                    )
                    : <Card className='bg-primary-light-gray/20 border-none'>
                        <CardHeader className='w-full'>
                            <div className='flex flex-col md:flex-row justify-between items-center gap-8'>
                                <span className='text-h6 font-baskerville leading-none translate-y-1'>Nimate nobenega dediča</span>
                            </div>
                        </CardHeader>
                    </Card>
                }
            </div> */}
            {/* {membershipId === PLAN_PREMIUM && <NewHeirSheet heirs={heirs}/>} */}
            <div className='flex justify-end p-5'>
                <LogoutButton />
            </div>
        </>
    )
}
