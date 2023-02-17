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
		// dispatch(thunk)
	}, [dispatch]);

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
				<NavLink
					to={`/channels/@me`}
					className="UserLanding-sidebar-channel-name"
					id={theme}
				>
					<div
						className="UserLanding-sidebar-channel-name-label mleft-15"
						id={theme}
					>
						<span className="hash">#</span>
						{` `}
						Friends
					</div>
				</NavLink>

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
					{friends.length &&
						friends.map((friend) => (
							<NavLink
								to={`/users/${user.id}/${friend.id}`}
								className="UserLanding-sidebar-channel-name"
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
										{friend.username &&
											truncateNames(friend.username)}
									</div>
								</div>

								{/* <div className="UserLanding-sidebar-channel-buttons">
									<i className="fa-solid fa-user-plus"></i>
								</div> */}
							</NavLink>
						))}
				</div>
			</div>
		);
	} else return <div>Cinnamon buns are being glazed....</div>;
}
