// import { NavLink } from "react-router-dom";
import "./UserLandingSideBar.css";

// import logo from "../../assets/datcord_logo_svg.svg";
// import { useDispatch } from "react-redux";
import Channels from "../Channels";

export default function UserLandingSideBar({ page, isLoaded }) {
	// const dispatch = useDispatch();

	if (page === "channel") {
		return <Channels isLoaded={isLoaded} />
	}
	return (
		<div className="UserLanding-sidebar">
			<ol>
				<li>direct message list</li>
				<li>must be nice to have friends</li>
				<li>meow meow</li>
			</ol>
		</div>
	);
}
