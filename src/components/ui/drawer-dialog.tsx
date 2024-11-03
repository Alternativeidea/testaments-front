'use client'

import * as React from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerTitle,
    DrawerTrigger
} from '@/components/ui/drawer'
import { useMediaQuery } from '@/lib/hooks/use-media-query'
import { ScrollArea } from './scroll-area'

interface DrawerDialogProps {
    trigger: React.ReactNode
    title?: React.ReactNode
    content: React.ReactNode
}

export function DrawerDialog({ trigger, title, content }: DrawerDialogProps) {
    const [open, setOpen] = React.useState(false)
    const isDesktop = useMediaQuery('(min-width: 768px)')

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    {trigger}
                </DialogTrigger>
                <DialogContent className="border-none px-12 py-10 max-w-[700px]">
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>{content}</DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                {trigger}
            </DrawerTrigger>
            <DrawerContent>
                <ScrollArea className='w-full flex flex-col p-4'>
                    <DrawerTitle>{title}</DrawerTitle>
                    <DrawerDescription>{content}</DrawerDescription>
                </ScrollArea>
            </DrawerContent>
        </Drawer>
    )
}
