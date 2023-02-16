import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetFriendships } from "../../../store/friendships";

export default function FriendshipsPage() {
	let dispatch = useDispatch();
	//states
	let [isLoaded, setIsLoaded] = useState(false);

	//selectors
	let allFriends = useSelector((state) => state.friendships);
	let friends = Object.values(allFriends);
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
	}, [dispatch]);

	if (isLoaded) {
		// return
		return (
			<div className="UserLanding-main-content">
				<div className="UserLanding-header"></div>
				<div className="UserLanding-status">
					{/* adding 2 as placeholder for now */}
					<h2>{`Friends - ${friends.length}`}</h2>
				</div>
				{/* making fake friends here :( */}
				<div className="UserLanding-people-list-parent">
					{/* this is the container that holds main content in user landing
            can rename this later! */}
					<div className="UserLanding-people-list-container">
						{/* this holds a single user from the list */}
						{/* this holds the icon and the username and their status */}

						{/* map HERE------------------------- */}
						{friends.length ? (
							friends.map((friend) => (
								<div key={friend.id} className="UserLanding-people-list">
									<div className="UserLanding-user-info-container">
										<div className="UserLanding-user-icon">
											<img
												src={friend.display_pic}
												alt="user landing user icon"
											></img>
										</div>
										<div className="UserLanding-user-name-status-container">
											<div className="UserLanding-user-name">
												{friend.username}
											</div>
											<div className="UserLanding-user-status">
												{`You have ${Object.values(
													friend.server_members
												).reduce((acc, val) => {
													if (
														yourMemberships[
															val.server_id
														]
													) {
														acc++;
													}
													return acc;
												}, 0)} servers in common.`}
											</div>
										</div>
									</div>

									{/* this holds the message and vertical ellipsis icons for actions */}
									<div className="UserLanding-user-actions-container">
										<div className="UserLanding-user-actions">
											<i className="fa-solid fa-message fa-xs"></i>
										</div>
										<div className="UserLanding-user-actions">
											<i className="fa-solid fa-ellipsis-vertical"></i>
										</div>
									</div>
								</div>
							))
						) : (
							<div>You will die alone...</div>
						)}
					</div>
				</div>
			</div>
		);
	} else return <div className="loading-cms">Loading...</div>;
}
