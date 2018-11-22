import { 
  authRef,
  provider,
  postsRef,
  postsBodyRef,
  postDraftsRef
} from "../config/firebase.js";
import { LOAD_POSTS, LOAD_EDIT_POST, FETCH_USER, CREATE_POST } from "./types";
import { ADD_TOAST, REMOVE_TOAST } from "./types";

export const addPost = newPost => dispatch => {
  postsRef.push().set(newPost);
};

export const fetchPosts = () => dispatch => {
  postsRef.get()
    .then((snapshot) => {
      const posts = [];

      snapshot.forEach(doc => {
        const post = {
          postId: doc.id,
          data: doc.data()
        };
        posts.push(post)
      });

      dispatch({
        type: LOAD_POSTS,
        payload: { posts }
      });
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
};

export const fetchUserPosts = (uid) => dispatch => {
  return new Promise((resolve, reject) => {
    const userPostsref = postsRef.where('uid', '==', uid);
    const docs = [];

    userPostsref.get()
      .then((snapshot) => {
        snapshot.forEach((doc, i) => {
          const data = doc.data();
          docs.push({...data, postId: doc.id});
        });
        dispatch({
          type: 'LOAD_USER_POSTS',
          posts: docs
        })
        resolve(docs);
      })
      .catch((err) => {
        console.log('Error getting documents', err);
        reject(err);
      });
  })
};

export const createPost = (payload) => dispatch => {
  return new Promise((resolve, reject) => {
    postsRef.add(payload)
      .then(ref => {
      dispatch({
        type: CREATE_POST,
        payload
      });
      postsBodyRef.doc(ref.id).set({
        body_markdown: "",
        date_modified: new Date()
      });
      resolve(ref.id);
    })
    .catch((err) => {
      reject(err);
      console.log('Error getting documents', err);
    });
  })
};

export const fetchPostById = (postId) => dispatch => {
  return new Promise((resolve, reject) => {
    postsRef.doc(postId).get()
      .then(doc => {
        if (!doc.exists) {
          reject('No such document!');
        } else {
          dispatch({
            type: LOAD_EDIT_POST,
            payload: doc.data()
          });
          resolve(doc.data());
        }
      })
      .catch((err) => {
        reject(err);
        console.log('Error getting documents', err);
      });
  })
};

export const fetchPostBodyById = (postId) => dispatch => {
  return new Promise((resolve, reject) => {
    postsBodyRef.doc(postId).get()
      .then(doc => {
        if (!doc.exists) {
          reject('No such document!');
        } else {
          resolve(doc.data());
        }
      })
      .catch((err) => {
        reject(err);
        console.log('Error getting documents', err);
      });
  })
};

export const fetchPostDraftById = (postId) => dispatch => {
  return new Promise((resolve, reject) => {
    postDraftsRef.doc(postId).get()
      .then(doc => {
        if (!doc.exists) {
          resolve(null);
        } else {
          resolve(doc.data());
        }
      })
      .catch((err) => {
        reject(err);
        console.log('Error getting documents', err);
      });
  })
};

export const fetchUserPostBySlug = (uid, slug) => dispatch => {
  return new Promise((resolve, reject) => {
    const postRef = postsRef.where("uid", "==", uid).where("slug", "==", slug)
    postRef.get()
      .then(doc => {
        if (!doc.exists) {
          reject('No such document!');
        } else {
          resolve(doc.data());
        }
      })
      .catch((err) => {
        reject(err);
        console.log('Error getting documents', err);
      });
  })
};

export const savePostById = (postId, payload) => dispatch => {
  return new Promise((resolve, reject) => {
    postsRef.doc(postId).update({
      body_markdown: payload.body_markdown,
      date_modified: new Date()
    });
    resolve();
  })
};

export const savePostDraftById = (postId, payload) => dispatch => {
  return new Promise((resolve, reject) => {
    postDraftsRef.doc(postId).set({
      body_markdown: payload.body_markdown,
      date_modified: new Date()
    });
    resolve();
  })
};

export const publishDraftById = (postId) => dispatch => {
  return new Promise((resolve, reject) => {
    postDraftsRef.doc(postId).get()
      .then(doc => {
        if (!doc.exists) {
          reject('No such document!');
        } else {
          const draft = doc.data();
          postsBodyRef.doc(postId).update({
            body_markdown: draft.body_markdown,
            date_modified: new Date()
          });
          resolve();
        }
      })
      .then(() => postDraftsRef.doc(postId).delete())
      .catch((err) => {
        reject(err);
        console.log('Error getting documents', err);
      });
  })
};


export const fetchUser = () => dispatch => {
  authRef.onAuthStateChanged(user => {
    if (user) {
      dispatch({
        type: FETCH_USER,
        payload: user
      });
    } else {
      dispatch({
        type: FETCH_USER,
        payload: null
      });
    }
  });
};

export const signIn = () => dispatch => {
  authRef
    .signInWithPopup(provider)
    .then(result => {})
    .catch(error => {
      console.log(error);
    });
};

export const signOut = () => dispatch => {
  authRef
    .signOut()
    .then(() => {
      // Sign-out successful.
    })
    .catch(error => {
      console.log(error);
    });
};

export const addToast = (options = {}) => (dispatch, getState) => {
  const { toasts } = getState();
  dispatch({
    payload: options,
    type: ADD_TOAST
  });
  setTimeout(() => {
    dispatch({
      payload: toasts.id,
      type: REMOVE_TOAST
    })
  }, 2000);
}

export const removeToast = (id) => dispatch => {
  dispatch({
    payload: id,
    type: REMOVE_TOAST
  });
}