import "./commentlist.css";

import { useEffect, useState } from "react";
import {useSelector, useDispatch} from 'react-redux'

import PrintComment from "./printComment";
import { fetchCommentByPostId } from "../../store/comment";
import CreateCommentModal from "./CreateCommentModal";


import OpenModalButton from "../OpenModalButton";
import { fetchPost } from "../../store/post";


const CommentList = ({postId}) => {
  const dispatch = useDispatch()

  const sessionUser = useSelector((state) => state?.session?.user)
  const commentlikes = useSelector((state) => Object.values(state?.commentlike))
  const postComments = useSelector((state) => Object.values(state?.comment?.CurrentPostComments))

  const allPosts = useSelector((state) => Object.values(state?.post?.allPosts))
  const selectedPost = allPosts.find(post => post.id == postId)

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [commentsPerPage] = useState(5);
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = postComments.slice(indexOfFirstComment, indexOfLastComment);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    dispatch(fetchCommentByPostId(postId))
    dispatch(fetchPost())
  }, [dispatch])

  let commentsWithCurrentUser = 0;
  if(sessionUser) {
    commentsWithCurrentUser = postComments.some(comment => comment.user_id === sessionUser.id);
  }

  return (
    <div className="CommentListContainer">
      {selectedPost && sessionUser && !commentsWithCurrentUser && selectedPost.user_id != sessionUser.id?
      <OpenModalButton
      className="CreateCommentButton"
      buttonText="Create Comment"
      modalComponent={<CreateCommentModal postId={postId}/>}
    /> : ""}
      {currentComments && currentComments.map((comment) => (
        <PrintComment comment={comment} like={commentlikes} />
      ))}

      {/* pagination */}
      <ul className="pagination">
        {postComments.length > commentsPerPage &&
          Array.from({ length: Math.ceil(postComments.length / commentsPerPage) }, (_, i) => (
            <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
              <button onClick={() => paginate(i + 1)} className="page-link">
                {i + 1}
              </button>
            </li>
          ))}
      </ul>

    </div>
  )
}

export default CommentList
