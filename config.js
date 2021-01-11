import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyBvzdi7ClEVorLUUiYAcwgC049CWyK0XOs",
    authDomain: "booksanta-efb07.firebaseapp.com",
    databaseURL: "https://booksanta-efb07.firebaseio.com",
    projectId: "booksanta-efb07",
    storageBucket: "booksanta-efb07.appspot.com",
    messagingSenderId: "987435725561",
    appId: "1:987435725561:web:873e81f0126284f506e828"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();
