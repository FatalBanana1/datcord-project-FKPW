import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { thunkReadAllChannelMessages } from "../../store/channelMessages";

// leave this OUT
let socket;

const ChannelMessages = () => {
	const dispatch = useDispatch();

	// use state for controlled form input
	const [chatInput, setChatInput] = useState("");
	const [messages, setMessages] = useState([]);
	const user = useSelector((state) => state.session.user);

	const allcms = useSelector((state) => state.channelMessages);
	let cms = Object.values(allcms);

	// console.log(`chan mess ____`, cms);

	useEffect(() => {
		dispatch(thunkReadAllChannelMessages());

		// open socket connection
		// create websocket
		socket = io();
		// socket.emit("join", { channelId: channelId, username: user.username });

		socket.on("channel_message", (channel_message) => {
			setMessages((messages) => [...messages, channel_message]);
		});
		// when component unmounts, disconnect
		return () => {
			socket.disconnect();
		};
	}, [user.username]);

	const updateChatInput = (e) => {
		setChatInput(e.target.value);
	};

	//send chat messages through the websocket
	const sendChat = (e) => {
		e.preventDefault();
		socket.emit("channel_message", {
			sender_id: user.id,
			message: chatInput,
		});
		setChatInput("");
	};

	// if (cms.length) {
	// 	messages.push(...cms);
	// }

	// console.log(`chan mess ===`, messages);

	// print the username and message for each chat
	return (
		user && (
			<div>
				<div>
					{messages.map((message, ind) => (
						<div
							key={ind}
						>{`${message.sender_id}: ${message.message}`}</div>
					))}
				</div>
				<form onSubmit={sendChat}>
					<input value={chatInput} onChange={updateChatInput} />
					<button type="submit">Send</button>
				</form>
			</div>
		)
	);
};

export default ChannelMessages;
