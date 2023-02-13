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
    console.log("membersArray ------->", membersArray)

    useEffect(() => {
		dispatch(thunkGetServerMembers(serverId)).then(() =>
			setIsLoaded(true)
		);

		return () => {
			dispatch(actionResetServerMember());
		};
	}, [serverId, isLoaded]);

    // Check to see if User owns the server
    let owner = null
    if (user && server) {
        owner = (user.id === server.owner_id)
    }

    // Split into categories
    let owners
    let admins
    let members
    let pending
    if (membersArray.length > 0) {
        owners = membersArray.filter(member => member.role === "owner")
        admins = membersArray.filter(member => member.role === "admin")
        members = membersArray.filter(member => member.role === "member")
        pending = membersArray.filter(member => member.role === "pending")
    }

    let isMember = false
    for (let member of membersArray) {
        if (user.id == member.user_id) isMember = true
    }

    const join = (e) => {
        e.preventDefault();
        const serverId = server.id;
        const role = "member"
        dispatch(thunkAddServerMember(serverId, role))
        setIsLoaded(false);
    }

    return (
        user && (membersArray.length > 0) && (
            <>
            {!isMember && (
                <div className="join-server-div">
                    {/* <div className="join-text">Preview mode</div> */}
                    <button type="submit" onClick={join} className='join-server-button'>Join {server.name}</button>
                </div>
                )}
            <div className="server-members-div">
                <h1 className="total-members">{`Total Members - ${membersArray.length}`}</h1>
                {owners.length > 0 && (
                    <div className = "owner-div section">
                        <h2>Owner</h2>
                        <div className="individual-person">
                            <img className="member-img" src={owners[0].display_pic}></img>
                            <p className="owner nicknames">{owners[0].nickname}</p>
                        </div>
                    </div>
                )}
                {admins.length > 0 && (
                    <div className = "admin-div section">
                        <h2>{`Admins`}</h2>
                        {admins.map(admin =>
                            <div key={admin.id} className="individual-person">
                                <img className="member-img" src={admin.display_pic}></img>
                                <p className="admin nicknames">{admin.nickname}</p>
                            </div>
                        )}
                    </div>
                )}
                {members.length > 0 && (
                    <div className = "regular-members-div section">
                        <h2>{`Members`}</h2>
                        {members.map(member => 
                            <div key={member.id} className="individual-person">
                                <img className="member-img" src={member.display_pic}></img>
                                <p className="regular-member nicknames">{member.nickname}</p>
                            </div>
                        )}
                    </div>
                )}
                {pending.length > 0 && (
                    <div className = "pending-div section">
                        <h2>{`Pending - ${pending.length}`}</h2>
                        {pending.map(pending =>
                            <div key={pending.id} className="individual-person pending">
                                <img className="member-img" src={pending.display_pic}></img>
                                <p className="pending nicknames">{pending.nickname}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
            </>
        )
    )
}

export default ServerMembers
