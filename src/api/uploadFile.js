import firebase from './firebase.js'

// returns uploadTask, which can be used to track progress
const uploadFile = ({ file }) => {
    // Create a root reference
    var storageRef = firebase.storage().ref();

    // Create a reference to 'mountains.jpg'
    const nowTimestamp = + new Date()
    var fileRef = storageRef.child(`${nowTimestamp}-${file.name}`);

    const uploadTask = fileRef.put(file)
    return uploadTask
}

export default uploadFile