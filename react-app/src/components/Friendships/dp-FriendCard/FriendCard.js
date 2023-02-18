import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { useModal } from "../../../context/Modal.js";
import { thunkAddFriendship, thunkDeleteFriendship, thunkGetFriendships } from "../../../store/friendships.js";

import "./FriendCard.css";


export default function FriendCard({friend}) {
    const dispatch = useDispatch();
	const [errors, setErrors] = useState([]);
	// const history = useHistory();
	const { closeModal } = useModal();
	const [isLoaded, setIsLoaded] = useState(false);
	const user = useSelector((state) => state.session.user);
	const friendships = useSelector((state) => state.friendships)
	const [reloadFriend, setReloadFriend] = useState(false)

	let userId = user.id;


    // Random Color
    const getRandomColor = () => {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        return "#" + randomColor;
    };

    // Set the inline CSS style object with the background color property set to a random color
    const inlineStyles = {
        backgroundColor: getRandomColor(),
    };


    // Friendship

	let allFriends
	let isFriends
	if (friendships) {
		allFriends = Object.values(friendships)
        console.log("ALLFRIENDS------->", allFriends)
		let allFriendsIds = allFriends.map(friend => {
			return friend.id
		})
		if (allFriendsIds.includes(+friend.id)) {
            isFriends = true
		}
	}
    // console.log("ISFRIEND ------->", isFriends)

	// Add Friend

	const addFriend = (e) => {
		e.preventDefault()
		dispatch(thunkAddFriendship(friend.user_id, friend))
		.then(() => {isFriends=true
			setReloadFriend(!reloadFriend)})
		.then(dispatch(thunkGetFriendships()))
		.catch(async (res) => {
			const data = await res.json();
			if (data && data.errors) setErrors(data.errors);
		});
	}

	const deleteFriend = (e) => {
		e.preventDefault()
		dispatch(thunkDeleteFriendship(friend.user_id))
		.then(() => {isFriends=false
			setReloadFriend(!reloadFriend)})
		.then(dispatch(thunkGetFriendships()))
		.catch(async (res) => {
			const data = await res.json();
			if (data && data.errors) setErrors(data.errors);
		});
	}

    return (
		<>
			<div className="friend-card">
				<div id="friend-card-header" style={inlineStyles}></div>
				<div className="friend-card-content">
					<div className="friend-header">
						<img className="friend-card-img" src={friend.display_pic}></img>
                        <h4 className="friend-username">
						    {friend.username}
					    </h4>
						{!isFriends && (
							<button
							type="submit"
							id="add-friend-button"
							onClick={addFriend}
						>
							Send Friend Request
						</button>
						)}
						{isFriends && (
							<button
							type="submit"
							id="delete-friend-button"
							onClick={deleteFriend}
						>
							Remove Friend
						</button>
						)}
					</div>
					{/* <div className="card-friend-info">
						<div className="card-friend-inner-div">
							<div className="friend-username-div">
                                <h4 className="friend-username">
										{friend.username}
							    </h4>
							</div>
						</div>
					</div> */}
				</div>
			</div>
		</>
	);
}
