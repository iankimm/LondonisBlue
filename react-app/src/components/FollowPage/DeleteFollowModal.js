import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { deleteAFollow } from "../../store/following";

function DeleteFollowModal({followId, followingUserId}) {
  const history = useHistory()
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(deleteAFollow(followId))
    closeModal()
  }

  return (
    <div className="DeleteModal">
      <span className="deleteTitle"><h1>Delete a Follow</h1></span>
      <form onSubmit={handleSubmit}>
        <div><button className="button-link" type="submit">Yes (Delete Follow)</button></div>
        <button className="button-link" onClick={closeModal}>No (Keep Follow)</button>
      </form>
    </div>
  );
}
export default DeleteFollowModal;
