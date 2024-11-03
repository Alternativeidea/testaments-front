import { Button } from '@/components/ui/button'
import { getWills } from '@/lib/services/wills'
import { BenefitBlock, BenefitBlockDescription, BenefitBlockFooter, BenefitBlockHeader, BenefitBlockItems, BenefitBlockTitle } from './benefit-block'

export default async function LatestWills() {
    const wills = await getWills()
    console.log(wills)

    return (
        <BenefitBlock>
            <BenefitBlockHeader>
                <BenefitBlockTitle>Ostala sredstva v shrambi</BenefitBlockTitle>
                <BenefitBlockDescription>Ob ustvaritvi vaše shrambe ste pridobili tudi digitalno oporoko, v katero lahko dodate vse, od nepremičnin do poslovnih modelov, motornih vozil ali česarkoli drugega. V primeru vaše nenadne smrti bomo obvestili dediča in poskrbeli za pravno-formalno ureditev oporoke ali zapuščine.</BenefitBlockDescription>
            </BenefitBlockHeader>
            <BenefitBlockFooter>
                <BenefitBlockItems>
                    {/* <BenefitBlockItem
                        icon={<Icons.Building />}
                        text='3 sobno stanovanje, Ljubljana'
                    />
                    <BenefitBlockItem
                        icon={<Icons.Car />}
                        text='Avtomobil, BMW M3, 2023'
                    />
                    <BenefitBlockItem
                        icon={<Icons.Boat />}
                        text='Yacht Super Sky, 2322GT, 2012'
                    />
                    <BenefitBlockItem
                        icon={<Icons.Briefcase />}
                        text='Podjetje Jasna d.o.o.'
                    /> */}
                </BenefitBlockItems>
                <Button>Izvedi več</Button>
            </BenefitBlockFooter>
        </BenefitBlock>
    )
}
