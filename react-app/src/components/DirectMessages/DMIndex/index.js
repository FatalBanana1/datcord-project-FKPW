import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
	actionResetDirectMessages,
	thunkDeleteDirectMessage,
	thunkReadAllDirectMessages,
} from "../../../store/directMessages";
import { io } from "socket.io-client";
import "./DMIndex.css";
import DMEdit from "../DMEdit";

let socket;

export default function DMIndex({ theme }) {
	let dispatch = useDispatch();
	let { senderId, friendId } = useParams();
	//states
	const [isLoaded, setIsLoaded] = useState(false);
	const [edit, setEdit] = useState(999999990);
	const [reload, setReload] = useState(0);
	const [loadBottom, setLoadBottom] = useState(false);
	const [errors, setErrors] = useState([]);
	// controlled form input
	const [chatInput, setChatInput] = useState("");
	const [messages, setMessages] = useState([]);
	// img upload
	const [imageButton, setImageButton] = useState(false);
	const [image, setImage] = useState(null);
	const [newImage, setNewImage] = useState(false);
	const [imageLoading, setImageLoading] = useState(false);
	// const [friend, setFriend] = useState("");

	//selectors
	const alldms = useSelector((state) => state.directMessages);
	let dms = Object.values(alldms);
	const user = useSelector((state) => state.session.user);
	const servers = useSelector((state) => state.servers);
	const friends = useSelector((state) => state.friendships);
	let friend = friends[friendId];
	// console.log(`friendships >>> friend`, servers);

	// -------------

	// scroll
	const endMsgRef = useRef(null);
	const scrollToBottom = () => {
		if (!endMsgRef.current) {
			return;
		} else if (edit === 999999999 || edit === 999999990) {
			endMsgRef.current.scrollIntoView({ behavior: "smooth" });
		}
	};

	//----------------

	//effects

	useEffect(() => {
		scrollToBottom();
	}, [loadBottom, messages, dms, newImage]);

	useEffect(() => {
		scrollToBottom();
		dispatch(thunkReadAllDirectMessages(friendId)).then(() => {
			setLoadBottom(true);
			setIsLoaded(true);
		});

		return () => {
			setChatInput("");
			setMessages([]);
			setEdit(999999990);
			setErrors([]);
		};
	}, [friendId, senderId, image, reload]);

	useEffect(() => {
		// open socket
		socket = io();
		socket.on("direct_message", (direct_message) => {
			setMessages((messages) => [...messages, direct_message]);
		});
		return () => {
			setChatInput("");
			setErrors([]);
			socket.disconnect();
			dispatch(actionResetDirectMessages());
		};
	}, [senderId, friendId]);

	// ----------------------

	if (isLoaded && friend && servers && theme) {
		const updateChatInput = (e) => {
			if (chatInput.length > 0 && chatInput.length < 255) setErrors([]);
			setChatInput(e.target.value);
		};

		//send chat messages - websocket
		const sendChat = (e) => {
			e.preventDefault();

			if (chatInput.length > 255 || chatInput.length < 1) {
				setErrors([`error: Message length must be between 1 and 255.`]);
				return null;
			} else {
				socket.emit("direct_message", {
					sender_id: senderId,
					message: chatInput,
					friend_id: friendId,
				});
				setChatInput("");
				setEdit(999999999);
			}
		};

		// ---------------

		// handlers

		// delete
		const deleteHandler = (e) => {
			setIsLoaded(false);
			setErrors([]);
			const payload = {
				id: e.target.dataset.id,
				sender_id: e.target.dataset.sender,
			};
			// return
			return dispatch(thunkDeleteDirectMessage(payload)).then(() =>
				setIsLoaded(true)
			);
		};

		// delete
		const deleteHandlerCurr = (e) => {
			setIsLoaded(false);
			setErrors([]);
			const payload = {
				id: e.target.dataset.id,
				sender_id: e.target.dataset.sender,
			};
			const msg = messages.filter(
				(el) => el.message !== e.target.dataset.msg
			);
			setMessages(msg);
			return dispatch(thunkDeleteDirectMessage(payload))
				.then(() => {
					setChatInput("");
					setMessages([]);
					dispatch(thunkReadAllDirectMessages(friend.id));
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
				setChatInput("");
				setMessages([]);
				setLoadBottom(true);
			}
		};

		// -------------

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
			const res = await fetch(`/api/dms/images/${friendId}`, {
				method: "POST",
				body: formData,
			});
			if (res.ok) {
				await res.json();
				setImage("");
				dispatch(thunkReadAllDirectMessages(friendId))
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

		let date = new Date();
		// your memberships
		let yourMemberships = Object.values(servers).reduce((acc, val) => {
			acc[val.id] = 1;
			return acc;
		}, {});
		let otherNicknames = new Set(
			friend.server_members.map((server) => {
				if (yourMemberships[server.server_id]) return server.nickname;
			})
		);

		const truncateNames = (names) => {
			if (names.length > 18) {
				return `${names.substring(0, 18)}...`;
			}
			return names;
		};
		// console.log(`front dm index ==========`, otherNicknames);

		// return
		return (
			user && (
				<div className="cms-container dms">
					<div className="cms-ch-name" id={theme}>
						<div className="cms-friend-name">
							{`@${friend.username}`}
						</div>
						<div className="row overfl-wid">
							<div className="dm-aka">{`AKA`}</div>
							<div className="dm-row">
								{[...otherNicknames]
									.slice(0, 6)
									.map((el, i) => {
										if (el) {
											return (
												<span
													className="mleft-10 dm-names"
													id={theme}
													key={i}
												>{`@${truncateNames(
													el
												)}`}</span>
											);
										} else return null;
									})}
							</div>
						</div>
					</div>

					<div className="cms-ct">
						<div className="cm-overflow" id={theme}>
							{dms.length > 0 ? (
								dms.map((message, i) => (
									<div
										id={theme}
										className="row justify"
										key={message.id}
									>
										{Number(message.sender_id) ===
										Number(senderId) ? (
											<div
												className="img-link"
												data-id={message.id}
											>
												<img
													src={user.display_pic}
													alt="Display Picture"
													className="pic-icon"
													data-id={message.id}
												/>
											</div>
										) : (
											<div
												className="img-link"
												data-id={message.id}
											>
												<img
													src={friend.display_pic}
													alt="Display Picture"
													className="pic-icon"
													data-id={message.id}
												/>
											</div>
										)}

										{Number(message.id) === Number(edit) ? (
											<DMEdit
												message={message}
												onChange={handleEditChange}
												user={user}
												friend={friend}
											/>
										) : (
											<div className="msg-ct">
												<div
													className="cms-msg-header"
													id={theme}
												>
													{Number(
														message.sender_id
													) === Number(user.id) ? (
														<div
															id={theme}
															className="dms-admin"
														>{`${user.username}`}</div>
													) : (
														<div
															id={theme}
															className="dms-member"
														>
															{`${friend.username}`}
														</div>
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

													{Number(user.id) ===
													Number(
														message.sender_id
													) ? (
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
									<img
										src={friend.display_pic}
										alt="friend avatar"
										className="empty-friend-pic"
									/>
									<div className="empty-cms-header">{`@${friend.username}`}</div>
									<div className="empty-cms-body">{`This is the beginning of your direct message history with @${friend.username}.`}</div>
								</div>
							)}

							{messages.length > 0
								? messages.map((message, i) => (
										<div
											id={theme}
											key={`s_${i}`}
											className="row justify"
										>
											{Number(message.sender_id) ===
											Number(senderId) ? (
												<div className="img-link">
													<img
														src={user.display_pic}
														alt="display picture"
														className="pic-icon"
													/>
												</div>
											) : (
												<div className="img-link">
													<img
														src={friend.display_pic}
														alt="display picture"
														className="pic-icon"
													/>
												</div>
											)}

											{Number(message.id) ===
											Number(edit) ? (
												<DMEdit
													message={message}
													onChange={handleEditChange}
													user={user}
													friend={friend}
												/>
											) : (
												<div className="msg-ct">
													<div className="cms-msg-header">
														{Number(
															message.sender_id
														) ===
														Number(user.id) ? (
															<div
																id={theme}
																className="dms-admin"
															>{`${user.username}`}</div>
														) : (
															<div
																id={theme}
																className="dms-member"
															>
																{`${friend.username}`}
															</div>
														)}
														<div className="cms-msg-date" id={theme}>
															{date
																.toUTCString()
																.slice(0, 22)}
														</div>

														{Number(senderId) ===
														Number(
															message.sender_id
														) ? (
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
																alt={`Uploaded Image`}
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

						<div className="cm-form-container dms">
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
								<form onSubmit={sendChat} className="submit-cm">
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
					</div>
				</div>
			)
		);
	} else
		return (
			<div className="loader-container">
				<div className="loader-header" id={theme}>
					# Sliding into your DMs...
				</div>
				<div className="loader" id={theme}></div>
			</div>
		);
}
