const GET_COMMENTLIKE = 'commentlike/GET_COMMENTLIKE'
const CREATE_COMMENTLIKE = 'commentlike/CREATE_COMMENTLIKE'
const DELETE_COMMENTLIKE = 'commentlike/DELETE_COMMENTLIKE'

const getCommentlike = (commentlikes) => ({
  type: GET_COMMENTLIKE,
  payload: commentlikes
})

const createCommentlike = (commentlike) => ({
  type: CREATE_COMMENTLIKE,
  payload: commentlike
})

const deleteCommentlike = (commentlikeId) => ({
  type: DELETE_COMMENTLIKE,
  payload: commentlikeId
})

//thunks
// Get all Commentlikes
export const fetchCommentlike = () => async (dispatch) => {
  try{
    const response = await fetch("/api/commentlike", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const commentlikes = await response.json();
      dispatch(getCommentlike(commentlikes));
      return commentlikes
    }
  } catch (error) {
    throw error;
  }
}

// Create a Commentlike
export const createACommentlike = (commentId, commentlikeData) => async (dispatch) => {
  try {
    const response = await fetch(`/api/commentlike/${commentId}/likes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentlikeData),
    });
    if (response.ok) {
      const commentlike = await response.json();
      dispatch(createCommentlike(commentlike));
      return commentlike;
    }
  } catch (error) {
    throw error;
  }
}

// Delete a commentlike
export const deleteACommentlike = (commentlikeId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/commentlike/${commentlikeId}/likes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      dispatch(deleteCommentlike(commentlikeId));
    }
  } catch (error) {
    throw error;
  }
}

export default function reducer(state = {}, action) {
  switch (action.type) {
    case GET_COMMENTLIKE:
      if (action.payload.Commentlikes) {
        const commentlikes = {}
        action.payload.Commentlikes.forEach((commentlike) => {
          commentlikes[commentlike.id] = commentlike
        })
        return commentlikes
      }
    case CREATE_COMMENTLIKE:
      let newCommentlike = state
      newCommentlike[action.payload.id] = action.payload
      return newCommentlike
    case DELETE_COMMENTLIKE:
      const afterDelete = state
      delete afterDelete[action.payload]

      return afterDelete
    default:
      return state
  }
}
