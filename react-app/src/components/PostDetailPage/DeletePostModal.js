import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteAPost } from "../../store/post";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function DeletePostModal({postId}) {
  const history = useHistory()
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    dispatch(deleteAPost(postId))
    closeModal()
    history.push('/')
  }

  return (
    <>
      <h1>Delete a Post</h1>
      <form onSubmit={handleSubmit}>
        <button type="submit">Yes (Delete Post)</button>
        <button onClick={closeModal}>No (Keep Post)</button>
      </form>
    </>
  );
}

export default DeletePostModal;
