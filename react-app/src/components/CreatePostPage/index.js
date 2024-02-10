import "./createpostpage.css";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { createAPost, createAPostImage } from "../../store/post";

const imageFormatError = "Image must be .jpg, jpeg, or .png format"
const titleError1 = "Title name must include alphabetic characters"
const titleError2 = "Title must be longer 3 characters"
const bodyError1 = "Body name must include alphabetic characters"
const bodyError2 = "Body must be longer 3 characters"
const infiniteTitleError = "Title is limited to 50 alphabet characters"
const infiniteBodyError = "Body is limitted to 1000 alphabet characters"

const validImgFormat = [
  ".jpg",
  '.png',
  '.jpeg'
]

function CreatePostPage() {
  const sessionUser = useSelector((state) => state?.session?.user)

  //dispatch & history
  const dispatch = useDispatch()
  const history = useHistory()

  //form values
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [image, setImage] = useState("")
  const [isDisabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState({})

  //errorHandler
  let errorCollector = {}

  const handleSubmit = async (e) => {
    e.preventDefault();
    errorCollector = {}

    if(title.length < 3) {
      errorCollector.title = titleError2
    }
    if(title.length > 50) {
      errorCollector.title = infiniteTitleError
    }
    if(title.length && title.trim() === "") {
      errorCollector.title = titleError1
    }
    if(body.length < 3) {
      errorCollector.body = bodyError2
    }
    if(body.length > 1000) {
      errorCollector.body = infiniteBodyError
    }
    if(body.length && body.trim() === "") {
      errorCollector.body = bodyError1
    }
    if(!validImgFormat.includes(image.slice(-4).toLowerCase())){
      errorCollector.wrongFormat = imageFormatError
    }
    if(Object.keys(errorCollector).length) {
      setErrors(errorCollector)
      return
    }
    else {
      const newPost = {
        title: title,
        body: body,
        user_id: sessionUser.id
      }

      const createdPost = await dispatch(createAPost(newPost))

      if(image && (image.endsWith('.jpg') || image.endsWith('.png') || image.endsWith('.jpeg'))){
        const imageData = {
          image_url: image,
          post_id: createdPost.id,
          user_id: sessionUser.id
        }

        await dispatch(createAPostImage(createdPost.id, imageData))
      }
      history.push(`/post/${createdPost.id}`)
    }
  }


  return(
    <div className = "CreatePostPageContainer">
      <form onSubmit={handleSubmit}>
        <span className="createPostt"><h1>Create a Post</h1></span>

        {/* title */}
        <li>
          <label>
            TITLE <br />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          {errors.title && <p className="errorDiv">{errors.title}</p>}
        </li>

        {/* body */}
        <li>
          <label>
            BODY<br />
            <input
              type="text"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </label>
          {errors.body && <p className="errorDiv">{errors.body}</p>}
        </li>

        {/* image */}
        <li>
          <label>
            IMAGE <br />
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </label>
          {errors.wrongFormat && <p className="errorDiv">{errors.wrongFormat}</p>}
        </li>

        <button className="button-link" type="submit">Create Post</button>

      </form>
    </div>
  )

}

export default CreatePostPage
