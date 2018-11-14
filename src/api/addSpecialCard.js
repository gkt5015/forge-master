import firebase from './firebase.js';

const addSpecialCard = (specialCard, user) => {
    const specialCardRef = firebase
        .database()
        .ref(`users/${user.uid}/specialCards`);
    return specialCardRef.push(specialCard);
};

export default addSpecialCard;
