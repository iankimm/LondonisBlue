import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { editAPost, createAPostImage, deleteAPostImage } from "../../store/post";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function EditPostModal({post}) {
  const history = useHistory()
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const postImage = useSelector((state) => Object.values(state?.post?.PostImages)).find(image => image.post_id === post.id)
  const sessionUser = useSelector((state) => state?.session?.user)

  //form data
  const [title, setTitle] = useState(post.title)
  const [body, setBody] = useState(post.body)
  const [image, setImage] = useState(postImage ? postImage.image_url : null)
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
    if(image && !validImgFormat.includes(image.slice(-4).toLowerCase())){
      errorCollector.wrongFormat = imageFormatError
    }

    setErrors(errorCollector)
    if (Object.keys(errorCollector).length > 0) {
      setDisabled(true)
    }
    else {
      setDisabled(false)
    }

  }, [title, body, image])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const editData = {
        title: title,
        body: body
      }

      const isPostEdited = post.title !== title || post.body !== body

      let editedPost

      if (isPostEdited) {
        editedPost = await dispatch(editAPost(post.id, editData))
      } else {
        editedPost = post
      }

      const imageData = {
        image_url: image,
        post_id: editedPost.id,
        user_id: sessionUser.id
      }

      const isImageChanged = postImage.image_url !== image

      if (isImageChanged) {
        if(postImage && postImage.id) {
          await dispatch(deleteAPostImage(post.id, postImage.id))
        }

        await dispatch(createAPostImage(post.id, imageData))
      }

      history.push(`/post/${editedPost.id}`)

      closeModal()
    }
    catch (error) {
      console.error("error editing post", error)
    }
  }

  return (
    <div className="editmodal">
      <span className="editPostTitle"><h1>Edit a Post</h1></span>
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
          <button className="button-link" type="submit" disabled={isDisabled}>Edit a Post</button>
        </div>
      </form>
    </div>
  );
}

export default EditPostModal;
