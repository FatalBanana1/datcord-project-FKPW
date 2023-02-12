import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    actionResetServerMember,
    thunkGetServerMembers,
    thunkAddServerMember,
    thunkEditServerMember,
    thunkDeleteServerMember
} from "../../store/serverMembers"
import "./ServerMembers.css"

const ServerMembers = () => {
    const dispatch = useDispatch();

    const [isLoaded, setIsLoaded] = useState(false);

    const user = useSelector((state) => state.session.user);
    let {serverId} = useParams();
    const servers = useSelector((state) =>state.servers)
    const server = servers[serverId]
    const serverMembers = useSelector((state) => state.serverMembers)
    const membersArray = Object.values(serverMembers)

    useEffect(() => {
		dispatch(thunkGetServerMembers(serverId)).then(() =>
			setIsLoaded(true)
		);

		return () => {
			dispatch(actionResetServerMember());
		};
	}, [serverId]);

    // Check to see if User owns the server
    let owner = null
    if (user && server) {
        owner = (user.id === server.owner_id)
    }

    // Split into categories
    if (membersArray.length > 0) {
        owners = membersArray.filter(member => member.role === "owner")
        admins = membersArray.filter(member => member.role === "admin")
        members = membersArray.filter(member => member.role === "member")
        pending = membersArray.filter(member => member.role === "pending")
    }

    return (
        user && (membersArray.length > 0) (
            <>
            <div className="server-members-div">
                <h1>{`Total Members - ${membersArray.length}`}</h1>
                <div className = "owner-div">
                    <h2>Owner</h2>
                    <p>{owners[0].nickname}</p>
                </div>
                admins.length && (
                    <div className = "admin-div"></div>
                    <h2>{`Admins - ${admins.length}`}</h2>
                    {admins.map(admin => {
                        <p className="admin-nicknames">{admin.nickname}</p>
                    })}
                )
                members.length && (
                    <div className = "regular-members-div">
                        <h2>{`Members - ${member.length}`}</h2>
                        {members.map(member => {
                            <p className="regular-member-nicknames">{member.nickname}</p>
                        })}
                    </div>
                )
                pending.length && (
                    <div className = "pending-div"></div>
                    <h2>{`Pending - ${pending.length}`}</h2>
                    {pending.map(pending => {
                        <p className="pending-nicknames">{pending.nickname}</p>
                    })}
                )
            </div>
            </>
        )
    )













}
