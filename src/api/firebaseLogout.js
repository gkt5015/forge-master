import firebase from './firebase.js';

const firebaseLogout = () => {
    const auth = firebase.auth();
    return auth.signOut();
};

export default firebaseLogout;
