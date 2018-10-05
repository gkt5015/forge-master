import firebase from './firebase.js'

const editSpecialCard = (specialCard) => {
    const specialCardRef = firebase.database().ref('specialCards');
    const updates = {
        [specialCard.id]: specialCard
    }
    return specialCardRef.update(updates);
}

export default editSpecialCard
