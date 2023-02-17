import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetFriendships } from "../../../store/friendships";
import OpenModalButton from "../../OpenModalButton";
import FriendCard from "./FriendCard";
import { thunkDeleteFriendship } from "../../../store/friendships";

export default function FriendshipsPage({ theme }) {
	let dispatch = useDispatch();
	//states
	let [isLoaded, setIsLoaded] = useState(false);
	const [reloadFriend, setReloadFriend] = useState(false)
	const [errors, setErrors] = useState([]);

	//selectors
	let friendships = useSelector((state) => state.friendships);
	let friends = Object.values(friendships)
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
	}, []);



	// DELETE Friend

	const deleteFriend = (friendId) => {
		dispatch(thunkDeleteFriendship(friendId))
		.then(() => {setReloadFriend(!reloadFriend)})
		// .then(dispatch(thunkGetFriendships()))
		.catch(async (res) => {
			const data = await res.json();
			if (data && data.errors) setErrors(data.errors);
		});
	}

	if (isLoaded) {
		// return
		return (
			<div className="UserLanding-main-content" id={theme}>
				<div className="UserLanding-header" id={theme}></div>
				<div className="UserLanding-status" id={theme}>
					{/* adding 2 as placeholder for now */}
					{friends.length ? (
						<h2>{`Friends - ${friends.length}`}</h2>
					) : (
						<h2>{`Enemies - 1`}</h2>
					)}
				</div>
				{/* making fake friends here :( */}
				<div className="UserLanding-people-list-parent" id={theme}>
					{/* this is the container that holds main content in user landing
            can rename this later! */}
					<div
						className="UserLanding-people-list-container"
						id={theme}
					>
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
                      ></img>
                    </div>
                    <div
                      className="UserLanding-user-name-status-container"
                      id={theme}
                    >
                      <div className="UserLanding-user-name" id={theme}>
                        {friend.username}
						{/* <OpenModalButton
									id="memberModalButton"
									className="owner nicknames"
									buttonText={friend.username}
									// onButtonClick={closeMenu}
									modalComponent={
										<FriendCard
											friend={friend}
										/>
									}
						/> */}
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
                    <div className="UserLanding-user-actions" id={theme}>
                      <i className="fa-solid fa-message fa-xs"></i>
                    </div>
                    <div className="UserLanding-user-actions" id={theme}>
                      <div className="friends-tooltip">
						            <i id="remove-friend-icon" className="fa-solid fa-user-xmark" onClick={() => deleteFriend(friend.id)}></i>
                      <span class="friends-tooltiptext">Remove Friend</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
            //   <div>You will die alone...</div>
			<div
                  key={"Keanu"}
                  className="UserLanding-people-list"
                  id={theme}
                >
                  <div className="UserLanding-user-info-container" id={theme}>
                    <div className="UserLanding-user-icon">
                      <img
                        src={"https://avatarfiles.alphacoders.com/203/203174.jpg"}
                        alt="user landing user icon"
                      ></img>
                    </div>
                    <div
                      className="UserLanding-user-name-status-container"
                      id={theme}
                    >
                      <div className="UserLanding-user-name" id={theme}>
                        Keanu Reeves
						{/* <OpenModalButton
									id="memberModalButton"
									className="owner nicknames"
									buttonText={friend.username}
									// onButtonClick={closeMenu}
									modalComponent={
										<FriendCard
											friend={friend}
										/>
									}
						/> */}
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
                    <div className="UserLanding-user-actions" id={theme}>
                      <i className="fa-solid fa-message fa-xs"></i>
                    </div>
                    <div className="UserLanding-user-actions" id={theme}>
                      <i className="fa-solid fa-ellipsis-vertical"></i>
                    </div>
                  </div>
                </div>
            )}
          </div>
        </div>
      </div>
    );
  } else return <div className="loading-cms">Loading...</div>;
}
