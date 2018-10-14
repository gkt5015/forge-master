import firebase from 'firebase';
var config = {
    apiKey: 'AIzaSyDzP5LlreqGk78oafG8YUvidNUFCQ1E2-A',
    authDomain: 'forge-master-dev.firebaseapp.com',
    databaseURL: 'https://forge-master-dev.firebaseio.com',
    projectId: 'forge-master-dev',
    storageBucket: 'forge-master-dev.appspot.com',
    messagingSenderId: '497294960484'
};
firebase.initializeApp(config);
export default firebase;
