import './profilepage.css';

import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect, useState } from 'react';

import SinglePostTile from '../SinglePostTile';
import { fetchPost, fetchPostByUserId } from '../../store/post';
import { fetchPostlike } from '../../store/postlike';

const ProfilePage = () => {

  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state?.session?.user)
  const userPosts = useSelector((state) => Object.values(state?.post?.PostsByUserId))
  const allpostlikes = useSelector((state) => Object.values(state?.postlike))

  useEffect(() => {
    dispatch(fetchPost())
    dispatch(fetchPostByUserId(sessionUser.id))
    dispatch(fetchPostlike())
  },[dispatch])

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
