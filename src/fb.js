import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDOQbfRTLEnpCt2Yt7zuFBHpaakdBbkqWw",
    authDomain: "todo-f84cb.firebaseapp.com",
    databaseURL: "https://todo-f84cb.firebaseio.com",
    projectId: "todo-f84cb",
    storageBucket: "todo-f84cb.appspot.com",
    messagingSenderId: "263503468428",
    appId: "1:263503468428:web:d3ddf4f80631253a"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();
  db.settings({ });

  export default db;
  export { auth };
  