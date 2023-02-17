import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal.js";
import { thunkCreateChannel, thunkGetChannels } from "../../../store/channels";
import "./CreateChannelForm.css";

export default function CreateChannelForm({
	categoryName,
	prevName,
	serverId,
	role,
	isLoaded,
	theme
}) {
	const dispatch = useDispatch();
	const [category, setCategory] = useState(categoryName ? categoryName : "");
	const [channelName, setChannelName] = useState(prevName ? prevName : "");
	const [isPrivate, setIsPrivate] = useState(false);
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();
	const history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors([]);
		// console.log("***** HIT HANDLE SUBMIT ****")

		const newChannel = {
			category,
			name: channelName,
			is_private: isPrivate,
			role: role,
		};

		return dispatch(thunkCreateChannel(+serverId, newChannel))
			.then((res) => {
				// console.log("res>>>>>", res)
				history.push(`/channels/${serverId}/${res.id}`);
			})
			.then(closeModal)
			.catch(async (res) => {
				const data = await res;
				if (data && data.errors) setErrors(data.errors);
			});
	};

	if (isLoaded && categoryName) {
		return (
			<div className="CreateChannelForm-container" id={theme}>
				<div className="CreateChannelForm-header">
					<div className="CreateChannelForm-title-text">
						<h1 className="CreateChannelForm-title">
							Create Channel
						</h1>
						<p className="CreateChannelForm-subtext" id={theme}>
							in {category}
						</p>
					</div>
					<div
						className="CreateChannelForm-close"
						onClick={closeModal}
					>
						<i className="fa-solid fa-xmark" id={theme}></i>
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
							id={theme}
						>
							Channel Name
						</label>
						<div className="CreateChannelForm-group-channel-input" id={theme}>
							<p className="hashtag" id={theme}>#</p>
							<input
								id={`channel-name ${theme}`}
								type="text"
								value={channelName}
								onChange={(e) => {
									// if (e.keycode === 13) e.preventDefault();
									setChannelName(e.target.value);
								}}
								required
								placeholder="new-channel"
							/>
						</div>
					</div>
					<div className="CreateChannelForm-group-private">
						<span className="CreateChannelForm-group-private-span">
							<i className="fa-solid fa-lock" id={theme}></i>
							Private channel
						</span>
						{/* <label
                            // htmlFor="is-private"
                            className="CreateChannelForm-private-switch"
                        >
                            <input
                                // id="is-private"
                                type="checkbox"
                                value={isPrivate}
                                onChange={(e) => setIsPrivate(!e.target.value)}
                            />
                            <span className="CreateChannelForm-private-slider-round">
                            </span>
                        </label> */}
						<div className="CreateChannelForm-checkbox-container">
							<input
								className="CreateChannelForm-checkbox"
								type="checkbox"
								checked={isPrivate}
								onChange={() => setIsPrivate(!isPrivate)}
							/>
							<div className="CreateChannelForm-switch">
								<div></div>
							</div>
						</div>
					</div>
					<p className="CreateChannelForm-private-text" id={theme}>
						Only selected members and roles will be able to view
						this channel.
					</p>
					<div className="CreateChannelForm-buttons-container" id={theme}>
						<button
							id={theme}
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
	} else return <div>Loading...</div>;
}
