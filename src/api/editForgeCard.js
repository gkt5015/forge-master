import firebase from './firebase.js';

const editForgeCard = forgeCard => {
    const forgeCardRef = firebase.database().ref('forgeCards');
    const updates = {
        [forgeCard.id]: forgeCard
    };
    return forgeCardRef.update(updates);
};

export default editForgeCard;
