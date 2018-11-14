import { extendObservable, action } from 'mobx';

export default class datastore {
    constructor() {
        extendObservable(this, {
            forgeCards: [],
            specialCards: [],
            forgeCardsRef: null,
            specialCardsRef: null,
            authenticated: false,
            user: null,
            toggleLogin: action(user => {
                this.authenticated = true;
                this.user = user;
                console.log('toggling login from store');
            }),
            toggleLogout: action(() => {
                this.forgeCardsRef.off();
                this.specialCardsRef.off();
                this.setForgeCards([]);
                this.setSpecialCards([]);
                this.authenticated = false;
                this.user = null;
                console.log('toggling logout from store');
            }),
            setForgeCards: action((forgeCards, ref) => {
                this.forgeCards = forgeCards;
                this.forgeCardsRef = ref;
            }),
            setSpecialCards: action((specialCards, ref) => {
                this.specialCards = specialCards;
                this.specialCardsRef = ref;
            })
        });
    }
}
