'use client'

import { sendVerificationCode } from '@/lib/services/auth'
import { cn } from '@/lib/utils/style'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { Icons } from '../ui/icons'

interface SendVerificationCodeButtonProps {
    className?: string
}

export default function SendVerificationCodeButton({ className }: SendVerificationCodeButtonProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [isDisabledResend, setIsDisabledResend] = useState(true)
    const [counter, setCounter] = useState(60)

    async function handleClick() {
        try {
            setIsLoading(true)
            await sendVerificationCode({ type: 1 })
            setIsDisabledResend(true)
            setCounter(60)
        } catch (error) {
            if (error instanceof Error) {
                toast.error('Nekaj je šlo narobe.', {
                    description: JSON.stringify(error)
                })
            }
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000)
    }, [counter])

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsDisabledResend(false)
        }, 60000)

        return () => {
            clearTimeout(timeoutId)
        }
    }, [isDisabledResend])

    return (
        <Button
            disabled={isDisabledResend}
            onClick={handleClick}
            className={cn('w-full max-w-[504px] mb-4 truncate overflow-hidden px-2', className)}
        >
            <span className='flex w-full items-center gap-[10px] truncate'>
                {isLoading && (
                    <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                <span className='w-full leading-normal'>
                    Ponovno pošljite e-mail
                    { isDisabledResend ? `${counter >= 10 ? ' ' : ' 0'}${counter}s` : '' }
                </span>
            </span>
        </Button>
    )
}
