import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
	thunkEditChannelMessage,
	thunkReadAllChannelMessages,
} from "../../../store/channelMessages";

const CMEdit = ({ message, onChange, channelId, serverId }) => {
	let dispatch = useDispatch();
	let params = useParams()
	if(!serverId) serverId = params.serverId
	if(!channelId) channelId = params.channelId
	// console.log(`front cm EDIT`, channelId, serverId)

	let [mval, setMval] = useState(message.message);
	const onCancel = () => {
		onChange(999999999);
	};

	// edit
	const onSave = (e) => {
		e.preventDefault();
		if (message.message !== mval) {
			let payload = { id: message.id, message: mval };
			dispatch(thunkEditChannelMessage(payload))
				.then(() =>
					dispatch(thunkReadAllChannelMessages(serverId, channelId))
				)
				.then(onChange(0));
		} else {
			onChange(999999999);
		}
	};

	let date = new Date();
	date = date.toUTCString().slice(0, 22);
	if (message && message.created_at) {
		date = message.created_at.slice(0, 22);
	}

	//return
	return (
		<div className="msg-ct" key={message.id}>
			<div className="cms-msg-header">
				<div className="cms-msg-name">{`${message.sender_nickname}`}</div>
				<div className="cms-msg-date">{date}</div>

				<div className="cms-options">
					<div
						className="cms-edit"
						data-id={message.id}
						data-sender={message.sender_id}
						onClick={onSave}
					>
						Save
					</div>
					<div
						className="cms-delete"
						data-id={message.id}
						data-sender={message.sender_id}
						onClick={onCancel}
					>
						Cancel
					</div>
				</div>
			</div>

			<form onSubmit={onSave} className="edit">
				<input
					value={mval}
					onChange={(e) => setMval(e.target.value)}
					className="cm-text-input"
				/>
			</form>
		</div>
	);
};

export default CMEdit;

/*
<div
	className="msg-ct"
	key={message.id}
>
	<div className="cms-msg-header">
		<div className="cms-msg-name">{`${message.sender_nickname}`}</div>
		<div className="cms-msg-date">
			{message.created_at.slice(
				0,
				22
			)}
		</div>

		{user.id ==
			message.sender_id ||
		role === "admin" ||
		role === "owner" ? (
			<div className="cms-options">
				<div
					className="cms-edit"
					data-id={
						message.id
					}
					data-sender={
						message.sender_id
					}
					onClick={
						handleEdit
					}
				>
					Edit
				</div>
				<div
					className="cms-delete"
					onClick={
						deleteHandler
					}
					data-id={
						message.id
					}
					data-sender={
						message.sender_id
					}
				>
					Delete
				</div>
			</div>
		) : null}
	</div>
	<div className="cms-msg-detail">{`${message.message}`}</div>
</div>
*/
