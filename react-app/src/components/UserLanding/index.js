import { useSelector } from "react-redux";
import CMIndex from "../ChannelMessages/CMIndex";
import FriendshipsPage from "../Friendships/FriendshipsPage";
import ServerMembers from "../ServerMembers";
import "./UserLanding.css";

export default function UserLanding({ page }) {
	const user = useSelector((state) => state.session.user);
	let theme;

	if (user && user.theme) theme = user.theme;
	theme = "light";

	switch (page) {
		case "channel": {
			return theme && (
				<div className="UserLanding-container reverse" id={theme}>
					{/* <div className="UserLanding-main-content"> */}
					{/* <div className="UserLanding-server-members"> */}
					<ServerMembers />
					<CMIndex />
					{/* </div> */}
					{/* </div> */}
				</div>
			);
		}
		default: {
			return (
				<div className="UserLanding-container">
					{/* <ol>
                <li>welcome page when first logging in</li>
                <li>messages if on server page</li>
                <li>members list if on server page</li>
            </ol> */}
					<FriendshipsPage />
				</div>
			);
		}
	}
}
