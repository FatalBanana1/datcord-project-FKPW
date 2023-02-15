import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { thunkDeleteChannel, thunkGetChannels } from "../../../store/channels";
import "./ConfirmDelete.css";

export default function ConfirmDelete({ channelName, serverId, channelId }) {
	const dispatch = useDispatch();
	const { closeModal } = useModal();
	const history = useHistory();
	const [errors, setErrors] = useState([]);

	const deleteChannel = (e) => {
		e.preventDefault();
		return dispatch(thunkDeleteChannel(+serverId, +channelId))
			.then(
				dispatch(thunkGetChannels(+serverId)).then((res) =>
					res === "Server has no channels"
						? history.push(`/channels/${serverId}/0`)
						: history.push(`/channels/${serverId}/${res[0].id}`)
				)
			)
			.then(closeModal)
			.catch(async (res) => {
				const data = await res;
				if (data && data.errors) setErrors(data.errors);
			});
	};

	return (
		<div className="delete-container">
			<div className="ConfirmDelete-header">
				<h1 className="ConfirmDelete-header-title">Delete Channel</h1>
			</div>
			<div className="ConfirmDelete-message">
				Are you sure you want to delete{" "}
				<span className="ConfirmDelete-channel-name">
					#{channelName}
				</span>
				? This cannot be undone.
			</div>
			<div className="delete-buttons">
				<button className="delete-cancel-button" onClick={closeModal}>
					Cancel
				</button>
				<button
					className="delete-delete-button"
					onClick={(e) => deleteChannel(e)}
				>
					Delete Channel
				</button>
			</div>
		</div>
	);
}
