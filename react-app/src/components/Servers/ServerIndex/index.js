import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkReadAllServers } from "../../../store/servers";
import "./ServerIndex.css";
import background from "../../../assets/explore-servers-background.png";
import { NavLink } from "react-router-dom";

const ServerIndex = () => {
	let dispatch = useDispatch();
	// let [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		dispatch(thunkReadAllServers());
	}, [dispatch]);

	let allServers = useSelector((state) => state.servers);

	let servers = Object.values(allServers);

	// console.log(`server index comp-----`, servers);

	// return
	return (
		<div className="exp-bk">
			<NavLink to="/channels/@me" className="exp-link">
				Back to my channels
			</NavLink>
			<div className="exp-ct">
				<div className="mtop-15">
					<img className="exp-img" src={background} />
				</div>

				<div className="mtop-15">Featured Communities</div>
				<div className="mtop-15 exp-servers-ct">
					{servers.map((el) => (
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
						</NavLink>
					))}
				</div>
			</div>
		</div>
	);
};

export default ServerIndex;
