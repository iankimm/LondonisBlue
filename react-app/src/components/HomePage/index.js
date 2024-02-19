import "./homepage.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost, fetchImage } from "../../store/post";
import { fetchComment } from "../../store/comment";
import { fetchCommentlike } from "../../store/commentlike";
import { fetchPostByUserId } from "../../store/post";
import { fetchPostlike } from "../../store/postlike";
import { fetchFollows } from "../../store/following";
import { fetchUsers } from "../../store/user";
import SinglePostTile from "../SinglePostTile";

const HomePage = () => {
  const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state?.session?.user)
  const allPosts = useSelector((state) => Object.values(state?.post?.allPosts))
  const allpostlikes = useSelector((state) => Object.values(state?.postlike))

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
      <br></br>
      {currentPosts && currentPosts.map((post, index) => (
    <>
        {post.id ? <SinglePostTile post={post} like={allpostlikes} /> : null}
        {index !== currentPosts.length - 1 && <br />}
    </>
      ))}
      <ul className="pagination">
        {Array.from({ length: Math.ceil(allPosts.length / postsPerPage) }, (_, i) => (
          <li key={i} className="page-item">
            <button onClick={() => paginate(i + 1)} className="page-link">
              {i + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HomePage
