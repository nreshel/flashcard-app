import firebase from 'firebase';

const DB_CONFIG = {
    apiKey: "AIzaSyCfadgMRTLYxV-JbvRBsg_26u9i0JCjWhE",
    authDomain: "react-flashcards-21788.firebaseapp.com",
    databaseURL: "https://react-flashcards-21788.firebaseio.com",
    projectId: "react-flashcards-21788",
    storageBucket: "",
    messagingSenderId: "637998614295",
    appId: "1:637998614295:web:cc602a04a08098ec"
}

const app = firebase.initializeApp(DB_CONFIG);
export const database = app.database().ref().child('cards'); // learning database
export const databaseLearned = app.database().ref().child('cards-learned'); // learned database
export const databaseDictionary = app.database().ref().child('chinese-dictionary-simplified'); // database of parsed dictionary terms
export const databaseUser = app.database().ref().child('user'); // users in database