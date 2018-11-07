import firebase from './firebase.js';

const registerWithEmail = (email, password) => {
    const auth = firebase.auth();
    return auth.createUserWithEmailAndPassword(email, password);
};

export default registerWithEmail;
