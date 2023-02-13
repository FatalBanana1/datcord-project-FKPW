import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal.js";
import {
    actionResetServerMember,
    thunkEditServerMember,
    thunkDeleteServerMember
} from "../../store/serverMembers"


export default function MemberPage ({member, isOwner, isAdmin}) {
    const dispatch = useDispatch();
    const [role, setRole] = useState(member.role)
    const [errors, setErrors] = useState([])
    const {closeModal} = useModal

    console.log("PAGE INCOMING --------->",member, isOwner, isAdmin)

    return (
        <>
        <div>Test div</div>
        </>

    )



}
