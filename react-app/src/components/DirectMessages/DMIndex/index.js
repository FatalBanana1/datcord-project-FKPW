import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function DMIndex() {
	let dispatch = useDispatch();
	let { senderId, friendId } = useParams();
	//states
	const [isLoaded, setIsLoaded] = useState(false);

	//selectors

	if (isLoaded) {
		// return
		return <div>inside DM Index</div>;
	} else return <div>Sliding into your DMs...</div>
}
