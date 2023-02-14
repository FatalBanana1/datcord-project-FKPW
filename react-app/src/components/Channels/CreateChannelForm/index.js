import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal.js";
import { thunkCreateChannel, thunkGetChannels } from "../../../store/channels";
import "./CreateChannelForm.css";

export default function CreateChannelForm({ categoryName, prevName, serverId })  {
    const dispatch = useDispatch();
    const [ category, setCategory ] = useState(categoryName ? categoryName : "");
    const [ channelName, setChannelName ] = useState(prevName ? prevName : "");
    const [ isPrivate, setIsPrivate ] = useState(false);
    const [ errors, setErrors ] = useState([]);
    const { closeModal } = useModal();
    const history = useHistory();

    useEffect(() => {
        // JUST FOR TESTING
        console.log("isPrivate ? :", isPrivate);

    }, [isPrivate])

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        console.log("***** HIT HANDLE SUBMIT ****")

        const newChannel = {
            category,
            "name": channelName,
            "is_private": isPrivate
        }

        console.log("newChannel", newChannel);

        // const data = dispatch(thunkCreateChannel(+serverId, newChannel))
        // if (data) {
        //     console.log("has error")
        //     console.log("error data:", data)
        //     setErrors(data);
        // } else {
        //     console.log("no error")
        //     closeModal();
        //     dispatch(thunkGetChannels(+serverId));
        // }
        return dispatch(thunkCreateChannel(+serverId, newChannel))
            .then(res => {
                console.log("res>>>>>", res)
                history.push(`/channels/${serverId}/${res.id}`)
            })
            .then(closeModal)
            .catch(async (res) => {
                const data = await res;
                if (data && data.errors) setErrors(data.errors);
            });
    }

    if (categoryName) {
        return (
            <div className="CreateChannelForm-container">
                <div className="CreateChannelForm-header">
                    <div className="CreateChannelForm-title-text">
                        <h1 className="CreateChannelForm-title">
                            Create Channel
                        </h1>
                        <p className="CreateChannelForm-subtext">
                            in {category}
                        </p>
                    </div>
                    <div className="CreateChannelForm-close" onClick={closeModal}>
                        <i className="fa-solid fa-xmark"></i>
                    </div>
                </div>
                <form className="CreateChannelForm-form" onSubmit={handleSubmit}>
                    <div className="CreateChannelForm-group-channel-name">
                        <label
                            htmlFor="channel-name"
                            className="CreateChannelForm-label"
                        >Channel Name
                        </label>
                        <div className="CreateChannelForm-group-channel-input">
                            <p className="hashtag">#</p>
                            <input
                                id="channel-name"
                                type="text"
                                value={channelName}
                                onChange={(e) => setChannelName(e.target.value)}
                                required
                                placeholder="new-channel"
                            />
                        </div>
                    </div>
                    <div className="CreateChannelForm-group-private">
                        <span>
                            <i className="fa-solid fa-lock"></i>
                            Private channel
                        </span>
                        <label
                            // htmlFor="is-private"
                            className="CreateChannelForm-private-switch"
                        >
                            <input
                                // id="is-private"
                                type="checkbox"
                                value={isPrivate}
                                onChange={(e) => setIsPrivate(!e.target.value)}
                            />
                            <span className="CreateChannelForm-private-slider-round"></span>
                        </label>
                    </div>
                        <p className="CreateChannelForm-private-text">
                            Only selected members and roles will be able to view this channel.
                        </p>
                    <div className="CreateChannelForm-buttons-container">
                        <button className="CreateChannelForm-button-cancel" onClick={closeModal}>
                            Cancel
                        </button>
                        <button type="submit" className="CreateChannelForm-button-create">
                            Create Channel
                        </button>
                    </div>
                </form>
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
