import './singleposttile.css';

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import PostLikeComponent from './PostLikeComponent';
import { fetchUsers } from '../../store/user';
import { fetchFollows } from '../../store/following';
import FollowComponent from './FollowComponent';

const SinglePostTile = ({
  post,
  like
}) => {
  const dispatch = useDispatch();
  const isClicked = ''
  const [localIsClicked, setLocalIsClicked] = useState(isClicked);

  let count = 0

  // get user
  const user = useSelector((state) => Object.values(state?.user)).find(user => user.id === post.user_id)

  useEffect(() => {
    dispatch(fetchUsers())
    dispatch(fetchFollows())
    setLocalIsClicked(isClicked)
  }, [dispatch, isClicked])

  return (
    <div className = "tileContainer">

      {user && (<img className="ProfileImage" src={`${user.image_url}`} alt="profile" />)

      }{"  "}


      <Link to={`/post/${post?.id}`}>
        {post.title}
      </Link>

      <div className="PostLikeButtonBox">
      <PostLikeComponent post={post} />
      <FollowComponent post={post} />
      </div>

    </div>
  )

}

export default SinglePostTile
