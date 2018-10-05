import firebase from './firebase.js'

const addForgeCard = (forgeCard) => {
    const forgeCardRef = firebase.database().ref('forgeCards');
    return forgeCardRef.push(forgeCard);
}

export default addForgeCard
