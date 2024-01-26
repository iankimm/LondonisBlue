import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import './singleposttile.css';


const FollowComponent = ({post}) => {

  const sessionUser = useSelector((state) => state.session.user);
  const allFollows = useSelector((state) => Object.values(state?.follow))

  let followed = false;

  if(sessionUser){
    if(allFollows.find((follow) => follow.followed_user_id == sessionUser.id && follow.following_user_id == post.user_id)){
      followed = true;
    }
  }

  return(
    <span className="FollowShowContainer">
      {
        followed ?
        <>followed</> : ""
      }
    </span>
  )

}

export default FollowComponent
