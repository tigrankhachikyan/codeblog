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
  REMOVE_CURRENT_POST
} from "./types";

export const fetchLatestPosts = () => dispatch => {
  const latestPostsRef = postsRef.orderBy("date_created").limit(20);
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
  createCounter(newPostRef, 1, "likes");
  createCounter(newPostRef, 1, "views");

  const id = newPostRef.id;
  payload.slug = payload.slug + "-" + id;
  
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
  batch.delete(postsRef.doc(postId).collection('views').doc('0'));
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
export const fetchPostBySlug = (slug) => async dispatch => {
  const matched = /-([^-]+)$/.exec(slug);
  const postId = matched[1];

  const postRef     = postsRef.doc(postId);
  const postBodyRef = postsBodyRef.doc(postId);
  
  let post     = null;
  let postBody = null;

  try {
    const [
      postSnapshot,
      postBodySnapshot
    ] = await Promise.all([
      postRef.get(),
      postBodyRef.get()
    ]);
    if (postSnapshot.exists && postBodySnapshot.exists) {
      post = {postId, ...postSnapshot.data()};
      postBody = {postId, ...postBodySnapshot.data()};

      const [likes, views] = await Promise.all([
        getCount(postRef, 'likes'),
        getCount(postRef, 'views')
      ]);

      dispatch({
        type: LOAD_CURRENT_POST,
        payload: {
          likes,
          views
        }
      });

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
      
    } else {
      throw new Error(`No Post found with postId: ${postId}`);
    }
    dispatch({
      type: LOAD_CURRENT_POST,
      payload: {
        post, postBody,
      }
    })
    postRef.onSnapshot(doc => 
      dispatch({
        type: LOAD_CURRENT_POST,
        payload: {
          post,
        }
      })
    );
    incrementCounter(firestore, postRef, 0, "views");

  } catch(e) {
    console.log(e);
    dispatch({
      type: REMOVE_CURRENT_POST
    })
  }
}

export const likePost = (postId) => async (dispatch, getState) => {
  const { auth } = getState();
  if (!auth) {
    console.log("Unauthorized users can't like the post");
    return;
  };

  const postRef = postsRef.doc(postId);
  incrementCounter(firestore, postRef, 0, "likes")
    .then(likes => dispatch({
        type: LOAD_CURRENT_POST,
        payload: { likes }
      })
    )
};

export const viewPost = (postId) => async dispatch => {
  const postRef = postsRef.doc(postId);
  incrementCounter(firestore, postRef, 0, "views");
};

/**
 * 
 * @param {*} uid 
 * @param {*} post 
 */
export const bookmarkPost = (uid, post) => async dispatch => {
  const userBookmarkRef = userBookmarksRef.doc();

  userBookmarkRef.set({uid, post})
};

function createCounter(ref, num_shards, key) {
  var batch = firestore.batch();

  // Initialize the counter document
  batch.set(ref, { num_shards: num_shards });

  // Initialize each shard with count=0
  for (let i = 0; i < num_shards; i++) {
    let shardRef = ref.collection(key).doc(i.toString());
    batch.set(shardRef, { count: 0 });
  }

  // Commit the write batch
  return batch.commit();
}

function incrementCounter(db, ref, num_shards, key) {
  // Select a shard of the counter at random
  const shard_id = Math.floor(Math.random() * num_shards).toString();
  const shard_ref = ref.collection(key).doc(shard_id);

  // Update count in a transaction
  return db.runTransaction(t => {
    return t.get(shard_ref).then(doc => {
      const new_count = doc.data().count + 1;
      t.update(shard_ref, { count: new_count });
      return new_count;
    });
  });
}

function getCount(ref, key) {
  // Sum the count of each shard in the subcollection
  return ref.collection(key).get().then(snapshot => {
    let total_count = 0;
    snapshot.forEach(doc => {
        total_count += doc.data().count;
    });

    return total_count;
  });
}
