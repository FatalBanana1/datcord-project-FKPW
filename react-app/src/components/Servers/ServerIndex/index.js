import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkReadAllServers } from "../../../store/servers";
import "./ServerIndex.css";
import background from "../../../assets/explore-servers-background.png";
import { NavLink } from "react-router-dom";
import ServerNav from "../../MainPage/ServerNav";

const ServerIndex = () => {
	let dispatch = useDispatch();
	let [isLoaded, setIsLoaded] = useState(false);

	let allServers = useSelector((state) => state.servers);
	const user = useSelector((state) => state.session.user);

	useEffect(() => {
		dispatch(thunkReadAllServers()).then(() => setIsLoaded(true));
	}, [dispatch]);

	if (isLoaded) {
		let servers = Object.values(allServers);

		// console.log(`server index comp-----`, servers);

		// return
		return (
			<div className="exp-bk">
				{/* <div to="/channels/@me" className="exp-link">
				</div> */}
				<ServerNav />
				<div className="exp-ct">
					<div className="mtop-15">
						<img className="exp-img" src={background} />
					</div>

					<div className="mtop-15">Featured Communities</div>
					<div className="mtop-15 exp-servers-ct">
						{servers.map((el) => {
							if (
								el &&
								el.channels &&
								el.channels[0] &&
								user.server_members.find(
									(j) => j.server_id === el.id
								)
							) {
								return (
									<NavLink
										to={`/channels/${el.id}/${el.channels[0].id}`}
										key={el.id}
										className="mtop-15 exp-serv"
									>
										<img
											src={el.icon_url}
											className="servers-icon"
											alt="server icon"
										/>
										<div>{`Server : ${el.name}`}</div>
										<div>{`About : ${el.description}`}</div>
										<div>Already Joined</div>
										<div>End of card</div>
									</NavLink>
								);
							} else {
								return (
									<NavLink
										to={`/channels/@me/`}
										key={el.id}
										className="mtop-15 exp-serv"
									>
										<img
											src={el.icon_url}
											className="servers-icon"
											alt="server icon"
										/>
										<div>{`Server : ${el.name}`}</div>
										<div>{`About : ${el.description}`}</div>
										<div>Join Server</div>
										<div>End of card</div>
									</NavLink>
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
