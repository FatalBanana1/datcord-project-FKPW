import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkReadAllServers } from "../../../store/servers";
import "./ServerIndex.css";
import explorerBanner from "../../../assets/explorer-banner.svg";
import { NavLink } from "react-router-dom";
import ServerNav from "../../MainPage/ServerNav";
import { thunkReadAllAllServers } from "../../../store/allServers";
import { thunkAddServerMember } from "../../../store/serverMembers";

const ServerIndex = () => {
  let dispatch = useDispatch();
  let [isLoaded, setIsLoaded] = useState(false);
  let [joined, setJoined] = useState(false);

  let allServers = useSelector((state) => state.allServers);
  const user = useSelector((state) => state.session.user);
  let userId = user.id;

  useEffect(() => {
    dispatch(thunkReadAllAllServers()).then(() => setIsLoaded(true));
  }, [dispatch, isLoaded, joined]);

  const joinServer = (serverId) => {
    // e.preventDefault();
    // console.log("IS THIS WORKING????");
    console.log(serverId);

    dispatch(thunkAddServerMember(serverId, "pending")).then(
      setJoined(!joined)
    );
  };

  // if (allServers) console.log(allServers[0].server_members);

  if (isLoaded) {
    let servers = Object.values(allServers);

    // console.log(`server index comp-----`, servers);

    // return
    return (
      <div className="exp-bk">
        {/* <div to="/channels/@me" className="exp-link">
				</div> */}
        <ServerNav />
        <div className="explorer-container">
          <div className="explorer-banner-container">
            <img className="explorer-img" src={explorerBanner} />
          </div>

          <div className="explorer-banner-header">Featured Communities</div>
          <div className="explorer-banner-server-container">
            {servers.map((el) => {
              if (
                el &&
                el.channels &&
                el.channels[0] &&
                el.server_members &&
                // user.server_members.find((j) => j.server_id === el.id)
                el.server_members.find((j) => j.user_id == userId)
              ) {
                return (
                  <NavLink
                    to={`/channels/${el.id}/${el.channels[0].id}`}
                    key={el.id}
                    className=""
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
                  <>
                    <NavLink to={`/channels/@me/`} key={el.id} className="">
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
                        <div
                          onClick={() => joinServer(el.id)}
                          className="join-server"
                        >
                          Join Server
                        </div>
                      </div>
                    </NavLink>
                  </>
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
