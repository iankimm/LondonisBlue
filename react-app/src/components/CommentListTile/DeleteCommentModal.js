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
    <>
      <h1>Delete a Comment</h1>
      <form onSubmit={handleSubmit}>
        <button type="submit">Yes (Delete Comment)</button>
        <button onClick={closeModal}>No (Keep Comment)</button>
      </form>
    </>
  );
}

export default DeleteCommentModal;
