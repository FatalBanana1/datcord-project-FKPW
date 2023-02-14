import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal.js";
import { thunkDeleteServer } from "../../../store/servers.js";

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
      <div className="delete-header">Are you sure you want to delete?</div>
      <div className="delete-buttons">
        <button onClick={closeModal}>Cancel</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default DeleteServer;
