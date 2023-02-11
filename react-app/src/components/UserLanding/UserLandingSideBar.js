import { NavLink } from "react-router-dom";
import "./UserLandingSideBar.css";

import logo from "../../assets/datcord_logo_svg.svg";

export default function UserLandingSideBar({ page }) {

    if (page === "channel") {
        return (
            <div className="UserLanding-sidebar">
                <div className="UserLanding-sidebar-header">
                    <p>server name here</p>
                    <i className="fa-solid fa-angle-down big-angle-down"></i>
                </div>
                <div className="UserLanding-sidebar-channel-content">
                    <div className="UserLanding-sidebar-channel-category-container">
                        <i className="fa-solid fa-angle-down"></i>
                        <span className="UserLanding-sidebar-channel-category-name">Category name here</span>
                        <i className="fa-solid fa-plus align-right"></i>
                    </div>
                    <div className="UserLanding-sidebar-channel-list">
                        {/* map out channels here */}
                            <NavLink to={`/channels/2/3`} className="UserLanding-sidebar-channel-name">
                                <div className="UserLanding-sidebar-channel-name-label">
                                    <span className="hash">#</span> channel name here</div>
                                    {/* if admin, then show these buttons v */}
                                <div className="UserLanding-sidebar-channel-buttons">
                                    <i className="fa-solid fa-user-plus"></i>
                                    <i className="fa-solid fa-gear"></i>
                                </div>
                            </NavLink>
                    </div>
                    <div className="UserLanding-sidebar-channel-user-info">
                        <div className="UserLanding-sidebar-channel-user-container">
                            <div className="UserLanding-sidebar-channel-user-icon">
                                <img src={logo} alt="User profile image" />
                            </div>
                            <div className="UserLanding-sidebar-channel-user-name">
                                Username goes here
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
    }
    return (
        <div className="UserLanding-sidebar">
            <ol>
                <li>direct message list</li>
                <li>must be nice to have friends</li>
                <li>meow meow</li>
            </ol>
        </div>
    )
}
