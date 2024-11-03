export function withCommas(number: number, decimals = 2) {
    return number.toLocaleString('en-US', {
        style: 'decimal',
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    })
}

export function toCurrency(number: number, currency = 'EUR', isRounded = true) {
    return number.toLocaleString('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: isRounded ? 0 : undefined
    })
}

/**
 * Statuses:
 * IN_PROCESS: 0 (reloj)
 * ACCEPTED: 1
 * DECLINED: 2
 *  -- When User sends to another User TST
 * USER_PENDING: 3 (reloj)
 * USER_RECIVED: 4
 *
 * Types:
 * INCOMING: 0 (entrada)
 * OUTCOMING: 1 (salida)
 * TRANSFER: 2
 *   - Cuando eres usuario enviador esto es Outcoming (salida)
 *   - Cuando eres usuario receptor esto es Incoming (entrada)
 * MANUALLY_ADD: 3 (entrada)
 * MANUALLY_RETURN: 4 (salida)
 *
 */

export function getPoslanoLabel(type: string, owner: boolean = true, status: string = '0') {
    if (owner) {
        if (status.toString() === '4') { return 'Prejeto' }
        return 'Poslano'
        // TODO: cuándo el usuario está recibiendo los TST,
        // tiene que cambiar un poco tanto la fila como los detalles
    }

    if (type.toString() === '2') { return 'Poslano' }
    // if (type.toString() === '0' || type.toString() === '3') { return 'Dodano' }
    if ((type.toString() === '0' || type.toString() === '3') && status.toString() === '0') {
        return 'Dodajanje'
    }
    if ((type.toString() === '0' || type.toString() === '3') && status.toString() === '1') {
        return 'Dodano'
    }
    return 'Vračilo'
}

export function getDodajanjeLabel(type: string, owner: boolean = true, status: string = '0') {
    if (owner) {
        if (status.toString() === '4') { return 'Prejeto' }
        return 'Poslano'
        // TODO: cuándo el usuario está recibiendo los TST,
        // tiene que cambiar un poco tanto la fila como los detalles
    }
    if (type.toString() === '2') { return 'Poslano' }
    if (type.toString() === '0' || type.toString() === '3') { return 'Dodajanje' }
    return 'Vračilo'
}

export function getPlusLabel(type: string, owner: boolean = true, status: string = '0') {
    if (owner) {
        if (status.toString() === '4') { return '+ ' }
        return '- '
        // TODO: cuándo el usuario está recibiendo los TST,
        // tiene que cambiar un poco tanto la fila como los detalles
    }
    if (type.toString() === '0' || type.toString() === '3') { return '+ ' }
    return '- '
}

export const formatData = (num: number, identifier: string = 'U'): string => `${identifier}${num.toString().padStart(4, '0')}`
