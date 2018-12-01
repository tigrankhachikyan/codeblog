//import * as firebase from "firebase";
import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import { FirebaseConfig } from "./keys";
firebase.initializeApp(FirebaseConfig);

const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};

firestore.settings(settings);

export const postsRef      = firestore.collection('posts');
export const postsBodyRef  = firestore.collection('postsBody');
export const postDraftsRef = firestore.collection('postDrafts');
export const userSettingsRef = firestore.collection('userSettings');

export const authRef = firebase.auth();
export const providerGoogle   = new firebase.auth.GoogleAuthProvider();
export const providerFacebook = new firebase.auth.FacebookAuthProvider();
