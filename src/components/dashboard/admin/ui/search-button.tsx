'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent, useState } from 'react'

export default function SearchButton() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [showInput, setShowInput] = useState<boolean>(false)

    const initialSearch = searchParams ? searchParams.get('search') : ''
    const [searchTerm, setSearchTerm] = useState<string>(initialSearch || '')

    const handleButtonClick = () => {
        setShowInput((prev) => !prev)
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setSearchTerm(value)

        if (searchParams) {
            const params = new URLSearchParams(searchParams.toString())
            params.set('search', value)
            router.push(`?${params.toString()}`)
        }
    }

    return (
        <div className="relative flex items-center">
            {/* Search Button */}
            <Button
                variant='light'
                className='bg-primary-light-gray border-none'
                onClick={handleButtonClick}
            >
                <Search />
            </Button>

            {/* Search Input */}
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${showInput ? 'w-full lg:w-[200px] opacity-100 ml-2' : 'w-0 opacity-0 ml-0'}`}
                style={{ maxWidth: showInput ? '280px' : '0px' }}
            >
                <Input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    className="w-full transition-all duration-300 ease-in-out transform"
                    placeholder="Search..."
                />
            </div>
        </div>
    )
}
