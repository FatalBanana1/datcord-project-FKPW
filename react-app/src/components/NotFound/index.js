import { useEffect, useRef, useState } from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import "../Navigation/Navigation.css";
import "./NotFound.css";
import Menu from "../Navigation/Menu";
import OpenMenuButton from "../OpenModalButton/OpenMenuButton";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../store/session";
import logo from "../../assets/datcord_logo_full_black.svg";
import SplashBody from "../SplashBody";

export default function NotFound() {
    const [showMenu, setShowMenu] = useState(false);
    const location = useLocation();
    // console.log("location", location.pathname)
    const history = useHistory();
    const user = useSelector((state) => state.session.user);
    // console.log("Navigation - user:", user);
    const dispatch = useDispatch();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    const closeMenu = () => setShowMenu(false);

    const loginDemo = (num) => {
        switch (num) {
        case "one": {
            const data = dispatch(login("fahd@gmail.com", "password")).then(() =>
            history.push("/channels/@me")
            );
            return data;
        }
        case "two": {
            const data = dispatch(login("supa@gmail.com", "password4")).then(() =>
            history.push("/channels/@me")
            );
            return data;
        }
        case "three": {
            const data = dispatch(login("choco@gmail.com", "password3")).then(() =>
            history.push("/channels/@me")
            );
            return data;
        }
        default:
            return;
        }
    };

    const goLogout = (e) => {
		e.preventDefault();

		closeMenu();
		dispatch(logout());
		history.push("/");
    };

    return (
        <div className="NotFoundPage-container">
            <div className="NotFoundNav-container">
                <nav className="Navigation-container" id="NotFound">
                    <ul className="Navigation-list" id="NotFound">
                    <li>
                        <NavLink exact to="/" className="Navigation-links">
                        <div className="Navigation-logo-container">
                            <img
                            src={logo}
                            className="Navigation-logo"
                            alt="Datcord logo"
                            />
                        </div>
                        </NavLink>
                    </li>
                    <div className="Navigation-links-main" id="NotFound">
                        <li className="Navigation-display-none">Mootro</li>
                        <li className="Navigation-display-none">Discover</li>
                        {/* <li>
                        <a href="#meet-devs">Support</a>
                        </li> */}
                        <li className="Navigation-demo" onClick={() => loginDemo("one")}>
                        <span className="Navigation-demo-no-hover">De-moooo 1</span>
                        <span className="Navigation-demo-hover">Demo User 1</span>
                        </li>
                        <li className="Navigation-demo" onClick={() => loginDemo("two")}>
                        <span className="Navigation-demo-no-hover">De-moooo 2</span>
                        <span className="Navigation-demo-hover">Demo User 2</span>
                        </li>
                        <li className="Navigation-demo" onClick={() => loginDemo("three")}>
                        <span className="Navigation-demo-no-hover">De-moooo 3</span>
                        <span className="Navigation-demo-hover">Demo User 3</span>
                        </li>
                    </div>
                    <div className="Navigation-buttons-container">
                        <li>
                            { user ? (
                                <button
                                    id="NotFound"
                                    className="Navigation-login"
                                    onClick={goLogout}
                                >
                                    Logout
                                </button>
                            ) : ""}
                        </li>
                        <li>
                        {user ? (
                            <button
                            id="NotFound"
                            className="Navigation-login"
                            onClick={() => history.push("/channels/@me")}
                            >
                            Open Datcord
                            </button>
                        ) : (
                            <button
                            id="NotFound"
                            className="Navigation-login"
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
                            modalComponent={<Menu user={user} />}
                            page={"not-found"}
                        />
                        </li>
                    </div>
                    </ul>
                </nav>
                <div className="NotFound-container">
                    <div className="NotFound-container-right">
                        <img src="https://media3.giphy.com/media/pStZ71z14R2Ks/giphy.gif?cid=ecf05e472kh6f61qfuubmd1u5rdqx9nc2l4swylx3susdnl0&rid=giphy.gif&ct=g" className="NotFound-milk" />
                    </div>
                    <div className="NotFound-container-left">
                        <h1 className="NotFound-header">Oops, we spilled the milk!</h1>
                        <div className="NotFound-subtext">
                            <span>
                                Well, it looks like the milk has been spilled on this page, and there's no use crying over it. Instead, let's have a chuckle or two. Why did the cow go to outer space? To see the moooon! Okay, okay, we'll stick to web development from now on. In the meantime, feel free to browse the other pages on our site or try searching for what you need. Thanks for your understanding and we promise to get this mess cleaned up soon.
                            </span>
                        </div>
                        <button
                            // onClick={() => {
                            //   setHidden(true);
                            //   openForm();
                            // }}
                            onClick={() => history.push("/")}
                            className="open-discord-button"
                            id="NotFound"
                        >
                            Back to main page
                        </button>
                    </div>
                </div>
            </div>
            <div className="splash-body-footer-parent">
          <div className="splash-body-footer-container">
            <div className="splash-body-footer-left">
              <h1>Imagine a place</h1>
            </div>
            <div className="splash-body-footer-techstack">
              <h2>Tech Stack</h2>
              <h3>Languages</h3>
              <li>Python</li>
              <li>JavaScript</li>
              <li>HTML</li>
              <li>CSS</li>
              <h3>Backend</h3>
              <li>Flask</li>
              <li>Flask SQL Alchemy</li>
              <li>Flask Alembic</li>
              <h3>Frontend</h3>
              <li>React</li>
              <li>React Router</li>
              <li>Redux</li>
            </div>
          </div>
        </div>
        </div>
    )
}
