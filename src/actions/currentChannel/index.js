import { 
  postsRef,
  userSettingsRef
} from "../../config/firebase";

import { LOAD_CURRENT_CHANNEL_POSTS, REMOVE_CURRENT_CHANNEL_POSTS } from './types';


export const fetchCurrentUserPosts = (username) => async dispatch => {
  const user = await getUserByUserName(username);
  const userPostsref = postsRef.where('uid', '==', user.uid);

  userPostsref.onSnapshot((snapshot) => {
    const docs = [];

    snapshot.forEach((doc, i) => {
      const data = doc.data();
      docs.push({...data, postId: doc.id});
    });

    dispatch({
      type: LOAD_CURRENT_CHANNEL_POSTS,
      posts: docs
    })
  });
};

export const cleanCurrentChannelPosts = () => async dispatch => {
  dispatch({
    type: REMOVE_CURRENT_CHANNEL_POSTS,
  })
};


export const getUserByUserName = (username) => {
  return new Promise((resolve, reject) => {
    const userRref = userSettingsRef.where('USER_NAME', '==', username);
    userRref.get()
      .then(snapshot => {
        const users = [];
        snapshot.forEach(doc => users.push({uid: doc.id}))
        if (users.length === 1) {
          resolve(users[0]);
        } else {
          reject("No single user found!");
        }
      })
      .catch((err) => {
        console.log('Error getting documents', err);
        reject(err);
      });
  })
};