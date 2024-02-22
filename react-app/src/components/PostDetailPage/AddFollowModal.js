import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createAFollow } from "../../store/following";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function AddFollowModal({following_user_id}) {
  const history = useHistory()
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newFollow = {
      following_user_id : following_user_id
    }
    dispatch(createAFollow(following_user_id, newFollow))
    closeModal()
    history.push('/follows')
  }

  return (
    <div className="addFollow">
      <h1>Follow this User?</h1>
      <form onSubmit={handleSubmit}>
        <button className="button-link" type="submit">Yes (Follow User)</button>
        <div><button className="button-link" onClick={closeModal}>No (Do not follow User)</button></div>
      </form>
    </div>
  );
}

export default AddFollowModal;
