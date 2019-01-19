import firebase from 'firebase'

let config = {
    apiKey: "AIzaSyD88Y6u-KAZIkOEZBfPVE8qEOedzmn0pf8",
    authDomain: "kay-capstone-frontend.firebaseapp.com",
    databaseURL: "https://kay-capstone-frontend.firebaseio.com",
    projectId: "kay-capstone-frontend",
    storageBucket: "kay-capstone-frontend.appspot.com",
    messagingSenderId: "788353942103"
  };
  firebase.initializeApp(config);

  export default firebase;
