import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import {
	actionResetChannelMessages,
	thunkReadAllChannelMessages,
} from "../../store/channelMessages";

// leave this OUT
let socket;

const ChannelMessages = () => {
	const dispatch = useDispatch();
	// const [isLoaded, setIsLoaded] = useState(false);

	// use state for controlled form input
	const [chatInput, setChatInput] = useState("");
	const [messages, setMessages] = useState([]);
	const user = useSelector((state) => state.session.user);

	const allcms = useSelector((state) => state.channelMessages);
	let cms = Object.values(allcms);

	console.log(`chan mess CMS ____`, cms);
	useEffect(() => {
		dispatch(thunkReadAllChannelMessages());
		// .then(() => setIsLoaded(true));

		return () => {
			dispatch(actionResetChannelMessages());
		};
	}, []);

	useEffect(() => {
		// open socket connection
		// create websocket
		socket = io();
		// socket.emit("join", { channelId: channelId, username: user.username });

		socket.on("channel_message", (channel_message) => {
			console.log(
				`front comp messages checking******************`,
				channel_message
			);
			setMessages((messages) => [...messages, channel_message]);
		});

		// when component unmounts, disconnect
		return () => {
			socket.disconnect();
			// dispatch(actionResetChannelMessages());
		};
	}, [messages]);

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
			channelId: 1,
		});
		setChatInput("");
	};

	console.log(`MESSGS ===`, messages);

	// if (!isLoaded) return null;

	// print the username and message for each chat
	return (
		user && (
			<>
				<div className="overflow">
					{cms.length
						? cms.map((message, ind) => (
								<div
									key={ind}
								>{`${message.sender_nickname}: ${message.message}`}</div>
						  ))
						: null}
					{messages.map((message, ind) => (
						<div
							key={ind}
						>{`${message.sender_nickname}: ${message.message}`}</div>
					))}
				</div>
				<form onSubmit={sendChat}>
					<input value={chatInput} onChange={updateChatInput} />
					<button type="submit">Send</button>
				</form>
			</>
		)
	);
};

export default ChannelMessages;
