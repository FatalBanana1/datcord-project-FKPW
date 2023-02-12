import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import {
	actionResetChannelMessages,
	thunkReadAllChannelMessages,
} from "../../store/channelMessages";
import "./ChannelMessages.css";

// leave this OUT
let socket;

const ChannelMessages = () => {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);

	// use state for controlled form input
	const [chatInput, setChatInput] = useState("");
	const [messages, setMessages] = useState([]);
	const user = useSelector((state) => state.session.user);

	const allcms = useSelector((state) => state.channelMessages);
	let cms = Object.values(allcms);

	let { serverId, channelId } = useParams();
	const channels = useSelector((state) => state.channels.channels);

	const channel = channels[channelId];

	// console.log(
	// 	`chan mess CMS ____>>>>>>>>>`,
	// 	channelId,
	// 	serverId,
	// 	channel,
	// 	channels
	// );

	useEffect(() => {
		dispatch(thunkReadAllChannelMessages(serverId, channelId)).then(() =>
			setIsLoaded(true)
		);

		return () => {
			setChatInput("");
			dispatch(actionResetChannelMessages());
			setIsLoaded(false);
		};
	}, [channelId, serverId]);

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
			// dispatch(actionResetChannelMessages());
		};
	}, [messages]);

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
				sender_nickname: user.username,
				message: chatInput,
				channelId,
			});
			setChatInput("");
		};

		// console.log(`MESSGS ===`, messages);

		// if (!isLoaded) return null;

		// print the username and message for each chat
		return (
			user && (
				<>
					<div className="cms-ch-name">{`# ${channel.name}`}</div>

					<div className="cms-ct">
						<div className="cm-overflow">
							{cms.length
								? cms.map((message, ind) => (
										<div
											className="clicker"
											key={ind}
										>{`${message.sender_nickname}: ${message.message}`}</div>
								  ))
								: null}
							{messages.map((message, ind) => (
								<div
									className="clicker"
									key={ind}
								>{`${message.sender_nickname}: ${message.message}`}</div>
							))}
						</div>
						<form onSubmit={sendChat} className="submit">
							<input
								value={chatInput}
								onChange={updateChatInput}
								className="cm-text-input"
							/>
						</form>
					</div>
				</>
			)
		);
	} else if (isLoaded && !channel) {
		return <div>No Channels Found!</div>;
	} else {
		return <div># Loading...</div>;
	}
};

export default ChannelMessages;

// {/* <button type="submit">Send</button> */}
