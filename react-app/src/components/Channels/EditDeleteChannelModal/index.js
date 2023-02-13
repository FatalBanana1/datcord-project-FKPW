import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal.js";
import { thunkCreateChannel, thunkDeleteChannel, thunkEditChannel, thunkGetChannels } from "../../../store/channels";

export default function EditChannelForm({ categoryName, prevName, serverId, channelId })  {
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

        const editChannel = {
            category,
            "name": channelName,
            "is_private": isPrivate
        }

        console.log("editChannel", editChannel);

        // const data = dispatch(thunkCreateChannel(+serverId, editChannel))
        // if (data) {
        //     console.log("has error")
        //     console.log("error data:", data)
        //     setErrors(data);
        // } else {
        //     console.log("no error")
        //     closeModal();
        //     dispatch(thunkGetChannels(+serverId));
        // }
        return dispatch(thunkEditChannel(+serverId, +channelId, editChannel))
            .then(dispatch(thunkGetChannels(+serverId)))
            .then(closeModal)
            .catch(async (res) => {
                console.log("EDIT CH hit error")
                const data = await res;
                if (data && data.errors) setErrors(data.errors);
            });
    }

    const deleteChannel = (e) => {
        e.preventDefault();
        console.log("hit delete channel");
        return dispatch(thunkDeleteChannel(+serverId, +channelId))
            .then(dispatch(thunkGetChannels(+serverId)).then(
                (res) => res === "Server has no channels" ? history.push(`/channels/${serverId}/0`) : history.push(`/channels/${serverId}/${res[0].id}`)
            ))
            // .then((data) => {
            //     console.log("data - delete channel", data)
            //     const channel = Object.values(data)[0].id;
            //     console.log("delete CHANNEL:", channel, data)
            //     history.push(`/channels/${serverId}/${channel.id}`);
            // })
            .then(closeModal)
            .catch(async (res) => {
                const data = await res;
                if (data && data.errors) setErrors(data.errors);
                console.log("data", data)
            });
    }

    if (categoryName) {
        return (
            <div className="CreateChannelForm-container">
                <div className="CreateChannelForm-header">
                    <div className="CreateChannelForm-title-text">
                        <h1 className="CreateChannelForm-title">
                            Edit Channel
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
                        <button className="CreateChannelForm-button-delete" onClick={(e) => deleteChannel(e)}>
                            Delete Channel
                        </button>
                        <button type="submit" className="CreateChannelForm-button-create">
                            Edit Channel
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
