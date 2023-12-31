import "./Follow.css";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import PrintFollowUser from "./PrintFollowUser";

const FollowPage = () => {
  const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state?.session?.user)
  const followsByUser = useSelector((state) => Object.values(state?.follow)).filter(follow => follow.followed_user_id === sessionUser.id)

  useEffect(() => {
  }, [dispatch, followsByUser])

  return (
    <div className="FollowPageContainer">
      Follows
      {
        followsByUser && followsByUser.map((follow) => (
          <PrintFollowUser follow={follow}/>
        ))
      }
    </div>
  )
}

export default FollowPage
