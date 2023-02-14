import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { useModal } from "../../../context/Modal.js";
import { thunkGetChannels } from "../../../store/channels.js";

import "./EditDeleteChannelModal.css";

export default function EditDeleteChannelModal() {
    const { channelId, serverId } = useParams();
    const dispatch = useDispatch();
    const server = useSelector(state => state.servers.userServers);
    const channels = Object.values(useSelector(state => state.channels.channels));
    const channel = channels.filter(channel => channel.id === +channelId)[0];
    // console.log("EditDeleteChannelModal - channel:", channel);
    const [ isLoaded, setIsLoaded ] = useState(false);

    const channelName = channel.name;
    const channelCategory = channel.category;
    const channelPrivate = channel.is_private;

    const [ formStep, setFormStep ] = useState(1);
    const [ formData, setFormData ] = useState({
        "name": channelName,
        "category": channelCategory,
        "is_private": channelPrivate
    })

    useEffect(() => {
        dispatch(thunkGetChannels(+serverId)).then(() => setIsLoaded(true))
    }, [dispatch, serverId]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormStep(formStep + 1);
    }

    // switch (formStep) {
    //     case 1:
    //         return (
    //             <div
    //         )
    // }

    return isLoaded && (
        <div className="EditDeleteChannelModal-container">
            <div className="EditDeleteChannelModal-left">
                <div className="EditDeleteChannelModal-nav">
                    <div className="EditDeleteChannelModal-nav-headers">
                        <p className="EditDeleteChannelModal-nav-header"># {channel.name}</p>
                        <p className="EditDeleteChannelModal-nav-header">{channel.category}</p>
                    </div>
                    <div className="EditDeleteChannelModal-nav-links">
                        <p>Overview</p>
                    </div>
                </div>
            </div>
            <div className="EditDeleteChannelModal-right">
                right
            </div>
        </div>
    )
}
