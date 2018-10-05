import firebase from './firebase.js'

const addSpecialCard = (specialCard) => {
    const specialCardRef = firebase.database().ref('specialCards');
    return specialCardRef.push(specialCard);
}

export default addSpecialCard
