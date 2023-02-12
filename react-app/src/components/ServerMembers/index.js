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

    useEffect(() => {
		dispatch(thunkGetServerMembers(serverId)).then(() =>
			setIsLoaded(true)
		);

		return () => {
			dispatch(actionResetServerMember());
		};
	}, [serverId]);









}
