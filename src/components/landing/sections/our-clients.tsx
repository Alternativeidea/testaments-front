import QuoteCard from '../ui/quote-card'

export default function OurClients() {
    const testimonials = [
        {
            content: 'Ko je naša babica nenadoma preminila, nismo vedeli, kje začeti z urejanjem vseh njenih zadev. Zahvaljujoč TESTAMENT.SI smo v tem težkem času našli jasnost in organizacijo. Storitev je bila neprecenljiva in olajšala je celoten proces. Toplo priporočamo.',
            author: 'Družina Bergant'
        },
        {
            content: '“TESTAMENT.SI nam je dal mir v srcu, saj smo vedeli, da so vse zadeve urejene in na enem mestu. V težkih časih je pomembno imeti nekoga, ki ti stoji ob strani in TESTAMENT.SI je bil ta partner za nas. Najlepša hvala za vašo prijaznost in profesionalost.”',
            author: 'Družina Marčič'
        },
        {
            content: '"Iskreno nismo vedeli, kaj pričakovati, ko smo se pridružili TESTAMENT.SI, vendar smo bili prijetno presenečeni. Vsak detajl je bil skrbno obdelan, kar nam je omogočilo, da smo se osredotočili na žalovanje in spomin na našega dragega.”',
            author: 'Družina Vidmar'
        }
    ]
    return (
        <section className="flex flex-col lg:items-center justify-center gap-y-12 py-16 overflow-clip w-full">
            <h2 className="text-h5 text-left lg:text-center lg:text-h1 text-chapaza">Naše stranke</h2>
            <p className="max-w-full text-left text-h6">
                Pri TESTAMENT.SI smo tu, da vam stojimo ob strani in vam pomagamo pri najpomembnejših odločitvah v življenju.
            </p>
            <div className="flex gap-6 snap-x snap-mandatory w-screen overflow-x-scroll lg:overflow-hidden">
                {testimonials.map((card) =>
                    <div key={card.author} className='snap-center min-w-[300px]'>
                        <QuoteCard
                            content={card.content}
                            author={card.author}
                        />
                    </div>
                )}
            </div>
        </section>
    )
}
