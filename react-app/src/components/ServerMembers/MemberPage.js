import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal.js";
import {
    actionResetServerMember,
    thunkGetServerMembers,
    thunkEditServerMember,
    thunkDeleteServerMember
} from "../../store/serverMembers"
import {
    thunkReadUserServers
} from "../../store/servers"

import "./MemberPage.css"


export default function MemberPage ({member, isOwner, isAdmin, serverId, userId}) {
    const dispatch = useDispatch();
    const [role, setRole] = useState(member.role)
    const [errors, setErrors] = useState([])
    const history = useHistory();
    const { closeModal } = useModal();

    // console.log("PAGE INCOMING --------->",member, isOwner, isAdmin, serverId)

    let permission = (isOwner || isAdmin)
    let isUser = (userId == member.user_id)

    if (isUser) permission = false

    const dateString = member.created_at.toString()
    let dateArray = dateString.split(', ');
    let date = dateArray.slice(1,2).join('').slice(0,11);

    const leaveServer = async (e) => {
        e.preventDefault()

        permission = true

        let deleteMembership = await dispatch(thunkDeleteServerMember(serverId, member.id, permission))
        .then(() => history.push("/channels/@me"))
        .then(closeModal())
        .catch(async (res) => {
            const data = await res.json()
            if (data && data.errors) setErrors(data.errors);
        })
    }

    const submitDelete = async (e) => {
        e.preventDefault()

        permission = true

        let deleteMembership = await dispatch(thunkDeleteServerMember(serverId, member.id, permission))
        .then(dispatch(thunkGetServerMembers(serverId)))
        .then(closeModal())
        .catch(async (res) => {
            const data = await res.json()
            if (data && data.errors) setErrors(data.errors);
        })
    }

    return (
        <>
        <div className="member-card">
        <div id="card-header"></div>
            <div className="card-content">
                <img className="card-img" src={member.display_pic}></img>
                <div className="card-member-info">
                    <div className="card-member-inner-div">
                        <h4 className="member-nickname">{member.nickname}</h4>
                        <div className="card-section">
                            <h4 className="member-h4">Member Since</h4>
                            <p className="card-text">{date}</p>
                        </div>
                        <div className="card-section">
                            <h4 className="member-h4">Role</h4>
                            <p className="card-text">{member.role}</p>
                        </div>
                        <div className="leave-server-div">
                            {/* {permission && (
                                <button type="submit" className="delete-membership-button" onClick={submitDelete}>Got Beef?</button>
                            )} */}
                            {isUser && (
                                <button type="submit" className="delete-membership-button" onClick={leaveServer}>Leave Server</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>


        </>

    )



}
