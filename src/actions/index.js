import { 
  firestore,
  postsRef,
  postsBodyRef,
  postCommentsRef,
  postDraftsRef,
  userBookmarksRef
} from "../config/firebase.js";

import { 
  LOAD_POSTS,
  LOAD_MOST_LIKED_POSTS,
  LOAD_EDIT_POST,
  REMOVE_USER_POST
} from "./types";

import { 
  LOAD_USER_BOOKMARKS,
  LOAD_USER_POSTS
} from "./types";

export const fetchLatestPosts = () => dispatch => {
  const latestPostsRef = postsRef.orderBy("date_created", "desc").limit(30);
  latestPostsRef.get()
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

export const fetchMostLikedPosts = () => dispatch => {
  const latestPostsRef = postsRef.orderBy("likes", "desc").limit(30);
  latestPostsRef.get()
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
        type: LOAD_MOST_LIKED_POSTS,
        payload: { posts }
      });
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
};

/**
 * 
 * @param {string} uid Auth user uid
 */
export const fetchUserPosts = (uid) => async dispatch => {
  const userPostsref = postsRef.where('uid', '==', uid);

  userPostsref.onSnapshot((snapshot) => {
    const docs = [];

    snapshot.forEach((doc, i) => {
      const data = doc.data();
      docs.push({...data, postId: doc.id});
    });
    dispatch({
      type: LOAD_USER_POSTS,
      posts: docs
    })
  });
};

export const fetchUserBookmarks = (uid) => async dispatch => {
  const userPostsref = userBookmarksRef.where('uid', '==', uid);
  userPostsref.onSnapshot((snapshot) => {
    const docs = [];
    snapshot.forEach(doc => docs.push(doc.data()))

    dispatch({
      type: LOAD_USER_BOOKMARKS,
      bookmarks: docs
    })
  });
};

/**
 * 
 * @param {Object} payload Post data
 */
export const createPost = (payload) => async dispatch => {
  const newPostRef = postsRef.doc();

  const id = newPostRef.id;
  payload.slug = payload.slug + "-" + id;
  payload.likes = 0;
  payload.views = 0;
  
  try {
    await Promise.all([
      newPostRef.set(payload),
      postsBodyRef.doc(id).set({
        body_markdown: "",
        date_modified: new Date()
      })
    ]);
    return(id);
  } catch(e) {
    Promise.reject(e)
  }
};

//TODO; complete Rredux migration
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
        const post = doc.data();
        if (!doc.exists) {
          reject('No such post body document!');
        } else {
          postsBodyRef.doc(postId).collection('comments').get()
          .then(snapshot => {
            const comments = [];
            snapshot.forEach(doc => comments.push(doc.data()))
            post.comments = comments;
            resolve(post);
          });
        }
      })
      .catch((err) => {
        reject(err);
        console.log('Error getting documents', err);
      });
  })
};

/**
 * 
 * @param {String} postId 
 */
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

export const deletePostById = postId => async dispatch => {
  let batch = firestore.batch();
  batch.delete(postDraftsRef.doc(postId));
  batch.delete(postsRef.doc(postId));
  
  batch.delete(postsRef.doc(postId).collection('likes').doc('0'));
  batch.delete(postsBodyRef.doc(postId));

    // Commit the batch
  batch.commit().then(function () {
    dispatch({
      type: REMOVE_USER_POST,
      payload: { postId }
    })
  });

  postCommentsRef.where('postId', '==', postId).get()
  .then(function(querySnapshot) {
    // Once we get the results, begin a batch
    var batch = firestore.batch();

    querySnapshot.forEach(function(doc) {
        // For each doc, add a delete operation to the batch
        batch.delete(doc.ref);
    });
      // Commit the batch
      return batch.commit();
    }).then(function() {
    }); 
};


export const savePostDraftById = (postId, payload) => async dispatch => {
  postDraftsRef.doc(postId).set({
    body_markdown: payload.body_markdown,
    date_modified: new Date()
  });
};

export const publishDraftById = (postId) => async dispatch => {
  postDraftsRef.doc(postId).get()
    .then(doc => {
      if (!doc.exists) {
        Promise.reject('No such document!');
      } else {
        const draft = doc.data();
        postsBodyRef.doc(postId).update({
          body_markdown: draft.body_markdown,
          date_modified: new Date()
        });
        return(draft.body_markdown);
      }
    })
    .then(() => postDraftsRef.doc(postId).delete())
    .catch((err) => {
      Promise.reject(err);
    });
};
