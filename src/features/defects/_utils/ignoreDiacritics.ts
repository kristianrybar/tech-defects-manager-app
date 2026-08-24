export const ignoreDiacritics = (text: string) => {
    if (!text) {
        return ''
    }

    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}