import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { editAPost } from "../../store/post";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function EditPostModal({post}) {
  const history = useHistory()
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const postImage = useSelector((state) => Object.values(state?.post?.PostImages)).find(image => image.post_id === post.id)

  //form data
  const [title, setTitle] = useState(post.title)
  const [body, setBody] = useState(post.body)
  const [image, setImage] = useState(postImage.image_url)
  const [errors, setErrors] = useState({})
  const [isDisabled, setDisabled] = useState(true);

  //error Collector
  const errorCollector = {}

  useEffect(() => {
    const validImgFormat = [
      ".jpg",
      '.png',
      '.jpeg'
    ]

    const imageFormatError = "Image must be .jpg, jpeg, or .png format"
    const titleError1 = "Title name must include alphabetic characters"
    const titleError2 = "Title must be longer 3 characters"
    const bodyError1 = "Body name must include alphabetic characters"
    const bodyError2 = "Body must be longer 3 characters"

    if(title.length < 3) {
      errorCollector.title = titleError2
    }
    if(title.length && title.trim() === "") {
      errorCollector.title = titleError1
    }
    if(body.length < 3) {
      errorCollector.body = bodyError2
    }
    if(body.length && body.trim() === "") {
      errorCollector.body = bodyError1
    }
    if(!validImgFormat.includes(image.slice(-4).toLowerCase())){
      errorCollector.wrongFormat = imageFormatError
    }

    setErrors(errorCollector)
    if (Object.keys(errorCollector).length > 0) {
      setDisabled(true)
    }
    else {
      setDisabled(false)
    }

  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    dispatch(editAPost(post.id))
    closeModal()
    history.push('/')
  }

  return (
    <>
      <h1>Edit a Post</h1>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div>
          <label>
            Title :
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          {errors && errors.title && <p className="errorDiv">{errors.title}</p>}
        </div>
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

        {/* Post Image */}
        <div>
          <label>
            Post Image :
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </label>
          {errors && errors.wrongFormat && <p className="errorDiv">{errors.wrongFormat}</p>}
        </div>
        <div>
          <button type="submit" disabled={isDisabled}>Edit a Post</button>
        </div>
      </form>
    </>
  );
}

export default EditPostModal;
