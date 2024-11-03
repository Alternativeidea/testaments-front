'use client'

import { Check, ChevronDown } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem
} from '@/components/ui/command'
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover'
import { cn } from '@/lib/utils/style'
import { ScrollArea } from './scroll-area'

interface ComboboxProps<T> {
    data: T[]
    isLoading?: boolean
    keyExtractor: keyof T
    showKey: keyof T
    uniqueKey: keyof T
    placeholder?: string
    noFoundPlaceholder?: string
    fieldValue: string
    onSelect: (v: keyof T) => void
    className?: string
    modal?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Combobox<T extends Record<string, any>>({
    data,
    isLoading,
    keyExtractor,
    showKey,
    uniqueKey,
    placeholder = 'Select item...',
    noFoundPlaceholder = 'No item found.',
    fieldValue,
    onSelect,
    className,
    modal
}: ComboboxProps<T>) {
    const [open, setOpen] = React.useState(false)
    // const [value, setValue] = React.useState('')

    return (
        <Popover open={open} onOpenChange={setOpen} modal={modal}>
            <PopoverTrigger asChild>
                <Button
                    disabled={isLoading}
                    variant="light"
                    role="combobox"
                    tabIndex={0}
                    aria-expanded={open}
                    className={cn(
                        'w-[200px] justify-between font-dm-sans',
                        !fieldValue && 'text-muted-foreground',
                        className
                    )}
                >
                    {fieldValue
                        ? data.find((item) => item[keyExtractor].toString() === fieldValue)?.[showKey]
                        : placeholder}
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="min-w-full max-w-full p-0 z-[70]">
                <Command>
                    <CommandInput placeholder={placeholder} />
                    <CommandEmpty>{noFoundPlaceholder}</CommandEmpty>
                    <CommandGroup>
                        <ScrollArea className="h-[200px] w-full">
                            {data.map((item) => (
                                <CommandItem
                                    key={item[uniqueKey]}
                                    onSelect={() => {
                                    // setValue(currentValue === value ? '' : currentValue)
                                        onSelect(item[keyExtractor].toString())
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            'mr-2 h-4 w-4',
                                            fieldValue === item[keyExtractor].toString() ? 'opacity-100' : 'opacity-0'
                                        )}
                                    />
                                    {item[showKey]}
                                </CommandItem>
                            ))}
                        </ScrollArea>
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
