import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import {
	actionResetChannelMessages,
	thunkDeleteChannelMessage,
	thunkReadAllChannelMessages,
} from "../../../store/channelMessages";
import CMEdit from "../CMEdit/index.";
import "./CMIndex.css";
import crown from "../../../assets/crown.png";

// leave this OUT
let socket;

const CMIndex = () => {
	const dispatch = useDispatch();

	const [isLoaded, setIsLoaded] = useState(false);
	const [loadBottom, setLoadBottom] = useState(false);
	const [edit, setEdit] = useState(0);

	// use state for controlled form input
	const [chatInput, setChatInput] = useState("");
	const [messages, setMessages] = useState([]);
	const user = useSelector((state) => state.session.user);

	const allMembers = useSelector((state) => state.serverMembers);
	const allcms = useSelector((state) => state.channelMessages);
	let cms = Object.values(allcms);
	let { serverId, channelId } = useParams();
	const channels = useSelector((state) => state.channels.channels);
	const channel = channels[channelId];

	const endMsgRef = useRef(null);

	const scrollToBottom = () => {
		if (!endMsgRef.current) return;
		endMsgRef.current.scrollIntoView({ behavior: "smooth" });
	}

	useEffect(() => {
		scrollToBottom();
	}, [loadBottom, messages])

	useEffect(() => {
		scrollToBottom();
		dispatch(thunkReadAllChannelMessages(serverId, channelId)).then(() => {
			setIsLoaded(true)
			setLoadBottom(true)
		}
		);


		return () => {
			setChatInput("");
			setMessages([]);
		};
	}, [channelId, serverId, user.id]);

	useEffect(() => {
		// open socket connection
		// create websocket
		socket = io();
		// socket.emit("join", { channelId: channelId, username: user.username });

		socket.on("channel_message", (channel_message) => {
			// console.log(
			// 	`front comp messages checking******************`,
			// 	channel_message
			// );
			setMessages((messages) => [...messages, channel_message]);
		});

		// when component unmounts, disconnect
		return () => {
			setChatInput("");
			socket.disconnect();
			dispatch(actionResetChannelMessages());
		};
	}, [user.id, serverId, channelId]);

	// -------------

	// handlers

	// delete
	const deleteHandler = (e) => {
		setIsLoaded(false);
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
		return dispatch(thunkDeleteChannelMessage(payload)).then(() =>
			setIsLoaded(true)
		);
	};

	// -------------

	// edit
	const handleEdit = (e) => {
		setEdit(e.target.dataset.id);
	};

	// edit child change
	const handleEditChange = (e) => {
		setEdit(e);
		if (e === 0) {
			setMessages([]);
		}
	};

	// -------------

	if (isLoaded && channel) {
		const updateChatInput = (e) => {
			setChatInput(e.target.value);
		};

		//send chat messages through the websocket
		const sendChat = (e) => {
			e.preventDefault();
			if (chatInput.length < 1) return null;
			socket.emit("channel_message", {
				sender_id: user.id,
				message: chatInput,
				channelId,
			});
			setChatInput("");
		};
		let date = new Date();
		let role;
		const currMbr = Object.values(allMembers).find(
			(el) => el.user_id === user.id
		);

		if (currMbr) {
			role = currMbr.role;
		}
		// console.log(`edit ===`, edit);

		// print the username and message for each chat
		return (
			user && (
				<div className="cms-container">
					<div className="cms-ch-name">{`# ${channel.name}`}</div>

					<div className="cms-ct">
						<div className="cm-overflow">
							{cms.length
								? cms.map((message) => (
										<div key={message.id}>
											{message.id == edit ? (
												<CMEdit
													message={message}
													onChange={handleEditChange}
												/>
											) : (
												<div className="msg-ct">
													<div className="cms-msg-header">
														{message.role ===
														"owner" ? (
															<>
																<div className="cms-admin">{`${message.sender_nickname}`}</div>
																<img
																	src={crown}
																	alt="crown"
																	className="icon"
																/>
															</>
														) : message.role ===
														  "admin" ? (
															<div className="cms-admin">{`${message.sender_nickname}`}</div>
														) : message.role ===
														  "member" ? (
															<div className="cms-member">
																{`${message.sender_nickname}`}{" "}
															</div>
														) : (
															<div className="cms-pending">{`${message.sender_nickname}`}</div>
														)}
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

													{message.created_at ==
													message.updated_at ? (
														<div className="cms-msg-detail">{`${message.message}`}</div>
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
								: null}
							{messages.map((message, i) => (
								<div key={`s_${i}`}>
									{message.id == edit ? (
										<CMEdit
											message={message}
											onChange={handleEditChange}
										/>
									) : (
										<div className="msg-ct">
											<div className="cms-msg-header">
												{message.role === "owner" ? (
													<>
														<div className="cms-admin">{`${message.sender_nickname}`}</div>
														<img
															src={crown}
															alt="crown"
															className="icon"
														/>
													</>
												) : message.role === "admin" ? (
													<div className="cms-admin">{`${message.sender_nickname}`}</div>
												) : message.role ===
												  "member" ? (
													<div className="cms-member">
														{`${message.sender_nickname}`}{" "}
													</div>
												) : (
													<div className="cms-pending">{`${message.sender_nickname}`}</div>
												)}{" "}
												<div className="cms-msg-date">
													{date
														.toUTCString()
														.slice(0, 22)}
												</div>
												{user.id == message.sender_id ||
												role === "admin" ||
												role === "owner" ? (
													<div className="cms-options">
														<div
															className="cms-edit"
															data-id={message.id}
															data-sender={
																message.sender_id
															}
															onClick={handleEdit}
														>
															Edit
														</div>
														<div
															className="cms-delete"
															onClick={
																deleteHandlerCurr
															}
															data-id={message.id}
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

											<div className="cms-msg-detail">{`${message.message}`}</div>
										</div>
									)}
								</div>
							))}
							<div ref={endMsgRef} />
						</div>
						{role === "member" ||
						role === "owner" ||
						role === "admin" ? (
							<div className="cm-form-container">
							<form onSubmit={sendChat} className="submit-cm">
								<input
									value={chatInput}
									onChange={updateChatInput}
									className="cm-text-input"
								/>
							</form>
							</div>
						) : null}
					</div>
				</div>
			)
		);
	} else if (isLoaded && !channel) {
		return <div>No Channels Found!</div>;
	} else {
		return <div># Loading...</div>;
	}
};

export default CMIndex;

// {/* <button type="submit">Send</button> */}
