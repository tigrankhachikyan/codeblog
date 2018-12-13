import { 
  firestore,
  postsRef,
  postsBodyRef,
  postCommentsRef,
  userBookmarksRef
} from "../../config/firebase.js";

import { 
  LOAD_CURRENT_POST,
  LOAD_CURRENT_POST_COMMENTS,
  REMOVE_CURRENT_POST,
  INCREMENT_TOTAL_LIKES,
  DECREMENT_TOTAL_LIKES
} from "./types";


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
      
      if (post.private) {
        dispatch({
          type: "CURRENT_POST_LOADING_ERROR",
          error: "Failed to laod post"
        })
      }

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
    dispatch({
      type: REMOVE_CURRENT_POST
    });
    dispatch({
      type: "CURRENT_POST_LOADING_ERROR",
      error: "Failed to laod post"
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

  toggleLike(auth.uid, post).then(() => {
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

        if (liked) {
          transaction.delete(userLikeRef);
          transaction.delete(userLikesStorageRef);
          transaction.update(postRef, { likes: res.data().likes - 1 });
        } else {
          transaction.set(userLikeRef, { e: true });
          transaction.set(userLikesStorageRef, {
            title: post.title,
            slug: post.slug
          });
          transaction.update(postRef, { likes: res.data().likes + 1 });
        }
        resolve();
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
        let newViewsCount = (res.data().views || 0) + 1;

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
