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
      <span className="printFirst">{user && (user.firstName)}</span>

      <div className="PrintBody">
        {comment.body}
      </div>
      <div className="CreatedDate">
        Posted on : {comment.created_at}
      </div>
      <div className="CommentLikess">
      <CommentLikeComponent comment={comment} />
      </div>

      {sessionUser && sessionUser.id === comment.user_id ?
        <div>
        <span className="hello"><OpenModalButton
          className="EditCommentButton"
          buttonText="Edit Comment"
          modalComponent={<EditCommentModal comment={comment}/>}
        /></span>
        <OpenModalButton
          className="DeleteCommentButton"
          buttonText="Delete Comment"
          modalComponent={<DeleteCommentModal commentId={comment.id}/>}
        />
        </div> : ""
      }
      <br />
    </div>
  )
}

export default PrintComment
