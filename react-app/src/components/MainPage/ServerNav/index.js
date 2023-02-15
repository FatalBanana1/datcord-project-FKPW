import "./ServerNav.css";
import avatar from "../../../assets/datcord_logo_svg.svg";
import {
	NavLink,
	Redirect,
	Route,
	Switch,
	useHistory,
	useParams,
} from "react-router-dom";
import MainContent from "../MainContent";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	actionResetServers,
	thunkReadUserServers,
} from "../../../store/servers";
import { thunkGetChannels } from "../../../store/channels";
import CreateServerForm from "../../Servers/CreateServerForm";
import OpenModalButton from "../../OpenModalButton";

export default function ServerNav() {
	const dispatch = useDispatch();
	const [loaded, setLoaded] = useState(false);
	const allServers = useSelector((state) => state.servers);
	const servers = Object.values(allServers);
	const history = useHistory();
	const user = useSelector((state) => state.session.user);
	const { serverId } = useParams();

	useEffect(() => {
		dispatch(thunkReadUserServers()).then(() => setLoaded(true));
		return () => dispatch(actionResetServers());
	}, [user.id, serverId]);

	const handleClick = async (serverId) => {
		dispatch(thunkGetChannels(serverId)).then(setLoaded(true));
	};

	// console.log(`FRONT server nav comp=======`, servers[0].channels[0].id);

	return (
		<div className="ServerNav-container">
			<NavLink to="/channels/@me" className="ServerNav-profile">
				<img
					src={avatar}
					className="ServerNav-profile-cow-icon"
					alt="server-icon"
				/>
			</NavLink>
			<div className="ServerNav-divider"></div>
			{/* // can probably map all the servers icon_url */}
			{servers.length &&
				loaded &&
				servers.map((server, i) => (
					<div key={i}>
						{server && server.channels && server.channels[0] ? (
							<NavLink
								to={`/channels/${server.id}/${server.channels[0].id}`}
								className="ServerNav-server-icons"
								onClick={() => handleClick(server.id)}
							>
								<img
									src={server.icon_url}
									className="ServerNav-icon"
									alt="server-icon"
								/>
							</NavLink>
						) : (
							<NavLink
								to={`/channels/${server.id}/new`}
								className="ServerNav-server-icons"
								onClick={() => handleClick(server.id)}
							>
								<img
									src={server.icon_url}
									className="ServerNav-icon"
									alt="server-icon"
								/>
							</NavLink>
						)}
					</div>
				))}
			<div className="ServerNav-divider"></div>

			{/* <i className="fa-solid fa-plus"></i> */}
			<OpenModalButton
				buttonText="Create-Server"
				modalComponent={<CreateServerForm onChange={loaded} />}
			/>

			<NavLink to={`/gotMilk`} className="ServerNav-icons">
				<i className="fa-solid fa-compass fa-lg" />
			</NavLink>
		</div>
	);
}
