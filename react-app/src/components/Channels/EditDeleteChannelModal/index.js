import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal.js";
import {
	thunkCreateChannel,
	thunkDeleteChannel,
	thunkEditChannel,
	thunkGetChannels,
} from "../../../store/channels";
import OpenModalButton from "../../OpenModalButton/index.js";
import ConfirmDelete from "../ConfirmDelete/index.js";

export default function EditChannelForm({
	categoryName,
	prevName,
	serverId,
	channelId,
	priv,
	theme
}) {
	const dispatch = useDispatch();
	const [category, setCategory] = useState(categoryName ? categoryName : "");
	const [channelName, setChannelName] = useState(prevName ? prevName : "");
	const [isPrivate, setIsPrivate] = useState(priv);
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();
	const history = useHistory();
	const [isDisabled, setIsDisabled] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);
	const channels = Object.values(
		useSelector((state) => state.channels.channels)
	);
	const [showMenu, setShowMenu] = useState(false);
	const { setModalContent, setOnModalClose } = useModal();

	const onClick = () => {
		// if (onModalClose) setOnModalClose(onModalClose);
		setModalContent(
			<ConfirmDelete
				channelName={channelName}
				serverId={serverId}
				channelId={channelId}
			/>
		);
		// if (onButtonClick) onButtonClick();
	};

	const closeMenu = () => setShowMenu(false);

	useEffect(() => {
		dispatch(thunkGetChannels(+serverId)).then(() => setIsLoaded(true));
	}, [dispatch, serverId, channelId]);

	// console.log("channels", channels);

	// if (channels && channels.length < 2) {
	//     setIsDisabled(true);
	// console.log("isPrivate ?", isPrivate);
	// }

	if (!channels) return null;
	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors([]);
		// console.log("***** HIT HANDLE SUBMIT ****")

		const editChannel = {
			category,
			name: channelName,
			is_private: isPrivate,
		};

		// console.log("editChannel", editChannel);

		// const data = dispatch(thunkCreateChannel(+serverId, editChannel))
		// if (data) {
		//     console.log("has error")
		//     console.log("error data:", data)
		//     setErrors(data);
		// } else {
		//     console.log("no error")
		//     closeModal();
		//     dispatch(thunkGetChannels(+serverId));
		// }
		return (
			dispatch(thunkEditChannel(+serverId, +channelId, editChannel))
				// .then(dispatch(thunkGetChannels(+serverId)))
				.then(closeModal)
				.catch(async (res) => {
					// console.log("EDIT CH hit error")
					const data = await res;
					if (data && data.errors) setErrors(data.errors);
				})
		);
	};

	if (isLoaded && categoryName) {
		return (
			<div className="CreateChannelForm-container" id={theme}>
				<div className="CreateChannelForm-header">
					<div className="CreateChannelForm-title-text">
						<h1 className="CreateChannelForm-title" id={theme}>
							Edit Channel
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
								onChange={(e) => setChannelName(e.target.value)}
								required
								placeholder="edit-channel"
							/>
						</div>
					</div>
					<div className="CreateChannelForm-group-private">
						<span>
							<i className="fa-solid fa-lock" id={theme}></i>
							Private channel
						</span>
						<div className="CreateChannelForm-checkbox-container">
							<input
								className="CreateChannelForm-checkbox"
								type="checkbox"
								checked={isPrivate}
								onChange={() => setIsPrivate(!isPrivate)}
							/>
							<div className="CreateChannelForm-switch" id={theme}>
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
							className="CreateChannelForm-button-delete"
							disabled={channels.length < 2}
						>
							<div className="EditChannelForm-button-delete-text tooltip">
								<div
									role="button"
									onClick={onClick}
									className={`OpenModaldiv-delete-button`}
								>
									<span>Delete Channel</span>
								</div>
								{channels.length < 2 && (
									<span className="EditChannelForm-button-delete-hover tooltiptext">
										You cannot delete a channel when it is
										the only channel in the server.
									</span>
								)}
							</div>
						</button>
						<button
							type="submit"
							className="CreateChannelForm-button-create"
							id={theme}
						>
							Edit Channel
						</button>
					</div>
				</form>
			</div>
		);
	} else return <div className="loading-div">Loading...</div>
}
