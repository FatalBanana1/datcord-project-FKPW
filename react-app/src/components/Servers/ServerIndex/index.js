import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	thunkReadAllServers,
	thunkReadUserServers,
} from "../../../store/servers";
import "./ServerIndex.css";
import explorerBanner from "../../../assets/explorer-banner.svg";
import { NavLink, useHistory } from "react-router-dom";
import ServerNav from "../../MainPage/ServerNav";
import {
	actionResetAllServers,
	thunkReadAllAllServers,
} from "../../../store/allServers";
import { thunkAddServerMember } from "../../../store/serverMembers";
import { authenticate } from "../../../store/session";

const ServerIndex = ({ theme }) => {
	let dispatch = useDispatch();
	let [isLoaded, setIsLoaded] = useState(false);
	let [joined, setJoined] = useState(false);
	const history = useHistory();

	let allServers = useSelector((state) => state.allServers);
	const user = useSelector((state) => state.session.user);
	let userId = user.id;

	useEffect(() => {
		dispatch(thunkReadAllAllServers())
			.then(() => thunkReadUserServers())
			.then(() => setIsLoaded(true));

		return () => actionResetAllServers();
	}, [dispatch, joined, userId]);

	const joinServer = (serverId, server) => {
		setIsLoaded(false);
		// .then(setJoined(!joined))

		return dispatch(thunkAddServerMember(serverId, "pending"))
			.then(() => dispatch(authenticate()))
			.then(() =>
				history.push(`/channels/${server.id}/${server.channels[0].id}`)
			);
	};

	function getRandomPastelGradient() {
		const hue = Math.floor(Math.random() * 360); // Hue value for the gradient
		const pastel1 = `hsl(${hue}, 100%, 80%)`; // First pastel color
		const pastel2 = `hsl(${hue + 40}, 100%, 80%)`; // Second pastel color
		return `linear-gradient(to right, ${pastel1}, ${pastel2})`;
	}

	const style = {
		background: getRandomPastelGradient(),
	};

	if (isLoaded) {
		let servers = Object.values(allServers);

		// return
		return (
			<div className="exp-bk" id={theme}>
				<ServerNav theme={theme} />
				<div className="explorer-container">
					<div className="explorer-banner-container">
						<img className="explorer-img" src={explorerBanner} />
					</div>

					<div className="explorer-banner-header" id={theme}>
						Featured Communities
					</div>
					<div className="explorer-banner-server-container">
						{servers.map((el) => {
							if (
								el &&
								el.channels &&
								el.channels[0] &&
								el.server_members &&
								el.server_members.find(
									(j) => j.user_id == userId
								)
							) {
								return (
									<NavLink
										to={`/channels/${el.id}/${el.channels[0].id}`}
										key={el.id}
									>
										<div
											className="explorer-server-container"
											id={theme}
										>
											<div
												className="explorer-server-top"
												style={style}
												id={theme}
											>
												<div className="explorer-server-img">
													<img
														src={el.icon_url}
														className="servers-icon"
														id={theme}
														alt="server icon"
													/>
												</div>
											</div>
											<div
												className="explorer-server-name"
												id={theme}
											>
												<div className="check">
													<i className="fa-regular fa-circle-check"></i>
												</div>
												<div>{`${el.name}`}</div>
											</div>
											<div
												className="explorer-server-description"
												id={theme}
											>{`${el.description}`}</div>
											<div
												className="explorer-server-description"
												id={theme}
											>{`${
												Object.keys(el.server_members)
													.length
											} Member(s)`}</div>
											<div
												className="already-joined"
												id={theme}
											>
												<i className="fa-solid fa-circle-check"></i>
											</div>
										</div>
									</NavLink>
								);
							} else {
								return (
									<div key={el.id}>
										<div
											onClick={() =>
												joinServer(el.id, el)
											}
											className="pointer"
										>
											<div
												className="explorer-server-container"
												id={theme}
											>
												<div
													className="explorer-server-top"
													id={theme}
												>
													<div className="explorer-server-img">
														<img
															src={el.icon_url}
															className="servers-icon"
															id={theme}
															alt="server icon"
														/>
													</div>
												</div>
												<div
													className="explorer-server-name"
													id={theme}
												>
													<div className="check">
														<i className="fa-regular fa-circle-check"></i>
													</div>
													<div>{`${el.name}`}</div>
												</div>
												<div
													className="explorer-server-description"
													id={theme}
												>{`${el.description}`}</div>
												<div
													className="explorer-server-description"
													id={theme}
												>{`${
													Object.keys(
														el.server_members
													).length
												} Member(s)`}</div>
												<div className="join-server">
													Join Server
												</div>
											</div>
										</div>
									</div>
								);
							}
						})}
					</div>
				</div>
			</div>
		);
	} else
		return (
			<div className="loader-container">
				<div className="loader-header" id={theme}>
					# Sliding into your DMs...
				</div>
				<div className="loader" id={theme}></div>
			</div>
		);
};

export default ServerIndex;
