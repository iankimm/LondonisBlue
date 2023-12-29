import './singleposttile.css';

import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import PostLikeComponent from './PostLikeComponent';

const SinglePostTile = ({
  post,
  like
}) => {
  const dispatch = useDispatch();
  const isClicked = ''
  const [localIsClicked, setLocalIsClicked] = useState(isClicked);

  let count = 0

  useEffect(() => {
    setLocalIsClicked(isClicked)
  }, [dispatch, isClicked])

  return (
    <div className = "tileContainer">
      <Link to={`/post/${post?.id}`}>
        {post.title}
      </Link>

      {/* post like counts */}
      {
        like && like.forEach((lk) => {
          if(lk.post_id == post.id) count ++
        })
      }
      <div>
      <i className="fa-regular fa-heart"></i> {count}
      </div>
      <div>
        postlike component
        <PostLikeComponent post={post} />
      </div>

    </div>
  )

}

export default SinglePostTile
