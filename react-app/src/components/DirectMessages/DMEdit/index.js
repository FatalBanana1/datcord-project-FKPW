import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
	thunkEditDirectMessage,
	thunkReadAllDirectMessages,
} from "../../../store/directMessages";

const DMEdit = ({ message, onChange, friend, user }) => {
	let dispatch = useDispatch();
	let params = useParams();
	// if (!serverId) serverId = params.serverId;
	// if (!channelId) channelId = params.channelId;

	console.log(`dm edit ---->`, friend, user);
	let [mval, setMval] = useState(message.message);
	const onCancel = () => {
		onChange(999999999);
	};

	// edit
	const onSave = (e) => {
		e.preventDefault();
		if (message.message !== mval) {
			let payload = { id: message.id, message: mval };
			dispatch(thunkEditDirectMessage(payload))
				.then(() => dispatch(thunkReadAllDirectMessages(friend.id)))
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
				{+user.id === +message.sender_id ? (
					<div className="cms-msg-name">{`${user.username}`}</div>
				) : (
					<div className="cms-msg-name">{`${friend.username}`}</div>
				)}
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

export default DMEdit;
