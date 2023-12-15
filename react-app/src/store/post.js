// constants
const GET_POST = 'post/GET_POST'
const GET_POST_BY_USER = 'post/GET_POST_BY_USER'
const GET_POST_BY_POST_ID = 'post/GET_POST_BY_POST_ID'
const CREATE_POST = 'post/CREATE_POST'
const UPDATE_POST = 'post/UPDATE_POST'
const DELETE_POST = 'post/DELETE_POST'

const CREATE_POSTIMAGE = 'post/CREATE_POSTIMAGE'
const DELETE_POSTIMAGE = 'post/DELETE_POSTIMAGE'

const getPost = (posts) => ({
  type: GET_POST,
  payload: posts
})

const getPostByUser = (post) => ({
  type: GET_POST_BY_USER,
  payload: post
})

const createPost = (post) => ({
  type: CREATE_POST,
  payload: post
})

const updatePost = (post) => ({
  type: UPDATE_POST,
  payload: post
})

const deletePost = (postId) => ({
  type: DELETE_POST,
  payload: postId
})

const createPostImage = (postImage) => ({
  type: CREATE_POSTIMAGE,
  payload: postImage
})

const deletePostImage = (postId, imageId) => ({
  type: DELETE_POSTIMAGE,
  postId,
  imageId
})

// THUNKS
// Get All Posts
export const fetchPost = () => async (dispatch) => {
  try{
    const response = await fetch("/api/post", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const posts = await response.json();
      dispatch(getPost(posts));
      return posts
    }
  } catch (error) {
    throw error;
  }
}

// Get Posts by User
export const fetchPostByUserId = () => async (dispatch) => {
  try {
    const response = await fetch(`/api/post/current-user`);
    if (response.ok) {
      const post = await response.json();
      dispatch(getPostByUser(post));
      return post;
    }
  } catch (error) {
    throw error;
  }
}

// Create a post
export const createAPost = (postData) => async (dispatch) => {
  try {
    const response = await fetch(`/api/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    if (response.ok) {
      const post = await response.json();
      dispatch(createPost(post));
      return post;
    }
  } catch (error) {
    throw error;
  }
}

// Update a post
export const editAPost = (postId, postData) => async (dispatch) => {
  try {
    const response = await fetch(`/api/post/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    if (response.ok) {
      const updatedPost = await response.json();
      dispatch(updatePost(updatedPost));
      return updatedPost;
    }
  } catch (error) {
    throw error;
  }
}

// Delete a post
export const deleteAPost = (postId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/post/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      dispatch(deletePost(postId));
    }
  } catch (error) {
    throw error;
  }
}

// Create a post image
export const createAPostImage = (postId, imageData) => async (dispatch) => {
  try {
    const response = await fetch(`/api/post/${postId}/images`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(imageData),
    });
    if (response.ok) {
      const newImage = await response.json();
      dispatch(createPostImage(newImage));
      return newImage;
    }
  } catch (error) {
    throw error;
  }
}

// Delete a post image
export const deleteAPostImage = (postId, imageId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/post/${postId}/images/${imageId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      dispatch(deletePostImage(postId, imageId));
    }
  } catch (error) {
    throw error;
  }
}

const initialState = {
  allPosts: [],
  PostsByUserId: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_POST:
      if (action.payload.Posts) {
        const posts = {}
        action.payload.Posts.forEach((post) => {
          posts[post.id] = post;
        })
        return {
          ...state,
          allPosts: posts
        }
      }
    case GET_POST_BY_USER:
    case CREATE_POST:
    case UPDATE_POST:
    case DELETE_POST:
    case CREATE_POSTIMAGE:
    case DELETE_POSTIMAGE:
    default:
      return state
  }
}
