'use client'
// React
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
// Components
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Icons } from '@/components/ui/icons'
import { Textarea } from '@/components/ui/text-area'
import { UsersInfoBlockItem } from './users-info-card'
// Utils
import { USER_STATUS } from '@/lib/constants/plan'
import { deleteUser, getUser, patchUser } from '@/lib/services/admin/users'
import { formatDate } from '@/lib/utils/date'
import { formatData } from '@/lib/utils/format'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { sl } from 'date-fns/locale'
import { toast } from 'sonner'
import * as z from 'zod'

export default function UserSuspendForm() {
    const router = useRouter()
    const params = useParams<{id: string}>()
    const [userData, setUserData] = useState<Partial<ProfileProps>>({})
    const [loading, setLoading] = useState<boolean>(true)
    const Schema = z.object({
        status: z.string().optional(),
        message: z.string({
            required_error: ''
        }).min(3, '')
    })
    const form = useForm<z.infer<typeof Schema>>({
        resolver: zodResolver(Schema)
    })

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            const data = await getUser(Number(params?.id))
            setUserData(data)
            setLoading(false)
        }
        fetchData()
    }, [params])

    async function handleDelete() {
        if (params) {
            await deleteUser(parseInt(params?.id))
        }
        try {
            toast.success('Urejeno!', {
                position: 'bottom-center'
            })
        } catch (error) {
            if (error instanceof Error) {
                const err = JSON.parse(error.message)
                toast.error('Nekaj je šlo narobe.', {
                    description: err.message
                })
            }
        }
        router.replace('/namizje/admin/gold/users')
    }

    async function handleSubmit(data: z.infer<typeof Schema>) {
        if (params && userData.status === -1) {
            const payload = {
                status: 1,
                ...data
            }
            console.log(payload)
            await patchUser(payload, parseInt(params?.id))
        } else if (params) {
            const payload = {
                status: -1,
                ...data
            }
            await patchUser(payload, parseInt(params?.id))
        }
        try {
            toast.success('Urejeno!', {
                position: 'bottom-center'
            })
        } catch (error) {
            if (error instanceof Error) {
                const err = JSON.parse(error.message)
                toast.error('Nekaj je šlo narobe.', {
                    description: err.message
                })
            }
        }
        location.reload()
    }

    const { id, status, membershipId, isVerified, createdAt, emailVerifiedAt, name, lastName, birthplace, birthdate, address, emso, tin, career, phone, email, memPurchasedAt } = userData

    return (
        <Card className='flex flex-col justify-between border-none h-full'>
            <CardHeader className='flex px-6 shadow-dashboard-header'>
                <CardTitle className='flex flex-col text-h6 pt-6 font-baskerville font-normal'>
                    {status === -1 ? 'Reaktiviraj ali izbriši' : 'Suspendiraj ali izbriši'}
                    <span className='text-body-medium'>{loading ? '' : name + ' ' + lastName}</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className='grid gap-2 pt-6'>
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
                        {createdAt ? format(createdAt, 'PPP', { locale: sl }) : '-'}
                    </UsersInfoBlockItem>
                    <UsersInfoBlockItem loading={loading} label='Datum verifikacije'>
                        { emailVerifiedAt ? format(emailVerifiedAt, 'PPP', { locale: sl }) : '-' }
                    </UsersInfoBlockItem>
                    <UsersInfoBlockItem loading={loading} label='Datum članstva'>
                        { memPurchasedAt ? format(memPurchasedAt, 'PPP', { locale: sl }) : '-' }
                    </UsersInfoBlockItem>
                    <h3 className='py-4 font-semibold'>Osnovne informacije uporabnika</h3>
                    <UsersInfoBlockItem loading={loading} label='Ime'>
                        {name || '-'}
                    </UsersInfoBlockItem>
                    <UsersInfoBlockItem loading={loading} label='Priimek'>
                        {lastName || '-'}
                    </UsersInfoBlockItem>
                    <UsersInfoBlockItem loading={loading} label='Država rojstva'>
                        {birthplace || '-'}
                    </UsersInfoBlockItem>
                    <UsersInfoBlockItem loading={loading} label='Datum rojstva'>
                        {birthdate ? formatDate(birthdate) : '-'}
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
                    <h3 className='py-4 font-semibold'>Kontaktne informacije uporabbnika</h3>
                    <UsersInfoBlockItem loading={loading} label='Telefonska številka'>
                        {phone || '-'}
                    </UsersInfoBlockItem>
                    <UsersInfoBlockItem loading={loading} label='E-pošta' separator={false}>
                        {email || '-'}
                    </UsersInfoBlockItem>
                </div>
            </CardContent>
            <CardFooter>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col w-full'>
                        <div className='flex flex-col gap-y-2 py-4'>
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {
                                                status !== USER_STATUS.SUSPENDED
                                                    ? 'Razlog suspendiranja ali Izbrisa'
                                                    : 'Razlog reaktivacije ali izbrisa'
                                            }
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                className='text-body-medium resize-none h-[100px]'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='flex gap-2'>
                            <Button
                                disabled={form.formState.isSubmitting}
                                className='w-full'>
                                {form.formState.isSubmitting && (
                                    <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                {status === -1 ? 'Reaktiviraj' : 'Suspendiraj'}
                            </Button>
                            <Button
                                onClick={handleDelete}
                                className='w-full'
                                type='button'
                                variant={'destructive'}>
                                Izbriši
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardFooter>
        </Card>
    )
}
