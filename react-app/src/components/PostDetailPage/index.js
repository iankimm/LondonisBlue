import './postdetailpage.css';

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom";

const PostDetailPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const { postId } = useParams()

  const allPosts = useSelector((state) => Object.values(state?.post?.allPosts))
  const allPostImages = useSelector((state) => Object.values(state?.post?.PostImages))

  const selectedPost = allPosts.find(post => post.id == postId)
  const selectedImages = allPostImages.filter(postImage => postImage.post_id == postId)

  return (
    <div className = "PostDetailPageContainer">
      <div className = "DetailTitle">
        {selectedPost.title}
      </div>
      <div className = "DetailImage">
        {selectedImages && selectedImages.map((image) => (
          <img className = "DetailImageOne" src={image.image_url} />
        ))}
      </div>
      <div className = "DetailBody">
        {selectedPost.body}
      </div>
      <div className = "DetailCreated">
        {selectedPost.created_at}
      </div>
    </div>
  )
}

export default PostDetailPage
