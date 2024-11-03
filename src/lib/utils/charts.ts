export function generateData(period: number, minPrice: number, maxPrice: number): { time: string, cena: number }[] {
    const data = []

    function generateSmoothVariation(previousPrice: number): number {
        const minChange = -3
        const maxChange = 3
        const change = Math.random() * (maxChange - minChange) + minChange
        return previousPrice + change
    }

    const currentDate = new Date()

    if (period === 1) {
        for (let i = 0; i < 10; i++) {
            const hour = (currentDate.getHours() < 10 ? '0' : '') + currentDate.getHours()
            const minutes = (currentDate.getMinutes() < 10 ? '0' : '') + currentDate.getMinutes()
            const formattedTime = `${hour}:${minutes}`
            const price = generateSmoothVariation(data.length > 0 ? data[data.length - 1].cena : (minPrice + maxPrice) / 2)
            data.push({ time: formattedTime, cena: price })
            currentDate.setMinutes(currentDate.getMinutes() - 15) // Resta 15 minutos
        }
    } else if (period <= 7) {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        for (let i = 0; i < 7; i++) {
            const formattedTime = daysOfWeek[currentDate.getDay()]
            const price = generateSmoothVariation(data.length > 0 ? data[data.length - 1].cena : (minPrice + maxPrice) / 2)
            data.push({ time: formattedTime, cena: price })
            currentDate.setDate(currentDate.getDate() - 1) // Resta 1 día
        }
    } else if (period <= 30) {
        for (let i = 0; i < 30; i++) {
            const formattedTime = currentDate.getDate().toString()
            const price = generateSmoothVariation(data.length > 0 ? data[data.length - 1].cena : (minPrice + maxPrice) / 2)
            data.push({ time: formattedTime, cena: price })
            currentDate.setDate(currentDate.getDate() - 1) // Resta 1 día
        }
    } else if (period <= 180) {
        const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        for (let i = 0; i < 6; i++) {
            const formattedTime = monthsOfYear[currentDate.getMonth()]
            const price = generateSmoothVariation(data.length > 0 ? data[data.length - 1].cena : (minPrice + maxPrice) / 2)
            data.push({ time: formattedTime, cena: price })
            currentDate.setMonth(currentDate.getMonth() - 1) // Resta 1 mes
        }
    } else {
        const years = []
        const currentYear = currentDate.getFullYear()
        for (let i = 5; i > 0; i--) {
            years.push(currentYear - i)
        }
        for (const year of years) {
            const formattedTime = year.toString()
            const price = generateSmoothVariation(data.length > 0 ? data[data.length - 1].cena : (minPrice + maxPrice) / 2)
            data.push({ time: formattedTime, cena: price })
        }
    }

    return data
}
