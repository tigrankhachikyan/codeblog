import * as firebase from "firebase";

import { FirebaseConfig } from "./keys";
firebase.initializeApp(FirebaseConfig);

const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};

firestore.settings(settings);

export const postsRef = firestore.collection('posts');

export const authRef = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
