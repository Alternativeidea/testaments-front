'use client'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList } from '@/components/ui/tabs'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
interface TabItemProps {
    title: string
    value: string
    content: React.ReactNode
    disabled?: boolean
}
interface TabProps {
    tabs: TabItemProps[]
    defaultValue: string
    title?: string
    children?: React.ReactNode
    titleComponent?: React.ReactNode
    customHandle?: (value: string) => void
    paramName?: string
    className?: string
    customSelectedTab?: string
}
export default function TabComponent({ tabs, title, defaultValue, children, titleComponent, customHandle, className, paramName = 'tab', customSelectedTab }: TabProps) {
    const [selectedTab, setSelectedTab] = useState(defaultValue)
    const searchParams = useSearchParams()
    const initialTab = searchParams ? searchParams.get(paramName) || defaultValue : defaultValue
    const router = useRouter()

    const handleTabChange = (value: string) => {
        // update the state
        setSelectedTab(value)
        // Verifyng custom handle
        if (customHandle) {
            customHandle(value)
        } else {
            // update the URL query parameter
            const params = new URLSearchParams()
            params.set(paramName, value)
            router.push(`?${params.toString()}`)
        }
    }

    useEffect(() => {
        async function fetchData() {
            setSelectedTab(initialTab)
        }
        fetchData()
    }, [])

    return (
        <Tabs
            value={customSelectedTab || selectedTab}
            onValueChange={handleTabChange}
            defaultValue={defaultValue} className='m-0 h-fit w-full p-0'>
            <div className='flex flex-col items-center md:flex-row md:justify-between'>
                {titleComponent || <div className='flex items-end gap-4'>
                    <h3 className="font-baskerville text-h6 text-primary-dark-gray">{title}</h3>
                </div>
                }
                <TabsList className='flex w-full justify-start !overflow-x-scroll no-scrollbar md:w-fit lg:justify-center lg:overflow-hidden'>
                    {tabs.map((item) =>
                        <Button
                            key={`tab-${item.value}`}
                            variant={(customSelectedTab || selectedTab) === item.value ? 'default' : 'light'}
                            disabled={item.disabled}
                            className={`flex mx-auto justify-center items-center gap-x-6 ${item.disabled && 'opacity-45'}`}
                            onClick={() => handleTabChange(item.value)}>
                            <p className=''>{item.title}</p>
                        </Button>
                    )}
                    {children}
                </TabsList>
            </div>
            {tabs.map((item) =>
                <TabsContent value={item.value} key={item.value} className={`flex p-0 w-full ${className}`}>
                    {item.content}
                </TabsContent>
            )}
        </Tabs>
    )
}
