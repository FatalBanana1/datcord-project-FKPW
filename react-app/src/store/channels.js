const GET_SERVER_CHANNELS = "channel/GET_SERVER_CHANNELS";
const CREATE_CHANNEL = "channel/CREATE_CHANNEL";
const DELETE_CHANNEL = "channel/DELETE_CHANNEL";
const EDIT_CHANNEL = "channel/EDIT_CHANNEL";

// Actions
export const actionGetServerChannels = (channels, server) => ({
	type: GET_SERVER_CHANNELS,
	channels,
	server,
});

export const actionCreateChannel = (channel) => ({
	type: CREATE_CHANNEL,
	channel,
});

export const actionDeleteChannel = (channelId) => ({
	type: DELETE_CHANNEL,
	channelId,
});

export const actionEditChannel = (channelId, channel) => ({
	type: EDIT_CHANNEL,
	channelId,
	channel,
});

// Thunks
export const thunkGetChannels = (serverId) => async (dispatch) => {
	const res = await fetch(`/api/servers/${serverId}/channels`);
	const data = await res.json();
	if (data.errors) return;
	dispatch(actionGetServerChannels(data.channels, data.server));
	// console.log("CHANNEL DATA", data)
	return data.channels;
};

export const thunkCreateChannel =
	(serverId, newChannel) => async (dispatch) => {
		const res = await fetch(`/api/servers/${serverId}/channels`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newChannel),
		});

		if (res.ok) {
			const data = await res.json();
			// console.log("thunkCreateChannel - data:", data);
			dispatch(actionCreateChannel(data.channel));
			return data.channel;
		} else if (res.status < 500) {
			const data = await res.json();
			if (data.errors) {
				return data.errors;
			}
		} else {
			return ["An error occurred. Please try again."];
		}
	};

export const thunkDeleteChannel = (serverId, channelId) => async (dispatch) => {
	const res = await fetch(`/api/servers/${serverId}/channels/${channelId}`, {
		method: "DELETE",
	});

	if (res.ok) {
		const data = await res.json();
		// console.log("thunkDeleteChannel - data:", data);
		dispatch(actionDeleteChannel(channelId));
		return data;
	} else if (res.status < 500) {
		const data = await res.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occured. Please try again."];
	}
};

export const thunkEditChannel =
	(serverId, channelId, editedChannel) => async (dispatch) => {
		const res = await fetch(
			`/api/servers/${serverId}/channels/${channelId}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(editedChannel),
			}
		);

		if (res.ok) {
			const data = await res.json();
			// console.log("thunkEditChannel - data ------", data);
			dispatch(actionEditChannel(channelId, data.channel));
			return null;
		} else if (res.status < 500) {
			const data = await res.json();
			if (data.errors) {
				return data.errors;
			}
		} else {
			return ["An error occurred. Please try again."];
		}
	};

const normalize = (channels) => {
	const data = {};
	// console.log("channels", channels)
	if (channels) {
		channels.forEach((channel) => (data[channel.id] = channel));
		return data;
	}
};

const initialState = { channels: {} };

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_SERVER_CHANNELS:
			const getChannelsState = { ...state };
			getChannelsState.server = action.server;
			if (action.channels === "Server has no channels") {
				getChannelsState.channels = "";
				return getChannelsState;
			}
			getChannelsState.channels = normalize(action.channels);
			// console.log("NEW STATE", getChannelsState)
			return getChannelsState;
		case CREATE_CHANNEL: {
			const createChannelState = { ...state };
			createChannelState.channels = {
				...state.channels,
				[action.channel.id]: action.channel,
			};
			// console.log("CREATE_CHANNEL - createChannelState:", createChannelState);
			return createChannelState;
		}
		case DELETE_CHANNEL: {
			const deleteChannelState = { ...state };
			// console.log("DELETE_CHANNEL - before delete:", action);
			delete deleteChannelState.channels[action.channelId];
			// console.log("DELETE_CHANNEL - deleteChannelState:", deleteChannelState);
			return deleteChannelState;
		}
		case EDIT_CHANNEL: {
			const editChannelState = { ...state };
			editChannelState.channels = {
				...state.channels,
				[action.channelId]: action.channel,
			};
			// console.log("EDIT_CHANNEL - editChannelState:", editChannelState);
			return editChannelState;
		}
		default:
			return state;
	}
}
