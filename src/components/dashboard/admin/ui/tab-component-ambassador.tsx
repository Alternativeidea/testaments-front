'use client'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList } from '@/components/ui/tabs'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface TabItemProps {
    title: string
    value: string
    content: React.ReactNode
    disable?: boolean
}

interface TabProps {
    tabs: TabItemProps[]
    title?: string
    defaultValue: string
    children?: React.ReactNode
}

export default function TabComponentAmbassador({ tabs, defaultValue, children } : TabProps) {
    const [selectedTab, setSelectedTab] = useState(defaultValue)
    const searchParams = useSearchParams()
    const initialTab = searchParams ? searchParams.get('tab') || defaultValue : defaultValue
    const router = useRouter()

    const handleTabChange = (value: string) => {
        // update the state
        setSelectedTab(value)

        // update the URL query parameter
        const params = new URLSearchParams()
        params.set('tab', value)
        router.push(`?${params.toString()}`)
    }

    useEffect(() => {
        async function fetchData() {
            setSelectedTab(initialTab)
        }
        fetchData()
    }, [])

    return (
        <Tabs
            value={selectedTab}
            onValueChange={handleTabChange}
            defaultValue={defaultValue}
            className='w-full'>
            <TabsList
                className='justify-start px-0'>
                {tabs.map((item) =>
                    <Button
                        key={`tab-${item.value}`}
                        variant={ selectedTab === item.value ? 'default' : 'light' }
                        className={`w-full ${item.disable && 'opacity-35'}`}
                        disabled={item.disable}
                        onClick={ () => handleTabChange(item.value)}>
                        <p className=''>{item.title}</p>
                    </Button>
                )}
                {children}
            </TabsList>
            { tabs.map((item) =>
                <TabsContent
                    value={item.value}
                    key={item.value}
                    className='data-[state=active]:h-[calc(100%-53px)]'>
                    {item.content}
                </TabsContent>
            ) }
        </Tabs>
    )
}
