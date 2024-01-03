import { useDispatch, useSelector } from "react-redux"
import OpenModalButton from "../OpenModalButton"
import DeleteCommentModal from "./DeleteCommentModal"
import EditCommentModal from "./EditCommentModal"
import CommentLikeComponent from "./CommentLikeComponent"

import "./commentlist.css";
import { useEffect } from "react"
import { fetchUsers } from "../../store/user"

const PrintComment = ({comment, like}) => {

  const dispatch = useDispatch()

  const sessionUser = useSelector((state) => state?.session?.user)

  const user = useSelector((state) => Object.values(state?.user)).find(user => user.id === comment.user_id)

  let count = 0

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  return (
    <div className="PrintCommentContainer">

      {user && (<img className="ProfileImage" src={`${user.image_url}`} alt="profile" />)

      }{"  "}
      {user && (user.firstName)}

      <div className="PrintBody">
        {comment.body}
      </div>
      <div className="CreatedDate">
        {comment.created_at}
      </div>
      <div>
      <CommentLikeComponent comment={comment} />
      </div>

      {sessionUser && sessionUser.id === comment.user_id ?
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
