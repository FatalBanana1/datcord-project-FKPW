import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal.js";
import { thunkDeleteServer } from "../../../store/servers.js";
import "./DeleteServer.css";

const DeleteServer = ({ server }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  function handleDelete(e) {
    e.preventDefault();
    dispatch(thunkDeleteServer(server.id))
      .then(() => closeModal())
      .then(() => history.push("/channels/@me"))
      .catch(async (res) => {
        const data = await res;
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <div className="delete-container">
      <div className="delete-header">Delete '{server.name}'</div>
      <div className="delete-subtext">
        Are you sure you want to delete <span>{server.name}</span>? This action
        cannot be undone.
      </div>
      <div className="delete-buttons">
        <button className="delete-cancel-button" onClick={closeModal}>
          Cancel
        </button>
        <button className="delete-delete-button" onClick={handleDelete}>
          Delete Server
        </button>
      </div>
    </div>
  );
};

export default DeleteServer;
