import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import BenefitsCard from '../ui/benefits-card'

export default function Testament() {
    const benefitsCards = [
        {
            title: 'Shramba',
            content: 'Zaupnih in vrednejših stvari, ki jih ne želite imeti doma in bi jih blo treba dostaviti tistim, ki so na seznamu Vaših želja. Shramba se nudi v sefih, ki so vgrajeni v posebej varovanih in zaščitenih prostorih banke.',
            icon: <Icons.One/>
        },
        {
            title: 'Ohranjanje vrednosti premoženja',
            content: 'S pomočjo partnerskih zvez v švici in poznavanje kapitalskega trga, se trudimo konstantno ohranjati vrednost premoženja naših strank.',
            icon: <Icons.Two/>
        },
        {
            title: 'Shramba pomembnih gesel',
            content: 'Shramba pomembnih gesel, prav tako gesla crypto denarnic, ki jih lahko Vaši svojci prejemejo tudi na željen datum napisan v pogodbi. Gesla so strogo varovana in notarsko overjena.',
            icon: <Icons.Three/>
        },
        {
            title: 'Pravno-formalne obveznosti',
            content: 'Z Vašim pooblastilom urejamo vse pravno-formalne obveznosti, ki jih zaradi odsotnosti zdravja ne morete več urediti.',
            icon: <Icons.Four/>
        },
        {
            title: 'Testament',
            content: 'Pomagamo sestaviti oporoko in smo prisotni kot nevtralna priča pri zapuščinskem postopku.',
            icon: <Icons.Five/>
        },
        {
            title: 'Celostni pristop',
            content: 'Upoštevamo Vaše želje in diskretno realiziramo ter dostavimo Vašo nagrado človeku, ki Vam je bil blizu in ni plod zapuščinskega postopka.',
            icon: <Icons.Six/>
        }
    ]
    return (
        <section className="flex relative w-full min-h-screen">
            {/* Dark background */}
            <div className="absolute w-screen h-3/4 bg-primary-dark-gray -z-10 top-0 -left-4 lg:-left-44"></div>
            {/* Content */}
            <div className="flex flex-col w-full h-full py-8 lg:py-16 lg:gap-y-12">
                <div className="w-full flex flex-col lg:flex-row">
                    {/* Title */}
                    <div className="flex flex-col lg:w-2/3">
                        <h3 className='text-h5 lg:text-h2 text-primary-white'>S testament.si varno do</h3>
                        <h4 className='text-h5 lg:text-h3 text-primary-white'>oporoke in brez skrbi.</h4>
                    </div>
                    <div className="hidden lg:flex flex-col items-end justify-center">
                        <Button className='w-fit'>Kontaktirajte nas</Button>
                    </div>
                </div>
                {/* Subtitle */}
                <div className="flex flex-col lg:w-2/3 border-l-2 pl-6 lg:pl-16 max-w-xl gap-y-6 pt-6 lg:gap-0 lg:pt-0">
                    <p className='text-primary-light-gray'>Da bi se izognili nesporazumom, zapletom in nepotrebnim skrbem povezanim z zapuščino, je ključnega pomena pravočasna priprava in organizacija. TESTAMENT.SI je tu, da vam pomaga. </p>
                    <Button className='w-fit lg:hidden'>Kontaktirajte nas</Button>
                </div>
                {/* Cards */}
                <div className='lg:grid lg:grid-cols-3 flex overflow-scroll lg:overflow-hidden gap-6 snap-x snap-mandatory pt-12 -mx-4 lg:mx-0 px-6'>
                    {benefitsCards.map((card) =>
                        <div className='min-w-[300px] h-[500px] lg:h-[400px] snap-center' key={card.title}>
                            <BenefitsCard
                                title={card.title}
                                content={card.content}
                                icon={card.icon}
                            />
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
