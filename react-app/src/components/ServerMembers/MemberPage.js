import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal.js";
import {
    actionResetServerMember,
    thunkEditServerMember,
    thunkDeleteServerMember
} from "../../store/serverMembers"
import "./MemberPage.css"


export default function MemberPage ({member, isOwner, isAdmin}) {
    const dispatch = useDispatch();
    const [role, setRole] = useState(member.role)
    const [errors, setErrors] = useState([])
    const {closeModal} = useModal

    console.log("PAGE INCOMING --------->",member, isOwner, isAdmin)

    const permission = (isOwner || isAdmin)

    const dateString = member.created_at.toString()
    let dateArray = dateString.split(', ');
    let date = dateArray.slice(1,2).join('').slice(0,11);

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
                    </div>
                </div>
            </div>
        </div>


        </>

    )



}
