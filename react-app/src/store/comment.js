// constants
const GET_COMMENT = 'comment/GET_COMMENT'
const GET_COMMENTS_BY_POST_ID = 'comment/GET_COMMENTS_BY_POST_ID'
const CREATE_COMMENT = 'comment/CREATE_COMMENT'
const DELETE_COMMENT = 'comment/DELETE_COMMENT'
const UPDATE_COMMENT = 'comment/UPDATE_COMMENT'

const getComment = (comments) => ({
  type: GET_COMMENT,
  payload: comments
})

const getCommentByPostId = (comments) => ({
  type: GET_COMMENTS_BY_POST_ID,
  payload: comments
})

const createComment = (comment) => ({
  type: CREATE_COMMENT,
  payload: comment
})

const updateComment = (comment) => ({
  type: UPDATE_COMMENT,
  payload: comment
})

const deleteComment = (commentId) => ({
  type: DELETE_COMMENT,
  payload: commentId
})

// Thunks
// Get all Comments
export const fetchComment = () => async (dispatch) => {
  try{
    const response = await fetch("/api/comment", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const comments = await response.json();
      dispatch(getComment(comments));
      return comments
    }
  } catch (error) {
    throw error;
  }
}

// Get All comments on Post Id
export const fetchCommentByPostId = (postId) => async (dispatch) => {
  try{
    const response = await fetch(`/api/comment/${postId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const comments = await response.json();
      dispatch(getCommentByPostId(comments));
      return comments
    }
  } catch (error) {
    throw error;
  }
}


// Create a comment
export const createAComment = (postId, commentData) => async (dispatch) => {
  try {
    const response = await fetch(`/api/comment/${postId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    });
    if (response.ok) {
      const comment = await response.json();
      dispatch(createComment(comment));
      return comment;
    }
  } catch (error) {
    throw error;
  }
}

// Update a comment
export const editAComment = (commentId, commentData) => async (dispatch) => {
  try {
    const response = await fetch(`/api/comment/${commentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    });
    if (response.ok) {
      const updatedComment = await response.json();
      dispatch(updateComment(updatedComment));
      return updatedComment;
    }
  } catch (error) {
    throw error;
  }
}

// Delete a comment
export const deleteAComment = (commentId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/comment/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      dispatch(deleteComment(commentId));
    }
  } catch (error) {
    throw error;
  }
}

const initialState = {
  allComments: [],
  CurrentPostComments: [],
}


export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENT:
      if (action.payload.Comments) {
        const comments = {}
        action.payload.Comments.forEach((comment) => {
          comments[comment.id] = comment
        })
        return {
          ...state,
        allComments: comments
        }
      }

    case GET_COMMENTS_BY_POST_ID:
      if (action.payload.Comments) {
        const comments = {}
        action.payload.Comments.forEach((comment) => {
          comments[comment.id] = comment
        })
        return {
          ...state,
          CurrentPostComments: comments
        }
      }
    case CREATE_COMMENT:
      let newComment = state.allComments
      newComment[action.payload.id] = action.payload
      let addedComment = state.CurrentPostComments
      addedComment[action.payload.id] = action.payload
      return {
        ...state,
        allComments: newComment,
        CurrentPostComments: addedComment
      }
    case UPDATE_COMMENT:
      let updatedComment = state.allComments
      updatedComment[action.payload.id] = action.payload
      let updatedProComment = state.CurrentPostComments
      updatedProComment[action.payload.id] = action.payload
      return {
        ...state,
        allComments: updatedComment,
        CurrentPostComments: updatedProComment
      }
    case DELETE_COMMENT:

      const afterDelete = state.CurrentPostComments
      delete afterDelete[action.payload]

      return {
        ...state,
        CurrentPostComments: afterDelete
      }
    default:
      return state
  }
}
