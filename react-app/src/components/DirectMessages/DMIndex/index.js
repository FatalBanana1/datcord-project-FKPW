import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { thunkReadAllDirectMessages } from "../../../store/directMessages";

export default function DMIndex({ theme }) {
	let dispatch = useDispatch();
	let { senderId, friendId } = useParams();
	//states
	const [isLoaded, setIsLoaded] = useState(false);
	const [edit, setEdit] = useState(999999990);
	const [reload, setReload] = useState(0);
	const [loadBottom, setLoadBottom] = useState(false);
	// controlled form input
	const [chatInput, setChatInput] = useState("");
	const [messages, setMessages] = useState([]);
	// img upload
	const [imageButton, setImageButton] = useState(false);
	const [image, setImage] = useState(null);
	const [newImage, setNewImage] = useState(false);
	const [imageLoading, setImageLoading] = useState(false);

	//selectors
	const alldms = useSelector((state) => state.channelMessages);
	let dms = Object.values(alldms);

	// scroll

	const endMsgRef = useRef(null);
	const scrollToBottom = () => {
		if (!endMsgRef.current) {
			return;
		} else if (edit === 999999999 || edit === 999999990) {
			endMsgRef.current.scrollIntoView({ behavior: "smooth" });
		}
	};

	//effects
	useEffect(() => {
		scrollToBottom();
	}, [loadBottom, messages, dms, newImage]);

	useEffect(() => {
		scrollToBottom();
		dispatch(thunkReadAllDirectMessages(serverId, channelId)).then(() => {
			setIsLoaded(true);
			setLoadBottom(true);
		});

		return () => {
			setChatInput("");
			setMessages([]);
			setEdit(999999990);
		};
	}, [friendId, senderId, image, reload]);

	useEffect(() => {
		// open socket connection
		// create websocket
		socket = io();
		// socket.emit("join", { channelId: channelId, username: user.username });

		socket.on("direct_message", (direct_message) => {
			setMessages((messages) => [...messages, direct_message]);
		});

		// when component unmounts, disconnect
		return () => {
			setChatInput("");
			socket.disconnect();
			// setMessages([]);
			dispatch(actionResetChannelMessages());
		};
	}, [user.id, serverId, channelId]);

	if (isLoaded) {
		// return
		return <div>inside DM Index</div>;
	} else return <div>Sliding into your DMs...</div>;
}
