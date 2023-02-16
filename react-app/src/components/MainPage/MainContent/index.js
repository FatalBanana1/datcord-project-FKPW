import UserLanding from "../../UserLanding";
import UserLandingSideBar from "../../UserLanding/UserLandingSideBar";
import "./MainContent.css";

export default function MainContent({ page, isLoaded }) {
    switch(page) {
        case "channel":
            return (
                    <div className="UserLanding-container">
                        <UserLandingSideBar page={page} isLoaded={isLoaded} />
                        <UserLanding page={page} isLoaded={isLoaded} />
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
}
