import { useEffect, useRef, useState } from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import logo from "../../assets/datcord_logo_full.svg";
import Splash from "../Splash";
import OpenModalButton from "../OpenModalButton";

import "./Navigation.css";
import Menu from "./Menu";
import OpenMenuButton from "../OpenModalButton/OpenMenuButton";
import { useSelector } from "react-redux";

export default function Navigation() {
    const [ showMenu, setShowMenu ] = useState(false);
    const drawerRef = useRef();
    const location = useLocation();
    console.log("location", location.pathname)
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    console.log("Navigation - user:", user);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    }

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!drawerRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        }

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu])

    const closeMenu = () => setShowMenu(false);

    if (location.pathname && location.pathname === "/") {
        return (
            <div className="NavigationSplash-container">
            <nav className="Navigation-container">
                <ul className="Navigation-list">
                    <li>
                        <NavLink
                            exact to="/"
                            className="Navigation-links"
                        >
                            <div className="Navigation-logo-container">
                                <img src={logo} className="Navigation-logo" alt="Datcord logo" />
                            </div>
                        </NavLink>
                    </li>
                    <div className="Navigation-links-main">
                        <li>
                            Open
                        </li>
                        <li>
                            Mootro
                        </li>
                        <li>
                            Discover
                        </li>
                        <li>
                            Safety
                        </li>
                        <li>
                            Support
                        </li>
                        <li>
                            Blog
                        </li>
                        <li>
                            Careers
                        </li>
                    </div>
                    <div className="Navigation-buttons-container">
                    <li>
                        { user ? (
                            <button className="Navigation-login"
                                onClick={() => history.push("/channels/@me")}
                            >
                                    Open Datcord
                            </button>
                        ) : (
                            <button className="Navigation-login"
                                onClick={() => history.push("/login")}
                            >
                                    Login
                            </button>
                        )}
                    </li>
                    <li>
                        <OpenMenuButton
                            buttonText="hamburger"
                            onButtonClick={closeMenu}
                            modalComponent={<Menu />}
                            icon={"hamburger"}
                        />
                    </li>
                    </div>
                </ul>
            </nav>
            <Splash />
        </div>
        )
    }

    return (
        <div className="Navigation-container-wrapper">
            <nav className="Navigation-container">
                <ul className="Navigation-list">
                    <li>
                        <NavLink
                            exact to="/"
                            className="Navigation-links"
                        >
                            <div className="Navigation-logo-container">
                                <img src={logo} className="Navigation-logo" alt="Datcord logo" />
                            </div>
                        </NavLink>
                    </li>
                    <div></div>
                    <div className="Navigation-links-main">
                        <li>
                            Open
                        </li>
                        <li>
                            Mootro
                        </li>
                        <li>
                            Discover
                        </li>
                        <li>
                            Safety
                        </li>
                        <li>
                            Support
                        </li>
                        <li>
                            Blog
                        </li>
                        <li>
                            Careers
                        </li>
                    </div>
                    <div></div>
                    <li>
                        <button className="Navigation-login"
                        >Login</button>
                    </li>
                    <li>
                        <button onClick={openMenu} className="Navigation-hamburger">
                            <i
                                onClick={openMenu}
                                className="fa-sharp fa-solid fa-bars hamburger Navigation-hamburger"></i>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
