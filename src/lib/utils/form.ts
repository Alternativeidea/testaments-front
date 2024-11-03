export function allowOnlyLetters(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key.length === 1 && !/^[a-zA-Z\u00C0-\u017F\s]+$/g.test(e.key)) {
        e.preventDefault()
    }
}

export function allowOnlyNumbers(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key.length === 1 && !/^[0-9]+$/.test(e.key)) {
        e.preventDefault()
    }
}

export function allowOnlyAlphanumeric(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key.length === 1 && !/^[a-zA-Z0-9]+$/.test(e.key)) {
        e.preventDefault()
    }
}

export function preventWheel(e: React.WheelEvent<HTMLInputElement>) {
    e.currentTarget.blur()
}
