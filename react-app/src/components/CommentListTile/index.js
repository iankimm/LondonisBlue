import "./commentlist.css";

import { useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux'

import PrintComment from "./printComment";
import { fetchCommentByPostId } from "../../store/comment";
import CreateCommentModal from "./CreateCommentModal";


import OpenModalButton from "../OpenModalButton";
import { fetchPost } from "../../store/post";


const CommentList = ({postId}) => {
  const dispatch = useDispatch()

  const sessionUser = useSelector((state) => state?.session?.user)
  const commentlikes = useSelector((state) => Object.values(state?.commentlike))
  const postComments = useSelector((state) => Object.values(state?.comment?.CurrentPostComments))

  const allPosts = useSelector((state) => Object.values(state?.post?.allPosts))
  const selectedPost = allPosts.find(post => post.id == postId)

  useEffect(() => {
    dispatch(fetchCommentByPostId(postId))
    dispatch(fetchPost())
  }, [dispatch])

  let commentsWithCurrentUser = 0;
  if(sessionUser) {
    commentsWithCurrentUser = postComments.some(comment => comment.user_id === sessionUser.id);
  }

  return (
    <div className="CommentListContainer">
      {selectedPost && sessionUser && !commentsWithCurrentUser && selectedPost.user_id != sessionUser.id?
      <OpenModalButton
      className="CreateCommentButton"
      buttonText="Create Comment"
      modalComponent={<CreateCommentModal postId={postId}/>}
    /> : ""}
      {postComments.map((comment) => (
        <PrintComment comment={comment} like={commentlikes} />
      ))}
      <hr></hr>
    </div>
  )
}

export default CommentList
