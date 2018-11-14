import firebase from './firebase.js';

const editForgeCard = (forgeCard, user) => {
    const forgeCardRef = firebase
        .database()
        .ref(`users/${user.uid}/forgeCards`);
    const updates = {
        [forgeCard.id]: forgeCard
    };
    return forgeCardRef.update(updates);
};

export default editForgeCard;
