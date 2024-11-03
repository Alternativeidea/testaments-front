import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Icons } from '@/components/ui/icons'
import { Separator } from '@/components/ui/separator'

interface FaqsAccordionProps {
    faqs: FaqProps[]
}
export default function FaqsAccordion({ faqs }: FaqsAccordionProps) {
    return (
        <Accordion type="single" collapsible className="w-full">
            {
                faqs.map(({ question, response, answers }, i) => (
                    <AccordionItem key={question} value={'item' + i + question}>
                        <AccordionTrigger className='[&[data-state=open]>.minus]:block [&[data-state=open]>.plus]:hidden text-body-big-2 text-left'>
                            <Icons.Minus className="minus h-6 w-6 shrink-0 duration-200 hidden text-primary-dark-gray" />
                            <Icons.Plus className="plus h-6 w-6 shrink-0 duration-200 text-primary-dark-gray" />
                            {question}
                        </AccordionTrigger>

                        <AccordionContent>
                            <p className='pl-10'>{response}</p>
                            {answers && (
                                <ol className='list-decimal pl-10 list-none'>
                                    {answers?.map(item => (
                                        <li key={item} className='text-body-medium'>{item}</li>
                                    ))}
                                </ol>
                            )}
                        </AccordionContent>
                        <Separator className='w-[calc(100%-40px)] bg-primary-light-gray ml-auto' />
                    </AccordionItem>
                ))
            }
        </Accordion>
    )
}
