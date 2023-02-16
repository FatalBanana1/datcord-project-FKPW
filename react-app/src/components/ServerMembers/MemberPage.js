import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal.js";
import {
	actionResetServerMember,
	thunkGetServerMembers,
	thunkDeleteServerMember,
} from "../../store/serverMembers";
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
}) {
	const dispatch = useDispatch();
	const [role, setRole] = useState(member.role);
	const [nickName, setnickName] = useState(member.nickName);
	const [errors, setErrors] = useState([]);
	const history = useHistory();
	const { closeModal } = useModal();
	const [isLoaded, setIsLoaded] = useState(false);
	// let {serverId} = useParams();
	const user = useSelector((state) => state.session.user);
	const [editNickName, setEditNickName] = useState(false);
	const [editRole, setEditRole] = useState(false);

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

	// console.log("PERMISSION ------>", permission)

	return (
		<>
			<div className="member-card">
				<div id="card-header"></div>
				<div className="card-content">
					<img className="card-img" src={member.display_pic}></img>
					<div className="card-member-info">
						<div className="card-member-inner-div">
							<div className="member-nickName-div">
								{userIsOwner && (
									<>
										{editNickName ? (
											<NickNameEdit
												member={member}
												onChange={onChange}
												serverId={serverId}
												endEditNickName={
													endEditNickName
												}
											/>
										) : (
											<>
												<h4 className="member-nickname">
													{member.nickname}
												</h4>
												<h4
													className="nickname-edit-button"
													onClick={startEditNickName}
												>
													Edit
												</h4>
											</>
										)}
									</>
								)}
								{(permission || isUser) && isNotOwner ? (
									<>
										{editNickName ? (
											<NickNameEdit
												member={member}
												onChange={onChange}
												serverId={serverId}
												endEditNickName={
													endEditNickName
												}
											/>
										) : (
											<>
												<h4 className="member-nickname">
													{member.nickname}
												</h4>
												<h4
													className="nickname-edit-button"
													onClick={startEditNickName}
												>
													Edit
												</h4>
											</>
										)}
									</>
								) : (
									<>
										{!userIsOwner && (
											<h4 className="member-nickname">
												{member.nickname}
											</h4>
										)}
									</>
								)}
							</div>
							<div className="member-since-section">
								<h4 className="member-h4">Member Since</h4>
								<p className="card-text">{date}</p>
							</div>
							<div className="role-section">
								<h4 className="member-h4">Role</h4>
								{!isNotOwner ? (
									<div className="member-role-div">
										<p className="member-role">
											{member.role}
										</p>
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
														<p className="member-role">
															{member.role}
														</p>
														<p
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
											<div className="member-role-div">
												<p className="member-role">
													{member.role}
												</p>
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
