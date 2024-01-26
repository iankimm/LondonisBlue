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
    <div className="deleteModal">
      <span className="deletepostTitle"><h1>Delete a Post</h1></span>
      <form onSubmit={handleSubmit}>
        <div><button className="button-link" type="submit">Yes (Delete Post)</button></div>
        <button className="button-link" onClick={closeModal}>No (Keep Post)</button>
      </form>
    </div>
  );
}

export default DeletePostModal;
