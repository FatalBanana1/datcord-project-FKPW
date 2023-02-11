import { useLocation } from "react-router-dom";
import ProtectedRoute from "../../auth/ProtectedRoute";
import GuildDiscovery from "../../GuildDiscovery";
import UserLanding from "../../UserLanding";
import UserLandingSideBar from "../../UserLanding/UserLandingSideBar";
import "./MainContent.css";

export default function MainContent({ page, isLoaded }) {
    switch(page) {
        case "channel":
            return (
                <div className="MainContent-container">
                    <div className="UserLanding-container">
                        <UserLandingSideBar page={page} isLoaded={isLoaded} />
                        <UserLanding page={page} isLoaded={isLoaded} />
                    </div>
                </div>
            )
        default:
            return (
                <div className="MainContent-container">
                    <div className="UserLanding-container">
                        <UserLandingSideBar page={page} />
                        <UserLanding />
                    </div>
                </div>
            )
    }
    return (
        <div className="MainContent-container">
            {/* <ol>
                <li>welcome page when first logging in</li>
                <li>messages if on server page</li>
                <li>members list if on server page</li>
            </ol> */}
            <ProtectedRoute path="/guild-discovery" exact={true}>
                <GuildDiscovery />
            </ProtectedRoute>
        </div>
    )
}
