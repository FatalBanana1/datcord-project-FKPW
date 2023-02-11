import "./ServerNav.css";
import avatar from "../../../assets/datcord_logo_svg.svg";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import MainContent from "../MainContent";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkReadAllServers } from "../../../store/servers";
import { thunkGetChannels } from "../../../store/channels";
export default function ServerNav() {
  const dispatch = useDispatch();
  const allServers = useSelector(state => state.servers)
  console.log("ServerNav - servers:", allServers);
  const servers = Object.values(allServers);
  const history = useHistory();

  useEffect(() => {
    dispatch(thunkReadAllServers());
  }, [dispatch])

  const handleClick = async (serverId) => {
    const serverChannels = await dispatch(thunkGetChannels(serverId))
      .then((res) => (

        res === "Server has no channels" ? history.push(`/channels/${serverId}/0`) : history.push(`/channels/${serverId}/${res[0].id}`)
      ))
  }


  return (
    <div className="ServerNav-container">
      <div className="ServerNav-profile">
        <img src={avatar} className="ServerNav-icon" alt="server-icon" />
      </div>
      <div className="ServerNav-divider"></div>
      {/* // can probably map all the servers icon_url */}
      { servers && servers.map((server) => (
        <div className="ServerNav-icons" key={server.id} onClick={() => handleClick(server.id)}>
          <img src={server.icon_url} className="ServerNav-icon" alt="server-icon" />
        </div>
      ))}
      <div className="ServerNav-divider"></div>
      <div className="ServerNav-icons">
        <i className="fa-solid fa-plus"></i>
      </div>
    </div>
  );
}
