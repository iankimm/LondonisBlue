const GET_FOLLOWS = 'follow/GET_FOLLOWS'
const CREATE_FOLLOW = 'follow/CREATE_FOLLOW'
const DELETE_FOLLOW = 'follow/DELETE_FOLLOW'

const getFollows = (follows) => ({
  type: GET_FOLLOWS,
  payload: follows
})

const createFollow = (follow) => ({
  type: CREATE_FOLLOW,
  payload: follow
})

const deleteFollow = (followId) => ({
  type: DELETE_FOLLOW,
  payload: followId
})


//thunks
// Get all Follows
export const fetchFollows = () => async (dispatch) => {
  try{
    const response = await fetch("/api/following", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const follows = await response.json();
      dispatch(getFollows(follows));
      return follows
    }
  } catch (error) {
    throw error;
  }
}

// Create a follow
export const createAFollow = (following_user_id, FollowData) => async (dispatch) => {
  try {
    const response = await fetch(`/api/following/${following_user_id}/following`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(FollowData),
    });
    if (response.ok) {
      const follow = await response.json();
      dispatch(createFollow(follow));
      return follow;
    }
  } catch (error) {
    throw error;
  }
}

// Delete a follow
export const deleteAFollow = (followId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/following/${followId}/following`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      dispatch(deleteFollow(followId));
    }
  } catch (error) {
    throw error;
  }
}


export default function reducer(state = {}, action) {
  switch (action.type) {
    case GET_FOLLOWS:
      if (action.payload.Follows) {
        const follows = {}
        action.payload.Follows.forEach((follow) => {
          follows[follow.id] = follow
        })
        return follows
      }
    case CREATE_FOLLOW:
      let newFollow = state
      newFollow[action.payload.id] = action.payload
      return newFollow
    case DELETE_FOLLOW:
      const afterDelete = state
      delete afterDelete[action.payload]

      return afterDelete
    default:
      return state
  }
}
