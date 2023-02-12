import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal.js";
import { thunkCreateChannel } from "../../../store/channels";
import "./CreateChannelForm.css";

export default function CreateChannelForm({ categoryName, prevName })  {
    const dispatch = useDispatch();
    const [ category, setCategory ] = useState(categoryName ? categoryName : "");
    const [ channelName, setChannelName ] = useState(prevName ? prevName : "");
    const [ isPrivate, setIsPrivate ] = useState(false);
    const [ errors, setErrors ] = useState([]);
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(thunkCreateChannel({ category, channelName, isPrivate }))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    if (categoryName) {
        return (
            <div className="CreateChannelForm-container">
                <div className="CreateChannelForm-header">
                    <h1 className="CreateChannelForm-title">
                        Create Channel
                    </h1>
                    <p className="CreateChannelForm-subtext">
                        in {category}
                    </p>
                </div>
                <div className="CreateChannelForm-group-channel-name">
                    <label htmlFor="channel-name">Channel Name</label>
                    <input
                        id="channel-name"
                        type="text"
                        value={channelName}
                        onChange={(e) => setChannelName(e.target.value)}
                        required
                        placeholder="new-channel"
                    />
                </div>
                <div className="CreateChannelForm-group-private">
                    <label htmlFor="is-private"
                        className="CreateChannelForm-private-switch"
                    >
                        Private channel
                        <input
                            id="is-private"
                            type="checkbox"
                            value={isPrivate}
                            onChange={(e) => setIsPrivate(e.target.value)}
                            required
                        />
                        <span className="CreateChannelForm-private-slider"></span>
                    </label>
                </div>
            </div>
        )
    }

    return (
        <div className="CreateChannelForm-container">
            <div className="CreateChannelForm-header">
                <h1 className="CreateChannelForm-title">
                    Create Channel
                </h1>
                <p className="CreateChannelForm-subtext"></p>
            </div>
            <form className="CreateChannelForm-form">
                <div className="CreateChannelForm-group-channel-name">
                    <label htmlFor="channel-name">Channel Name</label>
                    <input
                        id="channel-name"
                        type="text"
                        value={channelName}
                        onChange={(e) => setChannelName(e.target.value)}
                        required
                        placeholder="new-channel"
                    />
                </div>
                <div className="CreateChannelForm-group-category">
                    <label htmlFor="is-private"
                        className="CreateChannelForm-private-switch"
                    >
                        Category Name
                        <input
                            id="is-private"
                            type="checkbox"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        />
                        <span className="CreateChannelForm-private-slider"></span>
                    </label>
                </div>
                <div className="CreateChannelForm-group-private">
                    <label htmlFor="is-private"
                        className="CreateChannelForm-private-switch"
                    >
                        Private channel
                        <input
                            id="is-private"
                            type="checkbox"
                            value={isPrivate}
                            onChange={(e) => setIsPrivate(e.target.value)}
                            required
                        />
                        <span className="CreateChannelForm-private-slider"></span>
                    </label>
                </div>
            </form>
        </div>
    )
}
