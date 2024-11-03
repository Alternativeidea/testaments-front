export function getYearsToNow(fromYear: number, toYear: Date = new Date()) {
    const yearsArray = []

    for (let year = fromYear; year <= toYear.getFullYear(); year++) {
        yearsArray.push(year)
    }

    return yearsArray
}

export function timeLeft(date: Date) {
    const now = new Date().getTime()
    const futureDate = new Date(date).getTime()

    const timeleft = futureDate - now

    const days = Math.floor(timeleft / (1000 * 60 * 60 * 24))
    const hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60))

    // return `${days} days, ${hours} hours, ${minutes} minutes`
    return `${days}D : ${hours}H : ${minutes}M`
}

export function formatDate(date: Date | string): string {
    if (typeof date === 'string') {
        if (date.includes('T')) {
            date = new Date(date)
        } else {
            date = new Date(date + 'T00:00:00Z')
        }
    }

    const months: string[] = [
        'jan', 'feb', 'mar', 'apr', 'maj', 'jun',
        'jul', 'avg', 'sep', 'okt', 'nov', 'dec'
    ]

    const day: number = date.getUTCDate()
    const month: string = months[date.getMonth()]
    const year: number = date.getFullYear()
    return `${day}. ${month} ${year}`
}

export function getMonth(date: Date | string): string {
    if (typeof date === 'string') {
        if (date.includes('T')) {
            date = new Date(date)
        } else {
            date = new Date(date + 'T00:00:00Z')
        }
    }

    const months: string[] = [
        'jan', 'feb', 'mar', 'apr', 'maj', 'jun',
        'jul', 'avg', 'sep', 'okt', 'nov', 'dec'
    ]

    const month: string = months[date.getMonth()]
    return `${month}`
}

export function formatDateWithNumbers(date: Date | string, separator: string = '-'): string {
    if (typeof date === 'string') {
        if (date.includes('T')) {
            date = new Date(date)
        } else {
            date = new Date(date + 'T00:00:00Z')
        }
    }

    const day: number = date.getUTCDate()
    const month: number = date.getUTCMonth() + 1
    const year: number = date.getFullYear()

    return `${day}${separator}${month}${separator}${year}`
}
