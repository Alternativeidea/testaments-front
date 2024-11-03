'use client'

import { Combobox } from '@/components/ui/combobox'
import { getCountries } from '@/lib/services/countries'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface CountriesComboboxProps {
    value: string
    onChange: (v: string) => void
    modal?: boolean
}

export function CountriesCombobox({ value, onChange, modal }: CountriesComboboxProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [areaCodes, setAreaCodes] = useState<CountryProps[]>([])
    useEffect(() => {
        async function loadAreaCodes() {
            try {
                setIsLoading(true)
                const res = await getCountries()
                setAreaCodes(res)
            } catch (error) {
                if (error instanceof Error) {
                    toast.error('Uh oh! Something went wrong.', {
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
            keyExtractor='id'
            showKey='nicename'
            uniqueKey='id'
            onSelect={onChange}
            placeholder='Izberi državo'
            noFoundPlaceholder='No country found'
            className='w-full h-[45px] text-body-big-2 text-primary-medium-gray'
            modal={modal}
        />
    )
}
