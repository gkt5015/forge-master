import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyCz4jRa7Lw8SvRdBWefJIKDBfZTKsrlm_4",
    authDomain: "master-forge.firebaseapp.com",
    databaseURL: "https://master-forge.firebaseio.com",
    projectId: "master-forge",
    storageBucket: "master-forge.appspot.com",
    messagingSenderId: "771858033325"
  };
  firebase.initializeApp(config);
export default firebase;