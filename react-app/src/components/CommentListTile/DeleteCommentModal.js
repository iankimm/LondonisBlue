import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { deleteAComment } from "../../store/comment";

function DeleteCommentModal({commentId}) {
  const history = useHistory()
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    dispatch(deleteAComment(commentId))
    closeModal()
  }

  return (
    <div className="DeleteModal">
      <span className="deleteTitle"><h1>Delete a Comment</h1></span>
      <form onSubmit={handleSubmit}>
        <div><button className="button-link" type="submit">Yes (Delete Comment)</button></div>
        <button className="button-link" onClick={closeModal}>No (Keep Comment)</button>
      </form>
    </div>
  );
}

export default DeleteCommentModal;
