import { PageHeader, PageHeaderName } from '@/components/dashboard/layout/page-header'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

export default function BecomePage() {
    return (
        <>
            <PageHeader className='justify-center'>
                <PageHeaderName className='text-center'>Postanite del naše rastoče skupnosti in pomagajte širiti idejo o pomembnosti načrtovanja zapuščin za prihodnost!</PageHeaderName>
            </PageHeader>
            <section className='!max-w-[757px] my-auto'>

                <p>Dragi prijatelj,</p>

                <p>Ali si kdaj razmišljal o tem, kako lahko s svojo strastjo in zavzetostjo narediš resnično razliko v življenju drugih? Zdaj imaš priložnost, da postaneš del naše skupnosti, ki spreminja način, kako ljudje gledajo na načrtovanje svoje zapuščine.</p>

                <p>Prišli smo do točke, ko se odvija največji generacijski prenos premoženja, in ti lahko pomagaš ljudem sprejeti modre odločitve za njihovo prihodnost. Kot TST svetovalec pri Testament.si ne boš le ozaveščal drugih o pomenu načrtovanja zapuščine, ampak boš tudi sam gradil prihodnost – svojo in prihodnost tistih, ki jim boš svetoval.</p>

                <p></p>

                <p><b>Kako postati TST svetovalec?</b> Po registraciji v naš sistem, ki je preprosta in nezahtevna, nas kontaktiraj in izrazi svojo željo po sodelovanju. Stopili bomo s tabo v stik in se pogovorili o vsem – o naših in tudi o tvojih zahtevah in pričakovanjih. Po tem ti dodelimo unikatno priporočilno kodo, ki jo lahko deliš s prijatelji, družino in sledilci. Čaka te finančna nagrada za vsakega novega uporabnika, ki se registrira z uporabo tvoje kode in izkoristi katero koli našo storitev. A to ni vse – pridobil boš dragocene veščine in znanje, ki ti bodo koristile tako v poslu kot v vsakdanjem življenju.</p>

                <p><b>Zakaj torej čakati?</b> Pridruži se nam danes, pomagaj širiti našo misijo in bodi nagrajen za vsak korak na tej poti. Naša ekipa je tu, da te podpira na vsakem koraku.</p>

                <p>Naj naša strast postane tvoj uspeh!</p>

                {/* <p className='font-baskerville text-[25px] !mt-10'>Kako začeti?</p>
                <div className='flex gap-6'>
                    <span className='font-baskerville text-gradient-gold text-[28px] leading-tight'>1.</span>
                    <p><span className='font-medium'>Registrirajte se kot naš TST svetovalec:</span> Začnite z enostavno registracijo in se pridružite našemu uporabniškemu sistemu.</p>
                </div>
                <div className='flex gap-6'>
                    <span className='font-baskerville text-gradient-gold text-[28px] leading-tight'>2.</span>
                    <p><span className='font-medium'>Pridobite uporabniško kodo:</span> Ko se registrirate, prejmete svojo unikatno priporočilno kodo. To kodo lahko delite s svojimi prijatelji, družino in sledilci.</p>
                </div>
                <div className='flex gap-6'>
                    <span className='font-baskerville text-gradient-gold text-[28px] leading-tight'>3.</span>
                    <p><span className='font-medium'>Nagradili vas bomo:</span> Za vsakega novega uporabnika, ki se bo z vašo kodo registriral v naš uporabniški sistem boste primerno finančno nagrajeni od uporabe naših storitev.</p>
                </div>
                <div className='flex gap-6'>
                    <span className='font-baskerville text-gradient-gold text-[28px] leading-tight'>4.</span>
                    <p><span className='font-medium'>Spremljajte svoj uspeh:</span> V nadzorni plošči TST SVETOVALEC lahko spremljate svoj napredek, vidite, koliko uporabnikov imate in kakšne nagrade so vam bile dodeljene.</p>
                </div>

                <p className='font-baskerville text-[25px] !mt-10'>Zakaj postati TST svetovalec projekta Testament.si?</p>
                <ul className='list-disc pl-4'>
                    <li>Pomagate ljudem razumeti pomen projekta testament.si </li>
                    <li>Gradite pasiven dohodek skozi naš dvo-stopenjski sistem, ki je legalen in pravnoformalno urejen v skladu z zakonodajo.</li>
                    <li>Pridobite dragocene veščine, znanja in urejen posel s katerim boste koristni v družbi.</li>
                    <li>Naša ekipa vam bo vedno na voljo za pomoč in usmerjanje.</li>
                </ul> */}
            </section>
            <div className='w-full flex justify-center p-4 bg-[#FEFEFE] mt-auto'>
                <Link href='/namizje/tst-svetovalec/become/kako-deluje' className={buttonVariants({ className: 'w-full max-w-[400px]' })}>Postani TST Svetovalec</Link>
            </div>
        </>
    )
}
