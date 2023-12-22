import "./createpostpage.css";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { createAPost, createAPostImage } from "../../store/post";

function CreatePostPage() {
  const sessionUser = useSelector((state) => state?.session?.user)

  //dispatch & history
  const dispatch = useDispatch()
  const history = useHistory()

  //form values
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [image, setImage] = useState("")
  const [isDisabled, setDisabled] = useState(false); //false

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      title: title,
      body: body,
      user_id: sessionUser.id
    }

    dispatch(createAPost(newPost))
      .then(async (res) => {
        const data = res
        if(image && (image.endsWith('.jpg') || image.endsWith('.png') || image.endsWith('.jpeg'))){
          const imageData = {
            image_url: image,
            post_id: res.id,
            user_id: sessionUser.id
          }
          dispatch(createAPostImage(res.id, imageData))
            .then(async (res) => {
              history.push(`/post/${res.post_id}`)
            })
        }
      })

  }


  return(
    <div className = "CreatePostPageContainer">
      <form onSubmit={handleSubmit}>
        <h1>Create a Post</h1>

        {/* title */}
        <li>
          <label>
            title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
        </li>

        {/* body */}
        <li>
          <label>
            Body:
            <input
              type="text"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </label>
        </li>

        {/* image */}
        <li>
          <label>
            Post Image:
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </label>
        </li>

        <button className="submitBtn" type="submit" disabled={isDisabled}>Finish</button>

      </form>
    </div>
  )

}

export default CreatePostPage
