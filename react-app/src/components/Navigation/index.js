import { useEffect, useRef, useState } from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import logo from "../../assets/datcord_logo_full.svg";
import Splash from "../Splash";
import OpenModalButton from "../OpenModalButton";

import "./Navigation.css";
import Menu from "./Menu";
import OpenMenuButton from "../OpenModalButton/OpenMenuButton";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/session";

export default function Navigation() {
    const [ showMenu, setShowMenu ] = useState(false);
    const location = useLocation();
    console.log("location", location.pathname)
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    console.log("Navigation - user:", user);
    const dispatch = useDispatch();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    }

    const closeMenu = () => setShowMenu(false);

    const loginDemo = (num) => {
        switch (num) {
            case "one": {
                const data = dispatch(login(
                    "gotmilk@gmail.com", "password"
                )).then(() => history.push("/channels/@me"))
                return data;
            }
            case "two": {
                const data = dispatch(login(
                    "wasiq@gmail.com", "password"
                )).then(() => history.push("/channels/@me"))
                return data;
            }
            case "three": {
                const data = dispatch(login(
                    "fahd@gmail.com", "password"
                )).then(() => history.push("/channels/@me"))
                return data;
            }
            default:
                return
        }
    }

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
                            Mootro
                        </li>
                        <li>
                            Discover
                        </li>
                        <li>
                            <a href="#meet-devs">Support</a>
                        </li>
                        <li className="Navigation-demo" onClick={() => loginDemo("one")}>
                            <span className="Navigation-demo-no-hover">De-moo 1</span>
                            <span className="Navigation-demo-hover">Demo User 1</span>
                        </li>
                        <li className="Navigation-demo" onClick={() => loginDemo("two")}>
                            <span className="Navigation-demo-no-hover">De-moo 2</span>
                            <span className="Navigation-demo-hover">Demo User 2</span>
                        </li>
                        <li className="Navigation-demo" onClick={() => loginDemo("three")}>
                            <span className="Navigation-demo-no-hover">De-moo 3</span>
                            <span className="Navigation-demo-hover">Demo User 3</span>
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
