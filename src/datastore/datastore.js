import { extendObservable, action } from 'mobx';

export default class datastore {
    constructor() {
        extendObservable(this, {
            forgeCards: [],
            specialCards: [],
            authenticated: false,
            user: null,
            toggleLogin: action(user => {
                this.authenticated = true;
                this.user = user;
                console.log('toggling login from store');
            }),
            toggleLogout: action(() => {
                this.authenticated = false;
                this.user = null;
                console.log('toggling logout from store');
            })
        });
    }
}
