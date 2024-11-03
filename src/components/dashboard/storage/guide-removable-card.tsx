'use client'

import { Card, CardHeader } from '@/components/ui/card'
import { Icons } from '@/components/ui/icons'
import { cn } from '@/lib/utils/style'
import { create } from 'zustand'

// State
interface GuideRemovableCardStoreProps {
    isOpen: boolean
    setIsOpen: (v: boolean) => void
}
export const useGuideRemovableCardState = create<GuideRemovableCardStoreProps>()((set) => ({
    isOpen: true,
    setIsOpen: (v) => set(() => ({ isOpen: v }))
}))

// Main
interface GuideRemovableCardProps {
    onClose?: () => void
    className?: string
}

export function GuideRemovableCard({ onClose, className }: GuideRemovableCardProps) {
    const isOpen = useGuideRemovableCardState(s => s.isOpen)
    const setIsOpen = useGuideRemovableCardState(s => s.setIsOpen)

    function handleClick() {
        setIsOpen(false)
        if (onClose) {
            onClose()
        }
    }

    if (!isOpen) {
        return null
    }

    return (
        <Card className={cn('bg-primary-light-gray/20', className)}>
            <CardHeader className='space-y-0 p-4 md:p-3 relative'>
                <Icons.Close
                    className='close w-6 h-6 absolute top-2 right-2 cursor-pointer hidden'
                    onClick={handleClick}
                />
                <div className='h-fit flex flex-col gap-4 p-4'>
                    <div className='flex flex-col gap-4'>
                        <span className='w-fit text-h6 font-baskerville'>
                            Dobrodošli v shrambi.
                        </span>
                        <p className='text-body-medium font-medium text-primary-medium-gray'>
                            Shramba je prostor, ki ga lahko uporablja Premium račun. V shrambi hranimo zaupne podatke in dokumente, ki jih je potrebno razkriti vašemu dediču po sestavljeni oporoki. V kolikor želite, da se vam dodajajo podatki v shrambo, nas kontaktirajte na <b>oporoke@testament.si</b>
                        </p>
                        <p className='text-body-medium font-medium text-primary-medium-gray'>
                            Na <b>Testament.si</b> skrbimo za varno in zanesljivo shrambo vaših dokumentov tako v digitalni kot v fizični obliki, ki so le vam v vpogled. Poleg tega v primeru vaše smrti s Testament.si pravno formalno obvestimo vaše dediče, katere ste tudi predhodno obvestili, da imate zaupne dokumente shranjene pri nas. V primeru, da tega niste storili, obvestimo vaše dediče, ko poteče Premium račun po enem letu. Naša ekipa bo poskrbela, da so vaše zadnje želje izpolnjene v skladu z navodili, s čimer olajšamo postopek za vaše dediče.
                        </p>
                        <p className='text-body-medium font-medium text-primary-medium-gray'>
                            Vsi podatki so skrbno shranjeni v skladu z zakonodajo Republike Slovenije.
                        </p>

                    </div>
                    {/* <Separator className='my-2 bg-primary-light-gray' />
                    <div className='flex flex-col gap-4'>
                        <div className='flex items-center gap-6'>
                            <span
                                className='text-gradient-gold text-h6 font-baskerville'
                            >1.{' '}</span>
                            <span className='text-body-small'>
                                <span className='font-semibold'>Dodajate Novo Vsebino:{' '}</span>
                                Enostavno in varno lahko dodajate nove oporoke ali druge pomembne dokumente, ki so del vaše zapuščine.
                            </span>
                        </div>
                        <div className='flex items-center gap-6'>
                            <span
                                className='text-gradient-gold text-h6 font-baskerville'
                            >2.{' '}</span>
                            <span className='text-body-small'>
                                <span className='font-semibold'>Urejate Obstječe Oporoke:{' '}</span>
                                Spreminjate in posodabljate lahko že obstoječe oporoke, kar vam daje prožnost in nadzor nad vašimi odločitvami in željami.
                            </span>
                        </div>
                        <div className='flex items-center gap-6'>
                            <span
                                className='text-gradient-gold text-h6 font-baskerville'
                            >3.{' '}</span>
                            <span className='text-body-small'>
                                <span className='font-semibold'>Zapirate Oporoke:{' '}</span>
                                Kadar koli imate možnost zaključiti ali preklicati vaše oporoke, s čimer zagotovite, da so vaše želje vedno ažurne in v skladu z vašo trenutno situacijo.
                            </span>
                        </div>
                    </div>
                    <Separator className='my-2 bg-primary-light-gray' />
                    <p className='text-primary-medium-gray/70 text-body-medium'>Na Testament.si smo posvečeni varnemu in zanesljivemu shranjevanju vaših oporok. Vaša digitalna shramba je zavarovana z najnovejšimi varnostnimi tehnologijami, kar zagotavlja, da so vaši dokumenti varno hranjeni in dostopni samo vam.</p>
                    <p className='text-primary-medium-gray/70 text-body-medium'>Poleg tega, v primeru vaše smrti, Testament.si profesionalno in pravno formalno uredi vse potrebno z vašimi dediči. Naša ekipa poskrbi, da so vaše zadnje želje izpolnjene v skladu z vašimi navodili, s čimer olajšamo postopek za vaše ljubljene v teh težkih časih.</p>
                    <p className='text-primary-medium-gray/70 text-body-medium'>&quot;Moja Shramba&quot; je torej več kot le digitalni prostor; je vaš osebni, varni kotiček, kjer lahko s popolnim mirnim srcem načrtujete in urejate svojo zapuščino.</p> */}
                </div>
            </CardHeader>
        </Card>
    )
}

// Trigger
export function GuideRemovableCardTrigger() {
    const setIsOpen = useGuideRemovableCardState(s => s.setIsOpen)

    function handleClick() {
        setIsOpen(true)
    }
    return (
        <button
            onClick={handleClick}
            className='w-fit flex items-center gap-2'
        >
            {/* <Icons.Info className='w-5 h-5' /> */}
            <span className='font-bold text-body-small'></span>
        </button>
    )
}
