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

export default function ServerNav({ theme }) {
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
  }, [user.id]);

  const handleClick = async (serverId) => {
    return dispatch(thunkGetChannels(serverId)).then(setLoaded(true));
  };

  // const theme = user.theme;
  // console.log("THEME-------------->", theme);

  // console.log(`FRONT server nav comp=======`, servers[0].channels[0].id);

  return (
    theme && (
      <div className="ServerNav-container" id={theme}>
        <NavLink to="/channels/@me" className="ServerNav-profile" id={theme}>
          <img
            src={avatar}
            className="ServerNav-profile-cow-icon"
            alt="server-icon"
          />
        </NavLink>
        <div className="ServerNav-divider" id={theme}></div>
        {/* // can probably map all the servers icon_url */}
        {servers.length &&
          loaded &&
          servers.map((server, i) => (
            <div key={i}>
              {server && server.channels && server.channels[0] ? (
                <NavLink
                  to={`/channels/${server.id}/${server.channels[0].id}`}
                  className="ServerNav-server-icons"
                  id={theme}
                  onClick={() => handleClick(server.id)}
                >
                  <img
                    src={server.icon_url}
                    className="ServerNav-icon"
                    id={theme}
                    alt="server-icon"
                  />
                </NavLink>
              ) : (
                <NavLink
                  to={`/channels/${server.id}/new`}
                  className="ServerNav-server-icons"
                  id={theme}
                  onClick={() => handleClick(server.id)}
                >
                  <img
                    src={server.icon_url}
                    className="ServerNav-icon"
                    id={theme}
                    alt="server-icon"
                  />
                </NavLink>
              )}
            </div>
          ))}
        <div className="ServerNav-divider" id={theme}></div>

        {/* <i className="fa-solid fa-plus"></i> */}
        <OpenModalButton
          buttonText="Create-Server"
          id={theme}
          modalComponent={<CreateServerForm onChange={loaded} />}
        />

        <NavLink to={`/gotMilk`} className="ServerNav-icons" id={theme}>
          <i className="fa-solid fa-compass fa-lg" />
        </NavLink>
      </div>
    )
  );
}
