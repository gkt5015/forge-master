import firebase from './firebase.js';

const loginWithEmail = (email, password) => {
    const auth = firebase.auth();
    return auth.signInWithEmailAndPassword(email, password);
};

export default loginWithEmail;
