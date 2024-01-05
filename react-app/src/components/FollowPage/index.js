import "./Follow.css";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import PrintFollowUser from "./PrintFollowUser";
import { fetchFollows } from "../../store/following";

const FollowPage = () => {
  const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state?.session?.user)
  const followsByUser = useSelector((state) => Object.values(state?.follow)).filter(follow => follow.followed_user_id === sessionUser.id)

  const follow = useSelector((state) => Object.values(state?.follow)).find((follow) => follow.followed_user_id == sessionUser.id)

  useEffect(() => {
    dispatch(fetchFollows())
  }, [dispatch])

  return (
    <div className="FollowPageContainer">
      Follows
      {
        followsByUser && followsByUser.map((follow) => (
          <PrintFollowUser follow={follow}/>
        ))
      }
      {!follow && (<p>No Follows Yet!</p>)}
    </div>
  )
}

export default FollowPage
