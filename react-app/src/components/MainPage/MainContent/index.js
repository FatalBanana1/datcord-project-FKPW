import UserLanding from "../../UserLanding";
import { useSelector } from "react-redux";
import UserLandingSideBar from "../../UserLanding/UserLandingSideBar";
import "./MainContent.css";

export default function MainContent({ page, isLoaded, theme }) {
  const user = useSelector((state) => state.session.user);

  switch (page) {
    case "channel":
      return (
        theme && (
          <div className="UserLanding-container" id={theme}>
            <UserLandingSideBar page={page} isLoaded={isLoaded} theme={theme} />
            <UserLanding page={page} isLoaded={isLoaded} theme={theme} />
          </div>
        )
      );
    case "users":
      return (
        theme && (
          <div className="UserLanding-container" id={theme}>
            <UserLandingSideBar page={page} isLoaded={isLoaded} theme={theme} />
            <UserLanding page={page} isLoaded={isLoaded} theme={theme} />
          </div>
        )
      )
    default:
      return (
        theme && (
          <div className="MainContent-container" id={theme}>
            <div className="UserLanding-container" id={theme}>
              <UserLandingSideBar page={page} theme={theme} />
              <UserLanding theme={theme} />
            </div>
          </div>
        )
      );
  }
}
