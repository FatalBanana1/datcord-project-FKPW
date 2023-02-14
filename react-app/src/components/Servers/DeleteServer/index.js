import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal.js";
import { thunkDeleteServer } from "../../../store/servers.js";

const DeleteServer = ({ server }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { closeModal } = useModal();

  dispatch(thunkDeleteServer(server.id))
    .then(() => closeModal())
    .then(() => history.push("/channels/@me"));

  return (
    <div className="delete-container">
      <div className="delete-header">Are you sure you want to delete?</div>
      <div className="delete-buttons">
        <button>Cancel</button>
        <button>Delete</button>
      </div>
    </div>
  );
};

export default DeleteServer;
