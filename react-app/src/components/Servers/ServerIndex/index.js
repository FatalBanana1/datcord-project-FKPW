import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkReadAllServers } from "../../../store/servers";
import "./ServerIndex.css";

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
		<div>
			<div className="mtop-15">Servers comp</div>
			<div className="mtop-15">List of Servers:</div>
			<div className="mtop-15">
				{servers.map((el) => (
					<div key={el.id} className="mtop-15">
						<img
							src={el.icon_url}
							className="servers-icon"
							alt="server icon"
						/>
						<div>{`Server : ${el.name}`}</div>
						<div>{`About : ${el.description}`}</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ServerIndex;
