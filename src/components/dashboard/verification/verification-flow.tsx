'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Icons } from '@/components/ui/icons'
import { Ilustrations } from '@/components/ui/ilustrations'
import { Input } from '@/components/ui/input'
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { invalidateCacheByPath } from '@/lib/actions/cache'
import { REASONS_WHY_TO_VERIFY, VERIFICATION_GUIDE_STEPS } from '@/lib/constants/verification'
import { useCookies } from '@/lib/hooks/use-cookies'
import { useFetch } from '@/lib/hooks/use-fetch'
import { AcceptVerificationFormSchema, VerificationAddressFormSchema, VerificationPersonalInfoFormSchema } from '@/lib/schemas/verification'
import { verifyUser } from '@/lib/services/auth'
import { getMemberships } from '@/lib/services/memberships'
import { getPaymentIntent } from '@/lib/services/payments'
import { getYearsToNow } from '@/lib/utils/date'
import { allowOnlyLetters } from '@/lib/utils/form'
import { cn } from '@/lib/utils/style'
import { zodResolver } from '@hookform/resolvers/zod'
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { add, addYears, differenceInCalendarYears, format } from 'date-fns'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { create } from 'zustand'
import PricingFreeCard from '../ui/pricing-free-card'
import PricingPremiumCard from '../ui/pricing-premium-card'
import { CountriesCombobox } from './countries-combobox'
let requireRefresh: boolean = false

/* ---------------------------------------------------------------------------------------------
 * State
 * ------------------------------------------------------------------------------------------- */

interface VerifiedUserProps {
    name: string
    lastName: string
    birthdate: string
    birthplace: number
    countryId: number,
    address: string
    city: string
    zipcode: string
    tin: string
    career: string
    emso: string
}

interface VerifiedUserStoreProps {
    currentStep: number
    setCurrentStep: (v: number) => void
    currentUser: VerifiedUserProps
    setCurrentUser: (v: VerifiedUserProps) => void
    membershipToPay: MembershipProps | null
    setMembershipToPay: (v: MembershipProps | null) => void
}

export const useVerificationState = create<VerifiedUserStoreProps>()((set) => ({
    currentStep: 0,
    setCurrentStep: (v) => set(() => ({ currentStep: v })),
    currentUser: {
        name: '',
        lastName: '',
        birthdate: '',
        birthplace: process.env.NEXT_PUBLIC_ENV === 'dev' ? 445 : 194,
        countryId: process.env.NEXT_PUBLIC_ENV === 'dev' ? 445 : 194,
        address: '',
        city: '',
        zipcode: '',
        tin: '',
        career: '',
        emso: ''
    },
    setCurrentUser: (v) => set(() => ({ currentUser: v })),
    membershipToPay: null,
    setMembershipToPay: (v) => set(() => ({ membershipToPay: v }))
}))

/* ---------------------------------------------------------------------------------------------
 * Main
 * ------------------------------------------------------------------------------------------- */

export function VerificationFlow() {
    const [isRedirected, setIsRedirected] = useState(false)
    const currentStep = useVerificationState(s => s.currentStep)
    const setCurrentStep = useVerificationState(s => s.setCurrentStep)
    const cookies = useCookies()

    useEffect(() => {
        const user = JSON.parse(cookies.get('user') ?? '{}')
        if (user.isVerified && !isRedirected) {
            setCurrentStep(5)
            setIsRedirected(true)
        }
    }, [cookies, isRedirected, setCurrentStep])

    return (
        <>
            <VerificationInfo className={cn(currentStep === 0 && 'flex')} />
            <VerificationStarter className={cn(currentStep === 1 && 'flex')} />
            <VerificationPersonalInfoForm className={cn(currentStep === 2 && 'flex')} />
            <VerificationAddressForm className={cn(currentStep === 3 && 'flex')} />
            {/* <VerificationProfesionalForm className={cn(currentStep === 4 && 'flex')} /> */}
            <VerificationPlanChoose className={cn(currentStep === 5 && 'flex')} />
            <VerificationCheckout className={cn(currentStep === 6 && 'flex')} />
            <VerificationSuccessMessage className={cn(currentStep === 7 && 'flex')} />
        </>
    )
}

/* ---------------------------------------------------------------------------------------------
 * Steps
 * ------------------------------------------------------------------------------------------- */

interface StepComponentProps {
    className?: string
}

/* ---------------------------------------------------------------------------------------------
 * Step 0
 * ------------------------------------------------------------------------------------------- */

