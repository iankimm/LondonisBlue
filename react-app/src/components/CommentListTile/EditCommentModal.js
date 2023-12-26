import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { editAComment } from "../../store/comment";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function EditCommentModal({comment}) {
  const history = useHistory()
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const sessionUser = useSelector((state) => state?.session?.user)

  //form data
  const [body, setBody] = useState(comment.body)
  const [errors, setErrors] = useState({})
  const [isDisabled, setDisabled] = useState(true);

  //error Collector
  const errorCollector = {}

  useEffect(() => {
    const bodyError1 = "Body name must include alphabetic characters"
    const bodyError2 = "Body must be longer 3 characters"

    if(body.length < 3) {
      errorCollector.body = bodyError2
    }
    if(body.length && body.trim() === "") {
      errorCollector.body = bodyError1
    }

    setErrors(errorCollector)
    if (Object.keys(errorCollector).length > 0) {
      setDisabled(true)
    }
    else {
      setDisabled(false)
    }

  }, [body])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const editData = {
        body: body,
        user_id: sessionUser.id,
        post_id: comment.post_id,
      }

      let editedComment = await dispatch(editAComment(comment.id, editData))
      console.log('editedComment', editedComment)

      history.push(`/post/${editedComment.post_id}`)

      closeModal()
    }
    catch (error) {
      console.error("error editing post", error)
    }
  }

  return (
    <>
      <h1>Edit a Comment</h1>
      <form onSubmit={handleSubmit}>

        {/* Body */}
        <div>
          <label>
            Body :
            <input
              type="text"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </label>
          {errors && errors.body && <p className="errorDiv">{errors.body}</p>}
        </div>

        <div>
          <button type="submit" disabled={isDisabled}>Edit a Comment</button>
        </div>
      </form>
    </>
  );
}

export default EditCommentModal;
