export function useReadableDate(date) {
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    }
    let time = new Date(date)
        .toLocaleDateString('fr-FR', options)
        .replace(/./, (c) => c.toUpperCase())
        .replace(/,? /, ', ')
    return time
}