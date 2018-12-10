import { 
  firestore,
  postsRef,
  postsBodyRef,
  postCommentsRef,
  postDraftsRef,
  userBookmarksRef
} from "../config/firebase.js";

import { LOAD_POSTS, LOAD_EDIT_POST, REMOVE_USER_POST } from "./types";
import { 
  LOAD_USER_BOOKMARKS,
  LOAD_USER_POSTS
} from "./types";

import { 
  LOAD_CURRENT_POST,
  LOAD_CURRENT_POST_COMMENTS,
  REMOVE_CURRENT_POST,
  INCREMENT_TOTAL_LIKES,
  DECREMENT_TOTAL_LIKES
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

/**
 * 
 * @param {*} postId 
 * @param {*} payload 
 */
export const addPostComment = (postId, payload) => async dispatch => {
  try {
    postCommentsRef.doc().set({
      ...payload,
      postId,
      dateCreated: new Date()
    });
  } catch(e) {
    console.log(e);
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

export const cleanCurrentpost = () => async dispatch => {
  dispatch({
    type: REMOVE_CURRENT_POST
  })
}

/**
 * Fetch Current post data
 * loads post meta and body in parallel
 * and then comments if any
 * 
 * @param {*} slug 
 */
export const fetchPostBySlug = (slug, auth) => async dispatch => {
  const matched = /-([^-]+)$/.exec(slug);
  const postId = matched[1];

  const postRef     = postsRef.doc(postId);
  const postBodyRef = postsBodyRef.doc(postId);

  try {
    const [
      postSnapshot,
      postBodySnapshot
    ] = await Promise.all([
      postRef.get(),
      postBodyRef.get()
    ]);
    if (postSnapshot.exists && postBodySnapshot.exists) {
      let post = {postId, ...postSnapshot.data()};
      let postBody = {postId, ...postBodySnapshot.data()};
      
      dispatch({
        type: LOAD_CURRENT_POST,
        payload: {
          post,
          postBody,
        }
      })

      postCommentsRef.where('postId', '==', postId).orderBy('dateCreated')
        .onSnapshot(function(querySnapshot) {
          const comments = [];
          querySnapshot.forEach(doc => comments.push({...doc.data(), id: doc.id}));

          dispatch({
            type: LOAD_CURRENT_POST_COMMENTS,
            payload: {
              comments
            }
          })
        });
      setTimeout(() => viewPost(postId), 4000);
    } else {
      throw new Error(`No Post found with postId: ${postId}`);
    }

  } catch(e) {
    console.log(e);
    dispatch({
      type: REMOVE_CURRENT_POST
    })
  }
}

export const doILikedPost = () => async (dispatch, getState) => {
  const { auth, currentPost } = getState();
  if (!auth) return;

  postsRef.doc(currentPost.post.postId).collection('likes').doc(auth.uid).get().then(doc => {

    if (doc.exists) {
      dispatch({
        type: LOAD_CURRENT_POST,
        payload: {
          iLiked: true
        }
      })
    }
  })
}
/**
 * 
 * @param {*} post 
 */
export const likePost = (post) => async (dispatch, getState) => {
  const { auth, currentPost } = getState();

  if (!auth) {
    console.log("Unauthorized users can't like the post");
    return;
  };

  toggleLike(auth.uid, post).then(post => {
    currentPost.iLiked
      ? dispatch({ type: DECREMENT_TOTAL_LIKES})
      : dispatch({ type: INCREMENT_TOTAL_LIKES})
  });
};

function toggleLike(uid, post) {
  return new Promise((resolve, reject) => {
  // Create a reference for a new rating, for use inside the transaction
  let postRef     = postsRef.doc(post.postId);
  let userLikeRef = postRef.collection('likes').doc(uid);
  let userLikesStorageRef = firestore.collection('userLikes').doc(`${uid}-${post.postId}`);

  userLikeRef.get().then(docSnapshot => {
    const liked = docSnapshot.exists;

    return firestore.runTransaction(transaction => {
      return transaction.get(postRef).then(res => {
        if (!res.exists) Promise.reject("Document does not exist!");

        let newLikesCount = res.data().likes + (liked ? -1 : 1);
        transaction.update(postRef, {
          likes: newLikesCount
        });

        if (liked) {
          transaction.delete(userLikeRef);
          transaction.delete(userLikesStorageRef)
        } else {
          transaction.set(userLikeRef, { e: true });
          transaction.set(userLikesStorageRef, {
            title: post.title,
            slug: post.slug
          })
        }
        resolve({...res.data(), postId: res.id, likes: newLikesCount})
      })
    });
  });
  })
}


export const viewPost = (postId) => {
  const postRef = postsRef.doc(postId);
  // incrementCounter(firestore, postRef, 0, "views");
  postRef.get().then(docSnapshot => {
    // In a transaction, add the new rating and update the aggregate totals
    return firestore.runTransaction(transaction => {
      return transaction.get(postRef).then(res => {
        if (!res.exists) {
            throw "Document does not exist!";
        }

        // Compute new number of ratings
        var newViewsCount = res.data().views + 1;

        // Commit to Firestore
        transaction.update(postRef, {
          views: newViewsCount
        });
      })
    });
  });
};

/**
 * 
 * @param {*} uid 
 * @param {*} post 
 */
export const bookmarkPost = (uid, post) => async dispatch => {
  const userBookmarkRef = userBookmarksRef.doc(uid).collection(post.postId).doc();
  userBookmarkRef.set({
    title: post.title,
    slug: post.slug
  });
};
