// constants
const GET_COMMENT = 'comment/GET_COMMENT'
const CREATE_COMMENT = 'comment/CREATE_COMMENT'
const DELETE_COMMENT = 'comment/DELETE_COMMENT'

const getComment = (comments) => ({
  type: GET_COMMENT,
  payload: comments
})

const createComment = (comment) => ({
  type: CREATE_COMMENT,
  payload: comment
})

const deleteComment = (commentId) => ({
  type: DELETE_COMMENT,
  payload: commentId
})

// Thunks
