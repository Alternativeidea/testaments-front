import { Icons } from '@/components/ui/icons'

export const REQUEST_ACTIONS = ['Dodano', 'Sprememba', 'Izbris']

export const REQUEST_STATUS = [
    {
        name: 'V obdelavi',
        icon: <Icons.Clock className='text-accent-green' />
    },
    {
        name: 'Končano',
        icon: <Icons.ArrowDownCircle className='text-primary-dark-gray' />
    },
    {
        name: 'Končano',
        icon: <Icons.ArrowUpCircle className='text-primary-dark-gray' />
    },
    {
        name: 'V obdelavi',
        icon: <Icons.Clock className='text-accent-green' />
    }
]

export const WILL_EDIT_OR_DELETE_GUIDE_STEPS = [
    {
        name: 'Oddaja Zahtevka',
        description: 'Tukaj oddate zahtevek za spremembo ali izbris oporoke.'
    },
    {
        name: 'Kontaktiranje s Strani Testament.si',
        description: 'Naša ekipa prejme zahtevek in vas kontaktira. Skupaj bomo določili termin za sestanek glede želene spremembe ali izbrisa.'
    },
    {
        name: 'Sestanek z Testament.si',
        description: 'Na dogovorjenem sestanku se razpravlja o podrobnostih spremembe ali izbrisa oporoke.\nStranka ima možnost postaviti vprašanja in razjasniti morebitne dvome.'
    },
    {
        name: 'Formalna Izvedba Sprememba ali Izbrisa',
        description: 'Stranka na sestanku lastnoročno spiše spremembo ali izjavo o izbrisu oporoke. Ta dokument je formalno potrjen in velja kot uradna sprememba ali izbris.'
    },
    {
        name: 'Posodobitev Računa Stranke',
        description: 'Po sestanku naša ekipa posodobi informacije v vašem spletnem računu Testament.si'
    },
    {
        name: 'Končna Potrditev',
        description: 'Prejeli boste elektronsko obvestilo o uspešni spremembi ali izbrisu oporoke. Morebitna dodatna navodila ali informacije so prav tako posredovane stranki.'
    }
]

export const WILL_GUIDE_STEPS = [
    {
        name: 'Izberite kategorijo',
        description: 'Izberite Kategorijo Najprej boste izbrali kategorijo, kamor želite dodati oporoko. Lahko gre za nepremičnine, dragocene predmete, denarna sredstva ali karkoli drugega, kar želite zapustiti svojim dedičem.'
    },
    {
        name: 'Določite Dediče',
        description: 'Nato boste določili dediče in njihove deleže. To je pomemben korak, kjer boste opredelili, kdo bo prejel vašo lastnino.'
    },
    {
        name: 'Določite Posebne Pogoje Dedovanja',
        description: 'Če želite, lahko vključite posebne pogoje dedovanja, na primer kdaj bo dedič prejel lastnino ali kakšne obveznosti mora izpolniti.'
    },
    {
        name: 'Srečanje v živo in Lastnoročna Oporoka',
        description: 'Po uspešnem izpolnjevanju teh treh korakov se bomo z vami dogovorili za sestanek v živo. Na tem sestanku bomo skupaj sestavili lastnoročno oporoko, ki bo v skladu z veljavno zakonodajo. Ko bo lastnoročna oporoka pravno formalna, jo bomo dodali v vašo digitalno shrambo na vašem uporabniškem računu, kjer bo varno shranjena za prihodnost'
    }
]

export const WILL_SPECIAL_CONSTRAINS = [
    {
        name: 'Pogoji za dedovanje glede na starost',
        description: 'Zapustnik lahko določi, kdaj naj dediči prejmejo določeno lastnino ali premoženje glede na doseženo starost dediča ali druge življenjske mejnike. Na primer, lahko določi, da se določena nepremičnina prenese na dediča, ko doseže določeno starost.'
    },
    {
        name: 'Določitev dobrodelnih donacij',
        description: 'Zapustnik lahko določi, da se določen del njegovega premoženja nameni za dobrodelne organizacije ali neprofitne ustanove.'
    },
    {
        name: 'Pogojna dedovanja',
        description: 'Zapustnik lahko določi, da se dediščina podeli dedičem pod določenimi pogoji, na primer če izpolnijo določene naloge ali pogoje.'
    },
    {
        name: 'Omejitve na doložene dedovalce',
        description: 'Zapustnik lahko določi omejitve za določene dediče, na primer da morajo ohraniti določen življenjski slog ali ne smejo prodati določenih premoženjskih elementov.'
    },
    {
        name: 'Dedovanje pod pogojem soživljenja',
        description: 'V primeru soživljenja ali partnerstva lahko zapustnik določi, da se dediščina podeli partnerju le pod določenimi pogoji.'
    },
    {
        name: 'Dedovanje pod pogojem izobrazbe',
        description: 'Zapustnik lahko določi, da se dediči morajo izobraževati ali pridobiti določene spretnosti, da bi prejeli dediščino.'
    },
    {
        name: 'Pogoji za skrbništvo',
        description: 'V primeru mladoletnih dedičev lahko zapustnik določi posebne pogoje za skrbnika premoženja teh dedičev.'
    },
    {
        name: 'Dedovanje poslovnih interesov',
        description: 'V primeru podjetniškega premoženja lahko zapustnik določi, kako se bodo poslovni deleži ali interesi prenesli na dediče ali partnerje.'
    },
    {
        name: 'Posebne pogodbe in zahteve',
        description: 'Zapustnik lahko določi katera koli druga posebna določila ali zahteve, ki so mu pomembne.'
    }
]
