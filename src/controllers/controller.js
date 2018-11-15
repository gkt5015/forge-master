import firebase from '../api/firebase.js';
import forOwn from 'lodash/forOwn';
import keyBy from 'lodash/keyBy';
import sortBy from 'lodash/sortBy';
import registerWithEmail from '../api/registerWithEmail.js';
import loginWithEmail from '../api/loginWithEmail.js';
import firebaseLogout from '../api/firebaseLogout.js';

export default class controller {
    constructor(ds) {
        this.ds = ds;
        this.init();

        window.ds = this.ds; // helps with debugging. bad idea, otherwise
    }

    downloadSpecialCards = user => {
        const { uid } = user.user;
        const specialCardsRef = firebase
            .database()
            .ref(`users/${uid}/specialCards`);

        specialCardsRef.on('value', snapshot => {
            let specialCardsRaw = snapshot.val();

            const specialCardsArray = [];
            forOwn(specialCardsRaw, (specialCard, specialCardId) => {
                const { name, icon, requirements } = specialCard;

                specialCardsArray.push({
                    id: specialCardId,
                    name,
                    icon,
                    requirements
                });
            });

            const sortedCards = sortBy(specialCardsArray, card => card.name);
            const specialCards = keyBy(sortedCards, 'id');
            this.ds.setSpecialCards(specialCards, specialCardsRef);
        });
    };

    downloadForgeCards = user => {
        const { uid } = user.user;
        const forgeCardsRef = firebase
            .database()
            .ref(`users/${uid}/forgeCards`);

        forgeCardsRef.on('value', snapshot => {
            let forgeCardsRaw = snapshot.val();

            const forgeCardsArray = [];
            forOwn(forgeCardsRaw, (forgeCard, forgeCardId) => {
                const { name, icon } = forgeCard;

                forgeCardsArray.push({
                    id: forgeCardId,
                    name,
                    icon
                });
            });
            const sortedCards = sortBy(forgeCardsArray, card => card.name);
            const forgeCards = keyBy(sortedCards, 'id');
            console.log(forgeCardsRef, ' is reference');
            this.ds.setForgeCards(forgeCards, forgeCardsRef);
        });
    };

    handleRegister = payload => {
        console.log('call register API');
        return registerWithEmail(payload.email, payload.password);
    };

    handleLogin = payload => {
        console.log('call register API');
        return loginWithEmail(payload.email, payload.password);
    };

    handleLogout = () => {
        console.log('call logout API');
        return firebaseLogout().then(this.ds.toggleLogout());
    };

    init() {
        const { user } = this.ds;
        console.log(user, 'is the current user in store');
        if (user === null) {
            console.log('need to log in');
        } else {
            console.log('user found, downloading cards');
            this.downloadSpecialCards(user);
            this.downloadForgeCards(user);
            return user;
        }
    }
}
