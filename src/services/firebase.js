import firebase from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCJpi5VmnJltVUZ9jDFG5lNyGvuJ8aa7EI",
  authDomain: "chat-rooms-813df.firebaseapp.com",
  databaseURL: "https://chat-rooms-813df.firebaseio.com",
  projectId: "chat-rooms-813df",
  storageBucket: "chat-rooms-813df.appspot.com",
  messagingSenderId: "1017492723007",
  appId: "1:1017492723007:web:da3b617e9b57865447ef8a",
  measurementId: "G-NKNPEE0J2J",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const auth = firebase.auth;
export const db = firebase.database();
