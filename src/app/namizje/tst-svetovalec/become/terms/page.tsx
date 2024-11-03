'use client'

import { PageHeader, PageHeaderName } from '@/components/dashboard/layout/page-header'
import { Button, buttonVariants } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Icons } from '@/components/ui/icons'
import { useCookies } from '@/lib/hooks/use-cookies'
import { AcceptAmbassadorTermsFormSchema } from '@/lib/schemas/ambassador'
import { convertToAmbassador } from '@/lib/services/ambassadors'
import { cn } from '@/lib/utils/style'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

export default function TermsPage() {
    const cookies = useCookies()
    const { replace } = useRouter()
    const form = useForm<z.infer<typeof AcceptAmbassadorTermsFormSchema>>({
        resolver: zodResolver(AcceptAmbassadorTermsFormSchema),
        defaultValues: {
            isChecked: false
        }
    })

    async function handleSubmit() {
        try {
            const user = await convertToAmbassador()
            cookies.set('user', JSON.stringify(user), { path: '/' })
            replace('/namizje/tst-svetovalec')
        } catch (error) {
            if (error instanceof Error) {
                toast.error('Nekaj je šlo narobe.', {
                    description: JSON.parse(error.message).message
                })
            }
        }
    }

    return (
        <>
            <PageHeader className='justify-center'>
                <PageHeaderName className='text-center'>Potrditev Distributerskih Pogojev Poslovanja</PageHeaderName>
            </PageHeader>
            <section className='!max-w-[757px]'>
                <div>
                    <p><strong>Potrditev pogojev poslovanja za distributerje (svetovalce)</strong></p>
                    <p>&nbsp;</p>
                    <ol>
                        <li><strong> Splo&scaron;ne določbe</strong></li>
                    </ol>
                    <p><span><br /></span><span>TST Svetovalec in podjetje Testamenti, d. o. o. (v nadaljevanju: podjetje) skleneta dogovor glede sodelovanja pri celotni ponudbi projekta predstavljenega na spletni strani&nbsp;</span><a href="http://www.tetstament.si/"><span>www.tetstament.si</span></a><span>&nbsp;in uredita transparentno izplačevanje omejenega deleža do preklica oz. poteka pogodbe.&nbsp;</span></p>
                    <ol>
                        <li><span><br /></span><strong> Poročanje</strong></li>
                    </ol>
                    <p>&nbsp;</p>
                    <p><span>TST svetovalec potrjuje, da je razumel splo&scaron;ne pogoje podjetja Testament, d.o.o. predstavljeni na spletni strani&nbsp;</span><a href="http://www.testament.si/"><span>www.testament.si</span></a><span>&nbsp;in zatrjuje, da bo pri svojih aktivnostih, ki jih bo izvajal v imenu podjetja, ravnal kot skrben gospodar.&nbsp;</span></p>
                    <p><span><br /></span><span>TST svetovalec mora vse aktualne informacije iz naslova sodelovanja podjetju sporočati pisno, informacije morajo biti jasne, razločne in razumljive. Komunikacijski kanal za sporočanje informacij je elektronska po&scaron;ta, po dogovoru pa se lahko uporabijo tudi drugi kanali.</span></p>
                    <p>&nbsp;</p>
                    <p><strong>III. Plačilo</strong></p>
                    <p>&nbsp;</p>
                    <p><span>Podjetje se zavezuje, da bodo dogovorjene finančne obveznosti TST svetovalcu&nbsp;poravnane najmanj enkrat mesečno do (18 v mesecu), vključujoč vse do tedaj realizirane aktivnosti, vendar pod pogojem, da je vi&scaron;ina izplačanega zneska najmanj 50&euro;.</span></p>
                    <p><span><br /></span><span>Podjetje bo TST svetovalcu vsakega prvega delovnega dne v mesecu posredovalo izpis in obračun opravljenih storitev za predhodni mesec, kar je podlaga za izdajo računa. Ta seznam prejemkov pregledata poobla&scaron;čenec podjetja in TST svetovalec ter se o morebitnih nejasnostih uskladita v roku 5 delovnih dni od sprejetja poročila.</span></p>
                    <p>&nbsp;</p>
                    <p><span>Podjetje svoje finančne dolžnosti do TST svetovalca izkazuje v bruto zneskih, zato mora TST svetovalec sam poskrbeti za pravno ustreznost in pravilnost svojih finančnih prejemkov.</span></p>
                    <p>&nbsp;</p>
                    <ol>
                        <li><strong> Dolžnost varovanja poslovne skrivnosti in varstvo podatkov</strong></li>
                    </ol>
                    <p>&nbsp;</p>
                    <p><span>Vsebina tega dogovora predstavlja poslovno skrivnost. Stranki v dogovoru se zato zavezujeta, da bosta varovali poslovno skrivnost z namenom za&scaron;čite poslovnih interesov druge stranke v dogovoru, tako med trajanjem te pogodbe kot tudi po njenem prenehanju.&nbsp;</span></p>
                    <p>&nbsp;</p>
                    <p><span>TST svetovalec se zavezuje vse podatke, informacije, zapiske in dokumentacijo, ki mu jih skrbnik podjetja razkrije oziroma izroči za potrebe realizacije naročila, kot tudi druge zapiske in materiale, hraniti na varnem mestu izven dosega nepoobla&scaron;čenih oseb. Prav tako se na zahtevo skrbnika podjetja zavezuje te podatke, informacije, zapiske in dokumentacijo&nbsp; zaradi prenehanja sodelovanja ali drugih vzrokov vrniti podjetju. Informacije, zapiske in drugo dokumentacijo, ki jo je treba zaradi poteka veljavnosti in preteka zakonskega roka za hranjenje uničiti, TST svetovalec to stori na predpisan način in v prisotnosti skrbnika podjetja.</span></p>
                    <p>&nbsp;</p>
                    <p><span>Zaradi varovanja zaupnih podatkov, informacij in poslovnih skrivnosti se stranki v dogovoru zavežeta, da z vsebino in obveznostmi izvirajočih iz tega dogovora ter pogodbe o izvajanju, ne bosta seznanjali tretjih oseb.</span></p>
                    <p>&nbsp;</p>
                    <p><span>Stranki v dogovoru sta soglasni, da se predmet dogovora nana&scaron;a na vse podatke, informacije, poslovne skrivnosti in podobno, ki jih TST svetovalec&nbsp;pridobi od skrbnika, ali pa se TST svetovalec z njimi seznani na kakr&scaron;enkoli drugačen način, ne glede na to, v kak&scaron;ni obliki so ti podatki prezentirani.</span></p>
                    <p><span><br /></span><span>Stranki v dogovoru sogla&scaron;ata, da bosta zagotavljali zaupnost podatkov, in da jih bosta uporabili le za namene realizacije pogodbenih obveznosti.</span></p>
                    <p><span><br /></span><span>V primeru razkritja podatkov brez soglasja ene od strank v dogovoru, ali njihove uporabe v nasprotju z določili tega dogovora, pogodbena stranka, ki zagre&scaron;i nepravilnosti, nosi in prevzame vso materialno in moralno odgovornost, ki je posledica razkritja podatkov.</span></p>
                    <p>&nbsp;</p>
                    <p><span>Ta dogovor ne velja za podatke, ki:</span></p>
                    <ul>
                        <li><span>so splo&scaron;no znani,&nbsp;</span></li>
                        <li><span>jih je treba razkriti, skladno z zakoni ali drugimi predpisi oziroma po odredbi sodi&scaron;ča.</span></li>
                    </ul>
                    <p>&nbsp;</p>
                    <ol>
                        <li><strong> Trajanje dogovora</strong></li>
                    </ol>
                    <p>&nbsp;</p>
                    <p><span>Dogovor je sklenjena za nedoločen čas od trenutka, ko TST svetovalec na spletni strani testament.si v svoji spletni pisarni potrdi, da jih je prejel in razumel. Spremembe in dopolnitve bosta stranki urejali z aneksi in dopolnitvami dogovora.&nbsp;</span></p>
                    <p>&nbsp;</p>
                    <p><span>Stranki v dogovoru lahko kadarkoli prekineta sodelovanje, če druga stranka deluje v nasprotju z dobro vero in po&scaron;tenjem. Pogodbeni stranki se zavežeta vse podatke, ki se nana&scaron;ajo na ali so v zvezi s to pogodbo, ter vse druge podatke, ki niso splo&scaron;no znani in do katerih lahko prideta le ob izvajanju te pogodbe, hraniti kot poslovno skrivnost.</span></p>
                    <ol>
                        <li><span><br /></span><strong> Končne določbe</strong></li>
                    </ol>
                    <p>&nbsp;</p>
                    <p><span>Stranki v dogovoru sogla&scaron;ata, da si bosta vse morebitne spore iz tega dogovora prizadevali re&scaron;iti sporazumno. V kolikor to ne bo možno, pa je za njuno re&scaron;evanje sporov pristojno sodi&scaron;če.&nbsp;</span></p>
                </div>
                <div className={cn('grid gap-6')}>
                    <Form {...form} >
                        <form id='terms' onSubmit={form.handleSubmit(handleSubmit)}>
                            <div className="grid gap-4">
                                <div className="grid gap-1 mt-4">
                                    <FormField
                                        control={form.control}
                                        name="isChecked"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className='flex items-center'>
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                    <FormLabel>S tem izjavljam da so informacije ki jih bom zagotovil resnične in pravilne</FormLabel>
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
            </section>
            <div className='w-full flex justify-center items-center gap-2 p-4 bg-[#FEFEFE]'>
                <Link href='/namizje/tst-svetovalec/become/kako-deluje' className={buttonVariants({ size: 'icon', variant: 'light' })}><Icons.ArrowLeft /></Link>
                <Button
                    form='terms'
                    disabled={form.formState.isSubmitting}
                    className='w-full max-w-[400px]'
                >
                    <span className='flex items-center gap-[10px]'>
                        {form.formState.isSubmitting && (
                            <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        <span className='leading-none '>Potrdi</span>
                    </span>
                </Button>
            </div>
        </>
    )
}
