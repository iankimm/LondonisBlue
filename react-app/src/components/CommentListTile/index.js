import "./commentlist.css";

import { useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux'

import PrintComment from "./printComment";
import { fetchCommentByPostId } from "../../store/comment";
import CreateCommentModal from "./CreateCommentModal";


import OpenModalButton from "../OpenModalButton";


const CommentList = ({postId}) => {
  const dispatch = useDispatch()

  const sessionUser = useSelector((state) => state?.session?.user)
  const commentlikes = useSelector((state) => Object.values(state?.commentlike))
  const postComments = useSelector((state) => Object.values(state?.comment?.CurrentPostComments))

  useEffect(() => {
    dispatch(fetchCommentByPostId(postId))
  }, [dispatch])

  const commentsWithCurrentUser = postComments.some(comment => comment.user_id === sessionUser.id);

  return (
    <div className="CommentListContainer">
      {!commentsWithCurrentUser && postId != sessionUser.id ?
      <OpenModalButton
      className="CreateCommentButton"
      buttonText="Create Comment"
      modalComponent={<CreateCommentModal postId={postId}/>}
    /> : ""}
      {postComments.map((comment) => (
        <PrintComment comment={comment} like={commentlikes} />
      ))}
    </div>
  )
}

export default CommentList
