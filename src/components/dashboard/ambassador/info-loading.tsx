import { Skeleton } from '@/components/ui/skeleton'

export function AmbassadorInfoLoading() {
    return (
        <div className="w-full flex h-full flex-col flex-auto gap-4">
            <div className="bg-gradient-gold flex gap-4 flex-col justify-center flex-auto p-6 text-primary-white">
                <div className='flex gap-2 items-end'>
                    <Skeleton className='h-14 w-40' />
                    <span className="text-h4 font-baskerville "> EUR</span>
                </div>
                <span className="text-primary-light-gray font-bold text-body-extra-small">PROMET VSE SKUPAJ</span>
            </div>
            <div className="flex gap-x-4 overflow-x-auto no-scrollbar">
                <div className="w-full flex flex-col bg-primary-dark-gray px-6 text-primary-white space-y-4 pb-7 pt-14">
                    <div className='flex gap-2 items-end'>
                        <Skeleton className='h-[37px] w-28' />
                        <span className="text-body-big-2 font-baskerville "> EUR</span>
                    </div>
                    <p className="text-primary-light-gray font-bold text-body-extra-small text-nowrap">PROMET ČLANARINE</p>
                </div>
                <div className="w-full flex flex-col bg-primary-dark-gray px-6 text-primary-white space-y-4 pb-7 pt-14">
                    <div className='flex gap-2 items-end'>
                        <Skeleton className='h-[37px] w-28' />
                        <span className="text-body-big-2 font-baskerville "> EUR</span>
                    </div>
                    <p className="text-primary-light-gray font-bold text-body-extra-small text-nowrap">PROMET TST</p>
                </div>
            </div>
        </div>
    )
}
