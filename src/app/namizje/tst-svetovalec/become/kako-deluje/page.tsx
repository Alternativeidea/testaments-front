import { PageHeader, PageHeaderName } from '@/components/dashboard/layout/page-header'
import { buttonVariants } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'
import { cn } from '@/lib/utils/style'
import Link from 'next/link'

export default function HowItWorksPage() {
    return (
        <>
            <PageHeader className='justify-center'>
                <PageHeaderName className='text-center'>Kako deluje tržniški program TST svetovalcev?</PageHeaderName>
            </PageHeader>
            <section>
                <div className='grid lg:grid-cols-2 gap-6'>
                    <div className={cn(
                        'space-y-4 text-body-small',
                        '[&>ul]:list-disc [&>ul]:pl-4 [&>ul]:space-y-4'
                    )}>
                        <p className='font-baskerville text-[25px]'>Dvostopenjski provizijski sistem:</p>
                        <ul>
                            <li><span className='font-medium'>Provizija 1. nivoja:</span> provizija iz realiziranih poslov, ki jih opravijo člani, vpisani v strukturo neposredno pod svetovalcem (1. nivo - direkti).</li>
                            <li><span className='font-medium'>Provizija 2. nivoja:</span> provizija iz realiziranih poslov, ki jih opravijo člani, vpisani v strukturo v 2. nivoju pod svetovalcem (jih v sistem pripeljejo njihovi direkti v 1. nivoju).</li>
                        </ul>
                        <p className='font-baskerville text-[25px] !mt-10'>Zaslužek z različnimi produkti</p>
                        <p>svetovalcu pripada provizija vsakič, ko člani, vpisani v strukturo v 1. in 2. nivoju pod njim:</p>
                        <ul>
                            <li>nadgradijo svoj račun v premium ali premium članstvo podaljšajo;</li>
                            <li>realizirajo posel iz ponudbe na tržnici. Višina provizije se za vsak posel posebej določi s pogodbo;</li>
                            <li>izvedejo nakup zlata, ki je zaradi pravilnega vodenja hrambe zabeležen v obliki digitalnega zapisa, ki ga v sistemu imenujemo Testament ( TST).</li>
                        </ul>
                        <p className='font-baskerville text-[25px] !mt-10'>Pasivni bonus</p>
                        <ul>
                            <li>Zavedamo se, da so za vsak posel in vsak projekt najpomembnejši zadovoljni člani. Zato v prihodnosti predvidevamo vzpostavitev bazena (ang: pool), ki ga bomo polnili z delom sredstev iz ustvarjenega dobička. Ta sredstva bomo porabili za nagrajevanje tistih, ki se bodo izkazali s svojim prizadevanjem in uspehom. Poleg enkratnih nagrad bodo najprizadevnejši in najuspešnejši dobili tudi možnost pasivnega zaslužka. Natančne pogoje (zahteve, višino enkratnih nagrad, višino pasivnega bonusa ipd.) bomo določili v drugi fazi razvoja projekta.</li>
                        </ul>
                        <p className='font-baskerville text-[25px] !mt-10'>Spremljanje in analiza</p>
                        <ul>
                            <li>Za vas smo na nadzorni plošči (Back Office) razvili orodja, ki vam bodo omogočala takojšen in stalen vpogled v lastno poslovanje in uspešnost vaših referalov.</li>
                        </ul>
                        <p className='font-baskerville text-[25px] !mt-10'>Izplačila</p>
                        <ul>
                            <li>Provizija se izplačuje mesečno. Obračun provizij se izvede v začetku vsakega meseca za pretekli mesec, izplačila pa se realizirajo najkasneje do 15. v mesecu na vaš bančni račun.</li>
                        </ul>
                        <p className='font-baskerville text-[25px] !mt-10'>Prednosti sodelovanja</p>
                        <ul>
                            <li><span className='font-medium'>Fleksibilnost:</span> Delate lahko kadarkoli, od koder koli in kolikor želite. Odločitev o tem je odvisna izključno od vašega časa ter vaših želja in potreb.</li>
                            <li><span className='font-medium'>Podpora:</span> Ekipa projekta Testament.si nudi celovito podporo povsod tam, kjer jo boste kot naš sodelavec potrebovali.</li>
                            <li><span className='font-medium'>Rast in učenje:</span> Vseživljenjsko učenje pomeni pridobivanje novih znanj in veščin. Naši strokovnjaki in sodelavci ves čas spremljajo nove dosežke na različnih področjih, zato vam bodo lahko konstruktivno pomagali pri pridobivanju novih znanj in veščin, ki jih boste lahko uporabili pri delu in tudi v življenju.</li>
                        </ul>
                    </div>
                    <div>
                        <div className='bg-primary-light-gray/30 px-6 py-7'>
                            <Table className='font-baskerville text-h6'>
                                <TableHeader className='[&_tr]:border-0'>
                                    <TableRow>
                                        <TableHead></TableHead>
                                        <TableHead className="text-primary-medium-gray text-center">Nivo 1</TableHead>
                                        <TableHead className="text-primary-medium-gray text-center">Nivo 2</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow className='border-b border-primary-light-gray'>
                                        <TableCell className="">Premium</TableCell>
                                        <TableCell className="text-gradient-gold text-center">40%</TableCell>
                                        <TableCell className="text-gradient-gold text-center">10%</TableCell>
                                    </TableRow>
                                    <TableRow className='border-b border-primary-light-gray'>
                                        <TableCell className="">Dodajanje TST</TableCell>
                                        <TableCell className="text-gradient-gold text-center">5%</TableCell>
                                        <TableCell className="text-gradient-gold text-center">2%</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </section>
            <div className='w-full flex justify-center items-center gap-2 p-4 bg-[#FEFEFE]'>
                <Link href='/namizje/tst-svetovalec/become' className={buttonVariants({ size: 'icon', variant: 'light' })}><Icons.ArrowLeft /></Link>
                <Link href='/namizje/tst-svetovalec/become/terms' className={buttonVariants({ className: 'w-full max-w-[400px]' })}>Nadaljuj</Link>
            </div>
        </>
    )
}
