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

const ServerIndex = () => {
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

	if (isLoaded) {
		let servers = Object.values(allServers);

		// return
		return (
			<div className="exp-bk">
				<ServerNav />
				<div className="explorer-container">
					<div className="explorer-banner-container">
						<img className="explorer-img" src={explorerBanner} />
					</div>

					<div className="explorer-banner-header">
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
										<div className="explorer-server-container">
											<div className="explorer-server-top">
												<div className="explorer-server-img">
													<img
														src={el.icon_url}
														className="servers-icon"
														alt="server icon"
													/>
												</div>
											</div>
											<div className="explorer-server-name">
												<div className="check">
													<i className="fa-regular fa-circle-check"></i>
												</div>
												<div>{`${el.name}`}</div>
											</div>
											<div className="explorer-server-description">{`${el.description}`}</div>
											<div className="already-joined">
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
											<div className="explorer-server-container">
												<div className="explorer-server-top">
													<div className="explorer-server-img">
														<img
															src={el.icon_url}
															className="servers-icon"
															alt="server icon"
														/>
													</div>
												</div>
												<div className="explorer-server-name">
													<div className="check">
														<i className="fa-regular fa-circle-check"></i>
													</div>
													<div>{`${el.name}`}</div>
												</div>
												<div className="explorer-server-description">{`${el.description}`}</div>
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
	} else return <div>Loading...</div>;
};

export default ServerIndex;
