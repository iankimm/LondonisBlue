import { useSelector } from "react-redux"
import OpenModalButton from "../OpenModalButton"
import DeleteCommentModal from "./DeleteCommentModal"
import EditCommentModal from "./EditCommentModal"
import CommentLikeComponent from "./CommentLikeComponent"

const PrintComment = ({comment, like}) => {

  const sessionUser = useSelector((state) => state?.session?.user)

  let count = 0

  return (
    <div className="PrintCommentContainer">
      <div className="PrintBody">
        {comment.body}
      </div>
      <div className="CreatedDate">
        {comment.created_at}
      </div>

      {/* commentlikes */}
      {
        like && like.forEach((lk) => {
          if(lk.comment_id == comment.id) count ++
        })
      }
      <div>
      <CommentLikeComponent comment={comment} />
      </div>

      {sessionUser.id === comment.user_id ?
        <div>
        <OpenModalButton
          className="EditCommentButton"
          buttonText="Edit Comment"
          modalComponent={<EditCommentModal comment={comment}/>}
        />
        <OpenModalButton
          className="DeleteCommentButton"
          buttonText="Delete Comment"
          modalComponent={<DeleteCommentModal commentId={comment.id}/>}
        />
        </div> : ""
      }
    </div>
  )
}

export default PrintComment
