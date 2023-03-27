import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import {
  actionResetFriendship,
  thunkAddFriendship,
  thunkGetFriendships,
} from "../../../store/friendships";
import { thunkDeleteFriendship } from "../../../store/friendships";
import favicon from "../../../assets/favicon.png";

export default function FriendshipsPage({ theme }) {
  let dispatch = useDispatch();
  //states
  let [isLoaded, setIsLoaded] = useState(false);
  const [reloadFriend, setReloadFriend] = useState(false);
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  //selectors
  let friendships = useSelector((state) => state.friendships);
  let friends = Object.values(friendships);
  let servers = useSelector((state) => state.servers);
  let user = useSelector((state) => state.session.user);
  let yourMemberships = Object.values(user.server_members).reduce(
    (acc, val) => {
      acc[val.server_id] = 1;
      return acc;
    },
    {}
  );

  useEffect(() => {
    dispatch(thunkGetFriendships()).then(setIsLoaded(true));

    return () => dispatch(actionResetFriendship());
  }, []);

  // DELETE Friend

  const deleteFriend = (friendId) => {
    dispatch(thunkDeleteFriendship(friendId))
      .then(() => {
        setReloadFriend(!reloadFriend);
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  const addWick = () => {
    dispatch(thunkAddFriendship(17))
      .then(() => {
        setReloadFriend(!reloadFriend);
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  // REDIRECT TO MESSAGE CHANNEL

  const slideInToDms = (friendId) => {
    history.push(`/users/${user.id}/${friendId}`);
  };

  if (isLoaded && servers) {
    // console.log(`friendship ---- user .....`, servers[9]);

    // return
    return (
      <div className="UserLanding-main-content" id={theme}>
        <div className="UserLanding-status" id={theme}>
          {friends.length ? (
            <h2>{`Friends - ${friends.length}`}</h2>
          ) : (
            <h2>{`Enemies - 1`}</h2>
          )}
        </div>
        <div className="UserLanding-people-list-parent" id={theme}>
          <div className="UserLanding-people-list-container" id={theme}>
            {/* this holds a single user from the list */}
            {/* this holds the icon and the username and their status */}

            {/* map HERE------------------------- */}
            {friends.length ? (
              friends.map((friend) => (
                <div
                  key={friend.id}
                  className="UserLanding-people-list"
                  id={theme}
                >
                  <div className="UserLanding-user-info-container" id={theme}>
                    <div className="UserLanding-user-icon">
                      <img
                        src={friend.display_pic}
                        alt="user landing user icon"
                        onError={(e) => {
                          e.currentTarget.src = favicon;
                        }}
                      ></img>
                    </div>
                    <div
                      className="UserLanding-user-name-status-container"
                      id={theme}
                    >
                      <div className="UserLanding-user-name" id={theme}>
                        {friend.username}
                      </div>
                      <div className="UserLanding-user-status" id={theme}>
                        {`You have ${Object.values(
                          friend.server_members
                        ).reduce((acc, val) => {
                          if (yourMemberships[val.server_id]) {
                            acc++;
                          }
                          return acc;
                        }, 0)} server(s) in common.`}
                      </div>
                    </div>
                  </div>

                  {/* this holds the message and vertical ellipsis icons for actions */}
                  <div
                    className="UserLanding-user-actions-container"
                    id={theme}
                  >
                    {Number(friend.id) === 17 && servers[9] ? (
                      <NavLink
                        to="/channels/9/21"
                        className="UserLanding-user-actions clickable"
                        id={theme}
                      >
                        <i className="fa-solid fa-dog"></i>
                      </NavLink>
                    ) : null}

                    <div
                      className="UserLanding-user-actions clickable"
                      id={theme}
                      onClick={() => slideInToDms(friend.id)}
                    >
                      <div className="sliding-tooltip">
                        <i className="fa-solid fa-message fa-xs"></i>
                        <span className="sliding-tooltiptext">
                          Slide Into DMs
                        </span>
                      </div>
                    </div>
                    <div
                      className="UserLanding-user-actions clickable"
                      id={theme}
                      onClick={() => deleteFriend(friend.id)}
                    >
                      <div className="friends-tooltip">
                        <i
                          id="remove-friend-icon"
                          className="fa-solid fa-user-xmark"
                        ></i>
                        <span className="friends-tooltiptext">
                          Remove Friend
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>
                <div
                  key={"Keanu"}
                  className="UserLanding-people-list"
                  id={theme}
                >
                  <div className="UserLanding-user-info-container" id={theme}>
                    <div className="UserLanding-user-icon">
                      <img
                        src={
                          "https://avatarfiles.alphacoders.com/203/203174.jpg"
                        }
                        alt="user landing user icon"
                      ></img>
                    </div>
                    <div
                      className="UserLanding-user-name-status-container"
                      id={theme}
                    >
                      <div className="UserLanding-user-name" id={theme}>
                        JohnWick
                      </div>
                      <div className="UserLanding-user-status" id={theme}>
                        {`If you're not my friend, then you're my enemy!`}
                      </div>
                    </div>
                  </div>

                  {/* this holds the message and vertical ellipsis icons for actions */}
                  <div
                    className="UserLanding-user-actions-container"
                    id={theme}
                  >
                    {servers[9] ? (
                      <NavLink
                        to="/channels/9/21"
                        className="UserLanding-user-actions clickable"
                        id={theme}
                      >
                        <i className="fa-solid fa-dog"></i>
                      </NavLink>
                    ) : null}

                    <div
                      className="UserLanding-user-actions clickable"
                      id={theme}
                    >
                      <div
                        className="surrender-tooltip"
                        onClick={() => addWick()}
                      >
                        <i className="fa-regular fa-flag" id="flag-icon"></i>
                        <span className="surrender-tooltiptext">Re-friend</span>
                      </div>
                    </div>

                    {/* <div
											className="UserLanding-user-actions"
											id={theme}
										>
											<i className="fa-solid fa-person-rifle"></i>
										</div> */}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } else
    return (
      <div className="loader-container">
        <div className="loader-header" id={theme}>
          # Raising sails...
        </div>
        <div className="loader" id={theme}></div>
      </div>
    );
}

/*

<div
	key={"Liam Neeson"}
	className="UserLanding-people-list"
	id={theme}
>
	<div
		className="UserLanding-user-info-container"
		id={theme}
	>
		<div className="UserLanding-user-icon">
			<img
				src={
					"https://cdn.mos.cms.futurecdn.net/mFHiTRBzkjfjE7iAgJfYhJ.jpg"
				}
				alt="user landing user icon"
			></img>
		</div>
		<div
			className="UserLanding-user-name-status-container"
			id={theme}
		>
			<div
				className="UserLanding-user-name"
				id={theme}
			>
				Liam Neeson
			</div>
			<div
				className="UserLanding-user-status"
				id={theme}
			>
				{`I will find you.`}
			</div>
		</div>
	</div>

	<div
		className="UserLanding-user-actions-container"
		id={theme}
	>
		<div
			className="UserLanding-user-actions clickable"
			id={theme}
		>
			<div className="surrender-tooltip">
				<i className="fa-regular fa-flag"></i>
				<span className="surrender-tooltiptext">
					Surrender yourself and add
					as friend
				</span>
			</div>
		</div>
		<div
			className="UserLanding-user-actions"
			id={theme}
		>
			<i className="fa-solid fa-gun"></i>
		</div>
		<div
			className="UserLanding-user-actions"
			id={theme}
		>
			<i className="fa-solid fa-person-rifle"></i>
		</div>
	</div>
</div>

*/
