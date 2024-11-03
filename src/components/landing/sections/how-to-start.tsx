import { Button } from '@/components/ui/button'
import ProcessProgress from '../ui/process-progress'

export default function HowToStart() {
    return (
        <section className="flex w-screen flex-col bg-primary-dark-gray py-16 px-4 lg:px-44 gap-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-h1 text-primary-white">Kako začeti?</h2>
                <Button className='hidden lg:flex'>Kontaktirajte nas</Button>
            </div>
            <p className='border-l-2 border-primary-medium-gray text-primary-light-gray text-h6 pl-6 lg:pl-12 max-w-[600px]'>
                Postopki so lahko zapleteni, dolgotrajni in kompleksni. Zato prepustite delo nam, kjer vam 100% jamčimo zadovoljstvo, diskretnost in profesionalnost.
                <Button className='lg:hidden flex mt-6'>Kontaktirajte nas</Button>
            </p>
            <div className="w-full flex items-center bg-primary-dark-gray py-12">
                <ProcessProgress step={3} />
            </div>
        </section>
    )
}
