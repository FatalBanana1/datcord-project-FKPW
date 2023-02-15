import { useEffect } from "react";
import { useMenuModal } from "../../context/MenuModal";
// import { useMenuModal } from "../../context/MenuModal";
import logo from "../../assets/datcord_logo_full_black.svg"
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, logout } from "../../store/session";

export default function Menu({ user }) {
    const { closeMenu } = useMenuModal();
    const dispatch = useDispatch();
    const history = useHistory();

    const loginDemo = (num) => {
        switch (num) {
            case "one": {
                const data = dispatch(login(
                    "fahd@gmail.com", "password"
                )).then(() => history.push("/channels/@me").then(closeMenu))
                return data;
            }
            case "two": {
                const data = dispatch(login(
                    "supa@gmail.com", "password4"
                )).then(() => history.push("/channels/@me").then(closeMenu))
                return data;
            }
            case "three": {
                const data = dispatch(login(
                    "choco@gmail.com", "password3"
                )).then(() => history.push("/channels/@me").then(closeMenu))
                return data;
            }
            default:
                return
        }
    }

    const goLogout = (e) => {
		e.preventDefault();

		closeMenu();
		dispatch(logout());
		history.push("/");
    };

    return (
        <div className="MenuModal-container">
            <div className="MenuModal-top">
                <div className="MenuModal-logo-container">
                    <img src={logo} className="Menu-logo" alt="Datcord logo" />
                    <button
                        className="MenuModal-close"
                        onClick={closeMenu}
                    >
                        <i className="fa-sharp fa-solid fa-xmark"></i>
                    </button>
                </div>
            </div>
            <div className="MenuModal-main-container">
                <div className="MenuModal-divider"></div>

                <nav className="MenuModal-nav">
                    <NavLink exact to="/" className="MenuModal-nav-link" onClick={closeMenu}>Home</NavLink>
                    <NavLink exact to="/channels/@me" className="MenuModal-nav-link" onClick={closeMenu}>Open</NavLink>
                    { user ? "" : (
                        <NavLink exact to="/login" className="MenuModal-nav-link" onClick={closeMenu}>Login</NavLink>
                    )}
                    { user ? "" : (
                        <NavLink exact to="/register" className="MenuModal-nav-link" onClick={closeMenu}>Register</NavLink>
                    )}
                    <NavLink exact to="/channels/@me" className="MenuModal-nav-link" onClick={loginDemo}>Demo 1</NavLink>
                    <NavLink exact to="/channels/@me" className="MenuModal-nav-link" onClick={loginDemo}>Demo 2</NavLink>
                    <NavLink exact to="/channels/@me" className="MenuModal-nav-link" onClick={loginDemo}>Demo 3</NavLink>
                    { user ? (
                        <p
                            className="MenuModal-nav-link"
                            onClick={goLogout}
                        >
                            Logout
                        </p>
                    ) : ""}
                </nav>

            </div>
        </div>
    )
}
