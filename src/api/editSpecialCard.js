import firebase from './firebase.js';

const editSpecialCard = (specialCard, user) => {
    const specialCardRef = firebase
        .database()
        .ref(`users/${user.uid}/specialCards`);
    const updates = {
        [specialCard.id]: specialCard
    };
    return specialCardRef.update(updates);
};

export default editSpecialCard;
