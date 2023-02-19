import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { thunkGetFriendships } from "../../../store/friendships";
import "./DMChannels.css";

export default function DMChannels({ theme }) {
  let dispatch = useDispatch();
  //states
  const [isLoaded, setIsLoaded] = useState(false);

  //selectors
  let allFriends = useSelector((state) => state.friendships);
  let friends = Object.values(allFriends);
  let user = useSelector((state) => state.session.user);
  let { senderId, friendId } = useParams();
  const dms = useSelector((state) => state.directMessages);

  // console.log(`front dm index========>>>>>>`, dms);

  // const channel = channels[channelId];

  useEffect(() => {
    dispatch(thunkGetFriendships()).then(setIsLoaded(true));
  }, []);

  if (isLoaded) {
    const truncateNames = (names) => {
      if (names.length > 18) {
        return `${names.substring(0, 18)}...`;
      }
      return names;
    };

    // console.log(`inside DM channels comp --------front========`, friends);

    // return
    return (
      <div>
        <div className="DMChannels-header">
          <NavLink
            to={`/channels/@me`}
            className="UserLanding-sidebar-channel-name dmchannels"
            id={theme}
          >
            <div className="UserLanding-sidebar-channel-name-label" id={theme}>
              <span className="friend-icon">
                <i className="fa-solid fa-user-group"></i>
              </span>
              {` `}
              <span className="friends-margin">Friends</span>
            </div>
          </NavLink>
        </div>

        {/* Mootro goes here */}
        {/* <div className="UserLanding-sidebar-channel-name" id={theme}>
					<div
						className="UserLanding-sidebar-channel-name-label"
						id={theme}
					>
						{`Mootro (Coming Soon!)`}
					</div>
				</div> */}

        <div className="UserLanding-Sidebar-category-container">
          <div
            className="UserLanding-sidebar-channel-category-container"
            id={theme}
          >
            <i className="fa-solid fa-angle-down"></i>
            <span className="UserLanding-sidebar-channel-category-name">
              Direct Messages
            </span>
          </div>
        </div>

        <div className="UserLanding-sidebar-channel-list">
          {/* map out channels here */}
          {friends.length
            ? friends.map((friend) => (
                <NavLink
                  to={`/users/${user.id}/${friend.id}`}
                  className="UserLanding-sidebar-channel-name extra-pad"
                  id={theme}
                  key={friend.id}
                >
                  <div
                    className="UserLanding-sidebar-channel-name-label dm-icon-name-ct"
                    id={theme}
                  >
                    <div className="dm-channel-user-icon">
                      <img
                        src={friend.display_pic}
                        alt="direct messages user icon"
                        className="dm-channel-user-icon"
                      ></img>
                    </div>{" "}
                    <div className="dm-username">
                      {friend.username && truncateNames(friend.username)}
                    </div>
                  </div>

                  {/* <div className="UserLanding-sidebar-channel-buttons">
									<i className="fa-solid fa-user-plus"></i>
								</div> */}
                </NavLink>
              ))
            : null}
        </div>
      </div>
    );
  } else
    return (
      <div className="loader-container">
        <div className="loader-header" id={theme}>
          Cinnamon buns are being glazed....
        </div>
        <div className="loader" id={theme}></div>
      </div>
    );
}
