'use client'

import * as React from 'react'

import { AREA_CODES } from '@/lib/constants/area-codes'
import { cn } from '@/lib/utils/style'
import { Eye, EyeOff } from 'lucide-react'
import { Combobox } from './combobox'
import { Icons } from './icons'
import { Separator } from './separator'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ({ className, type, ...props }, ref) => {
        const [isShow, setIsShow] = React.useState(false)
        return (
            <div className='relative'>
                <input
                    type={isShow ? 'text' : 'password'}
                    className={cn(
                        'flex h-[45px] w-full rounded-none border border-primary-medium-gray bg-primary-white text-body-big-2 font-medium px-3 py-2 ring-offset-primary-white placeholder:text-primary-medium-gray/50 focus-visible:placeholder:text-primary-medium-gray focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                <button
                    type='button'
                    onClick={() => setIsShow(!isShow)}
                    className='absolute top-1/2 -translate-y-1/2 right-4'
                >
                    {
                        isShow
                            ? <Eye />
                            : <EyeOff />
                    }
                </button>
            </div>
        )
    }
)
PasswordInput.displayName = 'PasswordInput'

const TelInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        const [value, setValue] = React.useState('+000')
        return (
            <div className='w-full relative'>
                <Combobox
                    data={AREA_CODES}
                    fieldValue={value}
                    keyExtractor='number'
                    showKey='number'
                    uniqueKey='number'
                    onSelect={(v) => setValue(v)}
                    placeholder='Select your area code'
                    noFoundPlaceholder='No area code found'
                    className='w-24 h-[43px] absolute top-1/2 -translate-y-1/2 left-px border-none font-medium text-body-big-2'
                />
                <Separator orientation='vertical' className='h-[70%] absolute top-1/2 -translate-y-1/2 left-[99px]' />
                <input
                    type={type}
                    className={cn(
                        'flex h-[45px] w-full rounded-none border border-primary-medium-gray bg-primary-white text-body-big-2 font-medium !pl-28 pr-3 py-2 ring-offset-primary-white placeholder:font-normal placeholder:text-primary-medium-gray/50 focus-visible:placeholder:text-primary-medium-gray focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                        className
                    )}
                    ref={ref}
                    {...props}
                />
            </div>
        )
    }
)
TelInput.displayName = 'TelInput'

const SearchInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <div className='w-full relative'>
                <Icons.Search className='absolute top-1/2 -translate-y-1/2 left-4' />
                <input
                    type={type}
                    className={cn(
                        'flex h-[45px] w-full rounded-none border border-primary-medium-gray bg-primary-white text-body-big-2 font-medium pl-14 pr-3 py-2 ring-offset-primary-white placeholder:font-normal placeholder:text-primary-medium-gray/50 focus-visible:placeholder:text-primary-medium-gray focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                        className
                    )}
                    ref={ref}
                    {...props}
                />
            </div>
        )
    }
)
SearchInput.displayName = 'SearchInput'

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        if (type === 'password') {
            return <PasswordInput
                className={className}
                ref={ref}
                {...props}
            />
        }

        if (type === 'search') {
            return <SearchInput
                className={className}
                ref={ref}
                {...props}
            />
        }

        if (type === 'tel') {
            return <TelInput
                className={className}
                ref={ref}
                {...props}
            />
        }

        return (
            <input
                type={type}
                className={cn(
                    'flex h-[45px] w-full rounded-none border border-primary-medium-gray bg-primary-white text-body-big-2 font-medium px-4 py-3 ring-offset-primary-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:font-normal placeholder:text-primary-medium-gray/50 focus-visible:placeholder:text-primary-medium-gray focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Input.displayName = 'Input'

export { Input }
