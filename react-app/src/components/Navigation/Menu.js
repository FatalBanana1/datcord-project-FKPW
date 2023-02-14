import { useEffect } from "react";
import { useMenuModal } from "../../context/MenuModal";
// import { useMenuModal } from "../../context/MenuModal";
import logo from "../../assets/datcord_logo_full_black.svg"
import { NavLink } from "react-router-dom";

export default function Menu() {
    const { closeMenu } = useMenuModal();

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
                    <NavLink exact to="/login" className="MenuModal-nav-link" onClick={closeMenu}>Login</NavLink>
                    <NavLink exact to="/register" className="MenuModal-nav-link" onClick={closeMenu}>Register</NavLink>
                </nav>

            </div>
        </div>
    )
}
