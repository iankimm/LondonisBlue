import "./homepage.css";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost, fetchImage } from "../../store/post";
import { fetchComment } from "../../store/comment";
import { fetchCommentlike } from "../../store/commentlike";
import { fetchPostByUserId } from "../../store/post";
import { fetchPostlike } from "../../store/postlike";
import { fetchFollows } from "../../store/following";
import { fetchUsers } from "../../store/session";
import SinglePostTile from "../SinglePostTile";

const HomePage = () => {
  const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state?.session?.user)
  const allPosts = useSelector((state) => Object.values(state?.post?.allPosts))
  const allpostlikes = useSelector((state) => Object.values(state?.postlike))

  useEffect(() => {
    dispatch(fetchUsers())
    dispatch(fetchPost())
    dispatch(fetchImage())
    dispatch(fetchComment())
    dispatch(fetchCommentlike())
    dispatch(fetchPostByUserId())
    dispatch(fetchPostlike())
    dispatch(fetchFollows())

  }, [dispatch, sessionUser])
  return (
    <div className="HomePageContainer">
      {allPosts && allPosts.map((post) => (
        <SinglePostTile post = {post} like = {allpostlikes}/>
      ))}
    </div>
  )
}

export default HomePage
