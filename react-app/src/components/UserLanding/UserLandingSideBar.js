// import { NavLink } from "react-router-dom";
import "./UserLandingSideBar.css";

// import logo from "../../assets/datcord_logo_svg.svg";
import { useDispatch } from "react-redux";
import Channels from "../Channels";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { logout, thunkSetTheme } from "../../store/session";
import { NavLink, useHistory } from "react-router-dom";
import DMChannels from "../DirectMessages/DMChannels";

export default function UserLandingSideBar({ page, isLoaded, theme }) {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user);
	const userSettingsRef = useRef();
	const userThemeRef = useRef();
	const [showUserMenu, setShowUserMenu] = useState(false);
	const [showThemeMenu, setShowThemeMenu] = useState(false);
	const history = useHistory();

	const openUserMenu = () => {
		if (showUserMenu) return;
		setShowUserMenu(true);
	};

	const openThemeMenu = () => {
		if (showThemeMenu) return;
		setShowThemeMenu(true);
	};

	const handleChangeTheme = (theme) => {
		return dispatch(thunkSetTheme(user.id, theme)).then();
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

	useEffect(() => {
		if (!showThemeMenu) return;

		const closeMenu = (e) => {
			if (userThemeRef.current) {
				if (!userThemeRef.current.contains(e.target)) {
					setShowThemeMenu(false);
				}
			}
		};

		document.addEventListener("click", closeMenu);

		return () => document.removeEventListener("click", closeMenu);
	}, [showThemeMenu]);

	const userSettingsClass =
		"UserLanding-Sidebar-user-dropdown" + (showUserMenu ? "" : " hidden");

	const userThemeClass =
		"UserLanding-Sidebar-user-dropdown" + (showThemeMenu ? "" : " hidden");

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

				{/* user dm channels component */}
				<DMChannels theme={theme} />

				<div className="UserLanding-sidebar-channel-content">
					<div
						className="UserLanding-sidebar-channel-user-info"
						id={theme}
					>
						<div className="UserLanding-sidebar-channel-user-container">
							<div className="UserLanding-sidebar-channel-user-icons">
								<img
									src={user && user.display_pic}
									className="UserLanding-sidebar-channel-user-icon"
									alt="User profile image"
								/>
							</div>
							<div
								className="UserLanding-sidebar-channel-user-name"
								id={theme}
							>
								{user && user.username}
							</div>
						</div>

						<div className="UserLanding-sidebar-channel-user-actions">
							<i
								className="fa-solid fa-yin-yang"
								onClick={openThemeMenu}
							></i>
							<div className={userThemeClass} ref={userThemeRef}>
								<div className="dropdown-wrapper">
									<button
										className="UserLanding-sidebar-channel-user-home"
										onClick={() =>
											handleChangeTheme(
												user.theme === "dark"
													? "light"
													: "dark"
											)
										}
									>
										{user.theme === "dark"
											? "light"
											: "dark"}
									</button>
								</div>
							</div>
							<i
								className="fa-solid fa-gear user-gear"
								onClick={openUserMenu}
							></i>
							<div
								className={userSettingsClass}
								ref={userSettingsRef}
							>
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
