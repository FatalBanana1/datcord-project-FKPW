// import { NavLink } from "react-router-dom";
import "./UserLandingSideBar.css";

// import logo from "../../assets/datcord_logo_svg.svg";
import { useDispatch } from "react-redux";
import Channels from "../Channels";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { logout } from "../../store/session";
import { NavLink, useHistory } from "react-router-dom";

export default function UserLandingSideBar({ page, isLoaded, theme }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const userSettingsRef = useRef();
  const [showMenu, setShowMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const history = useHistory();
  // console.log("user", user)

  const openUserMenu = () => {
    if (showUserMenu) return;
    setShowUserMenu(true);
  };

  useEffect(() => {
    if (!showUserMenu) return;

    const closeMenu = (e) => {
      if (userSettingsRef.current) {
        if (!userSettingsRef.current.contains(e.target)) {
          setShowUserMenu(false);
        }
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showUserMenu]);

  const userSettingsClass =
    "UserLanding-Sidebar-user-dropdown" + (showUserMenu ? "" : " hidden");

  const goLogout = (e) => {
    e.preventDefault();

    dispatch(logout());
    history.push("/");
  };

  if (page === "channel") {
    return <Channels isLoaded={isLoaded} theme={theme} />;
  }
  return (
    theme && (
      <div className="UserLanding-sidebar" id={theme}>
        <div className="UserLanding-sidebar-header" id={theme}>
          {user && user.username}
        </div>

        <div className="UserLanding-sidebar-channel-content">
          <div className="UserLanding-sidebar-channel-user-info" id={theme}>
            <div className="UserLanding-sidebar-channel-user-container">
              <div className="UserLanding-sidebar-channel-user-icons">
                <img
                  src={user && user.display_pic}
                  className="UserLanding-sidebar-channel-user-icon"
                  alt="User profile image"
                />
              </div>
              <div className="UserLanding-sidebar-channel-user-name" id={theme}>
                {user && user.username}
              </div>
            </div>
            <div className="UserLanding-sidebar-channel-user-actions">
              <i className="fa-solid fa-microphone"></i>
              <i className="fa-solid fa-headphones"></i>
              <i
                className="fa-solid fa-gear user-gear"
                onClick={openUserMenu}
              ></i>
              <div className={userSettingsClass} ref={userSettingsRef}>
                <div className="dropdown-wrapper">
                  <button
                    className="UserLanding-sidebar-channel-user-home"
                    onClick={() => history.push("/")}
                  >
                    Home
                  </button>
                  <button
                    className="UserLanding-sidebar-channel-user-logout"
                    onClick={goLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
