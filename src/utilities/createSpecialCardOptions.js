import forOwn from 'lodash/forOwn'

export const createSpecialCardOptions = (specialCards) => {
    // { value: 'chocolate', label: 'Chocolate' },
    let specialCardOptions = []
    
    forOwn(specialCards, (card, key) => {
        specialCardOptions.push({ value: key, label: card.name })
    })
    
    return specialCardOptions
}