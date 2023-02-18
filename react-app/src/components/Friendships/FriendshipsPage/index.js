import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { thunkAddFriendship, thunkGetFriendships } from "../../../store/friendships";
// import OpenModalButton from "../../OpenModalButton";
// import FriendCard from "./FriendCard";
import { thunkDeleteFriendship } from "../../../store/friendships";

export default function FriendshipsPage({ theme }) {
	let dispatch = useDispatch();
	//states
	let [isLoaded, setIsLoaded] = useState(false);
	const [reloadFriend, setReloadFriend] = useState(false)
	const [errors, setErrors] = useState([]);
	const history = useHistory();

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

	// REDIRECT TO MESSAGE CHANNEL

	const slideInToDms = (friendId) => {
		history.push(`/users/${user.id}/${friendId}`)
	}

	console.log(friends)

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
						<h2>{`Enemies - 2`}</h2>
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
                    <div className="UserLanding-user-actions clickable" id={theme} onClick={() => slideInToDms(friend.id)}>
					            <div className="sliding-tooltip">
                        <i className="fa-solid fa-message fa-xs"></i>
					            <span class="sliding-tooltiptext">Slide Into Dms</span>
                      </div>
                    </div>
                    <div className="UserLanding-user-actions clickable" id={theme} onClick={() => deleteFriend(friend.id)}>
                      <div className="friends-tooltip">
						            <i id="remove-friend-icon" className="fa-solid fa-user-xmark"></i>
                      <span class="friends-tooltiptext">Remove Friend</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
            //   <div>You will die alone...</div>
			<div>
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
                    <div className="UserLanding-user-actions clickable" id={theme} >
					            <div className="surrender-tooltip">
                        <i className="fa-regular fa-flag"></i>
					            <span class="surrender-tooltiptext">Surrender yourself and add as friend</span>
                      </div>
                    </div>
                    <div className="UserLanding-user-actions" id={theme}>
						<i className="fa-solid fa-dog"></i>
                    </div>
                    <div className="UserLanding-user-actions" id={theme}>
						<i className="fa-solid fa-person-rifle"></i>
                    </div>
                  </div>
                </div>
							<div
							key={"Liam Neeson"}
							className="UserLanding-people-list"
							id={theme}
						  >
							<div className="UserLanding-user-info-container" id={theme}>
							  <div className="UserLanding-user-icon">
								<img
								  src={"https://cdn.mos.cms.futurecdn.net/mFHiTRBzkjfjE7iAgJfYhJ.jpg"}
								  alt="user landing user icon"
								></img>
							  </div>
							  <div
								className="UserLanding-user-name-status-container"
								id={theme}
							  >
								<div className="UserLanding-user-name" id={theme}>
								  Liam Neeson
								</div>
								<div className="UserLanding-user-status" id={theme}>
								  {`I will find you, and I will kill you.`}
								</div>
							  </div>
							</div>

							{/* this holds the message and vertical ellipsis icons for actions */}
							<div
							  className="UserLanding-user-actions-container"
							  id={theme}
							>
                <div className="UserLanding-user-actions clickable" id={theme} >
                  <div className="surrender-tooltip">
                    <i className="fa-regular fa-flag"></i>
                  <span class="surrender-tooltiptext">Surrender yourself and add as friend</span>
                  </div>
                </div>
							  <div className="UserLanding-user-actions" id={theme}>
							  <i className="fa-solid fa-gun"></i>
							  </div>
							  <div className="UserLanding-user-actions" id={theme}>
								  <i className="fa-solid fa-person-rifle"></i>
							  </div>
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
