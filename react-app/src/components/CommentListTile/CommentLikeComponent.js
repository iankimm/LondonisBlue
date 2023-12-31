import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import LoginFormModal from "../LoginFormModal";

import { createACommentlike, deleteACommentlike } from '../../store/commentlike';

const CommentLikeComponent = ({comment}) => {

  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const { setModalContent } = useModal();

  const commentlikes = useSelector((state) => Object.values(state?.commentlike))

  let isLiked = 0;
  let specificCommentlike = 0;

  if(commentlikes && sessionUser){
    isLiked = commentlikes.some((like) => like.comment_id == comment.id && like.user_id == sessionUser.id)
    specificCommentlike = commentlikes.find((like) => like.comment_id == comment.id && like.user_id == sessionUser.id);
  }


  let count = 0

  const handleClick = async () => {
    if(!sessionUser) {
      return setModalContent(<LoginFormModal />)
    }

    if (isLiked) {
      await dispatch(deleteACommentlike(specificCommentlike.id))
    }
    else {
      const newCommentlike = {
        comment_id: comment.id
      }
      await dispatch(createACommentlike(comment.id, newCommentlike))
    }
  }

  return(
    <div className="PostLikeContainer">

      {/* post like counts */}
      {
        commentlikes && commentlikes.forEach((lk) => {
          if(lk.comment_id == comment.id) count ++
        })
      }

      <i
      className={`fa${isLiked ? 's' : 'r'} fa-heart fa-lg`}
      onClick={handleClick}
      style={{ cursor: 'pointer', color: isLiked ? 'red' : 'black' }}
    /> {count}
    </div>
  )

}

export default CommentLikeComponent
