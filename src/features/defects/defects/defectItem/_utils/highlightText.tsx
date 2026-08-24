import { ignoreDiacritics } from '~/defects/_utils/ignoreDiacritics'


export const highlightText = (text: string, searchTerm: string) => {
    if (!searchTerm || !text)  {
        return text
    }

    const escapedSearchTerm = _escapeRegExp(ignoreDiacritics(searchTerm.toLowerCase()))

    // Normalizovaný text (bez diakritiky) použijeme na vyhľadávanie
    const normalizedText = ignoreDiacritics(text.toLowerCase())
    
    // Vytvorenie regulárneho výrazu s escapovaným hľadaným termínom
    const regex = new RegExp(`(${escapedSearchTerm})`, 'gi')
    const parts = normalizedText.split(regex)

    // Zvýraznenie textu s diakritikou a špeciálnymi znakmi
    let currentIndex = 0
    return parts.map((part, index) => {
        const originalPart = text.slice(currentIndex, currentIndex + part.length)
        currentIndex += part.length
        
        if (ignoreDiacritics(part) != ignoreDiacritics(searchTerm.toLowerCase())) {
            return originalPart
        }
        
        return <span key={index} style={{ backgroundColor: 'orange' }}>{originalPart}</span>
    })
}

// Funkcia na escapovanie všetkých špeciálnych znakov v hľadanom termíne
const _escapeRegExp = (str: string) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}