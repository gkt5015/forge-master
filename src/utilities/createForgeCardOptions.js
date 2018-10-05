import forOwn from 'lodash/forOwn'

export const createForgeCardOptions = (forgeCards) => {
    // { value: 'chocolate', label: 'Chocolate' },
    let forgeCardOptions = []
    forOwn(forgeCards, (card, key) => {
        forgeCardOptions.push({ value: key, label: card.name })
    })

    return forgeCardOptions
}