function VerificationInfo({ className }: StepComponentProps) {
    const setCurrentStep = useVerificationState(s => s.setCurrentStep)
    return (
        <>
            <div className={cn('hidden flex-auto flex-col justify-center items-center p-6', className)}>
                <div className='max-w-[757px] space-y-6'>
                    <p>
                        <b>Kaj pridobim s premium naročnino?</b>
                    </p>
                    <p>
                        Premium uporabnikom je omogočen dostop do osebne digitalne shrambe, do uporabe E-tržnice zapuščin, odpre pa se jim tudi možnost priporočanja (in posledično zaslužkov).
                    </p>
                    <p>
                    Zaradi tega morajo člani s premium naročnino pred njeno aktivacijo skozi postopek verifikacije.
                    </p>
                    <p className='font-baskerville text-h6'>Postopek vključuje:</p>
                    <ul className='space-y-4'>
                        {
                            VERIFICATION_GUIDE_STEPS.map(({ name, description }, i) => (
                                <li key={name}>
                                    <div className='flex items-center gap-6'>
                                        <span
                                            className='font-baskerville text-h6 text-gradient-gold'
                                        >{i + 1}.{' '}</span>
                                        <span className='text-body-small'>
                                            <span className='font-medium'>{name}{' '}</span>
                                            {description}
                                        </span>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                    <p className='font-baskerville text-h6'>Zakaj je verifikacija pomembna?</p>
                    <ul className='space-y-4'>
                        {
                            REASONS_WHY_TO_VERIFY.map(({ name, description }) => (
                                <li key={name}>
                                    <div className='flex items-center gap-6'>
                                        <Icons.Dot className='h-2 w-2 flex-shrink-0 text-primary-dark-gray'/>
                                        <span className='text-body-small'>
                                            <span className='font-medium'>{name}:{' '}</span>
                                            {description}
                                        </span>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            <div className={cn('hidden w-screen p-4 bg-primary-light-gray/20', className)}>
                <div className='mx-auto flex w-full max-w-[757px] gap-2'>
                    <Button
                        onClick={() => setCurrentStep(1)}
                        className='w-full'
                    >
                    Začni
                    </Button>
                    <Link
                        href='/namizje/domov'
                        className={cn(
                            buttonVariants({ variant: 'light' }),
                            'w-full'
                        )}
                    >
                    Opravi kasneje
                    </Link>
                </div>
            </div>
        </>
    )
}

/* ---------------------------------------------------------------------------------------------
 * Step 1
 * ------------------------------------------------------------------------------------------- */

function VerificationStarter({ className }: StepComponentProps) {
    const setCurrentStep = useVerificationState(s => s.setCurrentStep)

    const form = useForm<z.infer<typeof AcceptVerificationFormSchema>>({
        resolver: zodResolver(AcceptVerificationFormSchema),
        defaultValues: {
            isCheckedTruthInfo: false,
            isCheckedTerms: false,
            isCheckedEmailSubscription: false
        }
    })

    function handleSubmit() {
        setCurrentStep(2)
    }

    return (
        <>
            <div className={cn('hidden flex-auto flex-col justify-center items-center p-6', className)}>
                <div className='max-w-[757px] space-y-6'>
                    {/* <p className='font-baskerville text-h6'>Lorem ipsum in here</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <p className='pt-7 font-baskerville text-h6'>Lorem ipsum</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <p className='pt-7 font-baskerville text-h6'>Lorem ipsum</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> */}
                    <p>
                        Spletno stran www.testament.si, www.smrt.si , vodi in predstavlja
                        podjetje ARHIVIRANJE IN SKLADIŠČENJE TESTAMENT d.o.o., Deteljica 8,
                        4290 Tržič, v sodelovanju na področju nakupa in prodaje zlata s
                        podjetjem TAD d.o.o. Dunajska cesta 101, 1000 Ljubljana. Vsi poslovni
                        partnerji, ki sodelujejo na projektu Testament.si, imajo s podjetjem
                        TESTAMENT d.o.o. podpisan kodeks o varovanju osebnih podatkov. Vsi
                        sodelujoči pa zagotavljajo, da s pridobljenimi podatki ravnajo v
                        skladu z GDPR, so zavezani k etičnosti, transparentnosti, varovanju
                        informacij, zasebnosti, poštenosti, pravičnosti, doslednosti,
                        integriteti in skladnosti poslovanja.
                    </p>
                    <p>
                        POLITIKA ZASEBNOSTI
                        1. Uvod
                        Ta politika zasebnosti velja za vsakega uporabnika spletnega mesta
                        www.testament.si in www.smrt.si za celotno spletno mesto ter za vse
                        njegove sestavne dele in podstrani in za vsako osebo, ki podjetju
                        posreduje svoje osebne podatke v kakršnikoli obliki. Namen naše
                        politike zasebnosti je, da uporabnike obvestimo o svoji politiki
                        zasebnosti ter o možnostih, ki jih imate na voljo pri načinu zbiranja
                        in uporabe podatkov na spletni strani www.testament.si in www.smrt.si
                        . Ta politika se lahko kadarkoli spremeni ali dopolni brez opozorila
                        ali obvestila.
                        Z uporabo spletnega mesta po spremembi te politike uporabnik potrjuje,
                        da se strinja z spremembami.
                    </p>
                    <p>
                        2. Osnovni pojmi
                        Upravljavec spletne strani www.testament.si in www.smrt.si TESTAMENT
                        d.o.o., Deteljuca 8, 4290 Tržič– (v nadaljevanju: upravljavec), se
                        zavezuje, da bo varoval zaupnost osebnih podatkov in zasebnost
                        udeležencev oz. uporabnikov spletne strani. Uporabnik spletnega mesta
                        www.testament.si in smrt.si je vsaka fizična in/ali pravna oseba, ki
                        uporablja oziroma obišče omenjeni spletni strani. Ta politika velja za
                        uporabnika, ko prvič obišče spletno mesto in pri vseh kasnejših
                        obiskih. Z aktivno privolitvijo in/ali z nadaljnjo uporabo spletnega
                        mesta www.testament.si in www.smrt.si uporabnik potrjuje, da sprejema
                        in se strinja z vsemi določbami te politike.
                        Osebni podatek je vsak podatek, ki se nanaša na določeno fizično osebo
                        in jo ta podatek tudi določa (ime in priimek, naslov, telefonska
                        številka, EMŠO ... ).
                        Digitalni zapis Testament s kratico TST je prav tako osebni podatek,
                        ki se nanaša na zalogo zlata posameznika (1TST = 1g zlata) Podjetje
                        Testament d.o.o. hrani zalogo zlata svojih strank v sefih bank v
                        Sloveniji.
                    </p>
                    <p>
                        3. Obdelava osebnih podatkov
                        Ob obisku naše spletne strani za namene iskanja informacij, lahko to
                        storite anonimno, razen če se prostovoljno odločite, da nam
                        posredujete osebne podatke. V tem primeru vas kot uporabniki spletne
                        strani www.testament.si in www.smrt.si preko e-maila ali vašega
                        telefona vprašamo po naslednjih podatkih, ki jih skrbno varujemo 60
                        dni. Vaše podatke skrbno varuje podjetje TESTAMENT d.o.o. , Deteljica
                        8, 4290 Tržič.
                        Kontaktni obrazec
                        e – naslov,
                        arhiv komunikacije
                        morebitne druge podatke, ki jih uporabnik sam posreduje družbi
                        Ponudnik obdeluje IP naslove naprav, preko katerih uporabniki
                        dostopajo do spletnega mesta. Ponudnik na spletnem portalu uporablja
                        »piškotke«, po katerih prepoznava uporabnike, vendar pa na ta način ni
                        mogoča identifikacija uporabnikov, kar pomeni, da zgolj na podlagi
                        tako zbranih podatkov ni mogoče ugotoviti imena in priimka in drugih
                        identifikacijskih podatkov uporabnika. Če nas ne obvestite drugače,
                        bomo vaše podatke zbrali le za namene odgovarjanja na vaša vprašanja
                        ali obravnavanje vaših komentarjev in za omogočanje podjetja TESTAMENT
                        d.o.o., da stopi v kontakt z vami glede predstavljene storitve na
                        spletni strani, za katere ste izrazili zanimanje.
                    </p>
                    <p>
                        Namen obdelave podatkov
                        Ponudnik bo zbrane podatke o uporabnikih uporabljal izključno za
                        naslednje namene:
                        za pošiljanje ponudbe na podlagi prejetega povpraševanja, telefonski
                        kontakt ob povpraševanju oz. sklenitvi pogodbe,
                        vodenje evidence strank,
                        obveščanje o novostih,
                        občasno pošiljanje e-sporočil (v kolikor se posameznik prijavi na
                        prejemanje e-sporočil),
                        za kasnejšo komunikacijo s posameznikom za dosego cilja (poslovnega
                        sodelovanja), zaradi katerega je bil osebni podatek zbran.
                        Osebne podatke in kontaktne informacije ponudnik uporablja le za
                        namene, za katere so bili posredovani, v skladu z vašim dovoljenjem.
                        Vedno vas bomo predhodno obvestili o zbiranju osebnih podatkov in o
                        namenu zbiranja. V primeru zbiranja ali uporabe za kakršne koli druge
                        namene izven tistih, za katere ste jih posredovali, vas bomo
                        kontaktirali za pridobitev soglasja.
                        Posredovanje podatkov
                        Družba TESTAMENT d.o.o. s pogodbenimi partnerji projekta se zavezuje,
                        da ne bo pod nobenim pogojem brez izrecnega dovoljenja posredovala
                        osebnih oz. drugih podatkov tretji osebi oz. ne bo omogočila tretji
                        osebi, da vpogleda v osebne oz. druge podatke udeleženca oz.
                        uporabnika, razen če bi od njega to zahtevale državne oblasti, če je
                        taka obveznost določena v zakonu ali za potrebe za postopke pred
                        sodišči ali drugimi državnimi organi.
                    </p>
                    <p>
                        Varstvo podatkov in čas hrambe
                        Ponudnik uporablja ustrezna tehnološka in organizacijska sredstva za
                        zaščito prenosa in shranjevanja osebnih podatkov.
                        Ponudnik varstvo osebnih podatkov zagotavlja v skladu s to politiko in
                        z zahtevami za zavarovanje osebnih podatkov, ki jih določa zakonodaja
                        Republike Slovenije in Splošna Uredba GDPR.
                        Uporabnik je seznanjen in soglaša, da ponudnik njegove podatke hrani,
                        dokler je to nujno potrebno za dosego namena, za katerega so bili
                        podatki zbrani, nato pa jih trajno izbriše ali učinkovito anonimizira,
                        tako da določenega podatka ni več mogoče povezati z določenim
                        uporabnikom.
                        Osebne podatke zbiramo na podlagi zakona in jih obdelujemo in hranimo
                        tako dolgo, kolikor določa posamezen zakon.
                        Osebne podatke, ki jih zbiramo na podlagi izrecne privolitve
                        posameznika, obdelujemo za namene, opredeljene s privolitvijo in
                        hranimo do preklica privolitve.
                        Za varovanje osebnih podatkov je odgovoren tudi uporabnik sam, in
                        sicer tako, da poskrbi za varnost svojega uporabniškega imena in gesla
                        ter ustrezno programsko (protivirusno) zaščito svojega računalnika, v
                        kolikor bo prišlo do zahtevka uporabniškega imena in gesla.
                    </p>
                    <p>
                        Pravice uporabnikov po GDPR
                        Kot uporabnik našega spletnega mesta ste tako seznanjeni, da lahko
                        kadarkoli zahtevate, da vam družba TESTAMENT d.o.o.:
                        potrdimo, ali se podatki v zvezi z vami obdelujejo ali ne, in vam
                        omogočimo vpogled v vaše osebne podatke, ki so vsebovani v zbirki
                        osebnih podatkov ter njihovo prepisovanje ali kopiranje,
                        omogočimo vpogled v katalog zbirke osebnih podatkov oz. evidenco
                        dejavnosti obdelave osebnih podatkov,
                        posredujemo izpis osebnih podatkov, ki so vsebovani v zbirki osebnih
                        podatkov in se nanašajo na vas,
                        posredujemo seznam uporabnikov, katerim so bili posredovani osebni
                        podatki, kdaj, na kakšni podlagi in za kakšen namen,
                        podamo informacijo o virih, na katerih temeljijo zapisi, ki jih o vas
                        vsebuje zbirka osebnih podatkov, in o metodi obdelave,
                        podamo informacijo o namenu obdelave in vrsti osebnih podatkov, ki se
                        obdelujejo, ter vsa potrebna pojasnila v zvezi s tem,
                        pojasnimo tehnične oziroma logično-tehnične postopke odločanja, v
                        primeru izvajanja avtomatiziranega odločanja z obdelavo osebnih
                        podatkov posameznika.
                    </p>
                    <p>
                        Kot uporabnik našega spletnega mesta ste seznanjeni z dejstvom, da
                        imate v skladu z veljavnim Zakonom o varstvu osebnih podatkov ter
                        Splošno Uredbo GDPR še sledeče pravice:
                        da se obdelava vaših osebnih podatkov omeji, kadar velja en od
                        naslednjih primerov:
                        če oporekate točnosti;
                        podatkov (obdelava se omeji za obdobje, ki nam omogoča preveriti
                        točnost osebnih podatkov);
                        če je obdelava nezakonita in vi pa nasprotujete izbrisu vaših osebnih
                        podatkov ter namesto tega zahtevate omejitev njihove uporabe;
                        kot upravljavec osebnih podatkov ne potrebujemo več za dogovorjene
                        namene obdelave, temveč jih vi, potrebujete za uveljavljanje,
                        izvajanje ali obrambo pravnih zahtevkov;
                        v primeru, da vložite ugovor v zvezi z obdelavo, dokler se ne preveri,
                        ali zakoniti razlogi upravljavca prevladajo nad vašimi razlogi.
                        da se vaši osebni podatki v naši evidenci popravijo (TESTAMENT d.o.o.
                        je dolžan popraviti vaše netočne osebne podatke, prav tako pa imate
                        (ob upoštevanju namenov obdelave), pravico do dopolnitve nepopolnih
                        osebnih podatkov, vključno s predložitvijo dopolnilne izjave,
                        da se vaši osebni podatki izbrišejo (ter »pozabijo«) – če več ne
                        želite, da se vaši osebni podatki obdelujejo in ob pogoju, da ni
                        zakonitih razlogov za njihovo nadaljnjo hrambo oz. obdelavo, lahko
                        zahtevate, da se vaši podatki izbrišejo brez nepotrebnega odlašanja,
                        in sicer kadar velja eden od naslednjih razlogov (razen zakonskih
                        izjem):
                        vaši osebni podatki niso več potrebni za namene, za katere so bili
                        zbrani ali kako drugače obdelani;
                        da prekličete privolitev, na podlagi katere poteka obdelava in kadar
                        za obdelavo ne obstaja nobena druga pravna podlaga;
                        ugovarjate obdelavi, pod pogojem, da za obdelavo ne obstajajo nobeni
                        prevladujoči zakoniti razlogi, ali pa (kadarkoli) ugovarjate obdelavi
                        kadar se osebni podatki obdelujejo za namene neposrednega trženja;
                        vaši osebni podatki so bili obdelani nezakonito;
                        vaše osebne podatke je treba izbrisati za izpolnitev pravne obveznosti
                        v skladu s pravom RS;
                        vaši osebni podatki so bili zbrani v zvezi s točno določeno ponudbo.
                        da ste seznanjeni z rokom hrambe vaših osebnih podatkov,
                        da se zavedate, da imate pravico do pravnega sredstva – vložitev pritožbe
                        da imate pravico do prenosljivosti osebnih podatkov (velja samo za
                        osebne podatke, ki so obdelani avtomatizirano).
                        Te pravice vas ne odvežejo obveznosti, ki jih ima do vas sklenjena
                        pogodba vezana s partnerji družbe TESTAMENT d.o.o.
                        Uporabnik lahko kadarkoli zahteva, pregled, dopolnitev, popravo ali
                        izbris svojih osebnih podatkov oziroma prenehanje obdelave osebnih
                        podatkov, in sicer po e-pošti na naslov: info@testament.si ali pisno
                        na naslov TESTAMENT d.o.o., Deteljica 8, 4290 Tržič.
                        Ponudnik kot oglaševalec omenjenih spletnih strani ne odgovarja za
                        škodo, ki bi uporabniku nastala, ker je ponudniku posredoval napačne,
                        nepopolne ali neažurne podatke, ki se nanašajo na uporabnika.
                        Upravljalec spletnih mest www.testament.si in www.smrt.si vljudno
                        prosi uporabnike, ki se ne strinjajo s to politiko ali njenimi
                        spremembami ali dopolnitvami, da zapustijo spletno mesto.
                        Vse vsebine, ki so objavljene na spletni strani družbe TESTAMENT
                        d.o.o. so zaščitena avtorsko delo podjetja TESTAMENT d.o.o. in/ali
                        njegovih pogodbenih partnerjev skladno z določbami določbami Zakona o
                        avtorski in sorodnih pravicah (ZASP Ur.l.RS, št. 16/07,68/08 in
                        110/03). Prepovedana je reprodukcija, distribucija, spreminjanje,
                        javno prikazovanje in predvajanje ter ostale oblike izkoriščanja
                        avtorskega dela brez izrecnega pisnega dovoljenja podjetja TESTAMENT
                        d.o.o.
                    </p>
                    <p>
                        Z dovoljenjem podjetja TESTAMENT d.o.o. so dokumenti, ki so objavljeni
                        na spletni strani www.testament.si in www.smrt.si dovoljeni objave
                        tudi na drugih spletnih straneh, nikakor pa ni dovoljeno, da so
                        nekontrolirano razmnoževani ali kako drugače razširjeni za v
                        komercialne namene. Skladno z določbami ZASP morajo ohraniti vsa
                        navedena opozorila o avtorskih ali drugih pravicah (kot vir podatkov
                        mora biti vidno označeno TESTAMENT d.o.o., podatki pa morajo ostati
                        nespremenjeni).
                    </p>
                    <p>
                        Podjetje TESTAMENT d.o.o. se bo z vzdrževanjem in oblikovanjem teh
                        spletnih strani trudilo zagotavljati točnost, pravilnost in ažurnost
                        objavljenih vsebin, vendar ne zagotavlja in ne prevzema odgovornosti
                        za njihovo točnost in celovitost kot tudi ne za škodo povzročeno z
                        uporabo teh spletnih strani oziroma njenih vsebin.
                        TESTAMENT d.o.o. si pridržuje pravico spreminjanja, dodajanja ali
                        odstranitve spletnih strani (v celoti ali delno) ter brez predhodnega
                        opozorila.
                    </p>
                    <p className='font-baskerville text-h6'>Pogoji premium:</p>
                    <p>
                        Članom sistema, s poravnano naročnino za premium članstvo, se dodeli priporočilna (referral) koda, ki jo lahko uporabljajo v smislu priporočanja portala
                        testament.si
                        zaradi izkušenj zadovoljstva s storitvami in njihovo realizacijo. V primeru prijave v sistem
                        testament.si
                        katerega od prejemnikov priporočilne kode, sistem to zabeleži, česar pa
                        premium
                        član (lastnik priporočilne kode) ne more videti, saj ni upravičen do gradne posla in provizij, dokler ne pridobi statusa
                        svetovalec. Če se
                        premium
                        član kasneje odloči zaprositi za status
                        svetovalca
                        in mu je ta odobren, mu struktura do tedaj vpisanih članov ostne, medtem ko do provizij »za nazaj« ni upravičen, saj s podjetjem še ni imel sklenjene pogodbe o sodelovanju.
                    </p>
                    <p>
                        Testament d.o.o.<br/>
                        Deteljica 8, 4290 Tržič
                    </p>
                    <div className={cn('grid gap-6')}>
                        <Form {...form} >
                            <form id='step-1' onSubmit={form.handleSubmit(handleSubmit)}>
                                <div className="grid gap-4">
                                    <div className="mt-4 grid gap-1">
                                        <FormField
                                            control={form.control}
                                            name="isCheckedTruthInfo"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className='flex items-center'>
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value}
                                                                onCheckedChange={field.onChange}
                                                            />
                                                        </FormControl>
                                                        <FormLabel>Strinjam se s pogoji poslovanja</FormLabel>
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="mt-4 grid gap-1">
                                        <FormField
                                            control={form.control}
                                            name="isCheckedTerms"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className='flex items-center'>
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value}
                                                                onCheckedChange={field.onChange}
                                                            />
                                                        </FormControl>
                                                        <FormLabel>Strinjam se, da me Testament.si lahko obvešča o novostih in drugih pomembnih informacijah</FormLabel>
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="mt-4 grid gap-1">
                                        <FormField
                                            control={form.control}
                                            name="isCheckedEmailSubscription"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className='flex items-center'>
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value}
                                                                onCheckedChange={field.onChange}
                                                            />
                                                        </FormControl>
                                                        <FormLabel>Strinjam se, da me Testament.si lahko obvešča o promocijah in posebnih ponudbah</FormLabel>
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
            <div className={cn('hidden w-screen bg-primary-light-gray/20 p-4', className)}>
                <div className='mx-auto flex w-full max-w-[757px] items-center justify-center gap-2'>
                    <Button
                        variant='light'
                        size='icon'
                        type='button'
                        onClick={() => setCurrentStep(0)}
                    >
                        <Icons.ArrowLeft />
                    </Button>
                    <Button
                        form='step-1'
                        className='w-full max-w-[400px]'
                    >
                        Potrdi
                    </Button>
                </div>
            </div>
        </>
    )
}

/* ---------------------------------------------------------------------------------------------
 * Step 2
 * ------------------------------------------------------------------------------------------- */

function VerificationPersonalInfoForm({ className }: StepComponentProps) {
    const cookies = useCookies()
    const user = cookies.get('user')
    const { name, lastName } = JSON.parse(user || '{}')

    const setCurrentStep = useVerificationState(s => s.setCurrentStep)
    const setCurrentUser = useVerificationState(s => s.setCurrentUser)
    const currentUser = useVerificationState(s => s.currentUser)

    const form = useForm<z.infer<typeof VerificationPersonalInfoFormSchema>>({
        resolver: zodResolver(VerificationPersonalInfoFormSchema),
        defaultValues: {
            name: '',
            lastName: '',
            birthplace: process.env.NEXT_PUBLIC_ENV === 'dev' ? '445' : '194',
            career: ''
        }
    })

    function handleSubmit(data: z.infer<typeof VerificationPersonalInfoFormSchema>) {
        setCurrentUser({
            ...currentUser,
            ...data,
            birthplace: Number(data.birthplace),
            birthdate: format(new Date(data.birthdate), 'yyyy-MM-dd')
        })
        setCurrentStep(3)
    }

    useEffect(() => {
        form.reset({ name, lastName })
    }, [form, name, lastName])

    return (
        <>
            <div className={cn('w-full hidden flex-auto flex-col justify-center items-center p-6', className)}>
                <div className='w-full max-w-[504px] space-y-6'>
                    <div className={cn('grid gap-6')}>
                        <Form {...form} >
                            <form id='step-2' onSubmit={form.handleSubmit(handleSubmit)}>
                                <div className="grid gap-4">
                                    <div className="grid gap-1">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Vaše ime</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Vpišite svoje ime"
                                                            autoComplete="given-name"
                                                            autoCorrect="off"
                                                            autoCapitalize='off'
                                                            onKeyDown={allowOnlyLetters}
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid gap-1">
                                        <FormField
                                            control={form.control}
                                            name="lastName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Vaš priimek</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Vpišite priimek"
                                                            autoComplete="family-name"
                                                            autoCorrect="off"
                                                            autoCapitalize='off'
                                                            onKeyDown={allowOnlyLetters}
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="birthdate"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>Datum rojstva</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant={'light'}
                                                                className={cn(
                                                                    'w-full justify-start text-left font-normal font-dm-sans',
                                                                    !field.value && 'text-muted-foreground'
                                                                )}
                                                            >
                                                                {field.value
                                                                    ? (
                                                                        <span>{format(field.value, 'PPP')}</span>
                                                                    )
                                                                    : (
                                                                        <span>DD / MM /YYYY</span>
                                                                    )}
                                                                {/* <CalendarIcon className="ml-auto h-4 w-4 opacity-50" /> */}
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent avoidCollisions={false} className="w-auto p-0" align="start">
                                                        <Select
                                                            onValueChange={(value) => {
                                                                const selectedYear = new Date().getFullYear() + parseInt(value)
                                                                const currentMonth = field.value ? field.value.getMonth() : new Date().getMonth() // Default to January if no date is set
                                                                const currentDay = field.value ? field.value.getDate() : new Date().getDate() // Default to 1 if no date is set

                                                                // Create a new date with the selected year, current month, and current day
                                                                const newDate = new Date(selectedYear, currentMonth, currentDay)
                                                                field.onChange(newDate)
                                                            }}
                                                        >
                                                            <SelectTrigger className='w-full'>
                                                                <SelectValue placeholder='Izberite leto' />
                                                            </SelectTrigger>
                                                            <SelectContent position="popper" className='w-full'>
                                                                <ScrollArea className="h-[200px] w-full">
                                                                    {getYearsToNow(1900, add(new Date(), { years: -18 })).reverse().map(year => (
                                                                        <SelectItem key={year} value={differenceInCalendarYears(new Date(year, 1, 1), new Date()).toString()}>{year}</SelectItem>
                                                                    ))}
                                                                </ScrollArea>
                                                            </SelectContent>
                                                        </Select>
                                                        <Calendar
                                                            key={field.value?.toISOString()}
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            defaultMonth={field.value}
                                                            onMonthChange={() => field.value}
                                                            disabled={(date) =>
                                                                date > new Date() || date > add(new Date(), { years: -18 })
                                                            }
                                                            toYear={add(new Date(), { years: -18 }).getFullYear()}
                                                            toMonth={add(new Date(), { years: -18 })}
                                                            hidden={(date) =>
                                                                date > new Date() || date > add(new Date(), { years: -18 })
                                                            }
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="grid gap-1">
                                        <FormField
                                            control={form.control}
                                            name="birthplace"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Država rojstva</FormLabel>
                                                    <FormControl>
                                                        <CountriesCombobox
                                                            value={field.value}
                                                            onChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid gap-1">
                                        <FormField
                                            control={form.control}
                                            name="career"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Poklic</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Kaj je vaš poklic, s čim se ukvarjate"
                                                            autoComplete="organization-title"
                                                            autoCorrect="off"
                                                            autoCapitalize='off'
                                                            onKeyDown={allowOnlyLetters}
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
            <div className={cn('hidden w-screen bg-primary-light-gray/20 p-4', className)}>
                <div className='mx-auto flex w-full max-w-[757px] items-center justify-center gap-2'>
                    <Button
                        variant='light'
                        size='icon'
                        type='button'
                        onClick={() => setCurrentStep(1)}
                    >
                        <Icons.ArrowLeft />
                    </Button>
                    <Button
                        form='step-2'
                        className='w-full max-w-[400px]'
                    >
                        Potrdi
                    </Button>
                </div>
            </div>
        </>
    )
}

/* ---------------------------------------------------------------------------------------------
 * Step 3
 * ------------------------------------------------------------------------------------------- */

function VerificationAddressForm({ className }: StepComponentProps) {
    const setCurrentStep = useVerificationState(s => s.setCurrentStep)
    const setCurrentUser = useVerificationState(s => s.setCurrentUser)
    const currentUser = useVerificationState(s => s.currentUser)
    const cookies = useCookies()

    const form = useForm<z.infer<typeof VerificationAddressFormSchema>>({
        resolver: zodResolver(VerificationAddressFormSchema),
        defaultValues: {
            address: '',
            city: '',
            zipcode: '',
            countryId: process.env.NEXT_PUBLIC_ENV === 'dev' ? '445' : '194'
        }
    })

    async function handleSubmit(data: z.infer<typeof VerificationAddressFormSchema>) {
        setCurrentUser({
            ...currentUser,
            ...data,
            countryId: Number(data.countryId)
        })
        const payload = {
            ...currentUser,
            ...data,
            countryId: Number(data.countryId)
        }
        const user = await verifyUser(payload)
        cookies.set('user', JSON.stringify(user), { path: '/' })
        // setCurrentStep(4)
        setCurrentStep(5)
    }

    return (
        <>
            <div className={cn('w-full hidden flex-auto flex-col justify-center items-center p-6', className)}>
                <div className='w-full max-w-[504px] space-y-6'>
                    <div className={cn('grid gap-6')}>
                        <Form {...form} >
                            <form id='step-3' onSubmit={form.handleSubmit(handleSubmit)}>
                                <div className="grid gap-4">
                                    <div className="grid gap-1">
                                        <FormField
                                            control={form.control}
                                            name="countryId"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Država prebivališča</FormLabel>
                                                    <FormControl>
                                                        <CountriesCombobox
                                                            value={field.value}
                                                            onChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid gap-1">
                                        <FormField
                                            control={form.control}
                                            name="address"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Ulica in hišna številka</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Vpišite ulico in hišno številko"
                                                            autoComplete="street-address"
                                                            autoCorrect="off"
                                                            autoCapitalize='off'
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid gap-1">
                                        <FormField
                                            control={form.control}
                                            name="city"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Mesto</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Mesto bivališča"
                                                            autoComplete="address-level1"
                                                            autoCorrect="off"
                                                            autoCapitalize='off'
                                                            onKeyDown={allowOnlyLetters}
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid gap-1">
                                        <FormField
                                            control={form.control}
                                            name="zipcode"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Poštna številka</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Vpišite poštno številko"
                                                            autoComplete="postal-code"
                                                            autoCorrect="off"
                                                            autoCapitalize='off'
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
            <div className={cn('hidden w-screen bg-primary-light-gray/20 p-4', className)}>
                <div className='mx-auto flex w-full max-w-[757px] items-center justify-center gap-2'>
                    <Button
                        variant='light'
                        size='icon'
                        type='button'
                        onClick={() => setCurrentStep(2)}
                    >
                        <Icons.ArrowLeft />
                    </Button>
                    <Button
                        form='step-3'
                        className='w-full max-w-[400px]'
                    >
                        Potrdi
                    </Button>
                </div>
            </div>
        </>
    )
}

/* ---------------------------------------------------------------------------------------------
 * Step 4
 * ------------------------------------------------------------------------------------------- */

// function VerificationProfesionalForm({ className }: StepComponentProps) {
//     const setCurrentStep = useVerificationState(s => s.setCurrentStep)
//     const setCurrentUser = useVerificationState(s => s.setCurrentUser)
//     const currentUser = useVerificationState(s => s.currentUser)
//     const cookies = useCookies()

//     const form = useForm<z.infer<typeof VerificationProfesionalFormSchema>>({
//         resolver: zodResolver(VerificationProfesionalFormSchema),
//         defaultValues: {
//             tin: '',
//             career: '',
//             emso: ''
//         }
//     })

//     async function handleSubmit(data: z.infer<typeof VerificationProfesionalFormSchema>) {
//         try {
//             setCurrentUser({
//                 ...currentUser,
//                 ...data
//             })
//             const payload = {
//                 ...currentUser,
//                 ...data
//             }
//             const user = await verifyUser(payload)
//             cookies.set('user', JSON.stringify(user), { path: '/' })
//             setCurrentStep(5)
//         } catch (error) {
//             if (error instanceof Error) {
//                 toast.error('Uh oh! Something went wrong.', {
//                     description: JSON.parse(error.message).message
//                 })
//             }
//         }
//     }

//     return (
//         <>
//             <div className={cn('w-full hidden flex-auto flex-col justify-center items-center p-6', className)}>
//                 <div className='w-full max-w-[504px] space-y-6'>
//                     <div className={cn('grid gap-6')}>
//                         <Form {...form} >
//                             <form id='step-4' onSubmit={form.handleSubmit(handleSubmit)}>
//                                 <div className="grid gap-4">
//                                     <div className="grid gap-1">
//                                         <FormField
//                                             control={form.control}
//                                             name="tin"
//                                             render={({ field }) => (
//                                                 <FormItem>
//                                                     <FormLabel>Davčna številka</FormLabel>
//                                                     <FormControl>
//                                                         <Input
//                                                             placeholder="Vpišite davčno številko"
//                                                             autoComplete="taxnumber"
//                                                             autoCorrect="off"
//                                                             autoCapitalize='off'
//                                                             onKeyDown={allowOnlyNumbers}
//                                                             {...field}
//                                                         />
//                                                     </FormControl>
//                                                     <FormMessage />
//                                                 </FormItem>
//                                             )}
//                                         />
//                                     </div>
//                                     <div className="grid gap-1">
//                                         <FormField
//                                             control={form.control}
//                                             name="career"
//                                             render={({ field }) => (
//                                                 <FormItem>
//                                                     <FormLabel>Poklic</FormLabel>
//                                                     <FormControl>
//                                                         <Input
//                                                             placeholder="Kaj je vaš poklic, s čim se ukvarjate"
//                                                             autoComplete="career"
//                                                             autoCorrect="off"
//                                                             autoCapitalize='off'
//                                                             onKeyDown={allowOnlyLetters}
//                                                             {...field}
//                                                         />
//                                                     </FormControl>
//                                                     <FormMessage />
//                                                 </FormItem>
//                                             )}
//                                         />
//                                     </div>
//                                     <div className="grid gap-1">
//                                         <FormField
//                                             control={form.control}
//                                             name="emso"
//                                             render={({ field }) => (
//                                                 <FormItem>
//                                                     <FormLabel>Emšo</FormLabel>
//                                                     <FormControl>
//                                                         <Input
//                                                             placeholder="EMŠO"
//                                                             autoComplete="number"
//                                                             autoCorrect="off"
//                                                             autoCapitalize='off'
//                                                             {...field}
//                                                         />
//                                                     </FormControl>
//                                                     <FormMessage />
//                                                 </FormItem>
//                                             )}
//                                         />
//                                     </div>
//                                 </div>
//                             </form>
//                         </Form>
//                     </div>
//                 </div>
//             </div>
//             <div className={cn('hidden w-full bg-primary-light-gray/20 p-4', className)}>
//                 <div className='mx-auto flex w-full max-w-[757px] items-center justify-center gap-2'>
//                     <Button
//                         variant='light'
//                         size='icon'
//                         type='button'
//                         onClick={() => setCurrentStep(3)}
//                     >
//                         <Icons.ArrowLeft />
//                     </Button>
//                     <Button
//                         form='step-4'
//                         disabled={form.formState.isSubmitting}
//                         className='w-full max-w-[400px]'
//                     >
//                         <span className='flex items-center gap-[10px]'>
//                             {form.formState.isSubmitting && (
//                                 <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
//                             )}
//                             <span className='leading-none'>Potrdi</span>
//                         </span>
//                     </Button>
//                 </div>
//             </div>
//         </>
//     )
// }

/* ---------------------------------------------------------------------------------------------
 * Step 5
 * ------------------------------------------------------------------------------------------- */

function VerificationPlanChoose({ className }: StepComponentProps) {
    // const [isLoadingPayLater, setIsLoadingPayLater] = useState(false)
    const { data, isLoading } = useFetch<MembershipProps[]>(getMemberships)
    const setCurrentStep = useVerificationState(s => s.setCurrentStep)
    const setMembershipToPay = useVerificationState(s => s.setMembershipToPay)
    const cookies = useCookies()
    const user = JSON.parse(cookies.get('user') ?? '{}')

    function handleClickFree() {
        setCurrentStep(7)
    }

    // async function handleClickPayLater() {
    //     try {
    //         setIsLoadingPayLater(true)
    //         await payLater()
    //         setCurrentStep(7)
    //     } catch (error) {
    //         if (error instanceof Error) {
    //             toast.error('Uh oh! Something went wrong.', {
    //                 description: JSON.parse(error.message).message
    //             })
    //         }
    //     } finally {
    //         setIsLoadingPayLater(true)
    //     }
    // }

    function handleClickPremium(membership: MembershipProps) {
        setMembershipToPay(membership)
        setCurrentStep(6)
    }

    return (
        <>
            <div className={cn('w-full hidden flex-auto flex-col justify-center items-center p-6', className)}>
                <div className='w-full max-w-[757px] space-y-10'>
                    <p className='text-center'>Sledi plačilo PREMIUM računa, ki pokriva stroške upravljanja in omogoča dostop do ekskluzivnih funkcij platforme.</p>
                    <div className='flex justify-center'>
                        <Tabs defaultValue="premium" className="w-full max-w-sm lg:hidden">
                            <TabsList className='px-0 py-3'>
                                <TabsTrigger value="free" className='w-full'>Free</TabsTrigger>
                                <TabsTrigger value="premium" className='w-full'>Premium</TabsTrigger>
                            </TabsList>
                            {isLoading && (
                                <Skeleton className='h-[648px] w-full max-w-sm' />
                            )}
                            {data?.map(membership => {
                                if (membership.name === 'Free') {
                                    return (
                                        <TabsContent
                                            key={membership.id}
                                            value="free"
                                        >
                                            <PricingFreeCard
                                                membership={membership}
                                                onClick={handleClickFree}
                                            />
                                        </TabsContent>
                                    )
                                }
                                return (
                                    <TabsContent
                                        key={membership.id}
                                        value="premium"
                                    >
                                        <PricingPremiumCard
                                            membership={membership}
                                            onClick={handleClickPremium}
                                        />
                                    </TabsContent>
                                )
                            })}

                        </Tabs>
                    </div>
                    <div className='hidden justify-center lg:flex'>
                        {isLoading && (
                            <>
                                <Skeleton className='h-[648px] w-full max-w-xs' />
                                <Skeleton className='h-[699px] w-full max-w-xs' />
                            </>
                        )}
                        {data?.map(membership => {
                            if (membership.name === 'Free') {
                                return (
                                    <PricingFreeCard
                                        key={membership.id}
                                        membership={membership}
                                        className='max-w-xs'
                                        onClick={handleClickFree}
                                    />
                                )
                            }
                            return (
                                <PricingPremiumCard
                                    key={membership.id}
                                    membership={membership}
                                    className='max-w-xs'
                                    onClick={handleClickPremium}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className={cn('hidden w-screen bg-primary-light-gray/20 p-4', className)}>
                <div className='mx-auto flex w-full max-w-[757px] items-center justify-center gap-2'>
                    {!user.isVerified && (
                        <Button
                            variant='light'
                            size='icon'
                            type='button'
                            onClick={() => setCurrentStep(3)}
                        >
                            <Icons.ArrowLeft />
                        </Button>
                    )}
                    <Button
                        onClick={() => handleClickPremium(data?.find((m) => m.name === 'Premium') as MembershipProps)}
                        // disabled={isLoadingPayLater}
                        className='w-full max-w-[400px]'
                    >
                        <span className='flex items-center gap-[10px]'>
                            {/* {isLoadingPayLater && (
                                <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                            )} */}
                            <span className='leading-none'>Postani Premium</span>
                        </span>
                    </Button>
                </div>
            </div>
        </>
    )
}

/* ---------------------------------------------------------------------------------------------
 * Step 6
 * ------------------------------------------------------------------------------------------- */
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '')

function VerificationCheckout({ className }: StepComponentProps) {
    const setCurrentStep = useVerificationState(s => s.setCurrentStep)
    const membershipToPay = useVerificationState(s => s.membershipToPay)
    const { data, error } = useFetch(() => getPaymentIntent(membershipToPay?.id || 2))

    if (error) {
        return null
    }

    return (
        <>
            <div className={cn('w-full hidden flex-auto flex-col justify-center items-center p-6', className)}>
                <div className='w-full max-w-[875px] space-y-10'>
                    <div className='flex flex-col justify-center lg:flex-row'>
                        <Card className={cn('w-full lg:hidden bg-transparent border-transparent')}>
                            <CardHeader className='items-center space-y-0 pt-10 text-center'>
                                <span className='w-fit font-baskerville text-h6 text-gradient-gold'>{membershipToPay?.subtitle}</span>
                                <span className='pt-4 font-baskerville text-h4'>{membershipToPay?.price} EUR</span>
                                <span className='text-[12px]'>{membershipToPay?.paymentMode}</span>
                            </CardHeader>
                        </Card>
                        <Card className={cn('w-full max-w-sm hidden lg:block bg-transparent border-transparent')}>
                            <CardHeader className='space-y-0 pt-10'>
                                <span className='w-fit font-baskerville text-h5 text-gradient-gold'>{membershipToPay?.name}</span>
                                <span className='text-body-big-2'>{membershipToPay?.subtitle}</span>
                                <span className='pt-4 font-baskerville text-h3'>{membershipToPay?.price}<span className='text-h5'>{' '}EUR</span></span>
                                <span className='text-[12px]'>{membershipToPay?.paymentMode}</span>
                                <Separator className='!mt-6 bg-primary-light-gray' />
                            </CardHeader>
                            <CardContent className='space-y-2.5'>
                                {
                                    membershipToPay?.description.map(({ id, value }) => (
                                        <div key={`i-${id}`} className='flex items-center gap-4'>
                                            <Icons.CheckCircleGold className='h-5 w-5 min-w-fit'/>
                                            <span className='text-body-medium'>{value}</span>
                                        </div>
                                    ))
                                }
                            </CardContent>
                        </Card>
                        <div className='flex w-full flex-col space-y-4'>
                            <Card className={cn('w-full bg-primary-white border-transparent shadow-box rounded-2xl')}>
                                <CardHeader className='space-y-0 pt-10'>
                                    <div className='mb-4 flex justify-between'>
                                        <span>Premium plačilo</span>
                                        <span className='font-medium text-primary-dark-gray'>{membershipToPay?.id === 2 ? '61,48' : '0'} EUR</span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <span>Davek (22%)</span>
                                        <span className='font-medium text-primary-dark-gray'>{membershipToPay?.id === 2 ? '13,52' : '0'} EUR</span>
                                    </div>
                                    <Separator className='!mt-6 bg-primary-light-gray' />
                                </CardHeader>
                                <CardContent className='space-y-2.5'>
                                    <div className='flex justify-between'>
                                        <span>Skupaj</span>
                                        <span className='font-medium text-primary-dark-gray'>{Number(membershipToPay?.price).toLocaleString('sl-SI', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        })} EUR</span>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className={cn('w-full bg-primary-white border-transparent shadow-box rounded-2xl')}>
                                <CardHeader className='space-y-0 pt-10'>
                                    {data && data.clientSecret && (
                                        <Elements stripe={stripePromise} options={{
                                            clientSecret: data.clientSecret,
                                            appearance: {
                                                theme: 'stripe',
                                                variables: {
                                                    borderRadius: '0px',
                                                    colorPrimary: '#45494D',
                                                    colorDanger: '#D84C10'
                                                },
                                                rules: {
                                                    '.Label': {
                                                        margin: '0 0 10px 16px'
                                                    },
                                                    '.Input': {
                                                        backgroundColor: '#F8F8F8',
                                                        border: '1px solid #45494D'
                                                    }
                                                }
                                            }
                                        }}>
                                            <CheckoutForm />
                                        </Elements>
                                    )}
                                </CardHeader>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cn('hidden w-screen bg-primary-light-gray/20 p-4', className)}>
                <div className='mx-auto flex w-full max-w-[757px] items-center justify-center gap-2'>
                    <Button
                        variant='light'
                        size='icon'
                        type='button'
                        onClick={() => setCurrentStep(5)}
                    >
                        <Icons.ArrowLeft />
                    </Button>
                    <Button
                        onClick={() => setCurrentStep(7)}
                        className='w-full max-w-[400px]'
                    >
                        Plačam kasneje
                    </Button>
                </div>
            </div>
        </>
    )
}

function CheckoutForm() {
    const stripe = useStripe()
    const elements = useElements()
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
    const setCurrentStep = useVerificationState(s => s.setCurrentStep)
    const membershipToPay = useVerificationState(s => s.membershipToPay)
    const cookies = useCookies()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        // Handle the payment
        if (!stripe || !elements) {
            // Stripe has not yet loaded.
            return
        }

        const { error } = await stripe.confirmPayment({
            // instance that was used to create the Payment Element
            elements,
            confirmParams: {
                return_url: 'http://localhost:3000/namizje/verifikacija?paymentStatus=success'
            },
            redirect: 'if_required'
        })

        if (error) {
            setErrorMessage(error.message)
            return
        }

        const user = JSON.parse(cookies.get('user') ?? '{}')
        cookies.set('user', JSON.stringify({ ...user, membershipId: membershipToPay?.id, nextRenewal: addYears(new Date(), 1) }), { path: '/' })
        requireRefresh = true
        setCurrentStep(7)
    }

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <Button type="submit" disabled={!stripe} className='mt-8 w-full'>
                Plačaj {membershipToPay?.price} {membershipToPay?.currency}
            </Button>
            {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
        </form>
    )
}

/* ---------------------------------------------------------------------------------------------
 * Step 7
 * ------------------------------------------------------------------------------------------- */

function VerificationSuccessMessage({ className }: StepComponentProps) {
    // const setCurrentStep = useVerificationState(s => s.setCurrentStep)
    // const setCurrentUser = useVerificationState(s => s.setCurrentUser)
    // const setMembershipToPay = useVerificationState(s => s.setMembershipToPay)
    const router = useRouter()

    useEffect(() => {
        console.log('requireRefresh', requireRefresh)
    }, [])

    async function handleClick() {
        await invalidateCacheByPath('/namizje/domov')
        router.replace('/namizje/domov')
        // TODO: Improve the revalidation of user when premium is aquired
        if (requireRefresh) {
            setTimeout(() => {
                window.location.reload()
            }, 2500)
        }
        // window.location.reload()
        // setCurrentUser({
        //     name: '',
        //     lastName: '',
        //     birthdate: add(new Date(), { years: -18 }).toString(),
        //     birthplace: process.env.NEXT_PUBLIC_ENV === 'dev' ? 445 : 194,
        //     countryId: process.env.NEXT_PUBLIC_ENV === 'dev' ? 445 : 194,
        //     address: '',
        //     city: '',
        //     zipcode: '',
        //     tin: '',
        //     career: '',
        //     emso: ''
        // })
        // setMembershipToPay(null)
        // setCurrentStep(0)
    }

    return (
        <div className={cn('hidden flex-auto flex-col justify-center items-center p-6', className)}>
            <div className='max-w-[624px] space-y-6 *:text-center'>
                <div className='flex justify-center'>
                    <Ilustrations.List className='w-full max-w-44 lg:max-w-72'/>
                </div>
                <p className='font-baskerville text-h6'>Čestitamo, končali ste!</p>
                <p>
                    Vaš verifikacijski obrazec je bil izpolnjen in posredovan naši ekipi. Ob prejetem plačilu vas bomo aktivirali in kontaktirali po telefonu in e-pošti.
                </p>
                <p>
                    Če še niste uredili plačila, ni nobenega problema. Na nadzorni plošči vas bo čakalo sporočilo, kamor se lahko kadarkoli vrnete, da uredite plačilo.
                </p>
                <p className='font-medium'>Najlepša hvala za vaše zaupanje.</p>
                <div className='flex justify-center'>
                    <Button
                        onClick={handleClick}
                        className='w-full max-w-[504px]'
                    >
                        Končaj
                    </Button>
                </div>
            </div>
        </div>
    )
}

export function VerificationFlowResetter() {
    const setCurrentStep = useVerificationState(s => s.setCurrentStep)
    const setCurrentUser = useVerificationState(s => s.setCurrentUser)
    const setMembershipToPay = useVerificationState(s => s.setMembershipToPay)

    useEffect(() => {
        setCurrentUser({
            name: '',
            lastName: '',
            birthdate: add(new Date(), { years: -18 }).toString(),
            birthplace: process.env.NEXT_PUBLIC_ENV === 'dev' ? 445 : 194,
            countryId: process.env.NEXT_PUBLIC_ENV === 'dev' ? 445 : 194,
            address: '',
            city: '',
            zipcode: '',
            tin: '',
            career: '',
            emso: ''
        })
        setMembershipToPay(null)
        setCurrentStep(0)
    }, [setCurrentStep, setCurrentUser, setMembershipToPay])

    return null
}
