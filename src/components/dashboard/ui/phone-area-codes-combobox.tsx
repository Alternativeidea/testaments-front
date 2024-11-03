'use client'

import { Combobox } from '@/components/ui/combobox'
import { getPhoneCodes } from '@/lib/services/countries'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface PhoneAreaCodesComboboxProps {
    value: string
    onChange: (v: string) => void
    modal?: boolean
}

interface areaCode {
    phonecode: number
}

export function PhoneAreaCodesCombobox({ value, onChange, modal }: PhoneAreaCodesComboboxProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [areaCodes, setAreaCodes] = useState<areaCode[]>([])
    useEffect(() => {
        async function loadAreaCodes() {
            try {
                setIsLoading(true)
                const res = await getPhoneCodes()
                setAreaCodes(res)
            } catch (error) {
                if (error instanceof Error) {
                    toast.error('Nekaj je šlo narobe.', {
                        description: JSON.parse(error.message).message
                    })
                }
            } finally {
                setIsLoading(false)
            }
        }
        loadAreaCodes()
    }, [])

    return (
        <Combobox
            isLoading={isLoading}
            data={areaCodes}
            fieldValue={value}
            keyExtractor='phonecode'
            showKey='phonecode'
            uniqueKey='phonecode'
            onSelect={onChange}
            placeholder='Select your area code'
            noFoundPlaceholder='No area code found'
            className='w-24 h-[43px] border-none font-medium text-body-big-2'
            modal={modal}
        />
    )
}
