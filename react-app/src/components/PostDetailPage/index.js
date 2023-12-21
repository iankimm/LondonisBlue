import './postdetailpage.css';

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom";

const PostDetailPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const { postId } = useParams()

  return (
    <div className = "PostDetailPageContainer">
      {postId}
    </div>
  )
}

export default PostDetailPage
