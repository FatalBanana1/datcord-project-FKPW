import UserLanding from "../../UserLanding";
import { useSelector } from "react-redux";
import UserLandingSideBar from "../../UserLanding/UserLandingSideBar";
import "./MainContent.css";

export default function MainContent({ page, isLoaded }) {
  const user = useSelector((state) => state.session.user);
  const theme = user.theme;

  switch (page) {
    case "channel":
      return (
        theme && (
          <div className="UserLanding-container" id={theme}>
            <UserLandingSideBar page={page} isLoaded={isLoaded} />
            <UserLanding page={page} isLoaded={isLoaded} />
          </div>
        )
      );
    default:
      return (
        theme && (
          <div className="MainContent-container" id={theme}>
            <div className="UserLanding-container" id={theme}>
              <UserLandingSideBar page={page} />
              <UserLanding />
            </div>
          </div>
        )
      );
  }
}
