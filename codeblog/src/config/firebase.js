import * as firebase from "firebase";

import { FirebaseConfig } from "./keys";
firebase.initializeApp(FirebaseConfig);

// const databaseRef = firebase.database().ref();
// export const postsRef = databaseRef.child("posts");

const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};

firestore.settings(settings);

export const postsRef = firestore.collection('posts');

