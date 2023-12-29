const GET_POSTLIKE = 'postlike/GET_POSTLIKE'
const CREATE_POSTLIKE = 'postlike/CREATE_POSTLIKE'
const DELETE_POSTLIKE = 'postlike/DELETE_POSTLIKE'

const getPostlike = (postlikes) => ({
  type: GET_POSTLIKE,
  payload: postlikes
})

const createPostlike = (postlike) => ({
  type: CREATE_POSTLIKE,
  payload: postlike
})

const deletePostlike = (postlikeId) => ({
  type: DELETE_POSTLIKE,
  payload: postlikeId
})

//thunks
// Get all Postlikes
export const fetchPostlike = () => async (dispatch) => {
  try{
    const response = await fetch("/api/postlike", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const postlikes = await response.json();
      dispatch(getPostlike(postlikes));
      return postlikes
    }
  } catch (error) {
    throw error;
  }
}

// Create a Postlike
export const createAPostlike = (postId, postlikeData) => async (dispatch) => {
  try {
    const response = await fetch(`/api/postlike/${postId}/likes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postlikeData),
    });
    if (response.ok) {
      const postlike = await response.json();
      dispatch(createPostlike(postlike));
      return postlike;
    }
  } catch (error) {
    throw error;
  }
}

// Delete a postlike
export const deleteAPostlike = (postlikeId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/postlike//${postlikeId}/likes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      dispatch(deletePostlike(postlikeId));
    }
  } catch (error) {
    throw error;
  }
}

export default function reducer(state = {}, action) {
  switch (action.type) {
    case GET_POSTLIKE:
      if (action.payload.Postlikes) {
        const postlikes = {}
        action.payload.Postlikes.forEach((postlike) => {
          postlikes[postlike.id] = postlike
        })
        return postlikes
      }
    case CREATE_POSTLIKE:
      let newPostlike = state
      newPostlike[action.payload.id] = action.payload
      return newPostlike
    case DELETE_POSTLIKE:
      const afterDelete = state
      delete afterDelete[action.payload]

      return afterDelete
    default:
      return state
  }
}
