import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import logo from "../../assets/datcord_logo_svg.svg";
import { thunkGetChannels } from "../../store/channels";
import OpenModalButton from "../OpenModalButton";
import CreateChannelForm from "./CreateChannelForm";
import EditDeleteChannelModal from "./EditDeleteChannelModal/dp-index";
import "./Channel.css";
import { Modal } from "../../context/Modal";
import EditChannelForm from "./EditDeleteChannelModal";
import { thunkGetServerMembers } from "../../store/serverMembers";

export default function Channels() {
  const { serverId, channelId } = useParams();
  console.log("Channels - serverId, channelId:", serverId, channelId);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  console.log("USER:", user);
  // const server = useSelector(state => state.servers)[+serverId]
  // const server = useSelector((state) => state.servers.userServers);
  const server = useSelector((state) => state.channels.server);
  console.log("userServers", server);
  // console.log("server we want:", server.find((thing) => thing.id === +serverId))
  const channels = Object.values(
    useSelector((state) => state.channels.channels)
  );
  // console.log("SERVER", server);
  const serverMembers = Object.values(
    useSelector((state) => state.serverMembers)
  );
  const serverMember = serverMembers.filter(
    (member) => member.user_id === user.id
  )[0];
  console.log("channels - serverMember:", serverMember);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  let serverMemberRole;

  let permissions;

  console.log(
    "SERVER_CHANNELS",
    channels.filter((channel) => channel.id === 1)
  );
  console.log("USER", user);
  const [showMenu, setShowMenu] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showServerMenu, setShowServerMenu] = useState(false);
  const menuRef = useRef();

  const openServerMenu = () => {
    if (showServerMenu) return;
    setShowServerMenu(true);
  };

  useEffect(() => {
    if (!showServerMenu) return;

    const closeServerMenu = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setShowServerMenu(false);
      }
    };

    document.addEventListener("click", closeServerMenu);

    return () => document.removeEventListener("click", closeServerMenu);
  }, [showServerMenu]);

  const menuClassName =
    "server-menu-dropdown" + (showServerMenu ? "" : " hidden");

  console.log("show edit", showEdit);

  useEffect(() => {
    dispatch(thunkGetServerMembers(+serverId));
    dispatch(thunkGetChannels(+serverId)).then(() => setIsLoaded(true));
  }, [dispatch, serverId, channelId]);

  useEffect(() => {
    console.log("changed showEdit", showEdit);
  }, [showEdit]);

  const categories = {};

  if (!channels) return null;

  if (!server) return null;

  if (!serverMember) {
    return null;
  } else {
    serverMemberRole = serverMember.role;
  }

  if (serverMemberRole === "admin" || serverMemberRole === "owner") {
    console.log("hit this");
    permissions = true;
  } else {
    permissions = false;
  }

  if (channels.length > 0) {
    for (let i = 0; i < channels.length; i++) {
      const channel = channels[i];

      if (!categories[channel.category]) {
        categories[channel.category] = [channel];
      } else {
        categories[channel.category].push(channel);
      }
    }
  }

  const truncateNames = (names) => {
    if (names.length > 18) {
      return `${names.substring(0, 18)}...`;
    }

    return names;
  };

  // const categoriesMap = Object.keys(categories).map((category) => (
  // 	<>
  // 		<div className="UserLanding-sidebar-channel-category-container">
  // 			<i className="fa-solid fa-angle-down"></i>
  // 			<span className="UserLanding-sidebar-channel-category-name">
  // 				{truncateNames(category)}
  // 			</span>
  // 			<i className="fa-solid fa-plus align-right"></i>
  // 		</div>
  // 		<div className="UserLanding-sidebar-channel-list">
  // 			{/* map out channels here */}
  // 			{category &&
  // 				categories[category].map((channel) => (
  // 					<NavLink
  // 						to={`/channels/2/3`}
  // 						className="UserLanding-sidebar-channel-name"
  // 						key={channel.id}
  // 					>
  // 						<div className="UserLanding-sidebar-channel-name-label">
  // 							<span className="hash">#</span>{" "}
  // 							{channel.name && truncateNames(channel.name)}
  // 						</div>
  // 						{/* if admin, then show these buttons v */}
  // 						<div className="UserLanding-sidebar-channel-buttons">
  // 							<i className="fa-solid fa-user-plus"></i>
  // 							<i className="fa-solid fa-gear"></i>
  // 						</div>
  // 					</NavLink>
  // 				))}
  // 		</div>
  // 	</>
  // ));

  const closeMenu = () => setShowMenu(false);

  console.log("channels", channels);
  console.log("categories", categories.category);
  console.log("permissions", permissions);
  console.log("serverMember", serverMember);

  const categoriesMap = Object.keys(categories).map((category, idx) => (
    <div className="UserLanding-Sidebar-category-container" key={idx}>
      <div className="UserLanding-sidebar-channel-category-container">
        <i className="fa-solid fa-angle-down"></i>
        <span className="UserLanding-sidebar-channel-category-name">
          {truncateNames(category)}
        </span>
        <OpenModalButton
          buttonText="Create-Channel"
          onButtonClick={closeMenu}
          modalComponent={
            <CreateChannelForm categoryName={category} serverId={serverId} />
          }
        />
      </div>
      <div className="UserLanding-sidebar-channel-list">
        {/* map out channels here */}
        {category &&
          channels.length > 0 &&
          categories[category].map((channel) => (
            <NavLink
              to={`/channels/${serverId}/${channel.id}`}
              className="UserLanding-sidebar-channel-name"
              key={channel.id}
            >
              <div className="UserLanding-sidebar-channel-name-label">
                <span className="hash">#</span>{" "}
                {channel.name && truncateNames(channel.name)}
              </div>
              {permissions && (
                <div className="UserLanding-sidebar-channel-buttons">
                  <i className="fa-solid fa-user-plus"></i>
                  {/* <NavLink to={`/channels/${serverId}/${channel.id}/edit`}>
                                        <i className="fa-solid fa-gear" onClick={() => setShowEdit(true)}></i>
                                    </NavLink> */}
                  <OpenModalButton
                    buttonText="Edit-Channel"
                    onButtonClick={closeMenu}
                    modalComponent={
                      <EditChannelForm
                        categoryName={category}
                        prevName={channel.name}
                        serverId={serverId}
                        channelId={channel.id}
                      />
                    }
                  />
                </div>
              )}
            </NavLink>
          ))}
      </div>
    </div>
  ));

  // console.log("CATEGORIES", categories)

  if (!channels.length || !server) {
    return (
      <div className="UserLanding-sidebar">
        <div className="UserLanding-sidebar-header">
          {/* <p>{server.name}</p> */}
          <i className="fa-solid fa-angle-down big-angle-down"></i>
        </div>
        <div className="UserLanding-sidebar-channel-content">
          <div className="UserLanding-sidebar-channel-user-info">
            <div className="UserLanding-sidebar-channel-user-container">
              <div className="UserLanding-sidebar-channel-user-icon">
                <img src={logo} alt="User profile image" />
              </div>
              <div className="UserLanding-sidebar-channel-user-name">
                {user && user.username}
              </div>
            </div>
            <div className="UserLanding-sidebar-channel-user-actions">
              <i className="fa-solid fa-microphone"></i>
              <i className="fa-solid fa-headphones"></i>
              <i className="fa-solid fa-gear user-gear"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    isLoaded && (
      <div className="UserLanding-sidebar">
        <div className="UserLanding-sidebar-header">
          <p>{server.name}</p>
          <button className="server-dropdown-button" onClick={openServerMenu}>
            <i className="fa-solid fa-angle-down big-angle-down"></i>
          </button>
          <div className={menuClassName} ref={menuRef}>
            <div className="dropdown-wrapper">HELLO</div>
          </div>
        </div>
        <div className="UserLanding-sidebar-channel-content">
          {channels.length > 0 && categoriesMap.length ? (
            categoriesMap
          ) : (
            <div className="UserLanding-sidebar-channel-category-container"></div>
          )}

          <div className="UserLanding-sidebar-channel-user-info">
            <div className="UserLanding-sidebar-channel-user-container">
              <div className="UserLanding-sidebar-channel-user-icon">
                <img src={user && user.display_pic} alt="User profile image" />
              </div>
              <div className="UserLanding-sidebar-channel-user-name">
                {user && user.username}
              </div>
            </div>
            <div className="UserLanding-sidebar-channel-user-actions">
              <i className="fa-solid fa-microphone"></i>
              <i className="fa-solid fa-headphones"></i>
              <i className="fa-solid fa-gear user-gear"></i>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
