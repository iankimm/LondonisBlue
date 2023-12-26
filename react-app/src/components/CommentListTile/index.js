import "./commentlist.css";

import { useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux'

import PrintComment from "./printComment";
import { fetchCommentByPostId } from "../../store/comment";


import OpenModalButton from "../OpenModalButton";


const CommentList = ({postId}) => {
  const dispatch = useDispatch()

  const commentlikes = useSelector((state) => Object.values(state?.commentlike))
  const postComments = useSelector((state) => Object.values(state?.comment?.CurrentPostComments))

  useEffect(() => {
    dispatch(fetchCommentByPostId(postId))
  }, [dispatch])

  return (
    <div className="CommentListContainer">
      {postComments.map((comment) => (
        <PrintComment comment={comment} like={commentlikes} />
      ))}
    </div>
  )
}

export default CommentList
