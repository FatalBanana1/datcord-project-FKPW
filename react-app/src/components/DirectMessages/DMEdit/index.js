import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
	thunkEditDirectMessage,
	thunkReadAllDirectMessages,
} from "../../../store/directMessages";

const DMEdit = ({ message, onChange, friend, user }) => {
	let dispatch = useDispatch();
	const [errors, setErrors] = useState([]);
	let params = useParams();
	let friendId = friend.id;
	if (!friendId) friendId = params.friendId;

	let [mval, setMval] = useState(message.message);
	const onCancel = () => {
		onChange(999999999);
		setErrors([]);
	};

	// edit
	const onSave = (e) => {
		e.preventDefault();
		if (mval.length > 255 || mval.length < 1) {
			setErrors([`error: Message length must be between 1 and 255.`]);
			return null;
		} else {
			if (message.message !== mval) {
				let payload = { id: message.id, message: mval };
				dispatch(thunkEditDirectMessage(payload))
					.then(() => dispatch(thunkReadAllDirectMessages(friendId)))
					.then(onChange(0));
			} else {
				onChange(999999999);
			}
		}
	};

	const updateChatInput = (e) => {
		if (mval.length > 0 && mval.length < 255) setErrors([]);
		setMval(e.target.value);
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
				<div className="cms-msg-name">{`${user.username}`}</div>

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
					onChange={updateChatInput}
					className="cm-text-input"
				/>
				{errors.length > 0 ? (
					<div className="cms-err-edit">
						Error : Message length must be between 1 and 255
						characters!
					</div>
				) : null}
			</form>
		</div>
	);
};

export default DMEdit;
