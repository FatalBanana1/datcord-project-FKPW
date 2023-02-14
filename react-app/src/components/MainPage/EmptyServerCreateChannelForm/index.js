import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { useModal } from "../../../context/Modal.js";
import { thunkCreateChannel, thunkGetChannels } from "../../../store/channels";

export default function EmptyServerCreateChannelForm({
	categoryName,
	prevName,
	serverId,
}) {
	const dispatch = useDispatch();
	const [category, setCategory] = useState(categoryName ? categoryName : "");
	const [channelName, setChannelName] = useState(prevName ? prevName : "");
	const [isPrivate, setIsPrivate] = useState(false);
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();
	const params = useParams();
	const history = useHistory();
	const allServers = useSelector((state) => state.servers);
	const server = allServers[params.channelId];

	// console.log(`FRONT - empty server form ===>>>>`, params.channelId);

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors([]);
		// console.log("***** HIT HANDLE SUBMIT ****");
		if (!serverId) {
			serverId = params.channelId;
		}

		const newChannel = {
			category,
			name: channelName,
			is_private: isPrivate,
		};

		// console.log("newChannel", newChannel);

		return dispatch(thunkCreateChannel(+serverId, newChannel))
			.then(dispatch(thunkGetChannels(+serverId)))
			.then(history.push(`/channels/@me`))
			.then(closeModal)
			.catch(async (res) => {
				const data = await res;
				if (data && data.errors) setErrors(data.errors);
			});
	};

	// console.log(`front end channels create form >>>>>>>>>>>>>>>>>>>>>`, params);

	if (categoryName || params.channelId) {
		return (
			<div className="CreateChannelForm-container">
				<div className="CreateChannelForm-header">
					<div className="CreateChannelForm-title-text">
						<h1 className="CreateChannelForm-title">
							Create Channel
						</h1>
						<p className="CreateChannelForm-subtext">
							in {category}
						</p>
					</div>
					<div
						className="CreateChannelForm-close"
						onClick={closeModal}
					>
						<i className="fa-solid fa-xmark"></i>
					</div>
				</div>
				<form
					className="CreateChannelForm-form"
					onSubmit={handleSubmit}
				>
					<div className="CreateChannelForm-group-channel-name">
						<label
							htmlFor="channel-name"
							className="CreateChannelForm-label"
						>
							Channel Name
						</label>
						<div className="CreateChannelForm-group-channel-input">
							<p className="hashtag">#</p>
							<input
								id="channel-name"
								type="text"
								value={channelName}
								onChange={(e) => setChannelName(e.target.value)}
								required
								placeholder="new-channel"
							/>
						</div>
					</div>
					<div className="CreateChannelForm-group-private">
						<span>
							<i className="fa-solid fa-lock"></i>
							Private channel
						</span>
						<label
							// htmlFor="is-private"
							className="CreateChannelForm-private-switch"
						>
							<input
								// id="is-private"
								type="checkbox"
								value={isPrivate}
								onChange={(e) => setIsPrivate(!e.target.value)}
							/>
							<span className="CreateChannelForm-private-slider-round"></span>
						</label>
					</div>
					<p className="CreateChannelForm-private-text">
						Only selected members and roles will be able to view
						this channel.
					</p>
					<div className="CreateChannelForm-buttons-container">
						<button
							className="CreateChannelForm-button-cancel"
							onClick={closeModal}
						>
							Cancel
						</button>
						<button
							type="submit"
							className="CreateChannelForm-button-create"
						>
							Create Channel
						</button>
					</div>
				</form>
			</div>
		);
	}
}
