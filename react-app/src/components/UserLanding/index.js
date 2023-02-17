import { useSelector } from "react-redux";
import CMIndex from "../ChannelMessages/CMIndex";
import FriendshipsPage from "../Friendships/FriendshipsPage";
import ServerMembers from "../ServerMembers";
import "./UserLanding.css";

export default function UserLanding({ page, theme }) {
  const user = useSelector((state) => state.session.user);

  switch (page) {
    case "channel": {
      return (
        theme && (
          <div className="UserLanding-container reverse" id={theme}>
            {/* <div className="UserLanding-main-content"> */}
            {/* <div className="UserLanding-server-members"> */}
            <ServerMembers theme={theme} />
            <CMIndex theme={theme} />
            {/* </div> */}
            {/* </div> */}
          </div>
        )
      );
    }
    case "users": {
      return (
        theme && (
          <div className="UserLanding-container" id={theme}>
            {/* direct messages component goes here */}
            <CMIndex theme={theme} />
          </div>
        )
      )
    }
    default: {
      return (
        <div className="UserLanding-container">
          {/* <ol>
                <li>welcome page when first logging in</li>
                <li>messages if on server page</li>
                <li>members list if on server page</li>
            </ol> */}
          <FriendshipsPage theme={theme} />
        </div>
      );
    }
  }
}
