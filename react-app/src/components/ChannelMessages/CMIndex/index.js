import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import {
	actionResetChannelMessages,
	thunkDeleteChannelMessage,
	thunkReadAllChannelMessages,
} from "../../../store/channelMessages";
import CMEdit from "../CMEdit/index.";
import "./CMIndex.css";
import crown from "../../../assets/crown.png";
// import MemberPage from "../../ServerMembers/MemberPage";
import OpenModalButton from "../../OpenModalButton";

// leave this OUT
let socket;

const CMIndex = ({ theme }) => {
	const dispatch = useDispatch();
	//states
	const [isLoaded, setIsLoaded] = useState(false);
	const [reload, setReload] = useState(0);
	const [loadBottom, setLoadBottom] = useState(false);
	const [edit, setEdit] = useState(999999990);
	const [errors, setErrors] = useState([]);
	// controlled form input
	const [chatInput, setChatInput] = useState("");
	const [messages, setMessages] = useState([]);
	// img upload
	const [imageButton, setImageButton] = useState(false);
	const [image, setImage] = useState(null);
	const [newImage, setNewImage] = useState(false);
	const [imageLoading, setImageLoading] = useState(false);

	//selectors
	const user = useSelector((state) => state.session.user);
	const allMembers = useSelector((state) => state.serverMembers);
	const allcms = useSelector((state) => state.channelMessages);
	let cms = Object.values(allcms);
	let { serverId, channelId } = useParams();
	const channels = useSelector((state) => state.channels.channels);
	const channel = channels[channelId];

	const endMsgRef = useRef(null);

	// console.log(`edit ----cms >>>>>>`, edit);
	const scrollToBottom = () => {
		if (!endMsgRef.current) {
			return;
		} else if (edit === 999999999 || edit === 999999990) {
			endMsgRef.current.scrollIntoView({ behavior: "smooth" });
		}
	};

	useEffect(() => {
		scrollToBottom();
	}, [loadBottom, messages, cms, newImage]);

	useEffect(() => {
		scrollToBottom();
		dispatch(thunkReadAllChannelMessages(serverId, channelId)).then(() => {
			setIsLoaded(true);
			setLoadBottom(true);
		});

		return () => {
			setChatInput("");
			setMessages([]);
			setEdit(999999990);
			setErrors([]);
		};
	}, [channelId, user.id, image, serverId, reload]);

	useEffect(() => {
		// open socket connection
		socket = io();
		// socket.emit("join", { channelId: channelId, username: user.username });
		socket.on("channel_message", (channel_message) => {
			setMessages((messages) => [...messages, channel_message]);
		});

		// when component unmounts, disconnect
		return () => {
			setChatInput("");
			setErrors([]);
			socket.disconnect();
			dispatch(actionResetChannelMessages());
		};
	}, [user.id, serverId, channelId]);

	// -------------

	// handlers

	// delete
	const deleteHandler = (e) => {
		setIsLoaded(false);
		setErrors([]);
		const payload = {
			serverId,
			channelId,
			id: e.target.dataset.id,
			sender_id: e.target.dataset.sender,
		};
		// return
		return dispatch(thunkDeleteChannelMessage(payload)).then(() =>
			setIsLoaded(true)
		);
	};

	// delete
	const deleteHandlerCurr = (e) => {
		setIsLoaded(false);
		setErrors([]);
		const payload = {
			serverId,
			channelId,
			id: e.target.dataset.id,
			sender_id: e.target.dataset.sender,
		};
		const msg = messages.filter(
			(el) => el.message !== e.target.dataset.msg
		);
		setMessages(msg);
		// console.log(`find message in delete`, msg);

		// return
		return dispatch(thunkDeleteChannelMessage(payload))
			.then(() => {
				setChatInput("");
				setMessages([]);
				dispatch(thunkReadAllChannelMessages(serverId, channelId));
			})
			.then(() => setEdit(999999990))
			.then(() => setIsLoaded(true));
	};

	// -------------

	// edit
	const handleEdit = (e) => {
		setErrors([]);
		setEdit(e.target.dataset.id);
	};

	// edit child change
	const handleEditChange = (e) => {
		setErrors([]);
		setEdit(e);
		if (e === 0) {
			// console.log(`front CM index`, e, edit);
			setChatInput("");
			setMessages([]);
			setLoadBottom(true);
		}
	};

	// -------------

	if (isLoaded && channel && user && theme) {
		const updateChatInput = (e) => {
			if (chatInput.length > 0 && chatInput.length < 255) setErrors([]);
			setChatInput(e.target.value);
		};

		//send chat messages - socket
		const sendChat = (e) => {
			e.preventDefault();
			if (chatInput.length > 255 || chatInput.length < 1) {
				setErrors([`error: Message length must be between 1 and 255.`]);
				return null;
			} else {
				const curr = Object.values(allMembers).find(
					(el) => Number(el.user_id) === Number(user.id)
				);
				socket.emit("channel_message", {
					sender_id: Number(curr.id),
					message: chatInput,
					channelId,
				});
				setChatInput("");
				setEdit(999999999);
			}
		};

		// -----------
		// upload images
		const imageLinks = {
			".pdf": 1,
			".png": 1,
			".jpg": 1,
			jpeg: 1,
			".gif": 1,
			".svg": 1,
		};
		const sendImage = async (e) => {
			e.preventDefault();
			//img upload
			const formData = new FormData();
			formData.append("image", image);
			setImageLoading(true);
			const res = await fetch(`/api/cms/images/${channelId}`, {
				method: "POST",
				body: formData,
			});
			if (res.ok) {
				await res.json();
				setImage("");
				dispatch(thunkReadAllChannelMessages(serverId, channelId))
					.then(() => {
						setIsLoaded(true);
						setLoadBottom(true);
						setImageButton(false);
						setImageLoading(false);
					})
					.then(() => setEdit(999999990));
			} else {
				setImageLoading(false);
				console.log("Error uploading image to AWS!", res);
			}
			setChatInput("");
			setNewImage(false);
		};
		const updateImage = (e) => {
			const file = e.target.files[0];
			setImage(file);
		};

		const imageClickHandler = (message) => {
			return (
				<div>
					<img src={message.message}></img>
				</div>
			);
		};

		// --------------------
		// date
		let date = new Date();
		let role;
		const currMbr = user.server_members.find(
			(el) =>
				Number(el.server_id) === Number(serverId) &&
				Number(user.id) === Number(el.user_id)
		);
		if (currMbr) {
			role = currMbr.role;
		}
		// console.log(`msg ===`, messages);

		return (
			user && (
				<div className="cms-container">
					<div className="cms-ch-name row" id={theme}>
						<div id={theme}>{`# ${channel.name}`}</div>

						{/* insert mootro */}
						{user.mootro === "mootro" ? (
							<div id={theme}>Leave Mootro</div>
						) : (
							<div id={theme}>Got Mootro?</div>
						)}
					</div>

					<div className="cms-ct">
						<div className="cm-overflow" id={theme}>
							{cms.length ? (
								cms.map((message) => (
									<div
										id={theme}
										className="row justify"
										key={message.id}
									>
										<div
											// to="#"
											className="img-link"
											data-id={message.id}
											// onClick={memberClickHandler}
										>
											<img
												src={message.display_pic}
												alt="Display Picture"
												className="pic-icon"
												data-id={message.id}
											/>
										</div>

										{Number(message.id) === Number(edit) ? (
											<CMEdit
												message={message}
												onChange={handleEditChange}
												channelId={channelId}
												serverId={serverId}
												theme={theme}
											/>
										) : (
											<div className="msg-ct">
												<div
													className="cms-msg-header"
													id={theme}
												>
													<>
														{message.role ===
														"owner" ? (
															<div className="row">
																<div
																	id={theme}
																	className="cms-admin"
																>{`${message.sender_nickname}`}</div>
																<img
																	src={crown}
																	alt="crown"
																	className="icon"
																/>
															</div>
														) : message.role ===
														  "admin" ? (
															<div
																id={theme}
																className="cms-admin"
															>{`${message.sender_nickname}`}</div>
														) : message.role ===
														  "member" ? (
															<div
																id={theme}
																className="cms-member"
															>
																{`${message.sender_nickname}`}{" "}
															</div>
														) : (
															<div
																id={theme}
																className="cms-pending"
															>{`${message.sender_nickname}`}</div>
														)}

														<div
															className="cms-msg-date"
															id={theme}
														>
															{message.created_at.slice(
																0,
																22
															)}
														</div>
													</>

													{Number(currMbr.id) ===
														Number(
															message.sender_id
														) ||
													role === "admin" ||
													role === "owner" ? (
														<div
															id={theme}
															className="cms-options absolute-op"
														>
															<div
																className="cms-edit"
																data-id={
																	message.id
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

												{message.created_at ===
													message.updated_at &&
												!imageLinks[
													message.message.slice(
														message.message.length -
															4
													)
												] ? (
													<div className="cms-msg-detail">{`${message.message}`}</div>
												) : imageLinks[
														message.message.slice(
															message.message
																.length - 4
														)
												  ] ? (
													<div>
														<img
															src={
																message.message
															}
															className="aws-image"
															alt={`uploaded by ${message.sender_nickname}`}
														></img>
													</div>
												) : (
													<div className="row">
														<div className="cms-msg-detail">{`${message.message}`}</div>
														<div className="cms-msg-detail edited">{`(edited)`}</div>
													</div>
												)}
											</div>
										)}
									</div>
								))
							) : (
								<div className="empty-ct">
									<div className="empty-tag">#</div>
									<div className="empty-cms-header">{`Welcome to #${channel.name}!`}</div>
									<div className="empty-cms-body">{`This is the start of the #${channel.name} channel.`}</div>
								</div>
							)}

							{messages.length > 0
								? messages.map((message, i) => (
										<div
											id={theme}
											key={`s_${i}`}
											className="row justify"
										>
											<div className="img-link">
												<img
													src={message.display_pic}
													alt="Display Picture"
													className="pic-icon"
												/>
											</div>

											{Number(message.id) ===
											Number(edit) ? (
												<CMEdit
													message={message}
													onChange={handleEditChange}
												/>
											) : (
												<div className="msg-ct">
													<div className="cms-msg-header">
														<>
															{message.role ===
															"owner" ? (
																<>
																	<div
																		id={
																			theme
																		}
																		className="cms-admin"
																	>{`${message.sender_nickname}`}</div>
																	<img
																		src={
																			crown
																		}
																		alt="crown"
																		className="icon"
																	/>
																</>
															) : message.role ===
															  "admin" ? (
																<div
																	id={theme}
																	className="cms-admin"
																>{`${message.sender_nickname}`}</div>
															) : message.role ===
															  "member" ? (
																<div
																	id={theme}
																	className="cms-member"
																>
																	{`${message.sender_nickname}`}{" "}
																</div>
															) : (
																<div
																	id={theme}
																	className="cms-pending"
																>{`${message.sender_nickname}`}</div>
															)}
															<div className="cms-msg-date">
																{date
																	.toUTCString()
																	.slice(
																		0,
																		22
																	)}
															</div>
														</>

														{Number(currMbr.id) ===
															Number(
																message.sender_id
															) ||
														role === "admin" ||
														role === "owner" ? (
															<div
																id={theme}
																className="cms-options absolute-op"
															>
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
																		deleteHandlerCurr
																	}
																	data-id={
																		message.id
																	}
																	data-msg={
																		message.message
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

													{imageLinks[
														message.message.slice(
															message.message
																.length - 4
														)
													] ? (
														<div>
															<img
																src={
																	message.message
																}
																className="aws-image"
																alt={`uploaded by ${message.sender_nickname}`}
															></img>
														</div>
													) : (
														<div className="cms-msg-detail">{`${message.message}`}</div>
													)}
												</div>
											)}
										</div>
								  ))
								: null}
							<div ref={endMsgRef} />
						</div>

						{role ? (
							<div className="cm-form-container">
								{!imageButton || true ? (
									<button
										id={theme}
										className="cm-img-input"
										// onClick={() => setImageButton(true)}
										onClick={sendChat}
									>
										+
									</button>
								) : (
									<button
										id={theme}
										className="cm-img-input-x"
										onClick={() => setImageButton(false)}
									>
										x
									</button>
								)}

								{imageButton && false ? (
									// image upload
									<form
										onSubmit={sendImage}
										className="submit-cm"
									>
										<input
											type="file"
											accept="image/*"
											onChange={updateImage}
										/>
										<button type="submit">Submit</button>
										{imageLoading && <div>Loading...</div>}
									</form>
								) : null}
								{!imageButton || true ? (
									// text input
									<form
										onSubmit={sendChat}
										className="submit-cm"
									>
										{errors.length > 0 ? (
											<div className="cms-err">
												Error : Message length must be
												between 1 and 255 characters!
											</div>
										) : null}
										<input
											value={chatInput}
											onChange={updateChatInput}
											className="cm-text-input"
											id={theme}
										/>
									</form>
								) : null}
							</div>
						) : null}
					</div>
				</div>
			)
		);
	} else {
		return (
			<div className="loader-container">
				<div className="loader-header" id={theme}>
					# Summoning Pandas...
				</div>
				<div className="loader" id={theme}></div>
			</div>
		);
	}
};

export default CMIndex;

// {/* <button type="submit">Send</button> */}
