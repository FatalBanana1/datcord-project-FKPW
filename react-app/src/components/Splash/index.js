import { useSelector } from "react-redux";
import LoginFormModal from "../LoginFormModal";
import ChannelMessages from "../ChannelMessages";
import ServerIndex from "../Servers/ServerIndex";

const Splash = () => {
	let user = useSelector((state) => state.session.user);

	//trigger login when no user
	if (!user) {
		return <LoginFormModal />;
	}

	//return
	return (
		<div>
			<div>
				<h1>Splash Page</h1>
			</div>
			<div>{`Hello ${user.username}! Welcome to Datcord!`}</div>
			<div>
				<ServerIndex />
			</div>
			<div>
				<ChannelMessages />
			</div>
		</div>
	);
};

export default Splash;
