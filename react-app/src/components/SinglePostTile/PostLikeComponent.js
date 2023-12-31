import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import LoginFormModal from "../LoginFormModal";

import { createAPostlike, deleteAPostlike } from "../../store/postlike";

const PostLikeComponent = ({post}) => {



  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const { setModalContent } = useModal();

  const postlikes = useSelector((state) => Object.values(state?.postlike))

  let isLiked = 0;
  let specificPostlike = 0;

  if(postlikes && sessionUser){
    isLiked = postlikes.some((like) => like.post_id == post.id && like.user_id == sessionUser.id)
    specificPostlike = postlikes.find((like) => like.post_id == post.id && like.user_id == sessionUser.id);
  }


  let count = 0

  const handleClick = async () => {
    if(!sessionUser) {
      return setModalContent(<LoginFormModal />)
    }

    if (isLiked) {
      await dispatch(deleteAPostlike(specificPostlike.id))
    }
    else {
      const newPostLike = {
        post_id: post.id
      }
      await dispatch(createAPostlike(post.id, newPostLike))
    }
  }

  return(
    <div className="PostLikeContainer">

      {/* post like counts */}
      {
        postlikes && postlikes.forEach((lk) => {
          if(lk.post_id == post.id) count ++
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

export default PostLikeComponent
