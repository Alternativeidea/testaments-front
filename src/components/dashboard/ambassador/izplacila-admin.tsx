'use client'
// React
import { useEffect, useState } from 'react'
// Components
import { DataTableMinimal } from '@/components/ui/data-table-minimal'
import { getWithdrawsByUser } from '@/lib/services/ambassadors'
import { IzplacilaColumns } from './izplacila-columns'

export default function IzplacilaAdmin({ userId }: {userId: number}) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const data = await getWithdrawsByUser(userId, '?orderBy=-updatedAt')
            setData(data)
            setIsLoading(false)
        }
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="flex flex-col w-full h-full justify-start">
            <div className='flex flex-col gap-y-2 pt-2'>
                <DataTableMinimal
                    data={data}
                    loading={isLoading}
                    columns={IzplacilaColumns}
                    empty='izplačila'
                ></DataTableMinimal>
            </div>
        </div>
    )
}
