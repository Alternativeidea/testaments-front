import { Icons } from '@/components/ui/icons'
interface toInterface {
    id: number
    email: string
}

export function TransactionIcon({ status, type, to, cuId }: { status: string, type: string, to: toInterface, cuId: number }) {
    return (
        <>
            {
                // TO igual a null es normal, TST de compra o venta
                // Sino es una transaccion entre usuarios
                to === null
                    ? status === '0' || status === '3'
                        ? <Icons.Clock className='text-accent-green'/>
                        : type === '0' || type === '3'
                            ? <Icons.ArrowDownCircle className={`${(status === '2' || status === '5') ? 'text-accent-red' : ''}`}/>
                            : <Icons.ArrowUpCircle className={`${(status === '2' || status === '5') ? 'text-accent-red' : ''}`}/>
                    : cuId === to.id // estamos viendo la vista del receptor
                        ? status === '0' || status === '3'
                            ? <Icons.Clock className='text-accent-green'/>
                            : type === '2'
                                ? <Icons.ArrowDownCircle className={`${(status === '2' || status === '5') ? 'text-accent-red' : ''}`}/>
                                : <Icons.ArrowUpCircle className={`${(status === '2' || status === '5') ? 'text-accent-red' : ''}`}/>
                        : status === '0' || status === '3'
                            ? <Icons.Clock className='text-accent-green'/>
                            : type === '0' || type === '3'
                                ? <Icons.ArrowDownCircle className={`${(status === '2' || status === '5') ? 'text-accent-red' : ''}`}/>
                                : <Icons.ArrowUpCircle className={`${(status === '2' || status === '5') ? 'text-accent-red' : ''}`}/> // Estamos viendo la vista del sender

            }
        </>
    )
}
