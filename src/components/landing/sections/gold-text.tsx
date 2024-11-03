import { Separator } from '@/components/ui/separator'

interface GoldTextProps {
    content: string
}

export default function GoldText({ content } : GoldTextProps) {
    return (
        <section className="flex flex-col w-full min-h-fit py-6 lg:py-16 items-center justify-center gap-y-6 lg:gap-y-16 px-6 lg:px-44">
            <Separator className='bg-primary-medium-gray'/>
            <p className="text-h5 lg:text-h2 text-gradient-gold text-center lg:px-20">
                {content}
            </p>
            <Separator className='bg-primary-medium-gray'/>
        </section>
    )
}
