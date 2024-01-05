import './postdetailpage.css';

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import CommentList from '../CommentListTile';
import DeletePostModal from './DeletePostModal';
import EditPostModal from './EditPostModal';
import OpenModalButton from '../OpenModalButton';
import { fetchCommentByPostId, fetchComment } from '../../store/comment';
import { fetchImage, fetchPost } from '../../store/post';
import AddFollowModal from './AddFollowModal';
import { fetchFollows } from '../../store/following';
import { fetchCommentlike } from '../../store/commentlike';

const PostDetailPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const { postId } = useParams()

  const sessionUser = useSelector((state) => state?.session?.user)
  const allPosts = useSelector((state) => Object.values(state?.post?.allPosts))
  const allPostImages = useSelector((state) => Object.values(state?.post?.PostImages))

  const selectedPost = allPosts.find(post => post.id == postId)
  const selectedImages = allPostImages.filter(postImage => postImage.post_id == postId)

  let follows = 0;
  const follow = useSelector((state) => {
    if (sessionUser) {
      return Object.values(state?.follow).find(follow => follow.followed_user_id == sessionUser.id && follow.following_user_id == selectedPost.user_id);
    }
    return null;
  });

  if (sessionUser) {
    follows = follow
  }


  useEffect(() => {
    dispatch(fetchCommentlike())
    dispatch(fetchFollows())
    dispatch(fetchPost())
    dispatch(fetchCommentByPostId(postId))
    dispatch(fetchImage())
    dispatch(fetchComment())
  },[dispatch])

  return (
    <div className = "PostDetailPageContainer">
      <div className = "DetailTitle">
        {selectedPost && (<div>
          <h1>{selectedPost.title}</h1>
        {sessionUser && !follows && selectedPost.user_id != sessionUser.id ?
        <div>
          <OpenModalButton
          className="AddFollowButton"
          buttonText="Follow"
          modalComponent={<AddFollowModal following_user_id = {selectedPost.user_id}/>}
          />
        </div>
        :""
        }
        </div>)}
      </div>
      <div className = "DetailImage">
        {selectedImages && selectedImages.map((image) => (
          <img className = "DetailImageOne" src={image.image_url} />
        ))}
      </div>
      {selectedPost && (
        <div className = "DetailBody">
        {selectedPost.body}
      </div>
        )}
        {selectedPost && (
          <div className = "DetailCreated">
          {selectedPost.created_at}
          {
            selectedPost && sessionUser && selectedPost.user_id == sessionUser.id ?
            <div>
              <OpenModalButton
                className="EditPostButton"
                buttonText="Edit Post"
                modalComponent={<EditPostModal post = {selectedPost}/>}
              />
              <OpenModalButton
                className="DeletePostButton"
                buttonText="Delete Post"
                modalComponent={<DeletePostModal postId = {postId}/>}
              />
              </div>:""
          }
        </div>
        )}


      {/* comment list */}
      <hr></hr>
      <CommentList postId={postId} />
    </div>
  )
}

export default PostDetailPage
