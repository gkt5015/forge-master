import firebase from './firebase.js';

const addForgeCard = (forgeCard, user) => {
    const forgeCardRef = firebase
        .database()
        .ref(`users/${user.uid}/forgeCards`);
    return forgeCardRef.push(forgeCard);
};

export default addForgeCard;
