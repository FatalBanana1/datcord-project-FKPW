import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
	actionResetServerMember,
	thunkGetServerMembers,
	thunkAddServerMember,
	thunkEditServerMember,
	thunkDeleteServerMember,
} from "../../store/serverMembers";
import "./ServerMembers.css";
import crown from "../../assets/crown.png";
import OpenModalButton from "../OpenModalButton";
import MemberPage from "./MemberPage";

const ServerMembers = ({ theme }) => {
	const dispatch = useDispatch();

	const [isLoaded, setIsLoaded] = useState(false);

	const user = useSelector((state) => state.session.user);
	let { serverId, channelId } = useParams();
	const servers = useSelector((state) => state.servers);
	const server = servers[serverId];
	const serverMembers = useSelector((state) => state.serverMembers);
	const membersArray = Object.values(serverMembers);
	const [showMenu, setShowMenu] = useState(false);
	const [visible, setVisible] = useState("hidden");

	// console.log("membersArray ------->", membersArray)

	useEffect(() => {
		dispatch(thunkGetServerMembers(serverId));

		return () => {
			dispatch(actionResetServerMember());
		};
	}, [serverId]);

	// Check to see if User owns the server
	let owner = null;
	if (user && server) {
		owner = user.id == server.owner_id;
	}

	// Split into categories
	let owners;
	let admins;
	let members;
	let pending;
	if (membersArray.length > 0) {
		owners = membersArray.filter((member) => member.role === "owner");
		admins = membersArray.filter((member) => member.role === "admin");
		members = membersArray.filter((member) => member.role === "member");
		pending = membersArray.filter((member) => member.role === "pending");
	}

	let isMember = false;
	for (let member of membersArray) {
		if (user.id == member.user_id) isMember = true;
	}

	// const join = (e) => {
	//     e.preventDefault();
	//     const serverId = server.id;
	//     const role = "member"
	//     dispatch(thunkAddServerMember(serverId, role))
	//     setIsLoaded(false);
	// }

	let isAdmin;
	if (isMember && !owner) {
		const membership = membersArray.filter((member) => {
			return member.user_id === user.id;
		});
		if (membership[0].role === "admin") isAdmin = true;
	}

	const makeVisible = (e) => {
		e.preventDefault();
		setVisible("visible");
	};

	// const openMember = (e) => {
	//     e.preventDefault();
	//     const isOwner = owner
	//     const isAdmin = admin
	// }

	const closeMenu = () => setShowMenu(false);

	const handleOnChange = (e) => {
		setIsLoaded(!isLoaded);
	};

	return (
		user && theme &&
		membersArray.length > 0 && (
			<div id={theme} className="ServerMember-sidebar">
				{!isMember && (
					<></>
					// <div className="join-server-div">
					//     {/* <div className="join-text">Preview mode</div> */}
					//     <button type="submit" onClick={join} className='join-server-button'>Join {server.name}</button>
					// </div>
				)}
				{/* <div className="server-members-div"> */}
				{/* <div className="UserLanding-sidebar-header"></div> */}
				<div className="server-members-header"></div>
				<div className="ServerMember-content" id={theme}>
					<h1 className="total-members" id={theme}>{`Total Members - ${membersArray.length}`}</h1>
					{owners.length > 0 && (
						<div className="owner-div section">
							<h2 className="ServerMembers-headers" id={theme}>Owner</h2>
							<div id={`owner ${theme}`} className="individual-person">
								<img
									className="member-img"
									src={owners[0].display_pic}
								></img>
								{/* <p className="owner nicknames">{owners[0].nickname}</p> */}
								<OpenModalButton
									id="memberModalButton"
									className="owner nicknames"
									buttonText={owners[0].nickname}
									onButtonClick={closeMenu}
									modalComponent={
										<MemberPage
											member={owners[0]}
											isOwner={owner}
											isAdmin={isAdmin}
											serverId={serverId}
											channelId={channelId}
											onChange={handleOnChange}
										/>
									}
								/>
								<img
									src={crown}
									alt="crown"
									className="server-owner-crown"
								/>
							</div>
						</div>
					)}
					{admins.length > 0 && (
						<div className="admin-div section">
							<h2 className="ServerMembers-headers" id={theme}>{`Admins`}</h2>
							{admins.map((admin) => (
								<div
									key={admin.id}
									id={`admin ${theme}`}
									className="individual-person"

								>
									<img
										className="member-img"
										src={admin.display_pic}
									></img>
									{/* <p className="admin nicknames">{admin.nickname}</p> */}
									<OpenModalButton
										id="memberModalButton"
										className="admin nicknames"
										buttonText={admin.nickname}
										onButtonClick={closeMenu}
										modalComponent={
											<MemberPage
												member={admin}
												isOwner={owner}
												isAdmin={isAdmin}
												serverId={serverId}
												channelId={channelId}
												onChange={handleOnChange}
											/>
										}
									/>
								</div>
							))}
						</div>
					)}
					{members.length > 0 && (
						<div className="regular-members-div section">
							<h2 className="ServerMembers-headers" id={theme}>{`Members`}</h2>
							{members.map((member) => (
								<div
									key={member.id}
									id="member"
									className="individual-person"
									onClick={makeVisible}
								>
									<img
										className="member-img"
										src={member.display_pic}
									></img>
									{/* <p className="regular-member nicknames">{member.nickname}</p> */}
									<OpenModalButton
										id="memberModalButton"
										className="member nicknames"
										buttonText={member.nickname}
										onButtonClick={closeMenu}
										modalComponent={
											<MemberPage
												member={member}
												isOwner={owner}
												isAdmin={isAdmin}
												serverId={serverId}
												channelId={channelId}
												onChange={handleOnChange}
											/>
										}
									/>
								</div>
							))}
						</div>
					)}
					{pending.length > 0 && (
						<div className="pending-div section">
							<h2 className="ServerMembers-headers" id={theme}>{`Pending - ${pending.length}`}</h2>
							{pending.map((pending) => (
								<div
									key={pending.id}
									id="pending"
									className="individual-person pending"
								>
									<img
										className="member-img"
										src={pending.display_pic}
									></img>
									{/* <p className="pending nicknames">{pending.nickname}</p> */}
									<OpenModalButton
										id="memberModalButton"
										className="admin nicknames"
										buttonText={pending.nickname}
										onButtonClick={closeMenu}
										modalComponent={
											<MemberPage
												member={pending}
												isOwner={owner}
												isAdmin={isAdmin}
												serverId={serverId}
												channelId={channelId}
												onChange={handleOnChange}
											/>
										}
									/>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		)
	);
};

export default ServerMembers;
