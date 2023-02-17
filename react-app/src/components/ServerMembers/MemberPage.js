import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal.js";
import {
	actionResetServerMember,
	thunkGetServerMembers,
	thunkDeleteServerMember,
} from "../../store/serverMembers";
import { thunkAddFriendship, thunkDeleteFriendship, thunkGetFriendships } from "../../store/friendships.js";
import { thunkReadUserServers } from "../../store/servers";
import NickNameEdit from "./NickNameForm.js";
import RoleEdit from "./RoleForm.js";

import "./MemberPage.css";

export default function MemberPage({
	member,
	isOwner,
	isAdmin,
	serverId,
	channelId,
	onChange,
	theme
}) {
	const dispatch = useDispatch();
	const [role, setRole] = useState(member.role);
	const [nickName, setnickName] = useState(member.nickName);
	const [errors, setErrors] = useState([]);
	const history = useHistory();
	const { closeModal } = useModal();
	const [isLoaded, setIsLoaded] = useState(false);
	const user = useSelector((state) => state.session.user);
	const [editNickName, setEditNickName] = useState(false);
	const [editRole, setEditRole] = useState(false);
	const friendships = useSelector((state) => state.friendships)
	const [reloadFriend, setReloadFriend] = useState(false)



	let userId = user.id;

	// console.log("PAGE INCOMING --------->",member, isOwner, isAdmin, serverId)

	// Conditionals
	let permission = isOwner || isAdmin;
	let isUser = userId == member.user_id;
	let isNotOwner = member.role !== "owner";

	let userIsOwner = isUser && member.role === "owner";

	serverId = +serverId;
	channelId = +channelId;

	if (isUser) permission = false;

	const dateString = member.created_at.toString();
	let dateArray = dateString.split(", ");
	let date = dateArray.slice(1, 2).join("").slice(0, 11);

	// console.log("OnChange -------->",onChange)

	const leaveServer = (e) => {
		e.preventDefault();

		permission = true;

		dispatch(thunkDeleteServerMember(serverId, member.id, permission))
			.then(() => history.push("/gotMilk"))
			.then(closeModal())
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) setErrors(data.errors);
			});
		onChange(false);
	};

	const submitDelete = (e) => {
		e.preventDefault();

		permission = true;

		dispatch(thunkDeleteServerMember(serverId, member.id, permission))
			.then(closeModal())
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) setErrors(data.errors);
			});
		onChange(false);
	};

	// Edit Name
	const startEditNickName = (e) => {
		setEditNickName(true);
	};

	const endEditNickName = (e) => {
		setEditNickName(false);
	};

	// Edit Role

	const startEditRole = (e) => {
		setEditRole(true);
	};

	const endEditRole = (e) => {
		setEditRole(false);
	};

	// Friendship

	let allFriends
	let isFriends
	if (friendships) {
		allFriends = Object.values(friendships)
		let allFriendsIds = allFriends.map(friend => {
			return friend.id
		})
		// console.log("ALL FRIENDS----------->",member, allFriendsIds)
		if (allFriendsIds.includes(+member.user_id)) {
			isFriends = true
		}
	}

	// Add Friend

	const addFriend = (e) => {
		e.preventDefault()
		dispatch(thunkAddFriendship(member.user_id, member))
		.then(() => {isFriends=true
			setReloadFriend(!reloadFriend)})
		// .then(dispatch(thunkGetFriendships()))
		.catch(async (res) => {
			const data = await res.json();
			if (data && data.errors) setErrors(data.errors);
		});
	}

	// DELETE Friend
	
	const deleteFriend = (e) => {
		e.preventDefault()
		dispatch(thunkDeleteFriendship(member.user_id))
		.then(() => {isFriends=false
			setReloadFriend(!reloadFriend)})
		// .then(dispatch(thunkGetFriendships()))
		.catch(async (res) => {
			const data = await res.json();
			if (data && data.errors) setErrors(data.errors);
		});
	}

	// console.log("PERMISSION ------>", permission)

	// RANDOM COLORS
	function getRandomColor() {
		const r = Math.floor(Math.random() * 256);
		const g = Math.floor(Math.random() * 256);
		const b = Math.floor(Math.random() * 256);
		const a = Math.random().toFixed(2);
		return `rgba(${r}, ${g}, ${b}, ${a})`;
	}

	const randomColor = getRandomColor();

  	const style = {
    backgroundColor: randomColor,
  	};


	return (
		<>
			<div className="member-card" id={theme}>
				<div id="card-header" style={style}></div>
				<div className="card-content">
					<div className="member-header">
						<img className="card-img" id={theme} src={member.display_pic}></img>
						{!isFriends && !isUser && (
							<button
							type="submit"
							className="add-friend-button"
							onClick={addFriend}
						>
							Send Friend Request
						</button>
						)}
						{isFriends && !isUser && (
							<button
							type="submit"
							className="delete-friend-button"
							onClick={deleteFriend}
						>
							Remove Friend
						</button>
						)}
					</div>
					<div className="card-member-info" id={theme}>
						<div className="card-member-inner-div">
							<div className="member-nickName-div" id={theme}>
								{userIsOwner && (
									<div className="member-nickname-div-container">
										{editNickName ? (
											<NickNameEdit
												member={member}
												onChange={onChange}
												serverId={serverId}
												channelId={channelId}
												endEditNickName={
													endEditNickName
												}
												theme={theme}
											/>
										) : (
											<div className="member-nickname-container">
												<h4
													className="member-nickname"
													id={theme}
												>
													{member.nickname}
												</h4>
												<h4
													className="nickname-edit-button"
													onClick={startEditNickName}
												>
													Edit
												</h4>
											</div>
										)}
									</div>
								)}
								{(permission || isUser) && isNotOwner ? (
									<>
										{editNickName ? (
											<NickNameEdit
												member={member}
												onChange={onChange}
												serverId={serverId}
												channelId={channelId}
												endEditNickName={
													endEditNickName
												}
												theme={theme}
											/>
										) : (
											<div className="member-nickname-container">
												<h4
													className="member-nickname"
													id={theme}
												>
													{member.nickname}
												</h4>
												<h4
													className="nickname-edit-button"
													onClick={startEditNickName}
												>
													Edit
												</h4>
											</div>
										)}
									</>
								) : (
									<>
										{!userIsOwner && (
											<h4
												className="member-nickname"
												id={theme}
											>
												{member.nickname}
											</h4>
										)}
									</>
								)}
							</div>
							<div className="member-since-section">
								<h4 className="member-h4" id={theme}>Member Since</h4>
								<p className="card-text" id={theme}>{date}</p>
							</div>
							<div className="role-section">
								<h4 className="member-h4" id={theme}>Role</h4>
								{!isNotOwner ? (
									<div id={`owner ${theme}`} className="member-role-div">
										<div className="member-role-container" id={theme}>
											<div id="owner" className="member-role-circle"></div>
											<p className="member-role" id={theme}>
												{member.role}
											</p>
										</div>
									</div>
								) : (
									<>
										{isNotOwner && (isAdmin || isOwner) ? (
											<>
												{editRole ? (
													<RoleEdit
														member={member}
														onChange={onChange}
														serverId={serverId}
														endEditRole={
															endEditRole
														}
													/>
												) : (
													<div className="member-role-div">
														<div
															className="member-role-container"
															id={theme}
														>
															<div id={member.role} className="member-role-circle"></div>
															<p className="member-role" id={theme}>
																{member.role}
															</p>
														</div>
														<p
															id={theme}
															className="role-edit-button"
															onClick={
																startEditRole
															}
														>
															+
														</p>
													</div>
												)}
											</>
										) : (
											<div id={member.role} className="member-role-div">
												<div
													id={theme}
													className="member-role-container"
												>
													<div id={member.role} className="member-role-circle"></div>
													<p className="member-role" id={theme}>
														{member.role}
													</p>
												</div>
											</div>
										)}
									</>
								)}
								{/* <p className="card-text">{member.role}</p> */}
							</div>
							<div className="leave-server-div">
								{permission && isNotOwner && (
									<button
										type="submit"
										className="delete-membership-button"
										onClick={submitDelete}
									>
										Got Beef?
									</button>
								)}
								{isUser && isNotOwner && (
									<button
										type="submit"
										className="delete-membership-button"
										onClick={leaveServer}
									>
										Leave Server
									</button>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
