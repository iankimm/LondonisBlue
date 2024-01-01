import './profilepage.css';

import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useState } from 'react';

import SinglePostTile from '../SinglePostTile';

const ProfilePage = () => {

  const sessionUser = useSelector((state) => state?.session?.user)
  const userPosts = useSelector((state) => Object.values(state?.post?.PostsByUserId))
  const allpostlikes = useSelector((state) => Object.values(state?.postlike))

  const dispatch = useDispatch()
  const history = useHistory()


  return (
    <div className="ProfilePageContainer">
        <h1 className="MainPageContain">{sessionUser.firstName}'s Profile</h1>
        <div className="MainPageContainer">
          Name : {sessionUser.firstName}, {sessionUser.lastName}
        </div>
        <div className="MainPageContainer">
          Username : {sessionUser.username}
        </div>
        <br></br>

        {/* Personal Posts */}
        <div className="PersonalPosts">
          Personal Posts
        </div>
        <hr></hr>
        {
          userPosts && userPosts.map((post) => (
            <SinglePostTile post = {post} like = {allpostlikes}/>
          ))
        }
    </div>
  )
}

export default ProfilePage
