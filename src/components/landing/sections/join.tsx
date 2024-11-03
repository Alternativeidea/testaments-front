import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export default function Join() {
    return (
        <section className="flex flex-col w-full min-h-fit py-24 items-center justify-center gap-y-16">
            <Separator className='bg-primary-medium-gray'/>
            <h4 className="font-baskerville text-h5 lg:text-h3 text-transparent bg-gradient-gold text-center bg-clip-text px-1">
                Ne dovolite, da vaša zapuščina postane breme za vaše ljubljene.
                S TESTAMENT.SI si lahko zagotovite, da bodo vaše želje spoštovane in da bodo vaši najdražji zaščiteni pred nepotrebnimi težavami. Začnite svojo pot do miru in organiziranosti še danes.
            </h4>
            <Button className="w-fit" variant='light'>Pridružite se nam</Button>
            <Separator className='bg-primary-medium-gray'/>
        </section>
    )
}
