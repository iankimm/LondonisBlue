import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import LoginFormModal from "../LoginFormModal";

import { createAPostlike, deleteAPostlike } from "../../store/postlike";

const PostLikeComponent = ({post}) => {

  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const postlikes = useSelector((state) => Object.values(state?.postlike))

  // const { setModalContent } = useModal();

  // const [localIsClicked, setLocalIsClicked] = useState(false);
  // const [isLikeLoaded, setIsLikeLoaded] = useState(true);

  // let isClicked = postlikes.some((like) => like.post_id === post.id)

  // const postLike = postlikes.find(like => like.post_id === post.id && like.user_id === sessionUser.id);

  const isLiked = postlikes.some((like) => like.post_id == post.id && like.user_id == sessionUser.id)
  console.log(postlikes)

  const specificPostlike = postlikes.find((like) => like.post_id == post.id && like.user_id == sessionUser.id);
  console.log(specificPostlike)

  const handleClick = async () => {
    console.log('isLike', isLiked)
    if (isLiked) {
      console.log('isLiked is true')
      await dispatch(deleteAPostlike(specificPostlike.id))
    }
    else {
      console.log('isLiked is false')
      const newPostLike = {
        post_id: post.id
      }
      await dispatch(createAPostlike(post.id, newPostLike))
    }


    // if(!sessionUser) {
    //   setLocalIsClicked(false)
    //   return setModalContent(<LoginFormModal />)
    // }

    // if (isClicked) {
    //   console.log('hello its clicked')
    //   setIsLikeLoaded(false)
    //   await dispatch(deleteAPostlike(postLike.id))
    //   console.log('isclicked',isClicked)
    //   setIsLikeLoaded(true)
    // }
    // else {
    //   console.log('hello its unclicked')
    //   const newPostLike = {
    //     post_id: post.id
    //   }
    //   setIsLikeLoaded(false)
    //   await dispatch(createAPostlike(newPostLike))
    //   console.log('creation part isClicked', isClicked)
    //   console.log('newPostLike', newPostLike)
    //   setIsLikeLoaded(true)
    // }
  }

  return(
    <div className="PostLikeContainer">
      <i
      className={`fa${isLiked ? 's' : 'r'} fa-heart fa-lg`}
      onClick={handleClick}
      style={{ cursor: 'pointer', color: isLiked ? 'red' : 'black' }}
    />
    </div>
  )

}

export default PostLikeComponent
