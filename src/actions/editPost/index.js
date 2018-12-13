import { 
  postsRef,
  postsBodyRef,
  postDraftsRef,
} from "../../config/firebase";

import {
  EDIT_POST_LOAD_START,
  EDIT_POST_LOAD_ERROR,
  EDIT_POST_LOAD_SUCCESS,
  EDIT_POST_CLEAR_ALL
} from "./types";

export const discardDraft = (uid, postId) => async dispatch => {}

export const editPostHeader = (uid, postId, payload) => async (dispatch, getState) => {
  const { editPost } = getState();

  try {
    await postsRef.doc(postId).update({ [payload.field]: payload.value });
    dispatch({
      type: EDIT_POST_LOAD_SUCCESS,
      payload: {
        header: {...editPost.header, [payload.field]: payload.value}
      }
    })
  } catch(err) {
    console.log(err);
  }
}

export const closeEditPost = (uid, postId) => async dispatch => {
  dispatch({type: EDIT_POST_CLEAR_ALL});
}

export const loadPost = (uid, postId) => async dispatch => {
  const postHeader = await postsRef.doc(postId).get().then(doc => {return {...doc.data(), postId}});

  dispatch({type: EDIT_POST_LOAD_START});

  if (uid !== postHeader.uid) {
    return dispatch({
      type: EDIT_POST_LOAD_ERROR,
      error: "Unauthorized edit try"
    });
  }

  const [postBody, postBodyDraft] = await Promise.all([
    postsBodyRef.doc(postId).get().then(doc => {
      return doc.exists ? {...doc.data()} : null
    }),
    postDraftsRef.doc(postId).get().then(doc => {
      return doc.exists ? {...doc.data()} : null
    }),
  ])

  const editorContent = (postBodyDraft === null ? postBody : {...postBodyDraft, contentLoadedFromDraft: true});

  dispatch({
    type: EDIT_POST_LOAD_SUCCESS,
    payload: {
      body: editorContent,
      header: postHeader
    }
  })
}


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
        const newData = {
          body_markdown: draft.body_markdown,
          date_modified: new Date()
        };
        postsBodyRef.doc(postId).update(newData).then(() => {
          dispatch({
            type: EDIT_POST_LOAD_SUCCESS,
            payload: {
              body: newData,
            }
          })
        })
        return(draft.body_markdown);
      }
    })
    .then(() => postDraftsRef.doc(postId).delete())
    .catch((err) => {
      Promise.reject(err);
    });
};
