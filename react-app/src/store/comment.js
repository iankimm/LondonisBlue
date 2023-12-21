// constants
const GET_COMMENT = 'comment/GET_COMMENT'
const CREATE_COMMENT = 'comment/CREATE_COMMENT'
const DELETE_COMMENT = 'comment/DELETE_COMMENT'
const UPDATE_COMMENT = 'comment/UPDATE_COMMENT'

const getComment = (comments) => ({
  type: GET_COMMENT,
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


// Create a comment
export const createAComment = (commentData) => async (dispatch) => {
  try {
    const response = await fetch(`/api/comment`, {
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
export const deleteAPost = (commentId) => async (dispatch) => {
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


export default function reducer(state = {}, action) {
  switch (action.type) {
    case GET_COMMENT:
      if (action.payload.Comments) {
        const comments = {}
        action.payload.Comments.forEach((comment) => {
          comments[comment.id] = comment
        })
        return comments
      }
    case CREATE_COMMENT:
      let newComment = state
      newComment[action.payload.id] = action.payload
      return newComment
    case UPDATE_COMMENT:
      let updatedComment = state
      updatedComment[action.payload.id] = action.payload
      return updatedComment
    case DELETE_COMMENT:
      let newCommentsAfter = state.filter((comment) => comment.id !== action.payload)
      return newCommentsAfter
    default:
      return state
  }
}
